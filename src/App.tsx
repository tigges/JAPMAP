import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import About from "./pages/About";
import { siteVersionLabel } from "./data/version";
import { traverse } from "./data/traverse";

const JAPANRIDE_URL = "https://japanride.pages.dev/";

export default function App() {
  return (
    <div className="page">
      <header className="nav">
        <div className="brand">
          <NavLink className="wordmark" to="/">
            JAPMAP
          </NavLink>
          <span className="site-version" title="Increments with each site change">
            {siteVersionLabel()}
          </span>
        </div>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <a className="nav-cta" href={JAPANRIDE_URL} target="_blank" rel="noreferrer">
          JAPANRIDE ↗
        </a>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="foot">
        <div>
          <strong>JAPMAP</strong>
          <p>
            {traverse.titleJa} · An original bicycle traverse of Japan, pole to pole.
            Not the NHK series. Watch <em>Cycle Around Japan</em> on its own companion.
          </p>
          <p className="site-version-foot">Site version {siteVersionLabel()} · Planning / Phase 0</p>
        </div>
        <a className="btn ghost" href={JAPANRIDE_URL} target="_blank" rel="noreferrer">
          JAPANRIDE companion ↗
        </a>
      </footer>
    </div>
  );
}
