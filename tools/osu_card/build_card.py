"""Build the osu! profile bio card: public/readme/card_osu.svg (+ .png).

Same drawing machinery as tools/profile/build_card.py (the GitHub README card),
but a much shorter panel: name, uptime, OS, contacts. The palette is the site's
dark mode, on a solid plate so it stays readable on osu!'s own page colours.

osu!'s BBCode [img] only accepts raster images, so a PNG is rendered alongside
the SVG -- use the PNG in the bio, keep the SVG for anything that can scale.

    python3 tools/osu_card/build_card.py           # ascii svg + png
    python3 tools/osu_card/build_card.py --image   # seed.png embedded instead
    python3 tools/osu_card/build_card.py --svg     # svg only
"""

from __future__ import annotations

import base64
import datetime as dt
import importlib.util
import io
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]  # repo root (this file lives in tools/osu_card)


def _load_profile_module():
    """Import the README card builder by path -- same repo, different folder."""
    src = ROOT / "tools" / "profile" / "build_card.py"
    spec = importlib.util.spec_from_file_location("profile_card", src)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = mod
    spec.loader.exec_module(mod)
    return mod


bc = _load_profile_module()

# --- Content ----------------------------------------------------------------
# osu! shows "Joined March 2022" on the profile; the day is not published, so
# the 1st is used and the day count is only ever an approximation.
JOINED = dt.date(2022, 3, 1)
OS_NAME = "Windows 11"
TITLE = "megumii@osu!"

CONTACTS = [
    ("Discord", "megumii.eth"),
    ("Telegram", "@KatouMegumii"),
    ("Portofolio", "megumii.xyz"),
]

# The site's dark mode surface, used as a plate here rather than transparent:
# an osu! bio sits on the site's own background, which we do not control.
PLATE = "#1B1032"

# osu!'s "me!" box scrolls when the image is tall, so this card is deliberately
# short: the panel is only 8 rows, and a full-height portrait would leave a lot
# of empty plate. The bio art is a 100x53 grid (square-ish source, cell aspect
# 0.54), which at a 260px column lands the card at ~864x286 -- one panel tall.
ART_SRC = ROOT / "assets" / "ascii-art-osu.txt"
ART_COL_WIDTH = 260.0
ART_LINES = 53  # the whole scene: figure, overhang, night sky

# --image mode: the original illustration (seed.png, RGBA cut-out) embedded as
# a raster <image> instead of ASCII. It is fitted by HEIGHT so the card stays
# one panel tall; the art column takes whatever width that implies.
IMG_SRC = ROOT / "assets" / "seed.png"
IMG_HEIGHT = 250.0

OUT_DIR = ROOT / "public" / "readme"


def account_uptime(today: dt.date | None = None) -> str:
    """How long the osu! account has existed, in years/months/days."""
    today = today or dt.date.today()
    years = today.year - JOINED.year
    months = today.month - JOINED.month
    days = today.day - JOINED.day
    if days < 0:
        months -= 1
        days += (today.replace(day=1) - dt.timedelta(days=1)).day
    if months < 0:
        years -= 1
        months += 12

    def plural(n: int, word: str) -> str:
        return f"{n} {word}" + ("" if n == 1 else "s")

    return f"{plural(years, 'year')}, {plural(months, 'month')}, {plural(days, 'day')}"


def build_panel(x: int, y0: float) -> tuple[list[str], int]:
    """The short bio panel; first baseline at y0. Returns (lines, row count)."""
    rows: list[bc.Row | None] = [bc.rule_row(TITLE, bold=True)]
    rows.append(bc.info_row("Uptime", account_uptime(), eid="osu_uptime"))
    rows.append(bc.info_row("OS", OS_NAME))
    rows.append(None)
    rows.append(bc.rule_row("- Contacts"))
    rows += [bc.info_row(k, v) for k, v in CONTACTS]

    out = []
    for i, row in enumerate(rows):
        y = y0 + i * bc.PANEL_LINE
        if row is None:
            out.append(f'<tspan x="{x}" y="{y:g}" class="cc">.</tspan>')
        else:
            out.append(row.render(x, y, bc.PANEL_COLS))

    # Same waiting-cursor tail as the README card.
    y = y0 + (len(rows) + 1) * bc.PANEL_LINE
    out.append(
        f'<tspan x="{x}" y="{y:g}">'
        f'<tspan class="key">&gt; </tspan>'
        f'<tspan class="value">\u2588'
        f'<animate attributeName="opacity" values="1;0" dur="1.06s"'
        f' calcMode="discrete" repeatCount="indefinite"/>'
        f"</tspan></tspan>"
    )
    return out, len(rows) + 2


def build(mode: str = "ascii") -> tuple[str, int, int]:
    c = dict(bc.THEMES["purple"])
    c["bg"] = PLATE

    im: Image.Image | None = None
    art: list[str] = []
    art_font = art_line = 0.0
    art_h = art_w = 0.0

    if mode == "image":
        # The cut-out keeps its alpha, so the plate shows through around it.
        im = Image.open(IMG_SRC).convert("RGBA")
        art_h = IMG_HEIGHT
        art_w = art_h * im.width / im.height
        col_w = art_w
        art_span = art_h
        art_pad = 0.0
    else:
        art = bc.load_art(ART_SRC)[:ART_LINES]
        art_cols = max(len(line) for line in art)
        # Same metric function, but fitted to this card's narrower art column.
        art_font = ART_COL_WIDTH / (art_cols * bc.ADVANCE)
        art_line = art_font * bc.ADVANCE / bc.ART_CELL_ASPECT
        col_w = ART_COL_WIDTH
        art_span = (len(art) - 1) * art_line
        art_pad = bc.LINE_PAD * art_font

    panel_x = int(bc.MARGIN + col_w + bc.GUTTER)
    _, panel_rows = build_panel(panel_x, 0.0)  # dry run for the row count

    # Art and panel share one horizontal centre line, exactly as the README
    # card does, so the two blocks never look top- or bottom-heavy.
    panel_span = (panel_rows - 1) * bc.PANEL_LINE
    half = max(panel_span / 2 + bc.LINE_PAD * bc.PANEL_FONT, art_span / 2 + art_pad)
    axis = bc.MARGIN + half

    panel_lines, _ = build_panel(
        panel_x, axis - panel_span / 2 + bc.LINE_MID * bc.PANEL_FONT
    )

    width = int(panel_x + bc.PANEL_COLS * bc.PANEL_FONT * bc.ADVANCE + bc.MARGIN)
    height = round(2 * axis)

    if mode == "image":
        assert im is not None
        buf = io.BytesIO()
        im.save(buf, format="PNG")
        b64 = base64.b64encode(buf.getvalue()).decode("ascii")
        art_y = axis - art_h / 2
        art_block = (
            f'<image x="{bc.MARGIN}" y="{art_y:.2f}" width="{art_w:.2f}" '
            f'height="{art_h:.2f}" preserveAspectRatio="xMidYMid meet" '
            f'href="data:image/png;base64,{b64}"/>'
        )
    else:
        art_y0 = axis - art_span / 2 + bc.LINE_MID * art_font
        art_tspans = "\n".join(
            f'<tspan x="{bc.MARGIN}" y="{art_y0 + i * art_line:.2f}">{bc.esc(line)}</tspan>'
            for i, line in enumerate(art)
        )
        art_block = (
            f'<text fill="{c["art"]}" font-size="{art_font:.2f}px" class="ascii">\n'
            f"{art_tspans}\n</text>"
        )

    bg_rect = (
        ""
        if c["bg"] == "transparent"
        else f'<rect width="{width}px" height="{height}px" fill="{c["bg"]}" rx="15"/>'
    )

    svg = f"""<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns="http://www.w3.org/2000/svg" width="{width}px" height="{height}px"
     font-family="ConsolasFallback,Consolas,Menlo,monospace">
<style>
@font-face {{
  src: local('Consolas'), local('Consolas Bold');
  font-family: 'ConsolasFallback';
  font-display: swap;
  size-adjust: 109%;
}}
.key {{fill: {c['key']};}}
.value {{fill: {c['value']};}}
.title {{fill: {c['key']}; font-weight: bold;}}
.cc {{fill: {c['dots']};}}
text, tspan {{white-space: pre;}}
</style>
{bg_rect}
{art_block}
<text fill="{c['fg']}" font-size="{bc.PANEL_FONT:g}px">
{chr(10).join(panel_lines)}
</text>
</svg>
"""
    return svg, width, height


def _chrome() -> str | None:
    """A headless Chromium for the PNG pass (Playwright's download, if present)."""
    for pattern in (
        "chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell",
        "chromium-*/chrome-linux64/chrome",
    ):
        hits = sorted(Path.home().glob(f".cache/ms-playwright/{pattern}"))
        if hits:
            return str(hits[-1])
    return shutil.which("chromium") or shutil.which("google-chrome")


def render_png(svg_path: Path, png_path: Path, width: int, height: int, scale: int = 2) -> bool:
    chrome = _chrome()
    if not chrome:
        print("no chromium found -- skipping PNG (osu! needs the raster)")
        return False
    cmd = [
        chrome,
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--hide-scrollbars",
        "--default-background-color=00000000",
        f"--force-device-scale-factor={scale}",
        f"--window-size={width},{height}",
        f"--screenshot={png_path}",
        svg_path.resolve().as_uri(),
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if not png_path.exists():
        print("PNG render failed:", (res.stderr or res.stdout)[-400:])
        return False
    return True


def main() -> None:
    mode = "image" if "--image" in sys.argv else "ascii"
    svg_out = OUT_DIR / ("card_osu_img.svg" if mode == "image" else "card_osu.svg")
    png_out = svg_out.with_suffix(".png")

    svg, width, height = build(mode)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    svg_out.write_text(svg, encoding="utf-8")
    print(f"wrote {svg_out} ({svg_out.stat().st_size:,} bytes, {width}x{height})")
    print(f"uptime: {account_uptime()}  (osu! joined {JOINED:%B %Y})")
    if "--svg" not in sys.argv and render_png(svg_out, png_out, width, height):
        print(f"wrote {png_out} ({png_out.stat().st_size:,} bytes, {width * 2}x{height * 2})")


if __name__ == "__main__":
    main()