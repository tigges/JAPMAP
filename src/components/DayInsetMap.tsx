import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { basemaps } from "../data/basemap";
import type { DayPhoto } from "../data/dayDetails";
import type { Place } from "../data/ride";

type Props = {
  from: Place;
  to: Place;
  color: string;
  photos: DayPhoto[];
};

export default function DayInsetMap({ from, to, color, photos }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!el.current || mapRef.current) return;

    const map = L.map(el.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    L.tileLayer(basemaps.en.url, {
      attribution: basemaps.en.attribution,
      maxZoom: basemaps.en.maxZoom,
    }).addTo(map);

    L.polyline(
      [
        [from.lat, from.lng],
        [to.lat, to.lng],
      ],
      { color, weight: 4, opacity: 0.95 },
    ).addTo(map);

    const pts: L.LatLngExpression[] = [
      [from.lat, from.lng],
      [to.lat, to.lng],
    ];

    for (const photo of photos) {
      if (photo.lat == null || photo.lng == null) continue;
      pts.push([photo.lat, photo.lng]);
      const icon = L.divIcon({
        className: "day-pin-wrap",
        html: `<span class="day-pin">${photo.n}</span>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      L.marker([photo.lat, photo.lng], { icon })
        .bindTooltip(`${photo.n}. ${photo.title}`, { direction: "top" })
        .addTo(map);
    }

    if (photos.length === 0) {
      L.circleMarker([from.lat, from.lng], {
        radius: 7,
        color: "#1a1814",
        weight: 2,
        fillColor: color,
        fillOpacity: 1,
      })
        .bindTooltip(from.name, { direction: "top" })
        .addTo(map);
      L.circleMarker([to.lat, to.lng], {
        radius: 7,
        color: "#1a1814",
        weight: 2,
        fillColor: "#fff",
        fillOpacity: 1,
      })
        .bindTooltip(to.name, { direction: "top" })
        .addTo(map);
    }

    map.fitBounds(L.latLngBounds(pts).pad(0.28), { maxZoom: 11 });
    mapRef.current = map;

    const onResize = () => map.invalidateSize();
    const t = window.setTimeout(onResize, 80);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
    };
  }, [from, to, color, photos]);

  return (
    <div
      ref={el}
      className="day-inset-map"
      role="application"
      aria-label={`Map of ${from.name} to ${to.name}`}
    />
  );
}
