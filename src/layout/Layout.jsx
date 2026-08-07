import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import RouteFallback from '../components/RouteFallback';
import Navbar from './Navbar';
import Footer from './Footer';
import BackButton from '../components/BackButton';
import Breadcrumb from '../components/Breadcrumb';
import ScrollToTop from '../components/ScrollToTop';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BackToTop from '../components/BackToTop';
import WhatsAppButton from '../components/WhatsAppButton';
import AIChatbotPopup from '../components/AIChatbotPopup';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTechnology = location.pathname.startsWith('/technology');

  return (
    <div className="relative min-h-screen flex flex-col bg-bg dark:bg-[#0c0c0e] text-primary dark:text-paper transition-colors duration-300 overflow-x-hidden">
      <ScrollToTop />
      <ScrollProgressBar />
      <Navbar />
      {!isHome && !isTechnology && (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 pb-4 pt-24 md:px-8">
          <BackButton />
          <Breadcrumb />
        </div>
      )}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 flex flex-col ${isHome ? '' : 'pb-4'}`}
      >
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </motion.main>
      <Footer />
      <WhatsAppButton />
      <AIChatbotPopup />
      <BackToTop />
    </div>
  );
}
