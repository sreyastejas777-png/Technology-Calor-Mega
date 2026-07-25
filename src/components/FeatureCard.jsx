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
      whileHover={{ y: -8, scale: 1.02 }}
      className="group rounded-3xl bg-white dark:bg-white/5 border border-primary/5 dark:border-white/10 p-8 shadow-soft transition-all duration-300 hover:shadow-[0_20px_45px_-15px_rgba(224,159,62,0.35)] hover:border-accent/30"
    >
      <motion.div
        whileHover={{ rotate: 12, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary dark:text-accent text-2xl group-hover:bg-accent group-hover:text-primary transition-colors"
      >
        <Icon />
      </motion.div>
      <h3 className="mb-2 text-lg font-bold text-primary dark:text-paper">{title}</h3>
      <p className="text-sm leading-relaxed text-primary/65 dark:text-paper/65">{description}</p>
    </motion.div>
  );
}
