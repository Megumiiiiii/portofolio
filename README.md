This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)....................

## Getting Started.


First, run the development server:

```bash
npm run dev
# or
yarn dev
```

#

## About section art

`public/readme/card.svg` and `public/readme/pacman.svg` are generated, not hand
drawn. They come from the same scripts that render the profile README at
`github.com/Megumiiiiii/Megumiiiiii`, vendored under `tools/profile/` with an
extra `transparent` theme (no background plate, so the art sits directly on the
page colour).

```bash
# refresh stats first (needs a GitHub token with read:user)
GITHUB_TOKEN=ghp_... python3 tools/profile/fetch_stats.py
# then rebuild both svgs into public/readme/
npm run card
```

`cache/stats.json` and `cache/calendar.json` are inputs to the build; the card
falls back to `--` placeholders when they are missing.

<div id="header" align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzNmZTIxZmE3ZmY3MzRiMDcwNDJhYTQ5ZmNlY2YxMWE1OWIyYmVkNSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/mVBlqOD4ra9jQiI3cC/giphy.gif" height="125" width="420"/>
</div>

...

