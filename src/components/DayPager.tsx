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

function Hop({
  day,
  dir,
}: {
  day: DayWithKm;
  dir: "prev" | "next";
}) {
  const label = hopLabel(day);
  return (
    <Link
      className="day-pager-hop"
      to={`/days/${day.n}`}
      aria-label={`${dir === "prev" ? "Previous" : "Next"} day, ${label}`}
    >
      {dir === "prev" ? <span className="day-pager-chevron">‹</span> : null}
      <span className="day-pager-hop-places">
        {placeOf(day.from).name} <span className="day-pager-arrow">→</span>{" "}
        {placeOf(day.to).name}
      </span>
      {dir === "next" ? <span className="day-pager-chevron">›</span> : null}
    </Link>
  );
}

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
          {prev ? <Hop day={prev} dir="prev" /> : null}
          {next ? <Hop day={next} dir="next" /> : null}
        </div>
      </nav>
      <p className="day-pager-stage">
        Stage {stage.number}, {stage.name} · Day {ordinal.index} of {ordinal.of}
      </p>
    </>
  );
}
