# JAPMAP — Japan Pole to Pole

An original bicycle traverse of Japan, **Cape Sata → Cape Soya**, with optional island packages after the land line.

This is **not** the NHK *Cycle Around Japan* catalog. That companion lives at [japanride.pages.dev](https://japanride.pages.dev/). JAPMAP is the separate grand-tour site that catalog pointed toward: one ride, two poles, honest about trains, ferries, and official cycle routes.

**Live:** [tigges.github.io/JAPMAP](https://tigges.github.io/JAPMAP/)

**Concept (Phase 0):** [docs/CONCEPT.md](docs/CONCEPT.md)
**V2 recommendation:** [docs/V2.md](docs/V2.md)

## Sibling, not a fork of the catalog

| | JAPANRIDE | JAPMAP |
| --- | --- | --- |
| Job | Map NHK episode rides and send you to watch them | Tell one original pole-to-pole journey |
| Line on the map | Catalog hops (ride / train / ferry / flight) | A continuous planned traverse |
| Ends | Hubs from Shiretoko to Yaeyama | Mainland poles: 佐多岬 → 宗谷岬 |
| Islands | Separate NHK packages | Optional second act after Kagoshima |

Shared craft (type, paper palette, Leaflet, EN/JA basemaps, segment schema) should transfer. NHK stills, episode titles, and “this is the series as one GPS line” must not.

## Status

**Phase 0 skeleton.** Live at [tigges.github.io/JAPMAP](https://tigges.github.io/JAPMAP/). A runnable Vite + React + TypeScript + Leaflet app lives in `src/`: home, map, and about routes; Cape Sata and Cape Soya markers; the six stage gateways strung south to north with a solid vermillion spine; a dashed placeholder great-circle that exists only to prove the ride is *not* that line; and EN / 日本語 basemaps. See the concept doc for the full information architecture, data model, and remaining build phases.

GitHub Pages is published from `main` by [`.github/workflows/pages.yml`](.github/workflows/pages.yml) (builds `dist`, base path `/JAPMAP/`). Repo Settings → Pages → Source must be **GitHub Actions**, not “Deploy from a branch”.

## Develop

```bash
npm ci        # install (uses package-lock.json)
npm run dev   # dev server on http://localhost:5173
npm test      # vitest
npm run build # type-check + production build to dist/
```
