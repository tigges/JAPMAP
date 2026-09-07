import { describe, expect, it } from "vitest";
import {
  dayDetails,
  detailOf,
  emptySlotNumber,
  slotsForKind,
  subtitleFor,
} from "./dayDetails";
import { dayOf, stageDayOrdinal, stageKmProgress, stageOf } from "./ride";

describe("Day 1 sheet from the detail artifact", () => {
  const d = dayDetails[1]!;

  it("copies the Cape Sōya to Bakkai narrative and figures", () => {
    expect(d.narrative).toMatch(/most symbolic/);
    expect(d.narrative).toMatch(/Bakkai/);
    expect(d.highPointM).toBe(169);
    expect(d.hardestKm).toEqual({ gainM: 74, atKm: 17.4 });
    expect(d.photos).toHaveLength(6);
    expect(d.photos.map((p) => p.n)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(d.photos[0]!.title).toBe("Cape Sōya observation deck");
    expect(d.photos[2]!.title).toBe("Wakkanai harbour");
    expect(d.photos[4]!.title).toMatch(/KAL 007/);
    expect(d.photos[5]!.title).toMatch(/Oshidomari/);
  });

  it("credits every Day 1 photograph", () => {
    for (const photo of d.photos) {
      expect(photo.commons).toContain("commons.wikimedia.org");
      expect(photo.artist.length).toBeGreaterThan(1);
      expect(photo.license.length).toBeGreaterThan(1);
      expect(photo.file.length).toBeGreaterThan(1);
    }
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
