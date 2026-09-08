import { fmtInt } from "../data/format";
import { kmWindow, ride, type DayWithKm } from "../data/ride";

type Props = {
  day: DayWithKm;
};

export default function RideKmBar({ day }: Props) {
  const span = kmWindow(day);
  const donePct = (day.kmStart / ride.km) * 100;
  const todayPct = Math.max(0.5, (day.km / ride.km) * 100);

  return (
    <div
      className="ride-km-bar"
      role="img"
      aria-label={`${fmtInt(span.behind)} kilometres behind, ${fmtInt(span.ahead)} kilometres ahead`}
    >
      <span>
        {fmtInt(span.behind)} km behind
      </span>
      <div className="ride-km-track">
        <i className="ride-km-done" style={{ width: `${donePct}%` }} />
        <i
          className="ride-km-today"
          style={{ left: `${donePct}%`, width: `${todayPct}%` }}
        />
      </div>
      <span>
        {fmtInt(span.ahead)} km ahead
      </span>
    </div>
  );
}
