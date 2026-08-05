import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function TestimonialCard({ name, role, quote, rating, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        default: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 },
        hover: { type: 'spring', stiffness: 300, damping: 22 }
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass flex h-full flex-col rounded-2xl sm:rounded-3xl p-5 sm:p-5.5 lg:p-6 shadow-soft transition-all duration-300 hover:shadow-[0_20px_45px_-15px_rgba(224,159,62,0.35)] border border-primary/5 dark:border-white/10 hover:border-accent/30"
    >
      <FaQuoteLeft className="mb-3 sm:mb-4 text-2xl sm:text-3xl text-accent" />
      <p className="flex-1 text-xs sm:text-[13px] md:text-sm leading-relaxed text-primary/80 dark:text-paper/80">{quote}</p>
      <div className="mt-4 sm:mt-5 flex items-center gap-1 text-accent text-xs sm:text-sm">
        {Array.from({ length: rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <div className="mt-3">
        <p className="font-bold text-sm sm:text-base text-primary dark:text-paper">{name}</p>
        <p className="text-xs sm:text-[13px] text-primary/60 dark:text-paper/60">{role}</p>
      </div>
    </motion.div>
  );
}
