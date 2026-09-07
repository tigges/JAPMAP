import type { StageId } from "./ride";

/**
 * Where the JAPANRIDE catalog (NHK episode hubs + reconstructed itineraries)
 * actually touches this cape-to-cape line. Used to pull place names, waypoint
 * notes, and official-route facts — not stills, episode titles, or their UI.
 *
 * Source: https://github.com/tigges/JAPANRIDE `src/data/journey.ts`,
 * `itineraries.ts`, `officialRoutes.ts`.
 */
export type JapanRideTouch = {
  day: number;
  stopId: string;
  itineraryId?: string;
  officialRoute?: string;
  /** Named places that sit on this overnight hop. */
  onLine: string[];
  /** Named in the catalog but off this day's road — caption honestly or skip. */
  offLine: string[];
};

export const JAPANRIDE_TOUCHES: JapanRideTouch[] = [
  {
    day: 11,
    stopId: "hakodate",
    onLine: ["Hakodate harbour", "Kanemori warehouses", "Goryokaku", "morning market"],
    offLine: ["kelp-drying villages", "Tokachi dairy"],
  },
  {
    day: 12,
    stopId: "aomori",
    itineraryId: "aomori",
    onLine: ["Aomori Bay", "Fukaura / Gono coast"],
    offLine: ["Hirosaki", "Cape Tappi", "Hotokegaura", "Shimokita"],
  },
  {
    day: 19,
    stopId: "niigata",
    itineraryId: "sado",
    onLine: ["Niigata / Bandai Bridge"],
    offLine: ["Sado Island"],
  },
  {
    day: 21,
    stopId: "toyama",
    itineraryId: "toyama",
    officialRoute: "toyama-bay",
    onLine: ["Uozu", "Toyama Bay"],
    offLine: ["Gokayama gassho", "Yatsuo"],
  },
  {
    day: 22,
    stopId: "kanazawa",
    itineraryId: "noto",
    officialRoute: "toyama-bay",
    onLine: ["Amaharashi", "Chirihama Beach"],
    offLine: ["Wajima", "Suzu salt", "Rokkosaki"],
  },
  {
    day: 23,
    stopId: "kanazawa",
    itineraryId: "noto",
    onLine: ["Kanazawa castle town", "Kenrokuen", "machiya / Higashi Chaya"],
    offLine: ["Noto peninsula loop"],
  },
  {
    day: 24,
    stopId: "fukui",
    onLine: ["Tōjinbō"],
    offLine: ["Echizen washi inland"],
  },
  {
    day: 26,
    stopId: "biwa",
    itineraryId: "biwa",
    officialRoute: "biwaichi",
    onLine: ["Ōtsu", "Lake Biwa shore"],
    offLine: ["Biwaichi loop", "Chikubu Island", "Shigaraki"],
  },
  {
    day: 28,
    stopId: "izumo",
    onLine: ["Himeji keep"],
    offLine: ["Izumo Highway inland"],
  },
  {
    day: 30,
    stopId: "shimanami",
    itineraryId: "shimanami",
    officialRoute: "shimanami",
    onLine: ["Onomichi"],
    offLine: ["Innoshima", "Setoda", "Imabari", "Shimanami bridges"],
  },
  {
    day: 32,
    stopId: "yamaguchi",
    onLine: ["Yanai white-wall streets", "Kintaikyō / Iwakuni"],
    offLine: ["Iwaishima", "Hagi"],
  },
  {
    day: 36,
    stopId: "oita",
    itineraryId: "oita",
    officialRoute: "yamanami",
    onLine: ["Usuki stone Buddhas", "Usuki castle town"],
    offLine: ["Yamanami Highway", "Yufuin"],
  },
  {
    day: 42,
    stopId: "kagoshima",
    onLine: ["Kagoshima port", "Sakurajima across the water"],
    offLine: [],
  },
];

/** Stage blurbs from those overlapping place notes — not episode titles. */
export const STAGE_NOTES: Record<StageId, string> = {
  hokkaido:
    "West-coast run from Cape Sōya to the east-meets-west port at Hakodate: brick warehouses, a star fort, and the Tsugaru ferry tomorrow. Kelp-drying villages and dairy country sit on other southern-Hokkaidō roads.",
  tohoku:
    "Off the ferry at Aomori, then the Sea of Japan to Niigata. Not the Tsugaru–Shimokita loop (Hirosaki apples, Cape Tappi, Hotokegaura) and not inland Kakunodate — those sit beside this coast.",
  hokuriku:
    "Toyama Bay's official cycling course, Amaharashi's view of the 3,000 m Tateyama wall, then eight kilometres of rideable sand at Chirihama into Kanazawa's castle-town gate. The Noto peninsula loop (Wajima market, Suzu salt) hangs north of this line.",
  cutacross:
    "Tōjinbō's columnar cliffs, then inland to Ōtsu on Lake Biwa. Biwaichi is the lake loop; this stage is the cut-across, not a circumnavigation.",
  sanyo:
    "Himeji keep, the San’yō coast to Onomichi's temple slope, then Yanai's white-wall streets. The Shimanami bridges leave from Onomichi toward Imabari — islands off the land line.",
  kyushu:
    "East coast of Kyūshū to the pole. Usuki's stone Buddhas sit on this hop; Beppu is just north; the Yamanami Highway is inland and off this day's road.",
  satsuma:
    "After the southern pole, the run-in to Kagoshima looks across the water at Sakurajima.",
};
