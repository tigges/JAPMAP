import { Link } from "react-router-dom";
import { fmtClimb, fmtInt } from "../data/format";
import { photoUrl, placeOf, stages } from "../data/ride";

export default function StageGrid() {
  return (
    <section className="stage-section" id="stages">
      <div className="section-split">
        <h2>Seven stages</h2>
        <p className="section-note">
          Two gaps in the numbering are ferries: the Tsugaru Strait and Kagoshima Bay.
        </p>
      </div>
      <div className="stage-grid">
        {stages.map((stage) => {
          const from = placeOf(stage.from);
          const to = placeOf(stage.to);
          return (
            <Link key={stage.id} className="stage-card" to={`/stages/${stage.id}`}>
              <img
                src={photoUrl(stage.photo.file)}
                alt=""
                width={640}
                height={400}
              />
              <i className="stage-pip" style={{ background: stage.color }} />
              <p className="stage-kicker">Stage {stage.number}</p>
              <h3>{stage.name}</h3>
              <p className="stage-route">
                {from.name} to {to.name}
              </p>
              <p className="stage-stats">
                {fmtInt(stage.km)} km
                <span>{fmtClimb(stage.climbM)}</span>
                <span>
                  {stage.days} {stage.days === 1 ? "day" : "days"}
                </span>
              </p>
              <p className="photo-credit">
                Photo: {stage.photo.artist}, {stage.photo.license}, via Wikimedia Commons
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
