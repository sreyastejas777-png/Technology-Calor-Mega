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
import AIAssistantButton from '../components/AIAssistantButton';
import GoldBubbles from '../components/GoldBubbles';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTechnology = location.pathname.startsWith('/technology');

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0c0c0e] text-primary dark:text-paper transition-colors duration-300 overflow-x-hidden">
      <GoldBubbles />
      <ScrollToTop />
      <ScrollProgressBar />
      <Navbar />
      {!isHome && !isTechnology && (
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 pb-4 pt-24 md:px-8">
          <BackButton />
          <Breadcrumb />
        </div>
      )}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={isHome ? '' : 'pb-4'}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <AIAssistantButton />
      <BackToTop />
    </div>
  );
}
