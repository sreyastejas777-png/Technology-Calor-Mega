import { motion } from 'framer-motion';

export default function FloatingBadge({ icon: Icon, label, className = '', delay = 0, floatDelay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.9 + delay, duration: 0.5, ease: 'easeOut' }}
      className={`glass absolute z-10 hidden items-center gap-2 rounded-full px-4 py-2.5 shadow-glass md:flex ${className}`}
      style={{ animation: `float 6s ease-in-out ${floatDelay}s infinite` }}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-accent">
        <Icon className="text-sm" />
      </span>
      <span className="text-xs font-semibold text-primary dark:text-paper whitespace-nowrap">{label}</span>
    </motion.div>
  );
}
