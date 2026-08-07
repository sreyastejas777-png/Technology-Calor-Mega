import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';
import Newsletter from '../components/Newsletter';
import { applications } from '../data/applications';

const categories = [
  'All',
  'Fruits',
  'Spices and Herbs',
  'Plantations',
  'Grains and Pulses',
  'Nuts and Tubers',
  'Vegetables',
  'Specialty'
];

export default function Applications() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredApps = activeCategory === 'All'
    ? applications
    : applications.filter(app => app.category === activeCategory);

  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-10 md:py-16">
      <SectionHeading
        eyebrow="One Machine, Endless Produce"
        title="Applications and Processing"
        subtitle="CALOR MEGA dryers are trusted across fruit, spice, plantation, grain, nut, tuber, vegetable, seafood, and botanical processing worldwide."
        className="mb-8 sm:mb-10 max-w-3xl mx-auto text-center"
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeCategory === cat
              ? 'bg-accent text-primary shadow-lg shadow-accent/20 scale-105'
              : 'bg-white/70 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary/70 dark:text-paper/70 hover:bg-accent/10 hover:text-accent'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Applications */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <AnimatePresence>
          {filteredApps.map((app, i) => (
            <ApplicationCard
              key={app.title}
              application={app}
              index={i}
              onSelect={setSelectedApp}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-20">
        <Newsletter />
      </div>

      <ApplicationModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onSelectRelated={setSelectedApp}
      />
    </section>
  );
}