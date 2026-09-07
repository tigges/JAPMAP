import { Link, NavLink } from "react-router-dom";
import { fmtInt } from "../data/format";
import { daysWithKm, dayKmSum, maxEffort, ride, stageOf } from "../data/ride";

export default function StickyRideBar() {
  return (
    <header className="sticky-bar">
      <Link className="sticky-wordmark" to="/">
        Pole to Pole
      </Link>
      <div className="sticky-mini" aria-hidden="true">
        {daysWithKm.map((day) => {
          const stage = stageOf(day.stageId);
          return (
            <i
              key={day.n}
              style={{
                width: `${(day.km / dayKmSum) * 100}%`,
                height: `${Math.max(18, (day.effort / maxEffort) * 100)}%`,
                background: stage.color,
              }}
            />
          );
        })}
      </div>
      <p className="sticky-stats">
        {fmtInt(ride.km)} km · {ride.ridingDays} days
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
