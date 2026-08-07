import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const defaultWords = ['Food Drying', 'Fruit Drying', 'Herb & Spice Drying', 'Medicinal Plant Drying'];

export default function RotatingWord({ words = defaultWords, interval = 2400 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="text-gradient col-start-1 row-start-1"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
