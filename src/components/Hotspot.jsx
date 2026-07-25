import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

export default function Hotspot({ x, y, title, description }) {
  const [open, setOpen] = useState(false);
  const flipUp = y > 55;

  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.15 }}
        className="relative flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-primary shadow-soft"
        aria-label={title}
      >
        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-60" />
        <FaPlus className="relative text-xs" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: flipUp ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: flipUp ? -10 : 10, scale: 0.9 }}
            className="glass absolute z-20 w-52 max-w-[calc(100vw-2.5rem)] -translate-x-1/2 rounded-2xl p-4 text-left shadow-glass"
            style={
              flipUp
                ? { bottom: '2.2rem', left: '50%' }
                : { top: '2.2rem', left: '50%' }
            }
          >
            <p className="mb-1 font-bold text-primary dark:text-paper">{title}</p>
            <p className="text-xs leading-relaxed text-primary/70 dark:text-paper/70">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
