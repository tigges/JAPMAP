const JAPANRIDE_URL = "https://japanride.pages.dev/";

export default function About() {
  return (
    <section className="ride" id="about">
      <div className="section-head">
        <p className="eyebrow">What this is, and what it is not</p>
        <h2>Sibling, not a fork</h2>
      </div>
      <div className="notes">
        <article>
          <h3>One ride, two poles</h3>
          <p>
            JAPMAP is one original bicycle traverse of Japan, Cape Sata to Cape Soya.
            It is a journey narrative with a map — not a route planner, and not a
            video-on-demand index.
          </p>
        </article>
        <article>
          <h3>Honest about trains and ferries</h3>
          <p>
            When the mountains close — Kii, the Alps — the rider takes the train, and
            the map says so. The Tsugaru Strait to Hokkaido is a ferry, drawn dashed,
            never a filmed road.
          </p>
        </article>
        <article>
          <h3>Islands are a second act</h3>
          <p>
            Yakushima, Amami, Okinawa, Miyako, and Yaeyama are optional packages after
            Kagoshima. They are not stages of the land line, and this site does not
            pretend otherwise.
          </p>
        </article>
        <article>
          <h3>Not the NHK series</h3>
          <p>
            This is not <em>Cycle Around Japan</em>. That catalog has its own companion,{" "}
            <a href={JAPANRIDE_URL} target="_blank" rel="noreferrer">
              JAPANRIDE
            </a>
            . JAPMAP borrows its craft — type, paper palette, Leaflet, EN/JA basemaps —
            but never its NHK stills or episode titles.
          </p>
        </article>
      </div>
      <blockquote>
        “One rider. Two capes. A land line that prefers official cycle routes, takes the
        train when the mountains close, and treats NHK episode days as optional detours —
        never as the GPS.”
        <cite>JAPMAP concept · docs/CONCEPT.md</cite>
      </blockquote>
    </section>
  );
}
