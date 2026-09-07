# Japan Pole to Pole — analysis, concept, and plan

This document is the product brief for **JAPMAP**: a site that tells one original bicycle journey across Japan, pole to pole. It is based on a full read of [japanride.pages.dev](https://japanride.pages.dev/) (source: [tigges/JAPANRIDE](https://github.com/tigges/JAPANRIDE)) and on the sibling decision already in flight there: a continuous grand tour is a **separate project**.

The Claude artifact [Pole to Pole Wireframes](https://claude.ai/code/artifact/2dcf6686-0e9e-42e8-8e77-51a228e59f40) is a signed-in Claude Code frame (`/api/frame/{uuid}`). From this environment the shell loads and the iframe host is known (`2dcf6686-0e9e-42e8-8e77-51a228e59f40.frame.claudeusercontent.com`), but the artifact body itself is not public HTML. The concept below therefore treats that artifact as the **interaction spec to implement against** (multi-screen wireframes for the original traverse) and treats JapanRide as the **craft and data-layer spec to reuse**. Open the artifact while building; do not invent a third IA.

---

## 1. What JapanRide actually is

### Positioning

Live copy (as deployed on Pages today):

> Cycle Around Japan is a library of tours, not one GPS line. This unofficial companion maps a land spine from Shiretoko to Kagoshima, then the island trips you reach by ferry or flight — so a future original JapanRide can borrow the geography without pretending the series was a single week in the saddle.

Open PR [#7](https://github.com/tigges/JAPANRIDE/pull/7) on that repo already splits the products:

> Full Japan still shows every episode hub and how you can get from one ride to the next. It is not a grand tour of Japan; that is a **separate project**.

**JAPMAP is that separate project.**

### What the live site does well

- **One-page editorial map.** Sticky nav (Journey / Chapters / Watch / Ride notes), full-bleed NHK still as hero, vermillion CTA into the map.
- **Honest catalog graph.** 58 hubs, ~100 episodes, 2014–2026. Lines between hubs are *jumps*, not GPS: vermillion ride, gold train, purple ferry, grey flight. Island trips (Sado, Niijima, Goto, Yakushima, Amami, Okinawa, Miyako, Yaeyama) hang off gateways; they are not stages of the land line.
- **Two map depths.** Overview = hubs + jumps. Thirteen hubs open a **color-coded episode map** (waypoints, days, overnight dots, official-route teal underlay). Day pills filter the drawn segments.
- **Bilingual tiles without an API key.** English default = Esri World Topo. 日本語 = GSI pale. Preference stored in `localStorage`.
- **Editorial voice.** Serif wordmark, paper ground, moss/vermillion/gold. Copy talks about people and work (Noto salt, Goto church, Sakai knives), then admits the train.
- **Legal clarity.** Unofficial, not affiliated, titles and stills belong to NHK WORLD-JAPAN.

### Information architecture (JapanRide)

```
#top     Hero + stats
#map     Region pills → Leaflet canvas + stop sidebar
#chapters  Nine region cards → hubs
#watch   Current NHK VOD + Taiwan specials
#ride    Four “how the series actually rides” notes
footer   Disclaimer + official show link
```

No extra routes. Hash targets only. The map sidebar *is* the place page.

### Data model worth stealing

From `src/data/schema.ts` — keep the layers **unmerged**:

| Layer | Meaning |
| --- | --- |
| `nhk` | Reconstructed episode days (JapanRide’s job) |
| `network` | Official cycle routes (National + prefectural sketches) |
| `japanride` | Future original traverse that *rides the network* and may splice NHK days as detours |

Segment kinds already encode honesty: `coast | lake | river | pass | island | rural | urban | ferry | train | flight | overnight`. Official match is `on | alongside | off`.

Thirteen itineraries exist today: Izu, Boso, Ibaraki/Tsukuba, Biwa, Shimanami, Goto, Kushiro/Tokachi, Aomori, Toyama, Noto, Sado, Okayama, Oita.

Official network sketches: Shimanami Kaido, Biwaichi, Rinrin Road, Pacific Coast Cycle Road, Toyama Bay, Tokapuchi 400, Yamanami Highway.

### What JapanRide is *not*

- Not Cape Soya and not Cape Sata. The catalog starts at **Shiretoko** and the land line ends at **Kagoshima city**.
- Not a rideable line. Overview hops are straight polylines between hub coordinates. Episode maps are “likely roads from named episode places — not the camera GPS.”
- Not a journal. There is no rider, no dates, no GPX, no overnight bookings.
- Not original photography (hero and VOD cards are NHK stills).

Those gaps are exactly what Pole to Pole has to fill.

### Stack to reuse

Vite 7 + React 19 + TypeScript + Leaflet 1.9 + Vitest. Cloudflare Pages at `japanride.pages.dev`. GitHub Actions Pages is a known footgun (must deploy `dist`, not source). Key-free raster tiles only.

---

## 2. What “Pole to Pole” means here

In Japanese touring, **pole to pole** is not a metaphor. It is the mainland extremes:

| Pole | Place | Role |
| --- | --- | --- |
| South | **Cape Sata** 佐多岬 (Kagoshima) | Start of the land line |
| North | **Cape Soya** 宗谷岬 (Wakkanai) | End of the land line |

That is the same pair used by the motorcycle rally *POLE to POLE* (Sata → Soya) and by long bicycle traverses such as John Allard’s Cape Sata → Cape Soya scenic line. It is **not** the NHK catalog order (Shiretoko → Kagoshima → island packages).

**Direction:** south → north, in spring. Start in Kyushu while Hokkaido is still closed or brutal; finish at Soya in long northern light. Offer a reverse view of the same geometry, but the canonical story is Sata → Soya.

**Islands stay a second act.** Yakushima, Amami, Okinawa, Miyako, Yaeyama (and Hateruma as Japan’s inhabited south) are optional packages after Kagoshima — the same honesty JapanRide already teaches. Do not draw them as stages of the land line.

**Four poles later, not now.** Nosappu (east) and Irizaki / Yonaguni (west) are a different product (日本四極). Ship two poles first.

### The one-line concept

> One rider. Two capes. A land line that prefers official cycle routes, takes the train when the mountains close, and treats NHK episode days as optional detours — never as the GPS.

Working names:

- **Product:** JAPMAP
- **Journey:** Pole to Pole / 極から極へ
- **Line:** Cape Sata → Cape Soya
- **Sibling:** JAPANRIDE (NHK companion)

Do not call this site JAPANRIDE. The catalog already owns that wordmark.

---

## 3. Concept: what the site is for

Three jobs, in this order:

1. **Show the whole line** — a single north–south spine a stranger can understand in ten seconds (Sata at the bottom, Soya at the top, stages in between).
2. **Open one stage** — days, overnights, surface (coast / pass / lake), whether you are on a National Cycle Route, and when the rider takes a train or ferry.
3. **Stay with the work** — field notes, people, food, closures. The road is the excuse, same as the series, but in the first person of *this* ride.

It is a **journey narrative with a map**, not a route planner and not a VOD index.

Out of scope for v1: live GPS tracking, booking, social feed, Strava import (schema already says Strava is a popularity signal later, not a stored GPS layer until TOS is explicit).

---

## 4. Information architecture

Implement the wireframe screens as hash or path routes. Prefer real URLs so a stage can be shared.

```
/                       Home — two poles, one lede, enter the map
/map                    Full land line + stage filter
/stages                 Index of stages (Kyushu → Hokkaido)
/stages/:id             Stage story + day list + local map
/days/:id               One day: line, elevation sketch, overnight, notes
/detours                NHK episode days you can splice (links out to JapanRide)
/practical              Season, ferries (Tsugaru, Seto), trains, closures
/journal                Field notes (empty state until there are notes)
/about                  What this is, what it is not, sibling link
```

**Home** (from typical Pole to Pole wireframe structure)

- Eyebrow: `Cape Sata → Cape Soya`
- Title: one island chain, one original ride
- Stats that are *ours*, not NHK’s: km (planned), riding days, stages, ferry crossings, train hops
- Primary: Open the map. Secondary: How we ride (practical)

**Map** (reuse JapanRide’s map + sidebar, change the graph)

- Default: full land line, solid (not dashed catalog hops)
- Stage pills: Kyushu · Chugoku / Shikoku · Kansai · Alps / Tokaido · Tohoku · Hokkaido (six stages, not nine NHK chapters)
- Layer toggles: `Our line` · `Official network` · `NHK detours` (off by default)
- Click a stage → sidebar with day list; click a day → zoom to that geometry
- EN / 日本語 tiles, same as JapanRide
- Legend: ride / train / ferry / overnight / on official route

**Stage page**

- Region color + kana
- Why this stage exists (volcanoes, Inland Sea bridges, sacred mountains, recovery coast, dairy north)
- Day cards (distance, climbing band, overnight town)
- “On the network” chip when the day rides Shimanami, Biwaichi, Pacific Coast, etc.

**Day page**

- From → to, km, kind (coast / pass / …)
- Official match (`on` / `alongside` / `off`)
- Train or ferry callout when the day is not pedaled
- Optional detour: “NHK rode this basin in *Yamagata — Seeking the Flavors of Autumn*” → japanride hub

**Detours**

- Not a second catalog. A short list of JapanRide itineraries that *touch* the pole-to-pole line (Shimanami, Biwa, Noto, Aomori, Oita, …). One sentence + link. No NHK stills on this site.

**Practical**

- When to start (April from Sata is the default story)
- Hokkaido ferry (Hakodate) as a required hop, not a failure
- Alpine / Kii train hops, same honesty as JapanRide’s “four days, then a train”
- Seasonal gates (to be sketched, not a live JARTIC feed in v1)

**Journal**

- Empty state: “Notes appear when the ride exists.”
- Shape: date, place, short prose, one photo slot. No fake entries.

---

## 5. The land line (v1 geography)

Not a survey. A **spine of named capes, ports, and overnight towns** we will thicken into paths the way JapanRide thickened Izu and Shimanami.

### Stage 01 — Kyushu (Sata → Kanmon)

Cape Sata → Ibusuki / Sakurajima views → Miyazaki mythic gorge → Aso / Takachiho → Beppu–Yufuin (Yamanami) → Fukuoka → Kanmon toward Honshu.

NHK detours: Kagoshima, Miyazaki, Oita, Fukuoka, Nagasaki Kaido (optional west loop, not required).

### Stage 02 — Inland Sea & Shikoku (or San’in)

Canonical scenic choice: **Shimanami Kaido** (Onomichi–Imabari) then Shikoku’s Pacific / karst, ferry or bridge back. Alternate: San’in dunes and Izumo, skipping Shikoku.

Do not draw both as one GPS. Ship Shimanami as the default “on the network” jewel, San’in as a variant later.

NHK detours: Shimanami, Okayama, Kagawa, Ehime, Kochi, Awaji.

### Stage 03 — Kansai & Kii

Lake Biwa (Biwaichi) → Kyoto countryside → Nara basins → Kii / Ise. Train through the steepest Kii interior if the line would be theater, not a ride.

NHK detours: Biwa, Kyoto, Osaka, Nara, Kii, Ise.

### Stage 04 — Alps, Fuji, Nakasendo

Kiso / Narai → Northern Alps → Yatsugatake / wasabi / Fuji highlands → Izu only as a spur. Prefer Nakasendo and official pieces over Tokyo back alleys (those stay on JapanRide).

NHK detours: Narai, Northern Alps, Yatsugatake, Shizuoka, Fuji. Izu is a beginners’ spur, not the spine.

### Stage 05 — Tohoku

Sea of Japan **or** Sanriku — pick one for v1. Recommendation: **west + Dewa**, then a deliberate Sanriku detour, because recovery coast is a story worth a spur, not a default into headwinds. End at Aomori / Hakodate ferry.

NHK detours: Aizu, Yamagata, Akita, Aomori, Sanriku, Miyagi.

### Stage 06 — Hokkaido (Hakodate → Soya)

Hakodate → interior (Furano) **or** west coast → Wakkanai → **Cape Soya**. Shiretoko and Kushiro are **east spurs**, not the pole. Tokapuchi 400 is a detour if we go east.

The catalog started at Shiretoko because NHK did. The original ride ends at Soya because that is the pole.

Ferry: Hakodate–Aomori is part of the land line (access), drawn dashed purple, never as a filmed road.

---

## 6. Visual language

Stay in the same *family* as JapanRide so the two sites feel like siblings. Change the signals that say “this is the show.”

**Keep**

- Paper `#f3eee4`, ink `#16130f`, vermillion `#c4452d`, gold `#c9a05a`, moss `#2f5d50`
- Cormorant Garamond + Zen Kaku Gothic New
- Round map shell, pill filters, sidebar kicker `kana · stage`
- Segment colors from `SEGMENT_STYLE`

**Change**

- Wordmark: **JAPMAP** (or **POLE TO POLE**), not JAPANRIDE
- Hero: original still or a quiet GSI/Esri map crop of Sata or Soya — **no NHK frame**
- Overview line: **solid vermillion** for the ride, dashed only for train/ferry
- Stats: our km and days, not “2014–2026 on air”
- No VOD grid. Link JapanRide once, in Detours and About

**Map**

- Same Leaflet + Esri / GSI pair
- Official network as a wide teal ghost (already `#2f6f6a` at 0.28)
- NHK detours as a third layer: thin, optional, never the default story

---

## 7. Data shape

Keep JapanRide’s types. Add a traverse file; do not merge polylines.

```ts
type Traverse = {
  id: "sata-soya";
  title: "Cape Sata → Cape Soya";
  titleJa: "佐多岬 → 宗谷岬";
  direction: "south-to-north";
  stages: Stage[];
};

type Stage = {
  id: string;           // "kyushu" | ...
  order: number;
  name: string;
  kana: string;
  tagline: string;
  color: string;
  days: RideDay[];      // same RideDay as schema.ts
};

type Detour = {
  dayId: string;        // our day
  japanrideStopId: string; // hub on japanride.pages.dev
  note: string;
};
```

Reuse `Waypoint`, `Segment`, `RideDay`, `OfficialRouteId`. New official routes to sketch when a day actually rides them (e.g. more of the Pacific Coast Cycle Road, Toyama Bay if the line goes Hokuriku).

**Rule:** if a segment is a train or ferry, `kind` says so. Never stroke it as `coast`.

---

## 8. Build plan

Same stack as JapanRide. New repo (this one). New Pages project later (`japmap.pages.dev` or similar). Do not deploy unbuilt `index.html`.

### Phase 0 — Skeleton

- Vite + React + TS + Leaflet + the JapanRide CSS tokens
- Routes: home, map, about
- Two markers only: Cape Sata, Cape Soya, and a placeholder great-circle so the joke of “not a GPS line” is visible
- Tests: poles exist, Sata is south of Soya, EN/JA tiles switch

### Phase 1 — Six stages as hubs

- Stage centroids + sidebar list (JapanRide stop-panel pattern)
- Solid spine jumps between stage gateways (Sata, Kanmon, Onomichi, Otsu, Narai, Aomori, Soya)
- Copy: taglines, not episode titles
- Region pills = six stages

### Phase 2 — Days inside two pilot stages

Pick **Kyushu** (the start, Sata) and **Shimanami** (the network jewel). Day maps, overnights, official underlay, train/ferry dashes. Same interaction as JapanRide’s Izu episode map.

### Phase 3 — Detours and sibling link

- `Detour[]` pointing at JapanRide hubs that already have itineraries
- About page: this is not NHK; watch episodes over there
- No scraped stills

### Phase 4 — Remaining stages as hubs, then days

Tohoku and Hokkaido next (the pole). Kansai and Alps after. Thicken paths only when a day is named.

### Phase 5 — Practical + journal chrome

- Practical page with ferry/train/season
- Journal empty state
- Optional GPX download per day (generated from our paths, labelled as planned, not recorded)

### Phase 6 — Polish

- Mobile: stack map above sidebar (JapanRide already has a map-layout grid that will need a single-column breakpoint — copy and fix)
- Share image: Sata–Soya on paper
- Cloudflare Pages + GitHub Actions `dist` deploy

---

## 9. What to lift vs leave

| Lift from JapanRide | Leave on JapanRide |
| --- | --- |
| Leaflet map + sidebar + day pills | NHK hero, VOD grid, Taiwan row |
| `schema.ts` layers and segment styles | Episode titles as the narrative |
| EN/JA basemaps | Catalog jump graph as the default line |
| Paper / vermillion / serif | Wordmark JAPANRIDE |
| Official route sketches | “Mapped from Cycle Around Japan” |
| Honesty about trains and island packages | 58 NHK hubs as the spine |

**Do not** start the original line at Shiretoko. **Do not** end it at Kagoshima city. **Do not** put Yaeyama on the land line.

---

## 10. Success look

A first-time visitor can answer, without reading the README:

1. This is a bike ride from Cape Sata to Cape Soya.
2. It is not the NHK series, but it knows that series.
3. Some days are on famous cycle routes; some days the rider takes a train.
4. Islands are extra.
5. They can open one stage and see the days.

When that is true, thicken the line. Not before.

---

## 11. Artifact follow-up

When building screens, keep [the Pole to Pole wireframes](https://claude.ai/code/artifact/2dcf6686-0e9e-42e8-8e77-51a228e59f40) open and match:

- Screen names and nav order
- Any labelled stats, stage names, and map chrome
- Empty vs populated journal
- How layers are named in the UI

If a wireframe disagrees with this brief, **the wireframe wins on layout; this brief wins on geography** (Sata → Soya, islands off the land line, no NHK stills). Note the disagreement in the PR rather than silently mixing the two.
