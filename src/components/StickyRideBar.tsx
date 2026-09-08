import { Link, NavLink, useLocation } from "react-router-dom";
import { fmtInt } from "../data/format";
import {
  daysWithKm,
  dayKmSum,
  dayWithKmOf,
  kmWindow,
  maxEffort,
  placeOf,
  ride,
  stageOf,
} from "../data/ride";

export default function StickyRideBar() {
  const location = useLocation();
  const dayMatch = location.pathname.match(/^\/days\/(\d+)/);
  const currentN = dayMatch ? Number(dayMatch[1]) : null;
  const current = currentN != null ? dayWithKmOf(currentN) : undefined;
  const span = current ? kmWindow(current) : null;

  return (
    <header className="sticky-bar">
      <Link className="sticky-wordmark" to="/" aria-label={ride.title}>
        <span className="sticky-kicker">{ride.titleKicker}</span>
        {ride.titlePlaces}
      </Link>
      <div className="sticky-mini">
        {daysWithKm.map((day) => {
          const stage = stageOf(day.stageId);
          const on = current?.n === day.n;
          return (
            <Link
              key={day.n}
              to={`/days/${day.n}`}
              className={on ? "sticky-mini-bar on" : "sticky-mini-bar"}
              style={{
                width: `${(day.km / dayKmSum) * 100}%`,
                height: `${Math.max(18, (day.effort / maxEffort) * 100)}%`,
                background: stage.color,
              }}
              aria-label={`Day ${day.n}, ${placeOf(day.from).name} to ${placeOf(day.to).name}`}
              aria-current={on ? "page" : undefined}
            />
          );
        })}
      </div>
      <p className="sticky-stats">
        {span
          ? `km ${fmtInt(span.start)} – ${fmtInt(span.end)}`
          : `${fmtInt(ride.km)} km · ${ride.ridingDays} days`}
      </p>
      <nav className="sticky-nav" aria-label="Site">
        <NavLink to="/" end>
          Ride
        </NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
