import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQAccordion({ items, className = '' }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={`mx-auto w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl divide-y divide-primary/10 dark:divide-white/10 rounded-2xl sm:rounded-3xl bg-white dark:bg-white/5 shadow-soft border border-primary/5 dark:border-white/10 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="px-5 sm:px-8 md:px-10 lg:px-12 transition-colors duration-200">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 sm:gap-6 py-4 sm:py-5 md:py-5.5 text-left group"
            >
              <span className={`text-base sm:text-lg md:text-[1.125rem] font-semibold transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-primary dark:text-paper group-hover:text-accent'}`}>
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-9.5 md:w-9.5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-primary"
              >
                <FaChevronDown className="text-xs sm:text-sm" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 sm:pb-6 text-sm sm:text-base text-primary/75 dark:text-paper/75 leading-relaxed max-w-5xl">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

