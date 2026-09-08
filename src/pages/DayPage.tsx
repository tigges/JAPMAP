import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DayElevation from "../components/DayElevation";
import DayInsetMap from "../components/DayInsetMap";
import DayMilestones from "../components/DayMilestones";
import DayPager from "../components/DayPager";
import DayPractical from "../components/DayPractical";
import DayStats from "../components/DayStats";
import RideKmBar from "../components/RideKmBar";
import { detailOf, photoSourced, practicalOf } from "../data/dayDetails";
import {
  FERRY_NOTE,
  dayWithKmOf,
  placeOf,
  rideDays,
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
  const stage = stageOf(day.stageId);
  const from = placeOf(day.from);
  const to = placeOf(day.to);
  const detail = detailOf(day.n);
  const practical = practicalOf(day, detail, from, to);
  const hasPins = detail.photos.some((p) => p.lat != null);
  const hasMilestones = detail.photos.length > 0;
  const hasSourcedPhotos = detail.photos.some(photoSourced);

  return (
    <article className="detail-page day-page">
      {dayFull ? <DayPager day={dayFull} /> : null}

      <header className="day-head">
        <h1 className="day-title">
          {from.name} to {to.name}
        </h1>
      </header>

      <p className="day-lede">
        {detail.narrative ??
          `Day ${day.n} of the ride: ${from.name} (${from.nameJa}) to ${to.name} (${to.nameJa}) along Stage ${stage.number}, ${stage.name}. Notes land here when we have them — this page is not a journal entry.`}
      </p>

      {dayFull ? <RideKmBar day={dayFull} /> : null}

      <DayStats day={day} detail={detail} />

      <section className="day-elev-block">
        <h2 className="day-section-label">Elevation</h2>
        <DayElevation km={day.km} detail={detail} />
      </section>

      <div className="day-map-row">
        <div>
          <DayInsetMap from={from} to={to} color={stage.color} photos={detail.photos} />
          <p className="pin-caption">
            {hasPins
              ? "Numbered pins match the milestones below."
              : hasMilestones
                ? "Numbered squares on the elevation match the milestones below."
                : "Overnight hop — not the GPS yet."}
          </p>
        </div>
        <DayPractical items={practical} />
      </div>

      <DayMilestones detail={detail} />

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
      {hasSourcedPhotos ? (
        <p className="detail-credit">Real, sourced photographs</p>
      ) : null}
    </article>
  );
}
