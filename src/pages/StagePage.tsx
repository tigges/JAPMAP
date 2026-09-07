import { Link, Navigate, useParams } from "react-router-dom";
import { STAGE_NOTES } from "../data/japanrideTouch";
import { fmtClimb, fmtInt, fmtKm } from "../data/format";
import {
  STAGE_SUBTITLE,
  daysOfStage,
  photoUrl,
  placeOf,
  ride,
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
  const subtitle = STAGE_SUBTITLE[stage.id];

  return (
    <article className="detail-page stage-page">
      <p className="detail-crumb">
        <Link to="/">{ride.titlePlaces}</Link>
        {" · "}
        Stage {stage.number}, {stage.name}
      </p>

      <header
        className="detail-banner"
        style={{ background: `color-mix(in srgb, ${stage.color} 45%, #1c3f4a)` }}
      >
        <p className="detail-banner-kicker">Stage {stage.number}</p>
        <div>
          <p className="detail-banner-sub">{subtitle}</p>
          <h1>{stage.name}</h1>
        </div>
      </header>

      <div className="detail-intro">
        <div className="detail-narrative">
          <p>{STAGE_NOTES[stage.id]}</p>
        </div>
        <aside className="this-day">
          <h2>This stage</h2>
          <dl>
            <div>
              <dt>From</dt>
              <dd>
                {from.name}
                <small>{from.nameJa}</small>
              </dd>
            </div>
            <div>
              <dt>To</dt>
              <dd>
                {to.name}
                <small>{to.nameJa}</small>
              </dd>
            </div>
            <div>
              <dt>Days</dt>
              <dd>
                {days[0]?.n}–{days[days.length - 1]?.n} of 42
              </dd>
            </div>
            <div>
              <dt>Stage km</dt>
              <dd>{fmtInt(stage.km)} km</dd>
            </div>
          </dl>
        </aside>
      </div>

      <dl className="detail-stats">
        <div>
          <dt>[Total travel distance]</dt>
          <dd>{fmtInt(stage.km)} km</dd>
        </div>
        <div>
          <dt>[Elevation gain]</dt>
          <dd>{fmtClimb(stage.climbM)}</dd>
        </div>
      </dl>

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
              Day {day.n} · {placeOf(day.from).name} to {placeOf(day.to).name}
              <span>
                {fmtKm(day.km)} km · {fmtClimb(day.climbM)}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="detail-foot">
        <Link to="/#stages">↑ Ride overview</Link>
        <span className="detail-credit-inline">Real, sourced photographs</span>
      </p>
    </article>
  );
}
