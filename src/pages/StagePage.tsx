import { Link, Navigate, useParams } from "react-router-dom";
import { fmtClimb, fmtInt, fmtKm } from "../data/format";
import {
  daysOfStage,
  photoUrl,
  placeOf,
  stageOf,
  type StageId,
} from "../data/ride";

const IDS: StageId[] = [
  "hokkaido",
  "tohoku",
  "hokuriku",
  "cutacross",
  "sanyo",
  "kyushu",
  "satsuma",
];

export default function StagePage() {
  const { id } = useParams();
  if (!id || !IDS.includes(id as StageId)) return <Navigate to="/" replace />;
  const stage = stageOf(id as StageId);
  const from = placeOf(stage.from);
  const to = placeOf(stage.to);
  const days = daysOfStage(stage.id);

  return (
    <article className="stage-page">
      <p className="eyebrow" style={{ color: stage.color }}>
        Stage {stage.number} · {stage.nameJa}
      </p>
      <h1>{stage.name}</h1>
      <p className="lede">
        {from.name} to {to.name} · {fmtInt(stage.km)} km · {fmtClimb(stage.climbM)} ·{" "}
        {stage.days} {stage.days === 1 ? "day" : "days"}
      </p>
      <figure className="stage-hero">
        <img src={photoUrl(stage.photo.file)} alt="" width={1200} height={750} />
        <figcaption>
          Photo: {stage.photo.artist}, {stage.photo.license}, via{" "}
          <a href={stage.photo.commons} target="_blank" rel="noreferrer">
            Wikimedia Commons
          </a>
        </figcaption>
      </figure>
      <ol className="stage-day-links">
        {days.map((day) => (
          <li key={day.n}>
            <Link to={`/days/${day.n}`}>
              Day {day.n} · {placeOf(day.from).name} → {placeOf(day.to).name}
              <span>
                {fmtKm(day.km)} km · {fmtClimb(day.climbM)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="about-links">
        <Link to="/#stages">All stages</Link>
        <Link to="/map">Map</Link>
      </p>
    </article>
  );
}
