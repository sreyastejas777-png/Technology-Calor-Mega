import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

export default function StatCard({ value, suffix, label }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        default: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        hover: { type: 'spring', stiffness: 300, damping: 22 }
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="glass rounded-3xl p-5 md:p-6 text-center shadow-soft transition-shadow duration-300 hover:shadow-[0_20px_45px_-15px_rgba(61,90,128,0.35)]"
    >
      <p className="font-display text-4xl md:text-5xl font-bold text-gradient">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-primary/70 dark:text-paper/70">{label}</p>
    </motion.div>
  );
}
