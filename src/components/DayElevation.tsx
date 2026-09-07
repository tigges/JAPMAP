import { fmtKm } from "../data/format";
import { GRADE_BANDS, type DayDetail } from "../data/dayDetails";

const W = 640;
const H = 228;
const PAD = { l: 40, r: 14, t: 18, b: 32 };

function gradeColor(gainM: number, km: number): string {
  const pct = km <= 0 ? 0 : gainM / (km * 10);
  if (pct < 2) return GRADE_BANDS[0].color;
  if (pct < 4) return GRADE_BANDS[1].color;
  if (pct < 7) return GRADE_BANDS[2].color;
  return GRADE_BANDS[3].color;
}

type Props = {
  km: number;
  detail: DayDetail;
};

export default function DayElevation({ km, detail }: Props) {
  const maxE = Math.max(detail.highPointM ?? 0, 160, ...(detail.profile ?? []).map((p) => p.elevM));
  const x = (v: number) => PAD.l + (v / km) * (W - PAD.l - PAD.r);
  const y = (elev: number) => {
    const top = PAD.t;
    const bot = H - PAD.b;
    return bot - (elev / maxE) * (bot - top);
  };

  const profile = detail.profile;
  const hardest = detail.hardestKm;

  return (
    <div className="day-elev">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Elevation profile for this day">
        <rect x="0" y="0" width={W} height={H} fill="#f7f5f1" />
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={PAD.l}
            x2={W - PAD.r}
            y1={y(maxE * t)}
            y2={y(maxE * t)}
            stroke="rgba(17,17,17,0.08)"
          />
        ))}
        <text x={4} y={y(maxE) + 4} className="elev-label">
          {Math.round(maxE)} m
        </text>
        <text x={4} y={H - PAD.b + 4} className="elev-label">
          0
        </text>
        <text x={PAD.l} y={H - 8} className="elev-label">
          0 km
        </text>
        <text x={W - PAD.r} y={H - 8} className="elev-label" textAnchor="end">
          {fmtKm(km)} km
        </text>

        {hardest ? (
          <rect
            x={x(hardest.atKm)}
            y={PAD.t}
            width={Math.max(6, x(hardest.atKm + 1) - x(hardest.atKm))}
            height={H - PAD.t - PAD.b}
            fill="rgba(196,92,74,0.16)"
          />
        ) : null}

        {detail.highPointM != null ? (
          <g>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(detail.highPointM)}
              y2={y(detail.highPointM)}
              stroke="#2c6b7f"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <text x={PAD.l + 4} y={y(detail.highPointM) - 6} className="elev-anno">
              High point {detail.highPointM} m
            </text>
          </g>
        ) : null}

        {profile && profile.length > 1
          ? profile.slice(0, -1).map((prev, i) => {
              const pt = profile[i + 1]!;
              return (
                <line
                  key={`${prev.km}-${pt.km}`}
                  x1={x(prev.km)}
                  y1={y(prev.elevM)}
                  x2={x(pt.km)}
                  y2={y(pt.elevM)}
                  stroke={gradeColor(pt.elevM - prev.elevM, pt.km - prev.km)}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })
          : (
            <text x={W / 2} y={H / 2} className="elev-empty" textAnchor="middle">
              Elevation profile when the track is in-tree
            </text>
          )}
      </svg>
      <ol className="grade-legend">
        {GRADE_BANDS.map((b) => (
          <li key={b.label}>
            <i style={{ background: b.color }} />
            {b.label}
          </li>
        ))}
      </ol>
      {profile ? (
        <p className="elev-caption">
          Schematic. High point and hardest kilometre are from the published day sheet;
          the shape between those facts is not a GPS track.
        </p>
      ) : null}
    </div>
  );
}
