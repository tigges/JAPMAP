import { useState } from "react";
import LandLineMap from "../LandLineMap";
import {
  basemaps,
  isBasemapId,
  MAP_LANG_KEY,
  type BasemapId,
} from "../data/basemap";
import { gateways, spineSegments, stageOf } from "../data/traverse";

export default function MapPage() {
  const [mapLang, setMapLang] = useState<BasemapId>(() => {
    try {
      const saved = localStorage.getItem(MAP_LANG_KEY);
      return isBasemapId(saved) ? saved : "en";
    } catch {
      return "en";
    }
  });

  function chooseMapLang(id: BasemapId) {
    setMapLang(id);
    try {
      localStorage.setItem(MAP_LANG_KEY, id);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="map-section" id="map">
      <div className="section-head">
        <p className="eyebrow">The whole line, Sata at the bottom, Soya at the top</p>
        <h2>The land line</h2>
        <p>
          Phase 0: two poles, the stage gateways between them, and a solid vermillion
          spine. The faint dashed line is a straight great circle — a placeholder to
          make the point that the real ride is <em>not</em> that line. The one dashed
          purple hop is the Tsugaru Strait ferry: part of the land line as access,
          never a filmed road.
        </p>
      </div>

      <div className="map-toolbar">
        <div className="lang-pills" role="radiogroup" aria-label="Map labels">
          <span className="lang-label">Map labels</span>
          {(Object.keys(basemaps) as BasemapId[]).map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={mapLang === id}
              className={mapLang === id ? "pill on" : "pill"}
              onClick={() => chooseMapLang(id)}
            >
              {basemaps[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="map-layout">
        <LandLineMap mapLang={mapLang} />
        <aside className="stop-panel">
          <p className="stop-kicker">Sata → Soya · south to north</p>
          <h3>Stage gateways</h3>
          <ol className="stop-list">
            {gateways.map((g, i) => {
              const stage = stageOf(g.stage);
              return (
                <li key={g.id}>
                  <span className="stop-row static">
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <strong>
                        {g.name} <small className="ja">{g.nameJa}</small>
                      </strong>
                      <small style={{ color: stage.color }}>
                        {stage.name} · {stage.kana}
                      </small>
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="muted tight">
            {spineSegments.length} spine segments ·{" "}
            {spineSegments.filter((s) => s.mode === "ferry").length} ferry crossing.
            Days, overnights, and official-route underlays arrive in later phases.
          </p>
        </aside>
      </div>
    </section>
  );
}
