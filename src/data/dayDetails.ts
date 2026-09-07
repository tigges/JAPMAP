import { STAGE_SUBTITLE, type PhotoCredit, type StageId } from "./ride";

export type DayPhotoKind = "viewpoint" | "breakpoint" | "attraction";

export type DayPhoto = PhotoCredit & {
  n: number;
  kind: DayPhotoKind;
  title: string;
  subtitle: string;
  lat?: number;
  lng?: number;
};

export type HardestKm = {
  gainM: number;
  atKm: number;
};

export type ElevPoint = {
  km: number;
  elevM: number;
};

export type DayDetail = {
  dayN: number;
  subtitle?: string;
  narrative?: string;
  highPointM?: number;
  hardestKm?: HardestKm;
  /**
   * Schematic polyline encoding published high-point / hardest-km facts.
   * Not a GPS track — the UI must label it as such.
   */
  profile?: ElevPoint[];
  photos: DayPhoto[];
};

export const PHOTO_SECTIONS: { kind: DayPhotoKind; heading: string }[] = [
  { kind: "viewpoint", heading: "View point" },
  { kind: "breakpoint", heading: "Break point" },
  { kind: "attraction", heading: "Local attractions" },
];

export const GRADE_BANDS = [
  { label: "under 2%", color: "#7eb07a" },
  { label: "2–4%", color: "#d4c35a" },
  { label: "4–7%", color: "#d48a4a" },
  { label: "over 7%", color: "#c45c4a" },
] as const;

/** Day 1 copy and photographs from the Cape Sōya to Bakkai detail artifact. */
export const dayDetails: Record<number, DayDetail> = {
  1: {
    dayN: 1,
    subtitle: "Cape-to-cape route · Sea of Japan side",
    narrative:
      "The tour's first day, and its most symbolic: off the monument at Japan's northernmost point, with the sea open to Russia on one side and, on a clear morning, Rishiri's volcanic cone floating offshore on the other. The road drops south along the Sōya coast into Wakkanai, the last proper town for a while, then continues down an emptying shoreline to the hamlet of Bakkai. Short by the standards of the stage, and worth keeping that way — a late start off the cape costs nothing here.",
    highPointM: 169,
    hardestKm: { gainM: 74, atKm: 17.4 },
    profile: [
      { km: 0, elevM: 26 },
      { km: 9, elevM: 6 },
      { km: 17.4, elevM: 35 },
      { km: 18.4, elevM: 109 },
      { km: 24, elevM: 169 },
      { km: 40, elevM: 72 },
      { km: 55, elevM: 38 },
      { km: 66.7, elevM: 8 },
    ],
    photos: [
      {
        n: 1,
        kind: "viewpoint",
        title: "Cape Sōya observation deck",
        subtitle: "0.2 km · at the start",
        file: "hero-soya.jpg",
        artist: "Suicasmo",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:The_northernmost_point_of_Japan_monument_in_Soya_cape.jpg",
        lat: 45.5228,
        lng: 141.9367,
      },
      {
        n: 2,
        kind: "viewpoint",
        title: "The open Sea of Japan",
        subtitle: "looking north from the cape road",
        file: "day1-02-sea.jpg",
        artist: "MaksimTack",
        license: "Public domain",
        commons: "https://commons.wikimedia.org/wiki/File:Sea_of_Japan_from_Soya_Main_Line.jpg",
        lat: 45.49,
        lng: 141.88,
      },
      {
        n: 3,
        kind: "breakpoint",
        title: "Wakkanai harbour",
        subtitle: "9 km · last proper town for a while",
        file: "day1-03-wakkanai-harbour.jpg",
        artist: "100yen",
        license: "CC BY-SA 3.0",
        commons: "https://commons.wikimedia.org/wiki/File:Wakkanai_harbor.JPG",
        lat: 45.409,
        lng: 141.682,
      },
      {
        n: 4,
        kind: "breakpoint",
        title: "Wakkanai, from the hillside",
        subtitle: "9 km",
        file: "day1-04-wakkanai-hill.jpg",
        artist: "Kitayama",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Wakkanai_city_view.jpg",
        lat: 45.4,
        lng: 141.705,
      },
      {
        n: 5,
        kind: "attraction",
        title: "KAL 007 memorial",
        subtitle: "at the cape · a monument to the 1983 shoot-down",
        file: "day1-05-kal.jpg",
        artist: "Suicasmo",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:KAL_Monument_in_Cape_Soya_20140813.jpg",
        lat: 45.5222,
        lng: 141.9374,
      },
      {
        n: 6,
        kind: "attraction",
        title: "Oshidomari, Rishiri Island",
        subtitle:
          "the island offshore for most of the day — this is its port town, not the view from the road",
        file: "day1-06-oshidomari.jpg",
        artist: "OKJaguar",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Oshidomari_Port,_Rishirifuji,_Rishiri_Island,_Hokkaido_Prefecture,_Japan.jpg",
        lat: 45.2475,
        lng: 141.2175,
      },
    ],
  },
};

export function subtitleFor(stageId: StageId, detail: DayDetail): string {
  return detail.subtitle ?? STAGE_SUBTITLE[stageId];
}

const emptyByDay = new Map<number, DayDetail>();

export function detailOf(n: number): DayDetail {
  const found = dayDetails[n];
  if (found) return found;
  const cached = emptyByDay.get(n);
  if (cached) return cached;
  const empty: DayDetail = { dayN: n, photos: [] };
  emptyByDay.set(n, empty);
  return empty;
}

export function slotsForKind(detail: DayDetail, kind: DayPhotoKind): (DayPhoto | null)[] {
  const filled = detail.photos.filter((p) => p.kind === kind);
  if (filled.length >= 2) return filled;
  const slots: (DayPhoto | null)[] = [...filled];
  while (slots.length < 2) slots.push(null);
  return slots;
}

export function emptySlotNumber(kind: DayPhotoKind, index: number): number {
  const base = { viewpoint: 1, breakpoint: 3, attraction: 5 } as const;
  return base[kind] + index;
}
