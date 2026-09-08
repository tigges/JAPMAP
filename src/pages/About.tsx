import { Link } from "react-router-dom";
import { fmtInt } from "../data/format";
import { JAPANRIDE_URL, ride } from "../data/ride";

export default function About() {
  return (
    <article className="about-page">
      <p className="eyebrow">What this is</p>
      <h1>
        <span className="hero-kicker">{ride.titleKicker}</span>
        Cape Sōya <em>to</em> Cape Sata
      </h1>
      <p className="lede">
        An original bicycle traverse of Japan, from the monument at Cape Sōya to the
        lighthouse at Cape Sata. {fmtInt(ride.km)} kilometres, {ride.ridingDays} riding
        days, seven stages, three ferries. It is a journey narrative with a map — not a
        route planner, and not a video index.
      </p>

      <div className="notes">
        <article>
          <h2>North to south, on the west coast</h2>
          <p>
            Kilometre zero is Cape Sōya. The land line follows the Sea of Japan to
            Kanazawa, cuts across to Ōsaka, then the San’yō coast to Shimonoseki and the
            east coast of Kyūshū to Sata. Stage 9 is the run-in from Yamagawa to
            Kagoshima: Sata is a dead-end, so the ride returns to a port.
          </p>
        </article>
        <article>
          <h2>Honest about boats</h2>
          <p>
            Two gaps in the stage numbering are ferries — the Tsugaru Strait and
            Kagoshima Bay. A third crossing is the Kanmon Straits. None of them is drawn
            as a road.
          </p>
        </article>
        <article>
          <h2>Islands are a second act</h2>
          <p>
            Yakushima, Amami, Okinawa, Miyako, and Yaeyama are not stages of this line.
            They stay optional packages after Kagoshima.
          </p>
        </article>
        <article>
          <h2>Not the NHK series</h2>
          <p>
            This is not <em>Cycle Around Japan</em>. That catalog has its own companion,{" "}
            <a href={JAPANRIDE_URL} target="_blank" rel="noreferrer">
              JAPANRIDE
            </a>
            . Watch episodes there. This site does not use NHK stills or episode titles.
          </p>
        </article>
      </div>

      <p className="about-links">
        <Link to="/">Back to the ride</Link>
        <Link to="/map">Open the map</Link>
      </p>
    </article>
  );
}
