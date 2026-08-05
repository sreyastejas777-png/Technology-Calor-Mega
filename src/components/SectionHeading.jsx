import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, subtitle, center = true, className = '' }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''} ${className || 'mb-10 sm:mb-12'}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-primary dark:text-paper"
      >
        {title}
      </motion.h2>
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: '4.5rem', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
        className={`mt-4 block h-1 rounded-full bg-gradient-to-r from-secondary to-accent ${center ? 'mx-auto' : ''}`}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-primary/70 dark:text-paper/70 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
