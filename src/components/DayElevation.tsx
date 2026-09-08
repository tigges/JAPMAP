import { fmtKm } from "../data/format";
import { GRADE_BANDS, highPointKm, milestonesOf, type DayDetail } from "../data/dayDetails";

const W = 640;
const H = 248;
const PAD = { l: 44, r: 22, t: 46, b: 32 };

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

        {hardest ? (
          <text x={W - PAD.r} y={14} className="elev-anno" textAnchor="end">
            shaded band = hardest kilometre
          </text>
        ) : null}

        {milestonesOf(detail)
          .filter((p) => p.atKm != null)
          .map((p) => {
            const raw = x(p.atKm!);
            const px = Math.min(W - PAD.r - 10, Math.max(PAD.l + 10, raw));
            return (
              <g key={p.n}>
                <line
                  x1={raw}
                  x2={raw}
                  y1={PAD.t}
                  y2={H - PAD.b}
                  stroke="rgba(178,58,30,0.35)"
                  strokeDasharray="3 3"
                />
                <rect x={px - 8} y={8} width={16} height={16} rx={2} fill="#b23a1e" />
                <text
                  x={px}
                  y={20}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {p.n}
                </text>
              </g>
            );
          })}
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
            <text
              x={Math.min(
                x(highPointKm(detail) ?? km / 2) + 8,
                W - PAD.r - 4,
              )}
              y={y(detail.highPointM) - 6}
              className="elev-anno"
            >
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
          : milestonesOf(detail).some((p) => p.atKm != null)
            ? null
            : (
            <text x={W / 2} y={H / 2} className="elev-empty" textAnchor="middle">
              Elevation profile when the track is in-tree
            </text>
          )}
      </svg>
      {profile ? (
        <ol className="grade-legend">
          {GRADE_BANDS.map((b) => (
            <li key={b.label}>
              <i style={{ background: b.color }} />
              {b.label}
            </li>
          ))}
        </ol>
      ) : null}
      {profile ? (
        <p className="elev-caption">
          Schematic. High point and hardest kilometre are from the published day sheet;
          the shape between those facts is not a GPS track.
        </p>
      ) : detail.hardestKm || detail.highPointM != null ? (
        <p className="elev-caption">
          High point and hardest kilometre from the published day sheet. Elevation
          track when we have one.
        </p>
      ) : null}
    </div>
  );
}
