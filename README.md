This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)....................

## Getting Started.


First, run the development server:

```bash
npm run dev
# or
yarn dev
```

#

## About / contact art

`public/readme/card.svg` and `public/readme/osu.svg` are generated, not hand
drawn, from the same generator that renders the profile README at
`github.com/Megumiiiiii/Megumiiiiii` (vendored under `tools/profile/`, with an
extra `transparent` theme so no white plate is drawn behind the art):

- **card.svg** — neofetch card: system rows, contact, GitHub stats, osu! stats.
  Rendered in the about section.
- **osu.svg** — the osu! board: one hit circle per contributing day, approach
  circle, cursor + trail, follow points, and a HUD with the live-ish profile
  figures (rank, pp, accuracy, total score) and a combo counter. Rendered at the
  bottom of the contact section. `tools/profile/build_osu.py` builds it;
  `svgkit.py` holds the shared sprite/SMIL helpers.

```bash
# refresh the numbers first (GitHub needs a token with read:user; osu is
# scraped through r.jina.ai because osu.ppy.sh sits behind Cloudflare)
npm run card:fetch        # fetch_stats.py + fetch_osu.py
npm run card              # build_card.py + build_osu.py
```

Inputs live in `cache/` (`stats.json`, `calendar.json`, `osu.json`); every
builder degrades to `--` placeholders instead of failing when one is missing.
`.github/workflows/card.yml` refreshes them daily and commits the regenerated
SVGs, which is what triggers the Vercel deploy.

<div id="header" align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzNmZTIxZmE3ZmY3MzRiMDcwNDJhYTQ5ZmNlY2YxMWE1OWIyYmVkNSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/mVBlqOD4ra9jQiI3cC/giphy.gif" height="125" width="420"/>
</div>

...

