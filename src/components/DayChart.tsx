import { useState } from "react";
import { Link } from "react-router-dom";
import { fmtClimb, fmtEffort, fmtKm } from "../data/format";
import {
  chartTicks,
  daysWithKm,
  maxEffort,
  placeOf,
  ride,
  stageOf,
  type DayWithKm,
} from "../data/ride";

type Props = {
  onPick?: (day: DayWithKm) => void;
};

export default function DayChart({ onPick }: Props) {
  const [hover, setHover] = useState<DayWithKm | null>(null);
  const shown = hover;

  return (
    <section className="chart-section" id="chart">
      <div className="section-split">
        <h2>The whole ride, end to end</h2>
        <p className="section-note">
          Each bar is one day. Width is distance, height is effort — kilometres plus
          climbing over ten.
        </p>
      </div>
      <div
        className="day-chart"
        role="img"
        aria-label={`Forty-two riding days, ${ride.title}`}
        onMouseLeave={() => setHover(null)}
      >
        {daysWithKm.map((day) => {
          const stage = stageOf(day.stageId);
          const active = shown?.n === day.n;
          return (
            <Link
              key={day.n}
              to={`/days/${day.n}`}
              className={active ? "day-bar on" : "day-bar"}
              style={{
                flexGrow: day.km,
                height: `${Math.max(12, (day.effort / maxEffort) * 100)}%`,
                background: active ? "#B23A1E" : stage.color,
              }}
              aria-label={`Day ${day.n}, ${placeOf(day.from).name} to ${placeOf(day.to).name}, ${fmtKm(day.km)} kilometres, ${fmtClimb(day.climbM)} climbing, effort ${fmtEffort(day.effort)}`}
              onMouseEnter={() => setHover(day)}
              onFocus={() => setHover(day)}
              onClick={() => onPick?.(day)}
            />
          );
        })}
      </div>
      <div className="chart-axis">
        {chartTicks.map((tick) => (
          <span
            key={`${tick.label}-${tick.km}`}
            style={{ left: `${(tick.km / ride.km) * 100}%` }}
          >
            {tick.label ? `${tick.label.toUpperCase()} ${fmtKm(tick.km)}` : fmtKm(tick.km)}
          </span>
        ))}
      </div>
      <p className="chart-tip" aria-live="polite">
        {shown ? (
          <>
            Day {shown.n} · {placeOf(shown.from).name} → {placeOf(shown.to).name}
            <span>
              {fmtKm(shown.km)} km · {fmtClimb(shown.climbM)} climbing · effort{" "}
              {fmtEffort(shown.effort)} · Stage {stageOf(shown.stageId).number}
            </span>
          </>
        ) : (
          <span className="muted">Hover or focus a bar for the day.</span>
        )}
      </p>
    </section>
  );
}
