/**
 * JAPMAP V2 ride: Cape Sōya → Cape Sata, measured off the Pole to Pole
 * artifact itinerary. Headline totals (3,461 km / 44,640 m) are the
 * published route-map figures. Day rows are the overnight itinerary;
 * they will not sum to the headline until the GPX is in-tree.
 */

export type PlaceId =
  | "soya"
  | "bakkai"
  | "enbetsu"
  | "haboro"
  | "rumoi"
  | "mashike"
  | "atsuta"
  | "otaru"
  | "iwanai"
  | "suttsu"
  | "yakumo"
  | "hakodate"
  | "aomori"
  | "fukaura"
  | "noshiro"
  | "akita"
  | "nikaho"
  | "tsuruoka"
  | "murakami"
  | "niigata"
  | "kashiwazaki"
  | "nou"
  | "uozu"
  | "chirihama"
  | "kanazawa"
  | "tojinbo"
  | "tsuruga"
  | "otsu"
  | "osaka"
  | "himeji"
  | "okayama"
  | "onomichi"
  | "kure"
  | "yanai"
  | "hofu"
  | "shimonoseki"
  | "moji"
  | "usa"
  | "usuki"
  | "nobeoka"
  | "miyazaki"
  | "kushima"
  | "nejime"
  | "sata"
  | "yamagawa"
  | "kagoshima";

export type Place = {
  id: PlaceId;
  name: string;
  nameJa: string;
  lat: number;
  lng: number;
};

export const places: Record<PlaceId, Place> = {
  soya: { id: "soya", name: "Cape Sōya", nameJa: "宗谷岬", lat: 45.5228, lng: 141.9367 },
  bakkai: { id: "bakkai", name: "Bakkai", nameJa: "抜海", lat: 45.305, lng: 141.753 },
  enbetsu: { id: "enbetsu", name: "Enbetsu", nameJa: "遠別", lat: 44.722, lng: 141.793 },
  haboro: { id: "haboro", name: "Haboro", nameJa: "羽幌", lat: 44.362, lng: 141.697 },
  rumoi: { id: "rumoi", name: "Rumoi", nameJa: "留萌", lat: 43.941, lng: 141.637 },
  mashike: { id: "mashike", name: "Mashike", nameJa: "増毛", lat: 43.856, lng: 141.525 },
  atsuta: { id: "atsuta", name: "Atsuta", nameJa: "厚田", lat: 43.363, lng: 141.408 },
  otaru: { id: "otaru", name: "Otaru", nameJa: "小樽", lat: 43.191, lng: 141.002 },
  iwanai: { id: "iwanai", name: "Iwanai", nameJa: "岩内", lat: 42.979, lng: 140.514 },
  suttsu: { id: "suttsu", name: "Suttsu", nameJa: "寿都", lat: 42.791, lng: 140.229 },
  yakumo: { id: "yakumo", name: "Yakumo", nameJa: "八雲", lat: 42.256, lng: 140.265 },
  hakodate: { id: "hakodate", name: "Hakodate", nameJa: "函館", lat: 41.7687, lng: 140.729 },
  aomori: { id: "aomori", name: "Aomori", nameJa: "青森", lat: 40.822, lng: 140.747 },
  fukaura: { id: "fukaura", name: "Fukaura", nameJa: "深浦", lat: 40.648, lng: 139.928 },
  noshiro: { id: "noshiro", name: "Noshiro", nameJa: "能代", lat: 40.212, lng: 140.026 },
  akita: { id: "akita", name: "Akita", nameJa: "秋田", lat: 39.72, lng: 140.102 },
  nikaho: { id: "nikaho", name: "Nikaho", nameJa: "にかほ", lat: 39.257, lng: 139.908 },
  tsuruoka: { id: "tsuruoka", name: "Tsuruoka", nameJa: "鶴岡", lat: 38.727, lng: 139.827 },
  murakami: { id: "murakami", name: "Murakami", nameJa: "村上", lat: 38.224, lng: 139.48 },
  niigata: { id: "niigata", name: "Niigata", nameJa: "新潟", lat: 37.916, lng: 139.036 },
  kashiwazaki: { id: "kashiwazaki", name: "Kashiwazaki", nameJa: "柏崎", lat: 37.372, lng: 138.559 },
  nou: { id: "nou", name: "Nou", nameJa: "能生", lat: 37.1, lng: 137.985 },
  uozu: { id: "uozu", name: "Uozu", nameJa: "魚津", lat: 36.827, lng: 137.409 },
  chirihama: { id: "chirihama", name: "Chirihama", nameJa: "千里浜", lat: 36.861, lng: 136.722 },
  kanazawa: { id: "kanazawa", name: "Kanazawa", nameJa: "金沢", lat: 36.561, lng: 136.656 },
  tojinbo: { id: "tojinbo", name: "Tōjinbō", nameJa: "東尋坊", lat: 36.238, lng: 136.125 },
  tsuruga: { id: "tsuruga", name: "Tsuruga", nameJa: "敦賀", lat: 35.645, lng: 136.055 },
  otsu: { id: "otsu", name: "Ōtsu", nameJa: "大津", lat: 35.0045, lng: 135.8686 },
  osaka: { id: "osaka", name: "Ōsaka", nameJa: "大阪", lat: 34.694, lng: 135.502 },
  himeji: { id: "himeji", name: "Himeji", nameJa: "姫路", lat: 34.815, lng: 134.685 },
  okayama: { id: "okayama", name: "Okayama", nameJa: "岡山", lat: 34.655, lng: 133.92 },
  onomichi: { id: "onomichi", name: "Onomichi", nameJa: "尾道", lat: 34.409, lng: 133.205 },
  kure: { id: "kure", name: "Kure", nameJa: "呉", lat: 34.232, lng: 132.566 },
  yanai: { id: "yanai", name: "Yanai", nameJa: "柳井", lat: 33.964, lng: 132.102 },
  hofu: { id: "hofu", name: "Hōfu", nameJa: "防府", lat: 34.051, lng: 131.563 },
  shimonoseki: { id: "shimonoseki", name: "Shimonoseki", nameJa: "下関", lat: 33.957, lng: 130.941 },
  moji: { id: "moji", name: "Mōji", nameJa: "門司", lat: 33.944, lng: 130.962 },
  usa: { id: "usa", name: "Usa", nameJa: "宇佐", lat: 33.532, lng: 131.349 },
  usuki: { id: "usuki", name: "Usuki", nameJa: "臼杵", lat: 33.126, lng: 131.805 },
  nobeoka: { id: "nobeoka", name: "Nobeoka", nameJa: "延岡", lat: 32.582, lng: 131.665 },
  miyazaki: { id: "miyazaki", name: "Miyazaki", nameJa: "宮崎", lat: 31.911, lng: 131.424 },
  kushima: { id: "kushima", name: "Kushima", nameJa: "串間", lat: 31.464, lng: 131.228 },
  nejime: { id: "nejime", name: "Nejime", nameJa: "根占", lat: 31.227, lng: 130.778 },
  sata: { id: "sata", name: "Cape Sata", nameJa: "佐多岬", lat: 30.9931, lng: 130.6598 },
  yamagawa: { id: "yamagawa", name: "Yamagawa", nameJa: "山川", lat: 31.211, lng: 130.628 },
  kagoshima: { id: "kagoshima", name: "Kagoshima", nameJa: "鹿児島", lat: 31.597, lng: 130.557 },
};

export type StageId =
  | "hokkaido"
  | "tohoku"
  | "hokuriku"
  | "cutacross"
  | "sanyo"
  | "kyushu"
  | "satsuma";

export type PhotoCredit = {
  file: string;
  artist: string;
  license: string;
  commons: string;
  caption?: string;
};

export type Stage = {
  id: StageId;
  /** Artifact stage number — gaps 2 and 7 are ferries. */
  number: number;
  name: string;
  nameJa: string;
  from: PlaceId;
  to: PlaceId;
  km: number;
  climbM: number;
  days: number;
  color: string;
  photo: PhotoCredit;
};

export const stages: Stage[] = [
  {
    id: "hokkaido",
    number: 1,
    name: "Hokkaidō west coast",
    nameJa: "北海道西海岸",
    from: "soya",
    to: "hakodate",
    km: 847,
    climbM: 11021,
    days: 11,
    color: "#7FA8B8",
    photo: {
      file: "stage-hokkaido.jpg",
      artist: "Sho Horiuchi",
      license: "CC BY-SA 3.0",
      commons: "https://commons.wikimedia.org/wiki/File:Otaru_Canal_Dusk_in_summer.jpg",
    },
  },
  {
    id: "tohoku",
    number: 3,
    name: "Tōhoku, Sea of Japan coast",
    nameJa: "東北・日本海",
    from: "aomori",
    to: "niigata",
    km: 557,
    climbM: 7184,
    days: 7,
    color: "#5FA89A",
    photo: {
      file: "stage-tohoku.jpg",
      artist: "Douglas P. Perkins",
      license: "CC BY-SA 3.0",
      commons: "https://commons.wikimedia.org/wiki/File:Mt._Chokai_over_rice_fields.jpg",
    },
  },
  {
    id: "hokuriku",
    number: 4,
    name: "Hokuriku coast",
    nameJa: "北陸",
    from: "niigata",
    to: "kanazawa",
    km: 404,
    climbM: 4239,
    days: 5,
    color: "#C4B594",
    photo: {
      file: "stage-hokuriku.jpg",
      artist: "SONIC BLOOMING",
      license: "CC BY-SA 4.0",
      commons: "https://commons.wikimedia.org/wiki/File:Chirihama_Nagisa_Driveway_2020.jpg",
    },
  },
  {
    id: "cutacross",
    number: 5,
    name: "The cut-across",
    nameJa: "横断",
    from: "kanazawa",
    to: "osaka",
    km: 329,
    climbM: 3027,
    days: 4,
    color: "#D4A574",
    photo: {
      file: "stage-cutacross.jpg",
      artist: "雷太",
      license: "CC BY 2.0",
      commons:
        "https://commons.wikimedia.org/wiki/File:Tojinbo_cliffs,_Fukui_Prefecture;_September_2019_(01).jpg",
    },
  },
  {
    id: "sanyo",
    number: 6,
    name: "Inland Sea / San’yō",
    nameJa: "山陽・瀬戸内",
    from: "osaka",
    to: "shimonoseki",
    km: 646,
    climbM: 6886,
    days: 7,
    color: "#D78A6C",
    photo: {
      file: "stage-sanyo.jpg",
      artist: "Reggaeman",
      license: "Public domain",
      commons: "https://commons.wikimedia.org/wiki/File:Himeji_Castle_The_Keep_Towers.jpg",
    },
  },
  {
    id: "kyushu",
    number: 8,
    name: "Kyūshū east coast",
    nameJa: "九州東海岸",
    from: "moji",
    to: "sata",
    km: 601,
    climbM: 10958,
    days: 7,
    color: "#B84A3E",
    photo: {
      file: "stage-kyushu.jpg",
      artist: "663highland",
      license: "CC BY 2.5",
      commons: "https://commons.wikimedia.org/wiki/File:Beppu_Umi-jigoku04n4272.jpg",
    },
  },
  {
    id: "satsuma",
    number: 9,
    name: "Satsuma run-in",
    nameJa: "薩摩",
    from: "yamagawa",
    to: "kagoshima",
    km: 76,
    climbM: 1325,
    days: 1,
    color: "#A53C3C",
    photo: {
      file: "stage-satsuma.jpg",
      artist: "TANAKA Juuyoh",
      license: "CC BY 2.0",
      commons: "https://commons.wikimedia.org/wiki/File:Sakurajima55.jpg",
    },
  },
];

export type RideDay = {
  n: number;
  from: PlaceId;
  to: PlaceId;
  km: number;
  climbM: number;
  stageId: StageId;
  /** Filled dot in the artifact: milestone photography in place. */
  milestone?: boolean;
  ferryAfter?: "tsugaru" | "kanmon" | "kagoshima-bay";
};

export const rideDays: RideDay[] = [
  { n: 1, from: "soya", to: "bakkai", km: 66.7, climbM: 855, stageId: "hokkaido", milestone: true },
  { n: 2, from: "bakkai", to: "enbetsu", km: 75.6, climbM: 228, stageId: "hokkaido" },
  { n: 3, from: "enbetsu", to: "haboro", km: 62.2, climbM: 974, stageId: "hokkaido" },
  { n: 4, from: "haboro", to: "rumoi", km: 67.6, climbM: 1508, stageId: "hokkaido" },
  { n: 5, from: "rumoi", to: "mashike", km: 26.7, climbM: 411, stageId: "hokkaido" },
  { n: 6, from: "mashike", to: "atsuta", km: 138.2, climbM: 1751, stageId: "hokkaido" },
  { n: 7, from: "atsuta", to: "otaru", km: 74.7, climbM: 1165, stageId: "hokkaido" },
  { n: 8, from: "otaru", to: "iwanai", km: 71.6, climbM: 1036, stageId: "hokkaido" },
  { n: 9, from: "iwanai", to: "suttsu", km: 68.8, climbM: 1469, stageId: "hokkaido" },
  { n: 10, from: "suttsu", to: "yakumo", km: 83.8, climbM: 605, stageId: "hokkaido" },
  {
    n: 11,
    from: "yakumo",
    to: "hakodate",
    km: 91.1,
    climbM: 1014,
    stageId: "hokkaido",
    ferryAfter: "tsugaru",
  },
  { n: 12, from: "aomori", to: "fukaura", km: 99.9, climbM: 1174, stageId: "tohoku" },
  { n: 13, from: "fukaura", to: "noshiro", km: 66.2, climbM: 969, stageId: "tohoku" },
  { n: 14, from: "noshiro", to: "akita", km: 70.3, climbM: 248, stageId: "tohoku" },
  { n: 15, from: "akita", to: "nikaho", km: 79.2, climbM: 911, stageId: "tohoku" },
  { n: 16, from: "nikaho", to: "tsuruoka", km: 68.9, climbM: 603, stageId: "tohoku" },
  { n: 17, from: "tsuruoka", to: "murakami", km: 106.3, climbM: 2956, stageId: "tohoku" },
  { n: 18, from: "murakami", to: "niigata", km: 65.9, climbM: 292, stageId: "tohoku" },
  { n: 19, from: "niigata", to: "kashiwazaki", km: 89.5, climbM: 629, stageId: "hokuriku" },
  { n: 20, from: "kashiwazaki", to: "nou", km: 87.0, climbM: 1145, stageId: "hokuriku" },
  { n: 21, from: "nou", to: "uozu", km: 69.3, climbM: 1641, stageId: "hokuriku" },
  { n: 22, from: "uozu", to: "chirihama", km: 87.9, climbM: 580, stageId: "hokuriku" },
  { n: 23, from: "chirihama", to: "kanazawa", km: 50.1, climbM: 240, stageId: "hokuriku" },
  { n: 24, from: "kanazawa", to: "tojinbo", km: 80.7, climbM: 425, stageId: "cutacross" },
  { n: 25, from: "tojinbo", to: "tsuruga", km: 90.8, climbM: 959, stageId: "cutacross" },
  { n: 26, from: "tsuruga", to: "otsu", km: 95.1, climbM: 1062, stageId: "cutacross" },
  { n: 27, from: "otsu", to: "osaka", km: 62.4, climbM: 572, stageId: "cutacross" },
  { n: 28, from: "osaka", to: "himeji", km: 99.1, climbM: 724, stageId: "sanyo" },
  { n: 29, from: "himeji", to: "okayama", km: 97.6, climbM: 876, stageId: "sanyo" },
  { n: 30, from: "okayama", to: "onomichi", km: 89.7, climbM: 823, stageId: "sanyo" },
  { n: 31, from: "onomichi", to: "kure", km: 91.9, climbM: 1191, stageId: "sanyo" },
  { n: 32, from: "kure", to: "yanai", km: 101.9, climbM: 1497, stageId: "sanyo", milestone: true },
  { n: 33, from: "yanai", to: "hofu", km: 66.2, climbM: 812, stageId: "sanyo" },
  {
    n: 34,
    from: "hofu",
    to: "shimonoseki",
    km: 99.6,
    climbM: 966,
    stageId: "sanyo",
    ferryAfter: "kanmon",
  },
  { n: 35, from: "moji", to: "usa", km: 81.5, climbM: 512, stageId: "kyushu" },
  { n: 36, from: "usa", to: "usuki", km: 89.3, climbM: 1697, stageId: "kyushu" },
  { n: 37, from: "usuki", to: "nobeoka", km: 123.3, climbM: 3277, stageId: "kyushu" },
  { n: 38, from: "nobeoka", to: "miyazaki", km: 100.5, climbM: 782, stageId: "kyushu" },
  { n: 39, from: "miyazaki", to: "kushima", km: 83.6, climbM: 1608, stageId: "kyushu" },
  { n: 40, from: "kushima", to: "nejime", km: 102.3, climbM: 2230, stageId: "kyushu" },
  {
    n: 41,
    from: "nejime",
    to: "sata",
    km: 21.6,
    climbM: 852,
    stageId: "kyushu",
    ferryAfter: "kagoshima-bay",
  },
  { n: 42, from: "yamagawa", to: "kagoshima", km: 75.5, climbM: 1326, stageId: "satsuma" },
];

export const FERRY_NOTE: Record<NonNullable<RideDay["ferryAfter"]>, string> = {
  tsugaru: "Tsugaru Strait ferry — Hakodate to Aomori. Access, not a ridden road.",
  kanmon: "Kanmon Straits — Shimonoseki to Mōji.",
  "kagoshima-bay": "Kagoshima Bay ferry — Ōsumi to Satsuma after the southern pole.",
};

/** Published route-map headlines from the Pole to Pole artifact. */
export const ride = {
  id: "soya-sata" as const,
  title: "Pole to Pole",
  titleJa: "極から極へ",
  direction: "north-to-south" as const,
  from: "soya" as PlaceId,
  to: "sata" as PlaceId,
  km: 3461,
  climbM: 44640,
  ridingDays: 42,
  stageCount: 7,
  ferries: 3,
  facilities: 489,
  soyaLatLabel: "45°31′N",
  sataLatLabel: "30°59′N",
  sataKm: 3386,
};

export const heroPhoto: PhotoCredit = {
  file: "hero-soya.jpg",
  artist: "Suicasmo",
  license: "CC BY-SA 4.0",
  commons:
    "https://commons.wikimedia.org/wiki/File:The_northernmost_point_of_Japan_monument_in_Soya_cape.jpg",
  caption: "Cape Sōya, Hokkaidō — kilometre zero",
};

export const japanBounds = {
  minLat: 24,
  maxLat: 46,
  minLng: 122,
  maxLng: 146,
};

export function photoUrl(file: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}photos/${file}`;
}

export function stageOf(id: StageId): Stage {
  const stage = stages.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown stage: ${id}`);
  return stage;
}

export function stageByNumber(n: number): Stage | undefined {
  return stages.find((s) => s.number === n);
}

export function dayOf(n: number): RideDay | undefined {
  return rideDays.find((d) => d.n === n);
}

export function effortOf(day: RideDay): number {
  return day.km + day.climbM / 10;
}

export function daysOfStage(id: StageId): RideDay[] {
  return rideDays.filter((d) => d.stageId === id);
}

export function placeOf(id: PlaceId): Place {
  return places[id];
}

export type DayWithKm = RideDay & { kmStart: number; effort: number };

export const daysWithKm: DayWithKm[] = [];
{
  let acc = 0;
  for (const day of rideDays) {
    daysWithKm.push({ ...day, kmStart: acc, effort: effortOf(day) });
    acc += day.km;
  }
}

export const dayKmSum = daysWithKm.reduce((s, d) => s + d.km, 0);
export const dayClimbSum = daysWithKm.reduce((s, d) => s + d.climbM, 0);
export const maxEffort = Math.max(...daysWithKm.map((d) => d.effort));
export const minEffort = Math.min(...daysWithKm.map((d) => d.effort));

export const chartTicks: { label: string; km: number }[] = [
  { label: "Cape Sōya", km: 0 },
  { label: "Hakodate", km: 847 },
  { label: "Niigata", km: 1404 },
  { label: "Ōsaka", km: 2138 },
  { label: "Shimonoseki", km: 2784 },
  { label: "Cape Sata", km: 3386 },
  { label: "", km: 3461 },
];

export const JAPANRIDE_URL = "https://japanride.pages.dev/";
