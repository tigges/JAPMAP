import { Link } from "react-router-dom";
import {
  dayWithKmOf,
  hopLabel,
  placeOf,
  ride,
  stageDayOrdinal,
  stageOf,
  type DayWithKm,
} from "../data/ride";

type Props = {
  day: DayWithKm;
};

export default function DayPager({ day }: Props) {
  const prev = dayWithKmOf(day.n - 1);
  const next = dayWithKmOf(day.n + 1);
  const stage = stageOf(day.stageId);
  const ordinal = stageDayOrdinal(day);

  return (
    <>
      <nav className="day-pager" aria-label="Day">
        <Link className="day-pager-all" to="/#days">
          ← All 42 days
        </Link>
        <p className="day-pager-index">
          Day {day.n} of {ride.ridingDays}
        </p>
        <div className="day-pager-hops">
          {prev ? (
            <Link
              className="day-pager-hop"
              to={`/days/${prev.n}`}
              aria-label={`Previous day, ${hopLabel(prev)}`}
            >
              ‹ {placeOf(prev.from).name} → {placeOf(prev.to).name}
            </Link>
          ) : null}
          {next ? (
            <Link
              className="day-pager-hop"
              to={`/days/${next.n}`}
              aria-label={`Next day, ${hopLabel(next)}`}
            >
              {placeOf(next.from).name} → {placeOf(next.to).name} ›
            </Link>
          ) : null}
        </div>
      </nav>
      <p className="day-pager-stage">
        Stage {stage.number}, {stage.name} · Day {ordinal.index} of {ordinal.of}
      </p>
    </>
  );
}

