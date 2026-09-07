import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { basemaps, type BasemapId } from "./data/basemap";
import {
  daysWithKm,
  FERRY_NOTE,
  placeOf,
  places,
  stageOf,
  type RideDay,
} from "./data/ride";

type Props = {
  mapLang: BasemapId;
  selectedDay: number | null;
  onSelectDay: (n: number) => void;
};

const FERRY_STYLE = { color: "#6b5b95", weight: 3, opacity: 0.9, dashArray: "8 7" };

export default function LandLineMap({ mapLang, selectedDay, onSelectDay }: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const selectRef = useRef(onSelectDay);
  selectRef.current = onSelectDay;

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const map = L.map(mapEl.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
    });

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    const soya = places.soya;
    const sata = places.sata;
    map.fitBounds(
      L.latLngBounds([
        [soya.lat, soya.lng],
        [sata.lat, sata.lng],
      ]).pad(0.18),
    );

    return () => {
      map.remove();
      mapRef.current = null;
      tileRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileRef.current) {
      map.removeLayer(tileRef.current);
      tileRef.current = null;
    }
    const spec = basemaps[mapLang];
    tileRef.current = L.tileLayer(spec.url, {
      attribution: spec.attribution,
      maxZoom: spec.maxZoom,
    }).addTo(map);
  }, [mapLang]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.clearLayers();

    function addDayLine(day: RideDay) {
      const from = placeOf(day.from);
      const to = placeOf(day.to);
      const stage = stageOf(day.stageId);
      const line = L.polyline(
        [
          [from.lat, from.lng],
          [to.lat, to.lng],
        ],
        {
          color: selectedDay === day.n ? "#B23A1E" : stage.color,
          weight: selectedDay === day.n ? 6 : 4,
          opacity: 0.95,
          lineCap: "round",
        },
      );
      line.on("click", () => selectRef.current(day.n));
      line.bindTooltip(
        `Day ${day.n} · ${from.name} → ${to.name}<br/>${day.km} km · ${day.climbM} m`,
        { sticky: true },
      );
      line.addTo(layer!);
    }

    for (const day of daysWithKm) {
      addDayLine(day);
      if (day.ferryAfter) {
        const from = placeOf(day.to);
        const next = daysWithKm.find((d) => d.n === day.n + 1);
        if (!next) continue;
        const to = placeOf(next.from);
        L.polyline(
          [
            [from.lat, from.lng],
            [to.lat, to.lng],
          ],
          FERRY_STYLE,
        )
          .bindTooltip(FERRY_NOTE[day.ferryAfter], { sticky: true })
          .addTo(layer);
      }
    }

    for (const pole of [places.soya, places.sata]) {
      L.circleMarker([pole.lat, pole.lng], {
        radius: 9,
        color: "#1a1814",
        weight: 2,
        fillColor: "#B23A1E",
        fillOpacity: 1,
      })
        .bindTooltip(`<strong>${pole.name}</strong> ${pole.nameJa}`, {
          direction: "top",
        })
        .addTo(layer);
    }
  }, [selectedDay]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedDay == null) return;
    const day = daysWithKm.find((d) => d.n === selectedDay);
    if (!day) return;
    const from = placeOf(day.from);
    const to = placeOf(day.to);
    map.fitBounds(
      L.latLngBounds([
        [from.lat, from.lng],
        [to.lat, to.lng],
      ]).pad(0.35),
      { animate: true, maxZoom: 9 },
    );
  }, [selectedDay]);

  return (
    <div className="map-shell">
      <div
        ref={mapEl}
        className="map-canvas"
        role="application"
        aria-label={
          mapLang === "en"
            ? "Map of the bicycle ride from Cape Sōya to Cape Sata, English labels"
            : "Map of the bicycle ride from Cape Sōya to Cape Sata, Japanese labels"
        }
      />
      <div className="map-legend">
        <p className="map-legend-title">Overnight hops</p>
        <span className="legend-item">
          <i className="legend-line" style={{ background: "#7FA8B8" }} />
          Riding day
        </span>
        <span className="legend-item">
          <i className="legend-line dashed" style={{ background: "#6b5b95" }} />
          Ferry
        </span>
        <span className="legend-item">
          <i style={{ background: "#B23A1E" }} />
          Cape
        </span>
      </div>
    </div>
  );
}
