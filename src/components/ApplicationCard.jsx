import { motion } from 'framer-motion';

export default function ApplicationCard({ application, index = 0, onSelect }) {
  const { icon: Icon, title, description } = application;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(application)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        default: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 },
        hover: { type: 'spring', stiffness: 300, damping: 22 }
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-6 text-center text-white shadow-soft transition-shadow duration-300 hover:shadow-[0_20px_45px_-15px_rgba(224,159,62,0.45)]"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl text-accent"
      >
        <Icon />
      </motion.div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-xs leading-relaxed text-white/70">{description}</p>
    </motion.button>
  );
}
