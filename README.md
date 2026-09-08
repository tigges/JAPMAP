# JAPMAP — Biking from Cape Sōya to Cape Sata

An original bicycle traverse of Japan, **Cape Sōya → Cape Sata**, forty-two riding days on the west coast and San’yō, with a run-in to Kagoshima after the southern cape.

This is **not** the NHK *Cycle Around Japan* catalog. That companion lives at [japanride.pages.dev](https://japanride.pages.dev/).

**Live:** [tigges.github.io/JAPMAP](https://tigges.github.io/JAPMAP/)

**V2 brief:** [docs/V2.md](docs/V2.md) · **Phase 0 concept:** [docs/CONCEPT.md](docs/CONCEPT.md)

## Status

**V2.** Framed as **Biking from Cape Sōya to Cape Sata** (`宗谷岬から佐多岬へ`): sticky stage bar, 3,461 km / 42 days, day-effort chart, seven stage photographs, every overnight, and a map of town-to-town hops. Layout from the [Pole to Pole artifact](https://claude.ai/code/artifact/8faa6591-a0cd-4b0f-8dd2-9a5f4c251e3c). JapanRide lives on About. Photographs are Wikimedia Commons, credited on the page.

GitHub Pages is published from `main` by [`.github/workflows/pages.yml`](.github/workflows/pages.yml) (builds `dist`, base path `/JAPMAP/`).

## Develop

```bash
npm ci        # install (uses package-lock.json)
npm run dev   # dev server on http://localhost:5173
npm test      # vitest
npm run build # type-check + production build to dist/
```
