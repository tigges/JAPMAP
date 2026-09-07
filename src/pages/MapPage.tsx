import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LandLineMap from "../LandLineMap";
import {
  basemaps,
  isBasemapId,
  MAP_LANG_KEY,
  type BasemapId,
} from "../data/basemap";
import { fmtClimb, fmtKm } from "../data/format";
import { daysWithKm, placeOf, stageOf } from "../data/ride";

export default function MapPage() {
  const [mapLang, setMapLang] = useState<BasemapId>(() => {
    try {
      const saved = localStorage.getItem(MAP_LANG_KEY);
      return isBasemapId(saved) ? saved : "en";
    } catch {
      return "en";
    }
  });
  const [selected, setSelected] = useState<number | null>(null);

  const selectedDay = useMemo(
    () => daysWithKm.find((d) => d.n === selected) ?? null,
    [selected],
  );

  function chooseMapLang(id: BasemapId) {
    setMapLang(id);
    try {
      localStorage.setItem(MAP_LANG_KEY, id);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="map-page">
      <div className="map-intro">
        <p className="eyebrow">Overnight towns, Sōya at the top, Sata at the bottom</p>
        <h1>The land line</h1>
        <p>
          Forty-two days as hops between named towns — not the GPS yet. Solid strokes
          are riding days; dashed purple is a ferry. Click a day to zoom.
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
        {selectedDay ? (
          <Link className="map-day-link" to={`/days/${selectedDay.n}`}>
            Day {selectedDay.n} notes →
          </Link>
        ) : null}
      </div>
      <div className="map-layout">
        <LandLineMap mapLang={mapLang} selectedDay={selected} onSelectDay={setSelected} />
        <aside className="stop-panel">
          <p className="stop-kicker">North to south · 42 days</p>
          <h2>Days</h2>
          <ol className="stop-list">
            {daysWithKm.map((day) => {
              const stage = stageOf(day.stageId);
              const from = placeOf(day.from);
              const to = placeOf(day.to);
              return (
                <li key={day.n}>
                  <button
                    type="button"
                    className={selected === day.n ? "stop-row on" : "stop-row"}
                    onClick={() => setSelected(day.n)}
                  >
                    <span className="idx" style={{ color: stage.color }}>
                      {String(day.n).padStart(2, "0")}
                    </span>
                    <span>
                      <strong>
                        {from.name} → {to.name}
                      </strong>
                      <small>
                        {fmtKm(day.km)} km · {fmtClimb(day.climbM)} · stage {stage.number}
                      </small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>
    </section>
  );
}
