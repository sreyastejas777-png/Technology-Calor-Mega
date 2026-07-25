import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-primary/10 dark:divide-white/10 rounded-3xl bg-white dark:bg-white/5 shadow-soft">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="px-6 md:px-8">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="font-semibold text-primary dark:text-paper">{item.question}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-accent shrink-0">
                <FaChevronDown />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-primary/70 dark:text-paper/70 leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
