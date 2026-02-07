import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Divisions from "./sections/Divisions";
import Showcase from "./sections/Showcase";
import Footer from "./components/Footer";
import ProjectDetail from "./pages/ProjectDetail";

import DivisionProjectList from "./pages/DivisionProjectList";

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Landing Page Component
function LandingPage() {
  return (
    <>
      <Hero />
      <Divisions />
      <Showcase />
    </>
  );
}

function App() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans antialiased selection:bg-oxigen-dark selection:text-white flex flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects/:division" element={<DivisionProjectList />} />
          <Route path="/projects/:division/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App