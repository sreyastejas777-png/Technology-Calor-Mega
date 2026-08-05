import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

export default function Hotspot({ x, y, title, isActive, onClick, index = 1 }) {
  return (
    <div
      className="absolute z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.92 }}
        className={`group relative flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full transition-colors duration-300 shadow-md ${
          isActive
            ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-400/60 shadow-amber-500/50'
            : 'bg-amber-500/90 text-slate-950 hover:bg-amber-400 shadow-black/20'
        }`}
        aria-label={`Inspect ${title}`}
        aria-pressed={isActive}
      >
        {/* Ambient Radar Glow Ring (pointer-events-none prevents hover glitch) */}
        <span
          className={`pointer-events-none absolute inset-0 rounded-full ${
            isActive
              ? 'bg-amber-400 animate-ping opacity-60'
              : 'bg-amber-500 animate-pulse opacity-40 group-hover:opacity-75'
          }`}
        />

        {/* Outer Ring Pulse for active state */}
        {isActive && (
          <span className="pointer-events-none absolute -inset-2 rounded-full border border-amber-400/80 animate-pulse" />
        )}

        {/* Icon / Number */}
        <motion.div
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 flex items-center justify-center"
        >
          <FaPlus className={`text-[10px] sm:text-xs transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
        </motion.div>
      </motion.button>
    </div>
  );
}
