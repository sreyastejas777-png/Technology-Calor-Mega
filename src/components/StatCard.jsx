import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

export default function StatCard({ value, suffix, label, index = 0 }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 text-center transition-all duration-300 bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl border border-secondary/20 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(28,28,28,0.08)] hover:shadow-[0_20px_45px_-12px_rgba(184,133,15,0.25)] hover:border-secondary/40 dark:hover:border-accent/40 overflow-hidden"
    >
      {/* Subtle top accent gradient line on hover */}
      <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 dark:via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient tracking-tight">
        {count}
        <span className="text-secondary dark:text-accent font-normal text-2xl sm:text-3xl lg:text-4xl ml-0.5">
          {suffix}
        </span>
      </p>
      <p className="mt-3 text-sm sm:text-base font-medium text-primary/75 dark:text-paper/75 group-hover:text-primary dark:group-hover:text-paper transition-colors duration-200">
        {label}
      </p>
    </motion.div>
  );
}

