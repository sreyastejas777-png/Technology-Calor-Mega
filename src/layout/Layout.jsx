import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import BackButton from '../components/BackButton';
import Breadcrumb from '../components/Breadcrumb';
import ScrollToTop from '../components/ScrollToTop';
import ScrollProgressBar from '../components/ScrollProgressBar';
import BackToTop from '../components/BackToTop';
import WhatsAppButton from '../components/WhatsAppButton';
import AIChatbotPopup from '../components/AIChatbotPopup';
import GoldBubbles from '../components/GoldBubbles';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTechnology = location.pathname.startsWith('/technology');

  return (
    <div className="relative min-h-screen bg-[#FEFAF1] dark:bg-[#0c0c0e] text-primary dark:text-base transition-colors duration-300 overflow-x-hidden">
      {/* Ambient Floating Backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
        {/* Animated Light Blobs */}
        <div className="absolute -left-32 -top-32 h-[35rem] w-[35rem] rounded-full bg-secondary/12 dark:bg-secondary/8 blur-[120px] animate-float-slow-1" />
        <div className="absolute -right-32 top-1/4 h-[40rem] w-[40rem] rounded-full bg-accent/10 dark:bg-accent/5 blur-[120px] animate-float-slow-2" />
        <div className="absolute left-1/3 bottom-10 h-[30rem] w-[30rem] rounded-full bg-accent/8 dark:bg-accent/4 blur-[120px] animate-float-slow-3" />
        {/* Subtle Dot Grid */}
        <div className="dot-grid absolute inset-0 opacity-40 dark:opacity-[0.18]" />
        {/* Floating Gold Bubbles */}
        <GoldBubbles />
      </div>

      <ScrollToTop />
      <ScrollProgressBar />
      <Navbar />
      {!isHome && !isTechnology && (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 pb-4 pt-24 md:px-8">
          <BackButton />
          <Breadcrumb />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className={isHome ? '' : 'pb-4'}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <AIChatbotPopup />
      <BackToTop />
    </div>
  );
}
