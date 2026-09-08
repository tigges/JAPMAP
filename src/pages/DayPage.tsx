import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DayElevation from "../components/DayElevation";
import DayInsetMap from "../components/DayInsetMap";
import DayPager from "../components/DayPager";
import {
  PHOTO_SECTIONS,
  detailOf,
  emptySlotNumber,
  slotsForKind,
  subtitleFor,
} from "../data/dayDetails";
import { fmtClimb, fmtInt, fmtKm } from "../data/format";
import {
  FERRY_NOTE,
  dayWithKmOf,
  kmWindow,
  photoUrl,
  placeOf,
  ride,
  rideDays,
  stageKmProgress,
  stageOf,
} from "../data/ride";

export default function DayPage() {
  const { n } = useParams();
  const navigate = useNavigate();
  const num = Number(n);
  const day = rideDays.find((d) => d.n === num);
  const prev = day ? rideDays.find((d) => d.n === day.n - 1) : undefined;
  const next = day ? rideDays.find((d) => d.n === day.n + 1) : undefined;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && prev) navigate(`/days/${prev.n}`);
      if (e.key === "ArrowRight" && next) navigate(`/days/${next.n}`);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, prev, next]);

  if (!day) return <Navigate to="/" replace />;

  const dayFull = dayWithKmOf(day.n);
  const span = dayFull ? kmWindow(dayFull) : null;
  const stage = stageOf(day.stageId);
  const from = placeOf(day.from);
  const to = placeOf(day.to);
  const detail = detailOf(day.n);
  const progress = stageKmProgress(day);
  const subtitle = subtitleFor(stage.id, detail);
  const hasPins = detail.photos.some((p) => p.lat != null);

  return (
    <article className="detail-page day-page">
      {dayFull ? <DayPager day={dayFull} /> : null}

      <header
        className="detail-banner"
        style={{ background: `color-mix(in srgb, ${stage.color} 45%, #1c3f4a)` }}
      >
        <p className="detail-banner-kicker">Day {day.n}</p>
        <div>
          <p className="detail-banner-sub">{subtitle}</p>
          <h1>
            {from.name} to {to.name}
          </h1>
        </div>
      </header>

      {span && dayFull ? (
        <div
          className="ride-km-bar"
          role="img"
          aria-label={`${fmtInt(span.behind)} kilometres behind, ${fmtInt(span.ahead)} kilometres ahead`}
        >
          <span>{fmtInt(span.behind)} km behind</span>
          <div className="ride-km-track">
            <i
              style={{
                left: `${(dayFull.kmStart / ride.km) * 100}%`,
                width: `${Math.max(0.55, (dayFull.km / ride.km) * 100)}%`,
              }}
            />
          </div>
          <span>{fmtInt(span.ahead)} km ahead</span>
        </div>
      ) : null}

      <div className="detail-intro">
        <div className="detail-narrative">
          {detail.narrative ? (
            <p>{detail.narrative}</p>
          ) : (
            <p>
              Day {day.n} of the ride: {from.name} ({from.nameJa}) to {to.name} ({to.nameJa})
              along Stage {stage.number}, {stage.name}. Notes land here when we have them —
              this page is not a journal entry.
            </p>
          )}
        </div>
        <aside className="this-day">
          <h2>This day</h2>
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
              <dt>Stage progress</dt>
              <dd>
                {fmtKm(progress.start)} → {fmtKm(progress.end)} km
              </dd>
            </div>
            <div>
              <dt>High point</dt>
              <dd>{detail.highPointM != null ? `${detail.highPointM} m` : "—"}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <dl className="detail-stats">
        <div>
          <dt>[Total travel distance]</dt>
          <dd>{fmtKm(day.km)} km</dd>
        </div>
        <div>
          <dt>[Elevation gain]</dt>
          <dd>{fmtClimb(day.climbM)}</dd>
        </div>
      </dl>

      <div className="detail-viz">
        <DayElevation km={day.km} detail={detail} />
        <div>
          <DayInsetMap from={from} to={to} color={stage.color} photos={detail.photos} />
          <p className="pin-caption">
            {hasPins
              ? "Numbered pins match the photographs below"
              : "Overnight hop — not the GPS yet"}
          </p>
        </div>
      </div>

      {PHOTO_SECTIONS.map((section) => (
        <section key={section.kind} className="photo-block">
          <h2>{section.heading}</h2>
          <div className="photo-grid">
            {slotsForKind(detail, section.kind).map((photo, i) =>
              photo ? (
                <figure key={photo.n} className="photo-card">
                  <b className="photo-num">{photo.n}</b>
                  <img src={photoUrl(photo.file)} alt={photo.title} width={960} height={640} />
                  <figcaption>
                    <strong>{photo.title}</strong>
                    <span>{photo.subtitle}</span>
                    <small>
                      Photo: {photo.artist}, {photo.license}, via{" "}
                      <a href={photo.commons} target="_blank" rel="noreferrer">
                        Wikimedia Commons
                      </a>
                    </small>
                  </figcaption>
                </figure>
              ) : (
                <figure key={`${section.kind}-empty-${i}`} className="photo-card empty">
                  <b className="photo-num muted">{emptySlotNumber(section.kind, i)}</b>
                  <div className="photo-ph">Photograph when we have one.</div>
                  <figcaption>
                    <strong>{section.heading}</strong>
                  </figcaption>
                </figure>
              ),
            )}
          </div>
        </section>
      ))}

      {detail.hardestKm ? (
        <p className="hardest-callout">
          The hardest kilometre of the day gains {detail.hardestKm.gainM} m, starting at{" "}
          {detail.hardestKm.atKm} km into the ride.
        </p>
      ) : null}

      {day.ferryAfter ? <p className="ferry-note">{FERRY_NOTE[day.ferryAfter]}</p> : null}

      <nav className="detail-foot day-nav" aria-label="Day and stage">
        <span className="detail-foot-prev">
          {prev ? <Link to={`/days/${prev.n}`}>← Day {prev.n}</Link> : null}
        </span>
        <Link to={`/stages/${stage.id}`}>↑ Stage {stage.number} overview</Link>
        <span className="detail-foot-next">
          {next ? <Link to={`/days/${next.n}`}>Day {next.n} →</Link> : null}
        </span>
      </nav>
      <p className="detail-credit">Real, sourced photographs</p>
    </article>
  );
}
