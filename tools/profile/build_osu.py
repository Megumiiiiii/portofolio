"""Render the osu!-style board that sits under the contact section.

A replay, frozen into SMIL: one hit circle per contributing day (last year's
calendar from cache/calendar.json), an approach circle that shrinks onto each
one, follow points marking the path between them, and a cursor with a fading
trail that plays the map. The HUD carries the real profile figures from
cache/osu.json (global rank, pp, accuracy, total score) and a combo counter
that climbs with every hit.

Everything runs on one master clock: each element animates once per loop with
keyTimes expressed as fractions of the loop, and `dur` is the loop length, so
the whole board resets in lock-step with no scripting. Circles are consumed as
they are hit, the way a replay looks, and the board refills on the next loop.

Usage:
    python tools/profile/build_osu.py
"""

from __future__ import annotations

import json
import math
from pathlib import Path

from build_card import MARGIN, SITE_OUT, THEMES
from svgkit import bitmap, sprite_path, validate_smil

ROOT = Path(__file__).resolve().parents[2]  # repo root (this file lives in tools/profile)
CALENDAR_SRC = ROOT / "cache" / "calendar.json"
OSU_SRC = ROOT / "cache" / "osu.json"

CANVAS_W = 1018
HEIGHT = 300

# --- Timing (s) -------------------------------------------------------------
INTRO = 0.9                    # board on screen, cursor parked, before the first click
STEP = 0.62                    # one hit circle, from approach to click
APPROACH = 0.46                # how long the approach ring takes to close in
OUTRO = 1.7                    # empty board, final combo on screen, before the reset

# --- Geometry (px) ----------------------------------------------------------
R = 20                         # hit circle radius
APPROACH_SCALE = 2.6           # approach ring starts this many radii out
TRAIL = 4                      # cursor trail copies
PLAY_TOP = 92                  # first pixel row of the playfield
PLAY_BOTTOM = HEIGHT - 34

SHOWN = 20                     # hit circles per loop: enough to read as a map


THEME = "transparent"
C = THEMES[THEME]

INK = C["key"]                 # site pink, used for text and strokes
INK_SOFT = C["dots"]
CURSOR = C["fg"]
BURST = "#e6398b"              # osu! pink, for the hit explosion only


def load_calendar() -> dict:
    if not CALENDAR_SRC.exists():
        return {"total": 0, "weeks": [[None] * 7 for _ in range(53)]}
    return json.loads(CALENDAR_SRC.read_text(encoding="utf-8"))


def load_osu() -> dict:
    blank = {"user": "megumii", "rank": "--", "pp": "--", "accuracy": "--", "total_score": "--"}
    if not OSU_SRC.exists():
        return blank
    raw = json.loads(OSU_SRC.read_text(encoding="utf-8"))
    return {k: str(raw.get(k, blank[k])) for k in blank}


def hits(cal: dict) -> list[dict]:
    """The contributing days, oldest first -- one hit circle each."""
    days = [d for week in cal["weeks"] for d in week if d and d.get("count")]
    days.sort(key=lambda d: d["date"])
    if len(days) > SHOWN:
        # Spread the sample over the whole year instead of showing a cluster
        # from one busy week.
        step = len(days) / SHOWN
        days = [days[min(int(i * step), len(days) - 1)] for i in range(SHOWN)]
    return days


def positions(n: int) -> list[tuple[float, float]]:
    """A playable-looking route: a wide wave, read left to right."""
    if n == 1:
        return [(CANVAS_W / 2, HEIGHT - 90)]
    left, right = MARGIN + R + 6, CANVAS_W - MARGIN - R - 6
    mid = (PLAY_TOP + PLAY_BOTTOM) / 2
    amp = (PLAY_BOTTOM - PLAY_TOP) / 2 - R - 4
    pts = []
    for i in range(n):
        x = left + (right - left) * i / (n - 1)
        y = mid - amp * math.sin(i * 0.92 + 0.5)
        pts.append((round(x, 1), round(y, 1)))
    return pts


class Clock:
    """Master timeline: everything is keyed as a fraction of the loop."""

    def __init__(self, n: int) -> None:
        self.n = n
        self.total = round(INTRO + n * STEP + OUTRO, 3)

    def k(self, t: float) -> str:
        return f"{min(max(t / self.total, 0.0), 1.0):.5f}"

    def hit(self, i: int) -> float:
        return INTRO + i * STEP + APPROACH

    def done(self) -> float:
        return INTRO + self.n * STEP


def hold(clock: Clock, spans: list[tuple[float, bool]]) -> str:
    """Opacity keyTimes: (time, visible) pairs turned into a step function."""
    kt, vals = [], []
    for t, vis in spans:
        kt.append(clock.k(t))
        vals.append("1" if vis else "0")
    return (f'<animate attributeName="opacity" values="{";".join(vals)}" '
            f'keyTimes="{";".join(kt)}" dur="{clock.total:.3f}s" '
            f'calcMode="discrete" repeatCount="indefinite"/>')


def circle_group(clock: Clock, i: int, pt: tuple[float, float]) -> str:
    x, y = pt
    t_hit = clock.hit(i)
    t_app = t_hit - APPROACH

    approach = (
        f'<circle cx="{x:g}" cy="{y:g}" r="{R * APPROACH_SCALE:.1f}" fill="none" '
        f'stroke="{INK}" stroke-width="2" opacity="0">'
        f'<animate attributeName="r" values="{R * APPROACH_SCALE:.1f};{R:.1f};{R:.1f}" '
        f'keyTimes="0;{clock.k(t_hit)};1" dur="{clock.total:.3f}s" '
        f'calcMode="linear" repeatCount="indefinite"/>'
        f'{hold(clock, [(0.0, False), (t_app, True), (t_hit + 0.01, False), (clock.total, False)])}'
        f'</circle>'
    )

    disc = (
        f'<g opacity="1">'
        f'<circle cx="{x:g}" cy="{y:g}" r="{R}" fill="{C["bg"] if C["bg"] != "transparent" else "#fff7fb"}" '
        f'stroke="{INK}" stroke-width="3"/>'
        f'<text x="{x:g}" y="{y + 5.5:g}" text-anchor="middle" font-size="15" '
        f'font-weight="bold" fill="{INK}">{i + 1}</text>'
        f'{hold(clock, [(0.0, True), (t_hit, True), (t_hit + 0.06, False), (clock.total, False)])}'
        f'</g>'
    )

    burst = (
        f'<circle cx="{x:g}" cy="{y:g}" r="{R}" fill="none" stroke="{BURST}" '
        f'stroke-width="3" opacity="0">'
        f'<animate attributeName="r" values="{R};{R * 2.1:.1f}" keyTimes="0;1" '
        f'dur="0.42s" begin="{t_hit:.3f}s" repeatCount="1" fill="remove"/>'
        f'<animate attributeName="opacity" values="0.9;0" keyTimes="0;1" '
        f'dur="0.42s" begin="{t_hit:.3f}s" repeatCount="1" fill="remove"/>'
        f'</circle>'
    )
    return approach + disc + burst


def follow_points(pts: list[tuple[float, float]]) -> str:
    out = []
    for (x1, y1), (x2, y2) in zip(pts, pts[1:]):
        for f in (0.34, 0.66):
            out.append(
                f'<circle cx="{x1 + (x2 - x1) * f:.1f}" cy="{y1 + (y2 - y1) * f:.1f}" '
                f'r="3" fill="{INK_SOFT}" opacity="0.75"/>'
            )
    return "".join(out)


CURSOR_SPRITE = """
........#
.......##
......###
.....####
....#####
...###.##
..##..#.#
.#.#.....
#..#.....
"""


def cursor(clock: Clock, pts: list[tuple[float, float]]) -> str:
    keys = [(0.0, pts[0])] + [(clock.hit(i), p) for i, p in enumerate(pts)]
    last = keys[-1][1]
    values = ";".join(f"{x:g},{y:g}" for _, (x, y) in keys) + f";{last[0]:g},{last[1]:g}"
    times = ";".join(clock.k(t) for t, _ in keys) + ";1"

    def move(lag: float) -> str:
        return (f'<animateTransform attributeName="transform" type="translate" '
                f'values="{values}" keyTimes="{times}" dur="{clock.total:.3f}s" '
                f'begin="{lag:.3f}s" repeatCount="indefinite"/>')

    trail = "".join(
        f'<g opacity="{0.34 / (j + 1):.2f}"><path d="{sprite_path(bitmap(CURSOR_SPRITE), 1.6, 1.6)}" '
        f'fill="{INK_SOFT}"/>{move(0.05 * (j + 1))}</g>'
        for j in range(TRAIL)
    )
    head = (f'<g><path d="{sprite_path(bitmap(CURSOR_SPRITE), 1.8, 1.8)}" fill="{CURSOR}" '
            f'stroke="#fff7fb" stroke-width="1.2"/>{move(0.0)}</g>')
    return trail + head


def combo_counter(clock: Clock) -> str:
    """One `xN` label per hit, each visible only after that hit lands."""
    out = []
    for i in range(clock.n):
        t = clock.hit(i)
        out.append(
            f'<text x="{CANVAS_W - MARGIN}" y="{PLAY_TOP - 14}" text-anchor="end" '
            f'font-size="26" font-weight="bold" fill="{INK}" opacity="0">'
            f'x{i + 1}'
            f'{hold(clock, [(0.0, False), (t, True), (clock.done(), i + 1 == clock.n), (clock.total, False)])}'
            f'</text>'
        )
    return "".join(out)


def hud(cal: dict, osu: dict) -> str:
    head = (
        f'<text x="{MARGIN}" y="34" font-size="26" font-weight="bold" fill="{INK}">osu!</text>'
        f'<text x="{MARGIN + 62}" y="34" font-size="18" fill="{C["fg"]}">{osu["user"]}</text>'
        f'<text x="{MARGIN}" y="58" font-size="14" fill="{INK_SOFT}">'
        f'#{osu["rank"]} global  ·  {osu["pp"]}pp  ·  {osu["accuracy"]} acc  ·  '
        f'{cal["total"]} contributions</text>'
    )
    right = (
        f'<text x="{CANVAS_W - MARGIN}" y="34" text-anchor="end" font-size="14" '
        f'fill="{INK_SOFT}">SCORE</text>'
        f'<text x="{CANVAS_W - MARGIN}" y="60" text-anchor="end" font-size="22" '
        f'font-weight="bold" fill="{C["fg"]}">{osu["total_score"]}</text>'
    )
    return head + right


def build() -> str:
    cal = load_calendar()
    osu = load_osu()
    days = hits(cal)
    pts = positions(len(days))
    clock = Clock(len(pts))

    circles = "".join(circle_group(clock, i, p) for i, p in enumerate(pts))

    return f"""<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns="http://www.w3.org/2000/svg" width="{CANVAS_W}px" height="{HEIGHT}px"
     font-family="ConsolasFallback,Consolas,Menlo,monospace" role="img"
     aria-label="osu! replay of my GitHub contributions">
<style>
@font-face {{
  src: local('Consolas'), local('Consolas Bold');
  font-family: 'ConsolasFallback';
  font-display: swap;
  size-adjust: 109%;
}}
text, tspan {{white-space: pre;}}
</style>
<defs>
  <clipPath id="play"><rect x="0" y="{PLAY_TOP - 24}" width="{CANVAS_W}" height="{HEIGHT - PLAY_TOP + 20}"/></clipPath>
</defs>
{hud(cal, osu)}
<g clip-path="url(#play)">
{follow_points(pts)}
{circles}
{cursor(clock, pts)}
</g>
{combo_counter(clock)}
</svg>
"""


def main() -> None:
    cal = load_calendar()
    osu = load_osu()
    days = hits(cal)
    print(f"months    : {cal['total']} contributions, {len(days)} hit circles shown")
    print(f"osu       : #{osu['rank']} · {osu['pp']}pp · {osu['accuracy']} · score {osu['total_score']}")
    SITE_OUT.mkdir(parents=True, exist_ok=True)
    svg = build()
    checked = validate_smil(svg)
    out = SITE_OUT / "osu.svg"
    out.write_text(svg, encoding="utf-8")
    print(f"wrote {out} ({out.stat().st_size:,} bytes, {checked} animations validated)")


if __name__ == "__main__":
    main()