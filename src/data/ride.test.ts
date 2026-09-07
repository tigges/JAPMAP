import { describe, expect, it } from "vitest";
import { basemaps, isBasemapId } from "./basemap";
import { fmtEffort } from "./format";
import {
  dayClimbSum,
  dayKmSum,
  dayOf,
  daysWithKm,
  effortOf,
  japanBounds,
  maxEffort,
  minEffort,
  placeOf,
  places,
  ride,
  rideDays,
  stageOf,
  stages,
} from "./ride";

describe("the two poles", () => {
  it("starts at Cape Sōya and finishes the land line at Cape Sata", () => {
    expect(places.soya.name).toBe("Cape Sōya");
    expect(places.soya.nameJa).toBe("宗谷岬");
    expect(places.sata.name).toBe("Cape Sata");
    expect(places.sata.nameJa).toBe("佐多岬");
    expect(places.soya.lat).toBeGreaterThan(places.sata.lat);
    expect(places.soya.lat - places.sata.lat).toBeGreaterThan(14);
  });

  it("keeps poles inside Japan", () => {
    for (const id of ["soya", "sata"] as const) {
      const p = places[id];
      expect(p.lat).toBeGreaterThanOrEqual(japanBounds.minLat);
      expect(p.lat).toBeLessThanOrEqual(japanBounds.maxLat);
      expect(p.lng).toBeGreaterThanOrEqual(japanBounds.minLng);
      expect(p.lng).toBeLessThanOrEqual(japanBounds.maxLng);
    }
  });
});

describe("the routed ride", () => {
  it("runs north to south as Sōya → Sata", () => {
    expect(ride.id).toBe("soya-sata");
    expect(ride.direction).toBe("north-to-south");
    expect(ride.from).toBe("soya");
    expect(ride.to).toBe("sata");
    expect(ride.ridingDays).toBe(42);
    expect(ride.stageCount).toBe(7);
    expect(ride.ferries).toBe(3);
  });

  it("has forty-two consecutive riding days", () => {
    expect(rideDays).toHaveLength(42);
    expect(rideDays.map((d) => d.n)).toEqual(
      Array.from({ length: 42 }, (_, i) => i + 1),
    );
  });

  it("marks milestone photography on days 1 and 32", () => {
    expect(dayOf(1)?.milestone).toBe(true);
    expect(dayOf(32)?.milestone).toBe(true);
    expect(rideDays.filter((d) => d.milestone)).toHaveLength(2);
  });

  it("places ferries after Hakodate, Shimonoseki, and Cape Sata", () => {
    expect(dayOf(11)?.ferryAfter).toBe("tsugaru");
    expect(dayOf(34)?.ferryAfter).toBe("kanmon");
    expect(dayOf(41)?.ferryAfter).toBe("kagoshima-bay");
    expect(rideDays.filter((d) => d.ferryAfter)).toHaveLength(3);
  });

  it("ends the land line at Sata, then runs in to Kagoshima", () => {
    expect(dayOf(41)?.to).toBe("sata");
    expect(dayOf(42)?.from).toBe("yamagawa");
    expect(dayOf(42)?.to).toBe("kagoshima");
  });
});

describe("stages", () => {
  it("keeps ferry gaps in the artifact numbering", () => {
    expect(stages.map((s) => s.number)).toEqual([1, 3, 4, 5, 6, 8, 9]);
    expect(stageOf("hokkaido").from).toBe("soya");
    expect(stageOf("kyushu").to).toBe("sata");
  });

  it("gives every stage a colour and a credited photo", () => {
    for (const stage of stages) {
      expect(stage.color).toMatch(/^#/);
      expect(stage.photo.file).toMatch(/^stage-/);
      expect(stage.photo.commons).toContain("commons.wikimedia.org");
      expect(stage.photo.artist.length).toBeGreaterThan(1);
    }
  });
});

describe("effort and day geometry", () => {
  it("computes effort as km plus climbing over ten", () => {
    const hard = dayOf(37)!;
    expect(effortOf(hard)).toBeCloseTo(123.3 + 327.7, 5);
    expect(maxEffort).toBeGreaterThan(400);
    expect(minEffort).toBeLessThan(80);
    expect(fmtEffort(effortOf(hard))).toBe("451");
  });

  it("keeps every overnight inside Japan", () => {
    for (const day of daysWithKm) {
      for (const id of [day.from, day.to]) {
        const p = placeOf(id);
        expect(p.lat).toBeGreaterThanOrEqual(japanBounds.minLat);
        expect(p.lat).toBeLessThanOrEqual(japanBounds.maxLat);
        expect(p.lng).toBeGreaterThanOrEqual(japanBounds.minLng);
        expect(p.lng).toBeLessThanOrEqual(japanBounds.maxLng);
      }
    }
  });

  it("does not pretend day rows already equal the headline track", () => {
    expect(dayKmSum).toBeGreaterThan(3300);
    expect(dayKmSum).toBeLessThan(ride.km);
    expect(dayClimbSum).toBeGreaterThan(40000);
    expect(Math.abs(ride.km - dayKmSum)).toBeGreaterThan(20);
  });
});

describe("basemap", () => {
  it("keeps key-free EN/JA tiles", () => {
    expect(basemaps.en.url).toContain("arcgisonline.com");
    expect(basemaps.ja.url).toContain("cyberjapandata.gsi.go.jp");
    expect(isBasemapId("en")).toBe(true);
    expect(isBasemapId("ja")).toBe(true);
    expect(isBasemapId("fr")).toBe(false);
  });
});
