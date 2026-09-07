import { Link } from "react-router-dom";
import { poles, stages, stats } from "../data/traverse";

export default function Home() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-veil" />
        <div className="hero-copy">
          <p className="eyebrow">Cape Sata → Cape Soya · 佐多岬 → 宗谷岬</p>
          <h1>
            One island chain.
            <em> One original ride. </em>
            Two poles.
          </h1>
          <p className="lede">
            JAPMAP tells a single bicycle traverse of Japan from the southern pole to
            the northern one: a land line that prefers official cycle routes, takes the
            train when the mountains close, and treats NHK episode days as optional
            detours — never as the GPS.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/map">
              Open the map
            </Link>
            <Link className="btn ghost" to="/about">
              What this is
            </Link>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Journey figures">
        <div>
          <b>2</b>
          <span>mainland poles</span>
        </div>
        <div>
          <b>{stats.stages}</b>
          <span>stages</span>
        </div>
        <div>
          <b>{stats.gateways}</b>
          <span>gateways</span>
        </div>
        <div>
          <b>{stats.ferryCrossings}</b>
          <span>ferry crossing</span>
        </div>
        <div>
          <b>~{stats.poleToPoleKm} km</b>
          <span>as the crow flies</span>
        </div>
      </section>

      <section className="poles-section">
        <div className="section-head">
          <p className="eyebrow">Not a metaphor — real capes</p>
          <h2>The two poles</h2>
        </div>
        <div className="pole-grid">
          {[poles.sata, poles.soya].map((pole) => (
            <article key={pole.id} className="pole-card">
              <p className="stop-kicker">
                {pole.role === "start" ? "South · start" : "North · end"} · {pole.prefecture}
              </p>
              <h3>
                {pole.name} <small>{pole.nameJa}</small>
              </h3>
              <p>{pole.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="chapters">
        <div className="section-head">
          <p className="eyebrow">Six stages, not nine NHK chapters</p>
          <h2>Kyushu to Hokkaido</h2>
        </div>
        <div className="chapter-grid">
          {stages.map((stage) => (
            <article key={stage.id} className="chapter">
              <header>
                <span className="idx" style={{ color: stage.color }}>
                  {String(stage.order).padStart(2, "0")}
                </span>
                <h3>
                  {stage.name} <small>{stage.kana}</small>
                </h3>
              </header>
              <p>{stage.tagline}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
