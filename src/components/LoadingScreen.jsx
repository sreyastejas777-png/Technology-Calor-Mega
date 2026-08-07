import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiComputerFan } from 'react-icons/gi';

const NAME = 'CALOR MEGA';
const DURATION = 1300;
const NBSP = ' ';

const letterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.045, duration: 0.4, ease: 'easeOut' },
  }),
};

const floatingDots = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size: 3 + ((i * 5) % 10),
  left: (i * 37) % 100,
  top: (i * 23) % 100,
  duration: 4 + (i % 5),
  delay: (i % 6) * 0.4,
}));

export default function LoadingScreen({ show }) {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!show) return;
    let frame;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      if (elapsed < DURATION) {
        frame = requestAnimationFrame(tick);
      } else {
        setComplete(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [show]);

  const fanDuration = 1.6 - (progress / 100) * 1.1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={false}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: 'circle(150% at 50% 50%)' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 overflow-hidden bg-primary"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-accent/30"
                initial={{ width: 40, height: 40, opacity: 0.6 }}
                animate={{ width: 520, height: 520, opacity: 0 }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {floatingDots.map((d) => (
              <span
                key={d.id}
                className="absolute rounded-full bg-accent/25 animate-float"
                style={{
                  width: d.size,
                  height: d.size,
                  left: `${d.left}%`,
                  top: `${d.top}%`,
                  animationDuration: `${d.duration}s`,
                  animationDelay: `${d.delay}s`,
                }}
              />
            ))}
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[7.5rem]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute bottom-0 left-0 h-6 w-1.5 rounded-full bg-accent/40 blur-[2px]"
                style={{ left: (i - 1) * 10 }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -46, opacity: [0, 0.7, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: complete ? [1, 1.12, 1] : 1, opacity: 1 }}
            transition={
              complete
                ? { duration: 0.5, ease: 'easeInOut' }
                : { type: 'spring', stiffness: 260, damping: 16 }
            }
            className="relative mb-3 flex h-32 w-32 items-center justify-center"
          >
            <motion.span
              aria-hidden="true"
              className="absolute h-24 w-24 rounded-full bg-accent/25 blur-xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <defs>
                <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3D5A80" />
                  <stop offset="100%" stopColor="#E09F3E" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="44" fill="none" strokeWidth="3" className="stroke-white/10" />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                stroke="url(#loader-gradient)"
                style={{ pathLength: progress / 100 }}
              />
            </svg>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: fanDuration, repeat: Infinity, ease: 'linear' }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-accent"
            >
              <GiComputerFan className="text-3xl" />
            </motion.div>
            <span className="absolute -bottom-8 font-display text-sm font-bold text-paper/70">{progress}%</span>
          </motion.div>

          <div className="relative flex overflow-hidden font-display text-3xl font-bold tracking-widest text-paper sm:text-4xl">
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className={i >= 6 ? 'text-accent' : ''}
              >
                {char === ' ' ? NBSP : char}
              </motion.span>
            ))}
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: '-150%' }}
              animate={{ x: '350%' }}
              transition={{ duration: 1.1, delay: 1.1, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-paper/50"
          >
            Preserving Freshness, Naturally
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
