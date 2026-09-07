import { describe, expect, it } from "vitest";
import { basemaps, isBasemapId, MAP_LANG_KEY } from "./basemap";
import { greatCircle, haversineKm } from "./geo";
import { MATCH_LABEL, SEGMENT_STYLE } from "./schema";
import { SITE_VERSION, siteVersionLabel } from "./version";
import {
  gateways,
  gatewayOf,
  japanBounds,
  placeholderLine,
  poles,
  poleToPoleKm,
  spineSegments,
  SPINE_STYLE,
  stages,
  stageOf,
  stats,
  traverse,
} from "./traverse";

describe("the two poles", () => {
  it("names Cape Sata (south) and Cape Soya (north)", () => {
    expect(poles.sata.name).toBe("Cape Sata");
    expect(poles.sata.nameJa).toBe("佐多岬");
    expect(poles.soya.name).toBe("Cape Soya");
    expect(poles.soya.nameJa).toBe("宗谷岬");
    expect(poles.sata.role).toBe("start");
    expect(poles.soya.role).toBe("end");
  });

  it("puts Sata well south of Soya", () => {
    expect(poles.sata.lat).toBeLessThan(poles.soya.lat);
    expect(poles.soya.lat - poles.sata.lat).toBeGreaterThan(14);
  });

  it("keeps both poles inside the Japan bounding box", () => {
    for (const pole of [poles.sata, poles.soya]) {
      expect(pole.lat).toBeGreaterThanOrEqual(japanBounds.minLat);
      expect(pole.lat).toBeLessThanOrEqual(japanBounds.maxLat);
      expect(pole.lng).toBeGreaterThanOrEqual(japanBounds.minLng);
      expect(pole.lng).toBeLessThanOrEqual(japanBounds.maxLng);
    }
  });
});

describe("the traverse", () => {
  it("runs south to north as Cape Sata → Cape Soya", () => {
    expect(traverse.id).toBe("sata-soya");
    expect(traverse.direction).toBe("south-to-north");
    expect(traverse.title).toBe("Cape Sata → Cape Soya");
    expect(traverse.titleJa).toBe("佐多岬 → 宗谷岬");
  });

  it("has six ordered stages, not the nine NHK chapters", () => {
    expect(stages.map((s) => s.id)).toEqual([
      "kyushu",
      "seto",
      "kansai",
      "alps",
      "tohoku",
      "hokkaido",
    ]);
    expect(stages.map((s) => s.order)).toEqual([1, 2, 3, 4, 5, 6]);
    for (const stage of stages) {
      expect(stageOf(stage.id)).toBe(stage);
      expect(stage.kana.length).toBeGreaterThan(0);
      expect(stage.tagline.length).toBeGreaterThan(20);
    }
  });
});

describe("the spine gateways", () => {
  it("string south to north, starting at Sata and ending at Soya", () => {
    expect(gateways[0]?.id).toBe("sata");
    expect(gateways[gateways.length - 1]?.id).toBe("soya");
    for (let i = 1; i < gateways.length; i++) {
      expect(gateways[i]!.lat).toBeGreaterThan(gateways[i - 1]!.lat);
    }
  });

  it("keeps every gateway in the Japan bounding box and tied to a real stage", () => {
    const stageIds = new Set(stages.map((s) => s.id));
    for (const g of gateways) {
      expect(stageIds.has(g.stage)).toBe(true);
      expect(g.lat).toBeGreaterThanOrEqual(japanBounds.minLat);
      expect(g.lat).toBeLessThanOrEqual(japanBounds.maxLat);
      expect(g.lng).toBeGreaterThanOrEqual(japanBounds.minLng);
      expect(g.lng).toBeLessThanOrEqual(japanBounds.maxLng);
    }
    expect(gatewayOf("soya").name).toBe("Cape Soya");
  });

  it("connects gateways into one continuous spine", () => {
    const ids = new Set(gateways.map((g) => g.id));
    for (const seg of spineSegments) {
      expect(ids.has(seg.from)).toBe(true);
      expect(ids.has(seg.to)).toBe(true);
    }
    // Segments chain end-to-end from Sata to Soya.
    for (let i = 1; i < spineSegments.length; i++) {
      expect(spineSegments[i]!.from).toBe(spineSegments[i - 1]!.to);
    }
    expect(spineSegments[0]!.from).toBe("sata");
    expect(spineSegments[spineSegments.length - 1]!.to).toBe("soya");
  });

  it("draws the ride solid vermillion and marks the ferry dashed purple", () => {
    expect(SPINE_STYLE.ride.color).toBe("#c4452d");
    expect(SPINE_STYLE.ride.dash).toBeUndefined();
    expect(SPINE_STYLE.ferry.color).toBe("#6b5b95");
    expect(SPINE_STYLE.ferry.dash).toBeTruthy();
    expect(SPINE_STYLE.train.dash).toBeTruthy();

    const ferry = spineSegments.find((s) => s.mode === "ferry");
    expect(ferry?.id).toBe("aomori-hakodate");
    // The Tsugaru crossing is access, never stroked as a ridden road.
    expect(ferry?.mode).not.toBe("ride");
  });
});

describe("the placeholder great circle", () => {
  it("is a straight globe line from Sata to Soya, not a GPS route", () => {
    expect(placeholderLine.length).toBeGreaterThan(2);
    const [first] = placeholderLine;
    const last = placeholderLine[placeholderLine.length - 1];
    expect(first![0]).toBeCloseTo(poles.sata.lat, 3);
    expect(last![0]).toBeCloseTo(poles.soya.lat, 3);
    for (const [lat, lng] of placeholderLine) {
      expect(lat).toBeGreaterThanOrEqual(japanBounds.minLat);
      expect(lat).toBeLessThanOrEqual(japanBounds.maxLat);
      expect(lng).toBeGreaterThanOrEqual(japanBounds.minLng);
      expect(lng).toBeLessThanOrEqual(japanBounds.maxLng);
    }
  });

  it("reports an honest as-the-crow-flies distance", () => {
    expect(poleToPoleKm).toBeGreaterThan(1500);
    expect(poleToPoleKm).toBeLessThan(2200);
    expect(stats.poleToPoleKm).toBe(poleToPoleKm);
    expect(haversineKm([0, 0], [0, 0])).toBe(0);
    expect(greatCircle([0, 0], [0, 0]).length).toBe(2);
  });
});

describe("basemap", () => {
  it("offers English and Japanese key-free tiles, never Carto", () => {
    expect(basemaps.en.url).toContain("arcgisonline.com");
    expect(basemaps.ja.url).toContain("cyberjapandata.gsi.go.jp");
    expect(basemaps.en.label).toBe("English");
    expect(basemaps.ja.label).toBe("日本語");
    expect(basemaps.en.url.toLowerCase()).not.toContain("carto");
    expect(basemaps.ja.url.toLowerCase()).not.toContain("carto");
  });

  it("switches between the two language ids and validates them", () => {
    expect(isBasemapId("en")).toBe(true);
    expect(isBasemapId("ja")).toBe(true);
    expect(isBasemapId("fr")).toBe(false);
    expect(isBasemapId(null)).toBe(false);
    expect(MAP_LANG_KEY).toBe("japmap-map-lang");
  });
});

describe("shared schema stays intact", () => {
  it("keeps segment styles and match labels for later phases", () => {
    expect(SEGMENT_STYLE.ferry.dash).toBeTruthy();
    expect(SEGMENT_STYLE.train.dash).toBeTruthy();
    expect(SEGMENT_STYLE.coast.color).toBe("#1d6f8a");
    expect(MATCH_LABEL.on).toContain("official");
  });
});

describe("site version", () => {
  it("is a positive integer that ticks with each git step", () => {
    expect(Number.isInteger(SITE_VERSION)).toBe(true);
    expect(SITE_VERSION).toBeGreaterThan(0);
    expect(siteVersionLabel()).toBe(`v${SITE_VERSION}`);
  });
});
