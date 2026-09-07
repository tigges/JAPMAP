import { greatCircle, haversineKm } from "./geo";
import type { LatLng } from "./schema";

/**
 * The land line, v1 geography (see docs/CONCEPT.md §2, §5, §8).
 *
 * Canonical story: Cape Sata (south) → Cape Soya (north), spring, south to
 * north. Islands are a second act, never stages of the land line. The four
 * poles product (日本四極) is explicitly out of scope.
 */

export type PoleId = "sata" | "soya";

export type Pole = {
  id: PoleId;
  name: string;
  nameJa: string;
  role: "start" | "end";
  prefecture: string;
  lat: number;
  lng: number;
  blurb: string;
};

/** The two mainland extremes. This is not a metaphor — they are real capes. */
export const poles: Record<PoleId, Pole> = {
  sata: {
    id: "sata",
    name: "Cape Sata",
    nameJa: "佐多岬",
    role: "start",
    prefecture: "Kagoshima",
    lat: 30.9931,
    lng: 130.6598,
    blurb:
      "The southern pole and the start of the land line. Begin in Kyushu in spring while Hokkaido is still closed or brutal.",
  },
  soya: {
    id: "soya",
    name: "Cape Soya",
    nameJa: "宗谷岬",
    role: "end",
    prefecture: "Hokkaido",
    lat: 45.5228,
    lng: 141.9367,
    blurb:
      "The northern pole and the end of the land line. Finish at Soya in the long northern light — not at Shiretoko, where the NHK catalog began.",
  },
};

export type StageId =
  | "kyushu"
  | "seto"
  | "kansai"
  | "alps"
  | "tohoku"
  | "hokkaido";

export type Stage = {
  id: StageId;
  order: number;
  name: string;
  kana: string;
  tagline: string;
  color: string;
};

/** Six stages, not the nine NHK chapters (see CONCEPT §4). */
export const stages: Stage[] = [
  {
    id: "kyushu",
    order: 1,
    name: "Kyushu",
    kana: "九州",
    tagline: "Sata to Kanmon — volcanoes, mythic gorges, the Yamanami climb.",
    color: "#c4452d",
  },
  {
    id: "seto",
    name: "Chugoku / Shikoku",
    order: 2,
    kana: "中国・四国",
    tagline: "The Inland Sea jewel: Shimanami Kaido bridges island to island.",
    color: "#1d6f8a",
  },
  {
    id: "kansai",
    order: 3,
    name: "Kansai & Kii",
    kana: "関西・紀伊",
    tagline: "Lake Biwa's Biwaichi, Kyoto countryside, a train through steep Kii.",
    color: "#3d7ea6",
  },
  {
    id: "alps",
    order: 4,
    name: "Alps & Nakasendo",
    kana: "アルプス・中山道",
    tagline: "Kiso post towns, the Northern Alps, Fuji highlands. Izu is a spur.",
    color: "#4a6b3a",
  },
  {
    id: "tohoku",
    order: 5,
    name: "Tohoku",
    kana: "東北",
    tagline: "West coast and Dewa to the Aomori ferry; Sanriku is a spur.",
    color: "#6b4a2f",
  },
  {
    id: "hokkaido",
    order: 6,
    name: "Hokkaido",
    kana: "北海道",
    tagline: "Hakodate to Wakkanai and the northern pole. Shiretoko is an east spur.",
    color: "#2f5d50",
  },
];

export function stageOf(id: StageId): Stage {
  const stage = stages.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown stage: ${id}`);
  return stage;
}

export type GatewayId =
  | "sata"
  | "kanmon"
  | "onomichi"
  | "otsu"
  | "narai"
  | "aomori"
  | "hakodate"
  | "soya";

export type Gateway = {
  id: GatewayId;
  name: string;
  nameJa: string;
  stage: StageId;
  lat: number;
  lng: number;
};

/**
 * Stage gateways strung south to north (CONCEPT §8, Phase 1). These are the
 * hinges of the spine, not a survey. We thicken them into paths only when a
 * day is actually named.
 */
export const gateways: Gateway[] = [
  { id: "sata", name: "Cape Sata", nameJa: "佐多岬", stage: "kyushu", lat: 30.9931, lng: 130.6598 },
  { id: "kanmon", name: "Kanmon Straits", nameJa: "関門海峡", stage: "kyushu", lat: 33.96, lng: 130.94 },
  { id: "onomichi", name: "Onomichi", nameJa: "尾道", stage: "seto", lat: 34.409, lng: 133.205 },
  { id: "otsu", name: "Otsu (Lake Biwa)", nameJa: "大津", stage: "kansai", lat: 35.0045, lng: 135.8686 },
  { id: "narai", name: "Narai", nameJa: "奈良井", stage: "alps", lat: 35.918, lng: 137.816 },
  { id: "aomori", name: "Aomori", nameJa: "青森", stage: "tohoku", lat: 40.822, lng: 140.747 },
  { id: "hakodate", name: "Hakodate", nameJa: "函館", stage: "hokkaido", lat: 41.7687, lng: 140.729 },
  { id: "soya", name: "Cape Soya", nameJa: "宗谷岬", stage: "hokkaido", lat: 45.5228, lng: 141.9367 },
];

export type SpineMode = "ride" | "ferry" | "train";

export type SpineSegment = {
  id: string;
  from: GatewayId;
  to: GatewayId;
  mode: SpineMode;
  note?: string;
};

/**
 * Overview spine. Solid vermillion for the ride; dashed only for train and
 * ferry (CONCEPT §6). The Tsugaru crossing (Aomori → Hakodate) is part of the
 * land line as *access*, drawn dashed purple — never as a filmed road.
 */
export const spineSegments: SpineSegment[] = [
  { id: "sata-kanmon", from: "sata", to: "kanmon", mode: "ride" },
  { id: "kanmon-onomichi", from: "kanmon", to: "onomichi", mode: "ride" },
  { id: "onomichi-otsu", from: "onomichi", to: "otsu", mode: "ride" },
  { id: "otsu-narai", from: "otsu", to: "narai", mode: "ride" },
  { id: "narai-aomori", from: "narai", to: "aomori", mode: "ride" },
  {
    id: "aomori-hakodate",
    from: "aomori",
    to: "hakodate",
    mode: "ferry",
    note: "Tsugaru Strait ferry — access, not a filmed road.",
  },
  { id: "hakodate-soya", from: "hakodate", to: "soya", mode: "ride" },
];

export const SPINE_STYLE: Record<
  SpineMode,
  { color: string; dash?: string; label: string; weight: number }
> = {
  ride: { color: "#c4452d", label: "Planned ride", weight: 4 },
  ferry: { color: "#6b5b95", label: "Ferry", weight: 3, dash: "8 7" },
  train: { color: "#c9a05a", label: "Train", weight: 3, dash: "2 8" },
};

export function gatewayOf(id: GatewayId): Gateway {
  const gateway = gateways.find((g) => g.id === id);
  if (!gateway) throw new Error(`Unknown gateway: ${id}`);
  return gateway;
}

export type Traverse = {
  id: "sata-soya";
  title: string;
  titleJa: string;
  direction: "south-to-north";
  stages: Stage[];
};

export const traverse: Traverse = {
  id: "sata-soya",
  title: "Cape Sata → Cape Soya",
  titleJa: "佐多岬 → 宗谷岬",
  direction: "south-to-north",
  stages,
};

/**
 * The Phase 0 placeholder: a single great circle from pole to pole. It exists
 * to make the joke visible — this is NOT the GPS route, just the straight line
 * the real ride refuses to be.
 */
export const placeholderLine: LatLng[] = greatCircle(
  [poles.sata.lat, poles.sata.lng],
  [poles.soya.lat, poles.soya.lng],
);

/** Straight-line pole-to-pole distance, honestly labelled as "as the crow flies". */
export const poleToPoleKm: number = haversineKm(
  [poles.sata.lat, poles.sata.lng],
  [poles.soya.lat, poles.soya.lng],
);

/** Loose bounding box for the Japanese archipelago (used by tests). */
export const japanBounds = {
  minLat: 24,
  maxLat: 46,
  minLng: 122,
  maxLng: 146,
};

export const stats = {
  stages: stages.length,
  gateways: gateways.length,
  ferryCrossings: spineSegments.filter((s) => s.mode === "ferry").length,
  poleToPoleKm,
};
