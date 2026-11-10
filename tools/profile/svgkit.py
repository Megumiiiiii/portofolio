"""Small SVG helpers shared by the generated boards.

Carved out of the Pac-Man board this site used to show: pixel-sprite
flattening, the colour blend the level ramps use, and the SMIL sanity check
that fails the build instead of shipping an animation the browser will drop.
"""

from __future__ import annotations

import re
import xml.etree.ElementTree as ET

U = 2  # one sprite pixel, at the scale the boards are drawn


def bitmap(art: str) -> list[str]:
    return [r for r in art.strip("\n").split("\n") if r]


def sprite_path(rows: list[str], pw: float = U, ph: float = U) -> str:
    """Merge a bitmap into one path of horizontal pixel runs, centred on 0,0."""
    h, w = len(rows), max(len(r) for r in rows)
    x0, y0 = -w * pw / 2, -h * ph / 2
    d = []
    for y, row in enumerate(rows):
        x = 0
        while x < len(row):
            if row[x] != "#":
                x += 1
                continue
            run = x
            while run < len(row) and row[run] == "#":
                run += 1
            d.append(f"M{x0 + x * pw:g} {y0 + y * ph:g}h{(run - x) * pw:g}v{ph:g}h{-(run - x) * pw:g}z")
            x = run
    return "".join(d)


def mix(a: str, b: str, t: float) -> str:
    """Blend two #rrggbb colours: t=0 is a, t=1 is b."""
    ca = [int(a[i:i + 2], 16) for i in (1, 3, 5)]
    cb = [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return "#" + "".join(f"{round(x + (y - x) * t):02x}" for x, y in zip(ca, cb))


def validate_smil(svg: str) -> int:
    """Reject any animation a browser would silently drop.

    SMIL does not error on a malformed animation -- it just ignores it, so a
    bad keyTimes list ships as a sprite that never moves. Check the rules that
    bite: keyTimes must start at 0, never decrease, stay within 1, match the
    number of values, and (for non-discrete modes) end exactly at 1.
    """
    root = ET.fromstring(svg.split("?>", 1)[1])
    count = 0
    for el in root.iter():
        tag = el.tag.split("}")[-1]
        if tag not in ("animate", "animateTransform") or "keyTimes" not in el.attrib:
            continue
        count += 1
        keys = [float(k) for k in el.get("keyTimes", "").split(";")]
        values = el.get("values", "").split(";")
        where = f"{tag} {el.get('attributeName')} ({len(values)} values)"
        if len(keys) != len(values):
            raise SystemExit(f"{where}: {len(keys)} keyTimes for {len(values)} values")
        if keys[0] != 0:
            raise SystemExit(f"{where}: first keyTime is {keys[0]}, must be 0")
        if any(b < a for a, b in zip(keys, keys[1:])):
            raise SystemExit(f"{where}: keyTimes decrease")
        if keys[-1] > 1:
            raise SystemExit(f"{where}: keyTime {keys[-1]} past 1")
        if (el.get("calcMode") or "linear") != "discrete" and keys[-1] != 1:
            raise SystemExit(f"{where}: interpolated animation must end at keyTime 1")
        if re.search(r"nan|inf", el.get("values", ""), re.I):
            raise SystemExit(f"{where}: non-finite value")
    return count