import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        default: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 },
        hover: { type: 'spring', stiffness: 300, damping: 24 }
      }}
      whileHover={{ y: -10 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-white/5 shadow-soft transition-shadow duration-300 hover:shadow-[0_25px_55px_-15px_rgba(28,28,28,0.3)]"
    >
      <div className="relative h-56 overflow-hidden bg-primary/5 dark:bg-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-4 font-display text-lg font-bold text-white drop-shadow">{product.name}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-sm font-medium text-accent">{product.tagline}</p>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-primary/65 dark:text-paper/65">
          {product.shortDescription}
        </p>
        <ul className="mb-6 space-y-2">
          {product.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-primary/75 dark:text-paper/75">
              <FaCheckCircle className="text-success shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <Link
          to={`/products/${product.id}`}
          className="ripple mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary dark:bg-accent dark:text-primary"
        >
          View Details <FaArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}
