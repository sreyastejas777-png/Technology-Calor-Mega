import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-24 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-soft dark:bg-accent dark:text-primary"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
