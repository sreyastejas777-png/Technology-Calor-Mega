import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './layout/Layout';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';

const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Applications = lazy(() => import('./pages/Applications'));
const Technology = lazy(() => import('./pages/Technology'));
const Gallery = lazy(() => import('./pages/Gallery'));
const WorkingProcess = lazy(() => import('./pages/WorkingProcess'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const GetQuote = lazy(() => import('./pages/GetQuote'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Redirect helper to route /ai-assistant to home page and open the chatbot widget
function AIAssistantRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-chatbot'));
    }, 150);
  }, [navigate]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen show={loading} />
      <Suspense fallback={null}>
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
            <Route path="/ai-assistant" element={<AIAssistantRedirect />} />
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
