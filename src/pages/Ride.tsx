import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DayChart from "../components/DayChart";
import DayList from "../components/DayList";
import StageGrid from "../components/StageGrid";
import { fmtInt } from "../data/format";
import { heroPhoto, photoUrl, ride } from "../data/ride";

const stats = [
  { value: fmtInt(ride.km), label: "km routed" },
  { value: fmtInt(ride.climbM), label: "m of climbing" },
  { value: String(ride.ridingDays), label: "riding days" },
  { value: String(ride.stageCount), label: "stages" },
  { value: String(ride.ferries), label: "ferries" },
  { value: fmtInt(ride.facilities), label: "facilities on route" },
];

export default function Ride() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <article className="ride-page">
      <section className="hero-v2">
        <div className="hero-copy-v2">
          <p className="eyebrow">
            {fmtInt(ride.km)} km · {ride.ridingDays} days · {ride.titleJa}
          </p>
          <h1>
            <span className="hero-kicker">{ride.titleKicker}</span>
            Cape Sōya <em>to</em> Cape Sata
          </h1>
          <p className="lede">
            An original bicycle traverse of Japan, from the monument at the northern tip
            of Hokkaidō to the lighthouse at the southern tip of Kyūshū. Forty-two riding
            days, routed on real roads and measured off the track itself.
          </p>
          <div className="pole-coords">
            <div>
              <strong>Cape Sōya</strong>
              <span>
                {ride.soyaLatLabel} · km 0
              </span>
            </div>
            <div>
              <strong>Cape Sata</strong>
              <span>
                {ride.sataLatLabel} · km {fmtInt(ride.km)}
              </span>
            </div>
          </div>
        </div>
        <figure className="hero-photo">
          <img
            src={photoUrl(heroPhoto.file)}
            alt="Monument at Cape Sōya, where the ride begins"
            width={900}
            height={1200}
          />
          <figcaption>
            {heroPhoto.caption} · Photo: {heroPhoto.artist}, {heroPhoto.license}, via
            Wikimedia Commons
          </figcaption>
        </figure>
      </section>

      <section className="stats-v2" aria-label="Ride figures">
        {stats.map((s) => (
          <div key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <DayChart />
      <StageGrid />
      <DayList />

      <section className="method" id="method">
        <div>
          <h3>On the numbers</h3>
          <p>
            Distance and climbing are measured off the routed track, point by point, and
            stated the way a route map states them — approximate, because a different
            line through the same town gives a different figure.
          </p>
        </div>
        <div>
          <h3>On effort</h3>
          <p>
            Kilometres plus metres of climbing divided by ten: the standard
            flat-equivalent. It runs from 68 on the shortest day to 451 on the hardest,
            and it is the only number that lets forty-two days be compared at a glance.
          </p>
        </div>
        <div>
          <h3>On the pictures</h3>
          <p>
            Photographs are sourced from Wikimedia Commons under open licences, credited
            under each image. Two days carry a milestone mark; the rest are structured
            for it. The{" "}
            <Link to="/map">map</Link> plots overnight towns until the GPS track is in
            the repo.
          </p>
        </div>
      </section>
    </article>
  );
}
