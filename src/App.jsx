import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import LoadingScreen from './components/LoadingScreen';
import RouteFallback from './components/RouteFallback';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Applications = lazy(() => import('./pages/Applications'));
const Technology = lazy(() => import('./pages/Technology'));
const WorkingProcess = lazy(() => import('./pages/WorkingProcess'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const GetQuote = lazy(() => import('./pages/GetQuote'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen show={loading} />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/process" element={<WorkingProcess />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/quote" element={<GetQuote />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
