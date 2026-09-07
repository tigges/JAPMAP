import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { basemaps, type BasemapId } from "./data/basemap";
import {
  gatewayOf,
  gateways,
  placeholderLine,
  poles,
  spineSegments,
  SPINE_STYLE,
  stageOf,
} from "./data/traverse";

type Props = {
  mapLang: BasemapId;
};

export default function LandLineMap({ mapLang }: Props) {
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;

    const map = L.map(mapEl.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    map.fitBounds(
      L.latLngBounds([
        [poles.sata.lat, poles.sata.lng],
        [poles.soya.lat, poles.soya.lng],
      ]).pad(0.15),
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

    // The joke line: a straight great circle, NOT a GPS route.
    L.polyline(
      placeholderLine.map(([lat, lng]) => L.latLng(lat, lng)),
      { color: "#8a8680", weight: 2, opacity: 0.7, dashArray: "2 9", lineCap: "round" },
    )
      .bindTooltip("Straight-line placeholder — the ride is not this line.", {
        sticky: true,
        opacity: 0.95,
      })
      .addTo(layer);

    // The overview spine: solid vermillion ride, dashed only for train / ferry.
    for (const seg of spineSegments) {
      const from = gatewayOf(seg.from);
      const to = gatewayOf(seg.to);
      const style = SPINE_STYLE[seg.mode];
      L.polyline(
        [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
        {
          color: style.color,
          weight: style.weight,
          opacity: 0.95,
          dashArray: style.dash,
          lineCap: "round",
        },
      )
        .bindTooltip(
          `${from.name} → ${to.name} · ${style.label}${seg.note ? `<br/>${seg.note}` : ""}`,
          { sticky: true, opacity: 0.95 },
        )
        .addTo(layer);
    }

    // Gateways between the poles.
    for (const g of gateways) {
      if (g.id === "sata" || g.id === "soya") continue;
      const stage = stageOf(g.stage);
      L.circleMarker([g.lat, g.lng], {
        radius: 6,
        color: "#1a1814",
        weight: 1,
        fillColor: stage.color,
        fillOpacity: 1,
      })
        .bindTooltip(
          `<strong>${g.name}</strong> ${g.nameJa}<br/>${stage.name} · ${stage.kana}`,
          { direction: "top", opacity: 0.95 },
        )
        .addTo(layer);
    }

    // The two poles, larger and labelled.
    for (const pole of [poles.sata, poles.soya]) {
      L.circleMarker([pole.lat, pole.lng], {
        radius: 10,
        color: "#1a1814",
        weight: 2,
        fillColor: "#c4452d",
        fillOpacity: 1,
      })
        .bindTooltip(
          `<strong>${pole.name}</strong> ${pole.nameJa}<br/>${
            pole.role === "start" ? "South pole · start" : "North pole · end"
          }`,
          { direction: "top", opacity: 0.95, permanent: false },
        )
        .addTo(layer);
    }
  }, []);

  return (
    <div className="map-shell">
      <div
        ref={mapEl}
        className="map-canvas"
        role="application"
        aria-label={
          mapLang === "en"
            ? "Japan pole-to-pole map, English labels"
            : "Japan pole-to-pole map, Japanese labels"
        }
      />
      <div className="map-legend">
        <p className="map-legend-title">Land line</p>
        <span className="legend-item">
          <i className="legend-line" style={{ background: SPINE_STYLE.ride.color }} />
          Planned ride
        </span>
        <span className="legend-item">
          <i className="legend-line dashed" style={{ background: SPINE_STYLE.ferry.color }} />
          Ferry (access)
        </span>
        <span className="legend-item">
          <i className="legend-line ghost" style={{ background: "#8a8680" }} />
          Straight-line placeholder
        </span>
        <span className="legend-item">
          <i style={{ background: "#c4452d" }} />
          Pole (Sata / Soya)
        </span>
      </div>
    </div>
  );
}
