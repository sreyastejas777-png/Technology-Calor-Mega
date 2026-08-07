import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -5, scale: 1.015 }}
      className="group relative rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-white/[0.04] border border-secondary/15 dark:border-white/10 p-5 sm:p-5.5 shadow-[0_8px_25px_-10px_rgba(28,28,28,0.08)] transition-all duration-300 hover:shadow-[0_16px_35px_-10px_rgba(184,133,15,0.22)] hover:border-secondary/40 dark:hover:border-accent/40 backdrop-blur-xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top accent light glow on hover */}
      <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 dark:via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      {/* Ambient background bloom on hover */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-secondary/10 dark:bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          className="mb-3 sm:mb-3.5 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-secondary/10 dark:bg-accent/15 text-secondary dark:text-accent text-xl sm:text-2xl group-hover:bg-gradient-to-br group-hover:from-secondary group-hover:to-accent group-hover:text-white transition-all duration-300 shadow-sm"
        >
          <Icon />
        </motion.div>

        <h3 className="mb-1.5 text-base sm:text-lg font-bold text-primary dark:text-paper tracking-tight group-hover:text-secondary dark:group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-xs sm:text-[13.5px] leading-relaxed text-primary/70 dark:text-paper/70">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

