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
import { useCMS } from '../context/CMSContext';

export default function Layout() {
  const location = useLocation();
  const { isPreviewMode, exitPreviewMode } = useCMS();
  const isHome = location.pathname === '/';
  const isTechnology = location.pathname.startsWith('/technology');

  return (
    <div className="relative min-h-screen flex flex-col bg-bg dark:bg-[#0c0c0e] text-primary dark:text-paper transition-colors duration-300 overflow-x-hidden">
      {/* Sticky Live Draft Preview Banner */}
      {isPreviewMode && (
        <aside
          aria-label="Draft Mode Banner"
          className="sticky top-0 z-[100] w-full border-b border-amber-500/40 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-4 py-2.5 text-slate-950 shadow-xl backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs font-bold">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
              </span>
              <span className="tracking-wide">
                ⚡ LIVE DRAFT PREVIEW ACTIVE — Previewing unpublished local changes before publishing
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={exitPreviewMode}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-950/20 bg-white/30 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-white/50"
              >
                Exit Preview
              </button>
            </div>
          </div>
        </aside>
      )}

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
