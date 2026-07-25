import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function TestimonialCard({ name, role, quote, rating }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        default: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        hover: { type: 'spring', stiffness: 300, damping: 22 }
      }}
      whileHover={{ y: -6 }}
      className="glass mx-2 flex h-full flex-col rounded-3xl p-8 shadow-soft transition-shadow duration-300 hover:shadow-[0_20px_45px_-15px_rgba(224,159,62,0.35)]"
    >
      <FaQuoteLeft className="mb-4 text-3xl text-accent" />
      <p className="flex-1 text-primary/80 dark:text-paper/80 leading-relaxed">{quote}</p>
      <div className="mt-6 flex items-center gap-1 text-accent">
        {Array.from({ length: rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <div className="mt-3">
        <p className="font-bold text-primary dark:text-paper">{name}</p>
        <p className="text-sm text-primary/60 dark:text-paper/60">{role}</p>
      </div>
    </motion.div>
  );
}
