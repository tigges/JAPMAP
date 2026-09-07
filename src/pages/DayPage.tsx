import { Link, Navigate, useParams } from "react-router-dom";
import { fmtClimb, fmtEffort, fmtKm } from "../data/format";
import {
  FERRY_NOTE,
  photoUrl,
  placeOf,
  rideDays,
  stageOf,
} from "../data/ride";

export default function DayPage() {
  const { n } = useParams();
  const num = Number(n);
  const day = rideDays.find((d) => d.n === num);
  if (!day) return <Navigate to="/" replace />;

  const stage = stageOf(day.stageId);
  const from = placeOf(day.from);
  const to = placeOf(day.to);
  const effort = day.km + day.climbM / 10;
  const prev = rideDays.find((d) => d.n === day.n - 1);
  const next = rideDays.find((d) => d.n === day.n + 1);

  return (
    <article className="day-page">
      <p className="eyebrow" style={{ color: stage.color }}>
        Day {day.n} of 42 · Stage {stage.number}
      </p>
      <h1>
        {from.name} → {to.name}
      </h1>
      <p className="lede">
        {from.nameJa} → {to.nameJa}
      </p>
      <dl className="day-facts">
        <div>
          <dt>Distance</dt>
          <dd>{fmtKm(day.km)} km</dd>
        </div>
        <div>
          <dt>Climbing</dt>
          <dd>{fmtClimb(day.climbM)}</dd>
        </div>
        <div>
          <dt>Effort</dt>
          <dd>{fmtEffort(effort)}</dd>
        </div>
      </dl>
      {day.milestone ? (
        <figure className="stage-hero">
          <img
            src={photoUrl(day.n === 1 ? "hero-soya.jpg" : stage.photo.file)}
            alt=""
            width={1200}
            height={750}
          />
          <figcaption>Milestone photography in place for this day.</figcaption>
        </figure>
      ) : (
        <p className="empty-photo">Photograph when we have one.</p>
      )}
      {day.ferryAfter ? <p className="ferry-note">{FERRY_NOTE[day.ferryAfter]}</p> : null}
      <p className="about-links">
        {prev ? <Link to={`/days/${prev.n}`}>← Day {prev.n}</Link> : <span />}
        <Link to={`/stages/${stage.id}`}>Stage {stage.number}</Link>
        {next ? <Link to={`/days/${next.n}`}>Day {next.n} →</Link> : <span />}
      </p>
    </article>
  );
}
