"""Fetch osu! profile stats into cache/osu.json.

osu.ppy.sh sits behind Cloudflare, so the profile page is pulled through
r.jina.ai's text mirror (same page, no challenge) and the fields are read out
of the markdown it returns. Only the handful of numbers the site shows are
kept; the raw mirror is not stored.

Usage:
    python tools/profile/fetch_osu.py            # user 29234830 (megumii)
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[2]  # repo root (this file lives in tools/profile)
CACHE = ROOT / "cache"
OSU_OUT = CACHE / "osu.json"

USER_ID = os.environ.get("OSU_USER", "29234830")
MIRROR = "https://r.jina.ai/https://osu.ppy.sh/users/"
UA = "Mozilla/5.0 (compatible; megumii-portfolio-card/1.0)"


def fetch_markdown(user_id: str) -> str:
    last = None
    for attempt in range(3):
        try:
            r = requests.get(MIRROR + user_id, headers={"User-Agent": UA}, timeout=45)
            if r.ok and "Global Ranking" in r.text:
                return r.text
            last = f"HTTP {r.status_code}, {len(r.text)} bytes, no stats"
        except requests.RequestException as exc:  # network flake: retry
            last = repr(exc)
        time.sleep(5 * (attempt + 1))
    raise SystemExit(f"osu mirror failed: {last}")


def grab(pattern: str, text: str, default: str = "--") -> str:
    m = re.search(pattern, text, re.S)
    return m.group(1).strip() if m else default


def num(value: str) -> int | None:
    digits = re.sub(r"[^\d]", "", value)
    return int(digits) if digits else None


def main() -> None:
    text = fetch_markdown(USER_ID)

    name = grab(r"^## (.+)$", text, "megumii")
    # The mirror prints the PP figure as a bare number between "pp" and the
    # play-time block, so it needs its own pattern.
    stats = {
        "user": name.strip(),
        "id": int(USER_ID),
        "rank": grab(r"Global Ranking\s*\n+\s*#([\d,]+)", text),
        "country_rank": grab(r"Country Ranking\s*\n+\s*#([\d,]+)", text),
        "pp": grab(r"\npp\s*\n+\s*([\d,]+)", text),
        "accuracy": grab(r"Hit Accuracy\s*([\d.]+%)", text),
        "play_count": grab(r"Play Count\s*([\d,]+)", text),
        "ranked_score": grab(r"Ranked Score\s*([\d,]+)", text),
        "total_score": grab(r"Total Score\s*([\d,]+)", text),
        "max_combo": grab(r"Maximum Combo\s*([\d,]+)", text),
        "medals": grab(r"Medals\s*\n+\s*([\d,]+)", text),
    }
    for key in ("rank", "pp", "accuracy", "total_score"):
        if stats[key] == "--":
            raise SystemExit(f"osu mirror returned no {key}; keeping the old cache")
    stats["updated"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    CACHE.mkdir(exist_ok=True)
    OSU_OUT.write_text(json.dumps(stats, indent=2), encoding="utf-8")
    print(json.dumps(stats, indent=2))
    print(f"wrote {OSU_OUT}", file=sys.stderr)


if __name__ == "__main__":
    main()