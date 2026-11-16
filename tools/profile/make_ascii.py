"""Turn a picture into the ASCII portrait the about card draws.

The card needs the *character*, not the frame: anything that belongs to the
background has to come out as spaces, or the portrait turns into a solid
rectangle of ink (which is exactly what a full-frame halftone render does).

So this does two things a plain image-to-ASCII tool does not:

1. keys out the background by flood-filling from the borders, which keeps light
   parts of the character (white dress, skin) while dropping a flat backdrop;
2. averages ink coverage per cell and drops cells that are mostly backdrop, so
   the silhouette stays clean instead of being fringed with stray dots.

Usage:
    python tools/profile/make_ascii.py IMAGE OUT.txt [--cols 269] [--rows 298]
"""

from __future__ import annotations

import argparse
import sys
from collections import deque
from pathlib import Path

from PIL import Image

# Light to heavy. The card renders these at ~2.5px, so the character reads as a
# halftone rather than as letters.
RAMP = " .:-=+*#%@"

# A pixel counts as background when it is this close to the colour sampled from
# the border. 42 keeps soft shadows on a flat backdrop, without eating the
# character's pale clothing.
BG_TOLERANCE = 42

# A cell this empty is dropped entirely (fraction of the cell that survived the
# background key).
MIN_COVERAGE = 0.28


def key_background(im: Image.Image) -> list[list[bool]]:
    """True where the pixel is background.

    An alpha channel is the honest answer -- a cut-out PNG already says which
    pixels are not part of the picture -- so it wins whenever the file has one.
    Only fully opaque images fall back to flooding in from the borders.
    """
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        alpha = im.convert("RGBA").split()[-1]
        w, h = im.size
        ap = alpha.load()
        return [[ap[x, y] < 128 for x in range(w)] for y in range(h)]

    return flood_background(im)


def flood_background(im: Image.Image) -> list[list[bool]]:
    """True where the pixel is background, found by flooding in from the edges."""
    w, h = im.size
    px = im.load()
    seeds = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    seeds += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]

    # The backdrop colour is whatever dominates the border.
    border = [px[x, y] for x, y in seeds]
    br = sum(c[0] for c in border) / len(border)
    bg = sum(c[1] for c in border) / len(border)
    bb = sum(c[2] for c in border) / len(border)

    def near(c) -> bool:
        return abs(c[0] - br) + abs(c[1] - bg) + abs(c[2] - bb) <= BG_TOLERANCE

    mask = [[False] * w for _ in range(h)]
    q = deque((x, y) for x, y in seeds if near(px[x, y]))
    for x, y in q:
        mask[y][x] = True

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not mask[ny][nx] and near(px[nx, ny]):
                mask[ny][nx] = True
                q.append((nx, ny))
    return mask


def to_ascii(im: Image.Image, cols: int, rows: int) -> list[str]:
    # Key the background BEFORE dropping the alpha channel, or a cut-out PNG
    # would look fully opaque and the whole frame would come out inked.
    bg = key_background(im)
    im = im.convert("RGB")
    w, h = im.size
    px = im.load()

    out: list[str] = []
    for r in range(rows):
        y0, y1 = int(r * h / rows), max(int(r * h / rows) + 1, int((r + 1) * h / rows))
        line = []
        for c in range(cols):
            x0, x1 = int(c * w / cols), max(int(c * w / cols) + 1, int((c + 1) * w / cols))
            total = kept = 0
            ink = 0.0
            for y in range(y0, y1):
                for x in range(x0, x1):
                    total += 1
                    if bg[y][x]:
                        continue
                    kept += 1
                    r_, g_, b_ = px[x, y]
                    lum = (0.299 * r_ + 0.587 * g_ + 0.114 * b_) / 255
                    ink += 1.0 - lum
            if not total or kept / total < MIN_COVERAGE:
                line.append(" ")
                continue
            density = ink / kept
            line.append(RAMP[min(len(RAMP) - 1, max(0, round(density * (len(RAMP) - 1))))])
        out.append("".join(line).rstrip())
    return out


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("image")
    ap.add_argument("out")
    ap.add_argument("--cols", type=int, default=269)
    ap.add_argument("--rows", type=int, default=298)
    args = ap.parse_args()

    src = Path(args.image)
    lines = to_ascii(Image.open(src), args.cols, args.rows)

    # Trim the empty frame so the art sits tight in the card.
    keep_rows = [i for i, l in enumerate(lines) if l.strip()]
    cols = [j for l in lines for j, ch in enumerate(l) if ch != " "]
    if not keep_rows:
        sys.exit("nothing survived the background key")
    top, bot, left, right = keep_rows[0], keep_rows[-1], min(cols), max(cols)
    trimmed = [l[left:right + 1] for l in lines[top:bot + 1]]

    out = Path(args.out)
    out.write_text("\n".join(trimmed) + "\n", encoding="utf-8")
    filled = sum(1 for l in trimmed for ch in l if ch != " ")
    print(f"{out}: {len(trimmed)} rows x {max(len(l) for l in trimmed)} cols, "
          f"{filled:,} ink cells, {out.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()