import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './layout/Layout';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Technology from './pages/Technology';
import AwardsAndAchievements from './pages/AwardsAndAchievements';
import WorkingProcess from './pages/WorkingProcess';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';

// Redirect helper to route /applications to /technology#applications
function ApplicationsRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/technology#applications', { replace: true });
  }, [navigate]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Unmount the loading screen after 1.8 seconds (gives time for internal animation)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen show={isLoading} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/applications" element={<ApplicationsRedirect />} />
          <Route path="/awards" element={<AwardsAndAchievements />} />
          <Route path="/awards-and-achievements" element={<AwardsAndAchievements />} />
          <Route path="/process" element={<WorkingProcess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<GetQuote />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
