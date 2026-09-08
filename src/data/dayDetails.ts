import { japanRideDayDetails } from "./dayDetails.touch";
import { fmtKm } from "./format";
import {
  STAGE_SUBTITLE,
  type Place,
  type RideDay,
  type StageId,
} from "./ride";

export type DayPhotoKind = "viewpoint" | "breakpoint" | "attraction" | "road";

export type DayPhoto = {
  n: number;
  kind: DayPhotoKind;
  title: string;
  titleJa?: string;
  subtitle: string;
  atKm?: number;
  offRouteKm?: number;
  lat?: number;
  lng?: number;
  file?: string;
  artist?: string;
  license?: string;
  commons?: string;
};

export type PracticalItem = {
  value: string;
  title: string;
  note?: string;
};

export const PHOTO_KIND_LABEL: Record<DayPhotoKind, string> = {
  viewpoint: "View point",
  breakpoint: "Break point",
  attraction: "Local attraction",
  road: "Seen from the road",
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
  /** Towns the hop runs through, used in “the day, practically.” */
  via?: string;
  highPointM?: number;
  highPointAtKm?: number;
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
    via: "through Wakkanai",
    highPointM: 169,
    highPointAtKm: 24,
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
        subtitle: "The northernmost point of mainland Japan.",
        atKm: 0,
        offRouteKm: 0.2,
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
        kind: "attraction",
        title: "KAL 007 memorial",
        subtitle: "The Tower of Prayer, for the 269 people aboard the airliner shot down in 1983.",
        atKm: 0.4,
        offRouteKm: 0.1,
        file: "day1-05-kal.jpg",
        artist: "Suicasmo",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:KAL_Monument_in_Cape_Soya_20140813.jpg",
        lat: 45.5222,
        lng: 141.9374,
      },
      {
        n: 3,
        kind: "viewpoint",
        title: "The open Sea of Japan",
        subtitle: "The road turns west and the shelter goes with it.",
        atKm: 6,
        file: "day1-02-sea.jpg",
        artist: "MaksimTack",
        license: "Public domain",
        commons: "https://commons.wikimedia.org/wiki/File:Sea_of_Japan_from_Soya_Main_Line.jpg",
        lat: 45.49,
        lng: 141.88,
      },
      {
        n: 4,
        kind: "road",
        title: "Oshidomari, Rishiri Island",
        subtitle:
          "Rishiri's cone sits offshore for the best part of two days — visible from the road when the weather allows.",
        atKm: 30,
        file: "day1-06-oshidomari.jpg",
        artist: "OKJaguar",
        license: "CC BY-SA 4.0",
        commons:
          "https://commons.wikimedia.org/wiki/File:Oshidomari_Port,_Rishirifuji,_Rishiri_Island,_Hokkaido_Prefecture,_Japan.jpg",
        lat: 45.2475,
        lng: 141.2175,
      },
      {
        n: 5,
        kind: "breakpoint",
        title: "Wakkanai harbour",
        subtitle: "Last proper town, and last supermarket, for a while.",
        atKm: 45.3,
        offRouteKm: 0.5,
        file: "day1-03-wakkanai-harbour.jpg",
        artist: "100yen",
        license: "CC BY-SA 3.0",
        commons: "https://commons.wikimedia.org/wiki/File:Wakkanai_harbor.JPG",
        lat: 45.409,
        lng: 141.682,
      },
      {
        n: 6,
        kind: "breakpoint",
        title: "Wakkanai, from the hillside",
        subtitle: "The town from the park above it, with the harbour and the strait behind.",
        atKm: 47,
        offRouteKm: 0.9,
        file: "day1-04-wakkanai-hill.jpg",
        artist: "Kitayama",
        license: "CC BY-SA 4.0",
        commons: "https://commons.wikimedia.org/wiki/File:Wakkanai_city_view.jpg",
        lat: 45.4,
        lng: 141.705,
      },
    ],
  },
  35: {
    dayN: 35,
    narrative:
      "Across the strait and onto the fourth island. From Mōji the route runs the Suō-nada shore south-west — flat, open, farmland and small ports — through Nakatsu to Usa, 82 km for 512 m of climbing. A deliberately soft opening: the Kyūshū stage has 10,958 m of climbing in it and none of the rest of it is like this.",
    via: "through Nakatsu",
    highPointM: 182,
    highPointAtKm: 0.6,
    hardestKm: { gainM: 30, atKm: 3.2 },
    photos: [
      {
        n: 1,
        kind: "viewpoint",
        title: "Kazashiyama observatory",
        titleJa: "風師展望台",
        subtitle: "Viewpoint over the Kanmon side, just off Mōji.",
        atKm: 0.9,
      },
      {
        n: 2,
        kind: "breakpoint",
        title: "Michi-no-eki Buzen Okoshikake",
        titleJa: "道の駅豊前おこしかけ",
        subtitle: "Roadside station on National Route 10.",
        atKm: 53.1,
      },
      {
        n: 3,
        kind: "breakpoint",
        title: "Buzen Onsen Tengu-no-yu",
        titleJa: "豊前温泉天狗の湯",
        subtitle: "Onsen, a short hop off the station.",
        atKm: 55.5,
      },
    ],
  },
  ...japanRideDayDetails,
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
  const base = { viewpoint: 1, breakpoint: 3, attraction: 5, road: 7 } as const;
  return base[kind] + index;
}

export function milestonesOf(detail: DayDetail): DayPhoto[] {
  return [...detail.photos].sort((a, b) => (a.atKm ?? a.n) - (b.atKm ?? b.n));
}

export function highPointKm(detail: DayDetail): number | undefined {
  if (detail.highPointAtKm != null) return detail.highPointAtKm;
  if (detail.highPointM == null || !detail.profile) return undefined;
  return detail.profile.find((p) => p.elevM === detail.highPointM)?.km;
}

export function photoSourced(photo: DayPhoto): boolean {
  return Boolean(photo.file && photo.commons);
}

export function practicalOf(
  day: RideDay,
  detail: DayDetail,
  from: Place,
  to: Place,
): PracticalItem[] {
  const items: PracticalItem[] = [
    { value: "0 km", title: `Start at ${from.name}`, note: detail.via },
  ];
  if (detail.hardestKm) {
    items.push({
      value: `+${detail.hardestKm.gainM} m`,
      title: "Hardest kilometre",
      note: `begins at ${fmtKm(detail.hardestKm.atKm)} km`,
    });
  }
  if (detail.highPointM != null) {
    const at = highPointKm(detail);
    items.push({
      value: `${detail.highPointM} m`,
      title: "High point",
      note: at != null ? `at ${fmtKm(at)} km` : undefined,
    });
  }
  const brk = milestonesOf(detail).find((p) => p.kind === "breakpoint");
  if (brk) {
    items.push({
      value: brk.atKm != null ? `${fmtKm(brk.atKm)} km` : "Break",
      title: `Break — ${brk.titleJa ?? brk.title}`,
      note:
        brk.offRouteKm != null ? `${fmtKm(brk.offRouteKm)} km off route` : brk.subtitle,
    });
  }
  items.push({
    value: `${fmtKm(day.km)} km`,
    title: `Finish at ${to.name}`,
  });
  return items;
}
