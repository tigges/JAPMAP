import { Route, Routes } from "react-router-dom";
import StickyRideBar from "./components/StickyRideBar";
import About from "./pages/About";
import DayPage from "./pages/DayPage";
import MapPage from "./pages/MapPage";
import Ride from "./pages/Ride";
import StagePage from "./pages/StagePage";

export default function App() {
  return (
    <div className="page">
      <StickyRideBar />
      <main>
        <Routes>
          <Route path="/" element={<Ride />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/stages/:id" element={<StagePage />} />
          <Route path="/days/:n" element={<DayPage />} />
          <Route path="*" element={<Ride />} />
        </Routes>
      </main>
    </div>
  );
}
