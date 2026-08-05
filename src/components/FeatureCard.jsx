import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        default: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 },
        hover: { type: 'spring', stiffness: 300, damping: 22 }
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group rounded-2xl sm:rounded-3xl bg-white/75 dark:bg-white/5 border border-primary/5 dark:border-white/10 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:shadow-[0_20px_45px_-15px_rgba(224,159,62,0.35)] hover:border-accent/30 backdrop-blur-md"
    >
      <motion.div
        whileHover={{ rotate: 12, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="mb-3 sm:mb-4 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-secondary/10 text-secondary dark:text-accent text-lg sm:text-xl group-hover:bg-accent group-hover:text-primary transition-colors"
      >
        <Icon />
      </motion.div>
      <h3 className="mb-1.5 text-base sm:text-lg font-bold text-primary dark:text-paper">{title}</h3>
      <p className="text-xs sm:text-[13px] leading-relaxed text-primary/65 dark:text-paper/65">{description}</p>
    </motion.div>
  );
}
