import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

export default function StatCard({ value, suffix, label, index = 0 }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass rounded-3xl px-5 py-7 sm:py-9 lg:py-10 text-center shadow-soft transition-all duration-300 hover:shadow-[0_20px_45px_-15px_rgba(184,133,15,0.3)] border border-white/60 dark:border-white/10"
    >
      <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
        {count}
        <span className="text-secondary dark:text-accent font-normal text-2xl sm:text-3xl lg:text-4xl">{suffix}</span>
      </p>
      <p className="mt-3 text-sm sm:text-base font-medium text-primary/80 dark:text-paper/80">
        {label}
      </p>

    </motion.div>
  );
}
