import { Link } from "react-router-dom";
import { fmtClimb, fmtInt, fmtKm } from "../data/format";
import {
  daysOfStage,
  FERRY_NOTE,
  maxEffort,
  placeOf,
  stages,
  type RideDay,
} from "../data/ride";

function DayRow({ day }: { day: RideDay }) {
  const effort = day.km + day.climbM / 10;
  const from = placeOf(day.from);
  const to = placeOf(day.to);
  return (
    <li>
      <Link className="day-row" to={`/days/${day.n}`} id={`day-${day.n}`}>
        <span className="day-n">Day {day.n}</span>
        <span className="day-route">
          {from.name} → {to.name}
          {day.milestone ? <i className="day-dot" title="Milestone photograph" /> : null}
        </span>
        <span className="day-km">{fmtKm(day.km)} km</span>
        <span className="day-climb">{fmtClimb(day.climbM)}</span>
        <span className="day-effort-track" aria-hidden="true">
          <i
            style={{
              width: `${(effort / maxEffort) * 100}%`,
              background: stages.find((s) => s.id === day.stageId)?.color,
            }}
          />
        </span>
      </Link>
      {day.ferryAfter ? (
        <p className="ferry-note">{FERRY_NOTE[day.ferryAfter]}</p>
      ) : null}
    </li>
  );
}

export default function DayList() {
  return (
    <section className="days-section" id="days">
      <div className="section-split">
        <h2>Every day</h2>
        <p className="section-note">
          A filled dot marks a day with milestone photography in place.
        </p>
      </div>
      {stages.map((stage) => {
        const days = daysOfStage(stage.id);
        return (
          <details key={stage.id} className="stage-days" id={`stage-${stage.id}`} open>
            <summary>
              <i style={{ background: stage.color }} />
              <span>
                Stage {stage.number} · {stage.name}
              </span>
              <b>
                {stage.days} {stage.days === 1 ? "day" : "days"} · {fmtInt(stage.km)} km
              </b>
            </summary>
            <ol>
              {days.map((day) => (
                <DayRow key={day.n} day={day} />
              ))}
            </ol>
          </details>
        );
      })}
    </section>
  );
}
