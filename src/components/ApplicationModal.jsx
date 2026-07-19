import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FaTimes, FaArrowRight, FaLeaf, FaCheckCircle } from 'react-icons/fa';
import { GiFallingLeaf } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Button from './Button';
import { getApplicationByTitle } from '../data/applications';

export default function ApplicationModal({ application, onClose, onSelectRelated }) {
  const app = application;

  if (!app) return null;

  const related = getApplicationByTitle(app.related);

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-primary/60 backdrop-blur-sm p-4"
    >
      <motion.div
        key={app.title}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white dark:bg-[#1a1a1a] shadow-soft"
      >
        <div className="relative bg-gradient-to-br from-primary to-secondary px-8 pb-8 pt-10 text-center text-white">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FaTimes />
          </button>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">CALOR MEGA Performance</p>
          <h3 className="mt-2 font-display text-3xl font-bold">{app.title}</h3>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-2xl text-success">
                <FaLeaf />
              </span>
              <span className="text-sm font-semibold text-primary dark:text-base">Fresh</span>
            </div>
            <FaArrowRight className="text-xl text-accent" />
            <div className="flex flex-col items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent">
                <GiFallingLeaf />
              </span>
              <span className="text-sm font-semibold text-primary dark:text-base">Dehydrated</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-primary/5 dark:bg-white/5 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/50 dark:text-base/50">
                Moisture Reduction
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 font-display text-xl font-bold text-primary dark:text-base">
                {app.moistureBefore}% <FaArrowRight className="text-sm text-accent" /> {app.moistureAfter}%
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 dark:bg-white/5 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/50 dark:text-base/50">
                Shelf Life Extension
              </p>
              <p className="mt-2 flex items-center justify-center gap-1.5 font-display text-lg font-bold text-primary dark:text-base">
                {app.shelfBefore} <FaArrowRight className="text-sm text-accent shrink-0" /> {app.shelfAfter}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <p className="mb-3 font-bold text-primary dark:text-base">Possible Products</p>
              <ul className="space-y-2">
                {app.products.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-primary/75 dark:text-base/75">
                    <FaCheckCircle className="text-accent shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-bold text-primary dark:text-base">Business Benefits</p>
              <ul className="space-y-2">
                {app.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-primary/75 dark:text-base/75">
                    <FaCheckCircle className="text-accent shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {related && (
            <div className="mt-8 border-t border-primary/10 dark:border-white/10 pt-6">
              <p className="mb-3 font-bold text-primary dark:text-base">Explore Related</p>
              <button
                onClick={() => onSelectRelated(related)}
                className="rounded-full bg-primary/5 dark:bg-white/5 px-4 py-2 text-sm font-semibold text-primary dark:text-base hover:bg-accent hover:text-primary transition-colors"
              >
                {related.title}
              </button>
            </div>
          )}

          <Button as={Link} to="/quote" variant="accent" className="mt-8 w-full justify-center">
            Can CALOR MEGA Process My {app.title}?
          </Button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
