import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Events from "./pages/Events";
import Donors from "./pages/Donors";
import Admin from "./pages/Admin";

// --- Google Analytics Setup ---
const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || "";
const isLiveWebsite = import.meta.env.PROD && Boolean(TRACKING_ID);

if (isLiveWebsite) {
  ReactGA.initialize(TRACKING_ID);
}
// ------------------------------

function ScrollAndTrackToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll to the top
    window.scrollTo(0, 0);

    // 2. Track the pageview
    if (isLiveWebsite) {
      ReactGA.send({
        hitType: "pageview",
        page: pathname
      });
    }
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="page-shell">
        <div className="grain-overlay" />
        <ScrollAndTrackToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}