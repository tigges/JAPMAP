import { describe, expect, it } from "vitest";
import {
  dayDetails,
  detailOf,
  emptySlotNumber,
  milestonesOf,
  photoSourced,
  practicalOf,
  slotsForKind,
  subtitleFor,
} from "./dayDetails";
import { JAPANRIDE_TOUCHES, STAGE_NOTES } from "./japanrideTouch";
import {
  dayOf,
  effortOf,
  placeOf,
  stageDayOrdinal,
  stageKmProgress,
  stageOf,
} from "./ride";
import { fmtEffort } from "./format";

describe("Day 1 sheet from the detail artifact", () => {
  const d = dayDetails[1]!;

  it("copies the Cape Sōya to Bakkai narrative and figures", () => {
    expect(d.narrative).toMatch(/most symbolic/);
    expect(d.narrative).toMatch(/Bakkai/);
    expect(d.highPointM).toBe(169);
    expect(d.hardestKm).toEqual({ gainM: 74, atKm: 17.4 });
    expect(d.photos).toHaveLength(6);
    expect(d.photos.map((p) => p.n)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(d.photos.map((p) => p.title)).toEqual([
      "Cape Sōya observation deck",
      "KAL 007 memorial",
      "The open Sea of Japan",
      "Oshidomari, Rishiri Island",
      "Wakkanai harbour",
      "Wakkanai, from the hillside",
    ]);
    expect(d.photos[3]!.kind).toBe("road");
    expect(d.photos.map((p) => p.atKm)).toEqual([0, 0.4, 6, 30, 45.3, 47]);
  });

  it("credits every Day 1 photograph", () => {
    for (const photo of d.photos) {
      expect(photoSourced(photo)).toBe(true);
      expect(photo.commons).toContain("commons.wikimedia.org");
      expect(photo.artist!.length).toBeGreaterThan(1);
      expect(photo.license!.length).toBeGreaterThan(1);
      expect(photo.file!.length).toBeGreaterThan(1);
    }
  });

  it("lists the day in kilometre order for the practical sidebar", () => {
    const day = dayOf(1)!;
    const items = practicalOf(day, d, placeOf(day.from), placeOf(day.to));
    expect(items[0]).toMatchObject({
      value: "0 km",
      title: "Start at Cape Sōya",
      note: "through Wakkanai",
    });
    expect(items.map((i) => i.title)).toEqual([
      "Start at Cape Sōya",
      "Hardest kilometre",
      "High point",
      "Break — Wakkanai harbour",
      "Finish at Bakkai",
    ]);
    expect(milestonesOf(d).map((p) => p.title)).toEqual([
      "Cape Sōya observation deck",
      "KAL 007 memorial",
      "The open Sea of Japan",
      "Oshidomari, Rishiri Island",
      "Wakkanai harbour",
      "Wakkanai, from the hillside",
    ]);
  });
});

describe("the day-sheet template for the other forty-one days", () => {
  it("leaves Day 2 empty rather than inventing a journal", () => {
    const d = detailOf(2);
    expect(d.narrative).toBeUndefined();
    expect(d.photos).toHaveLength(0);
    expect(d.highPointM).toBeUndefined();
    expect(slotsForKind(d, "viewpoint")).toEqual([null, null]);
  });

  it("numbers empty photo slots 1–6 across the three sections", () => {
    expect(emptySlotNumber("viewpoint", 0)).toBe(1);
    expect(emptySlotNumber("breakpoint", 1)).toBe(4);
    expect(emptySlotNumber("attraction", 0)).toBe(5);
  });

  it("falls back to the stage subtitle", () => {
    const day = dayOf(12)!;
    expect(subtitleFor(day.stageId, detailOf(12))).toMatch(/Sea of Japan/);
  });
});

describe("stage progress on a day sheet", () => {
  it("counts Day 1 as 1 of 11, 0 → 66.7 km", () => {
    const day = dayOf(1)!;
    expect(stageOf(day.stageId).number).toBe(1);
    expect(stageDayOrdinal(day)).toEqual({ index: 1, of: 11 });
    expect(stageKmProgress(day).start).toBe(0);
    expect(stageKmProgress(day).end).toBeCloseTo(66.7, 5);
  });

  it("counts Day 12 as the first day of Tōhoku", () => {
    const day = dayOf(12)!;
    expect(stageDayOrdinal(day)).toEqual({ index: 1, of: 7 });
    expect(stageKmProgress(day).start).toBe(0);
  });
});

describe("JAPANRIDE place content on overlapping days", () => {
  it("fills only the overnight hops that actually touch the catalog", () => {
    expect(JAPANRIDE_TOUCHES.map((t) => t.day)).toEqual([
      11, 12, 19, 21, 22, 23, 24, 26, 28, 30, 32, 36, 42,
    ]);
  });

  it("does not import NHK stills", () => {
    for (const touch of JAPANRIDE_TOUCHES) {
      const d = detailOf(touch.day);
      expect(d.photos.length).toBeGreaterThan(0);
      for (const photo of d.photos) {
        if (!photoSourced(photo)) continue;
        expect(photo.commons).toContain("commons.wikimedia.org");
        expect(photo.commons).not.toMatch(/nhk/i);
        expect(photo.file).not.toMatch(/nhk/i);
      }
    }
  });

  it("keeps off-line catalog places honest in the copy", () => {
    expect(detailOf(12).narrative).toMatch(/Hotokegaura/);
    expect(detailOf(12).narrative).toMatch(/Not the Tsugaru/);
    expect(detailOf(22).narrative).toMatch(/eight kilometres of rideable sand/);
    expect(detailOf(22).narrative).toMatch(/Wajima/);
    expect(detailOf(30).narrative).toMatch(/off the land line/);
    expect(detailOf(36).narrative).toMatch(/Yamanami Highway to Yufuin is inland/);
    expect(detailOf(19).narrative).toMatch(/Sado Island/);
  });

  it("gives every stage a place blurb from those overlaps", () => {
    expect(STAGE_NOTES.hokuriku).toMatch(/Chirihama/);
    expect(STAGE_NOTES.sanyo).toMatch(/Shimanami/);
    expect(STAGE_NOTES.kyushu).toMatch(/Usuki/);
  });
});

describe("Day 35 sheet from the Mōji to Usa artifact", () => {
  const d = dayDetails[35]!;

  it("copies the Suō-nada narrative and figures, without inventing a track", () => {
    expect(d.narrative).toMatch(/Suō-nada/);
    expect(d.narrative).toMatch(/Nakatsu/);
    expect(d.narrative).toMatch(/Usa/);
    expect(d.via).toBe("through Nakatsu");
    expect(d.highPointM).toBe(182);
    expect(d.highPointAtKm).toBe(0.6);
    expect(d.hardestKm).toEqual({ gainM: 30, atKm: 3.2 });
    expect(d.profile).toBeUndefined();
    expect(d.narrative).not.toMatch(/寺泊/);
  });

  it("keeps three unsourced milestones in kilometre order", () => {
    expect(d.photos).toHaveLength(3);
    expect(d.photos.every((p) => !photoSourced(p))).toBe(true);
    expect(d.photos.map((p) => p.titleJa)).toEqual([
      "風師展望台",
      "道の駅豊前おこしかけ",
      "豊前温泉天狗の湯",
    ]);
    expect(d.photos.map((p) => p.atKm)).toEqual([0.9, 53.1, 55.5]);
  });

  it("lists start, hardest, high point, first break, and Usa", () => {
    const day = dayOf(35)!;
    expect(fmtEffort(effortOf(day))).toBe("133");
    const items = practicalOf(day, d, placeOf(day.from), placeOf(day.to));
    expect(items.map((i) => i.title)).toEqual([
      "Start at Mōji",
      "Hardest kilometre",
      "High point",
      "Break — 道の駅豊前おこしかけ",
      "Finish at Usa",
    ]);
    expect(items[0]!.note).toBe("through Nakatsu");
  });
});
