import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';
import SectionHeading from '../components/SectionHeading';
import { galleryCategories, galleryItems } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeCategory === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  const openLightbox = (id) => {
    const index = filtered.findIndex((g) => g.id === id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () => setLightboxIndex((lightboxIndex + 1) % filtered.length);
  const showPrev = () => setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <SectionHeading
        eyebrow="See It In Action"
        title="Gallery"
        subtitle="A closer look at the machine, its chamber, control panel and the produce it preserves."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-accent text-primary'
                : 'bg-white dark:bg-white/5 text-primary/70 dark:text-paper/70 hover:text-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {filtered.map((item) => (
          <motion.button
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openLightbox(item.id)}
            className="group relative block w-full overflow-hidden rounded-2xl shadow-soft"
          >
            <img src={item.image} alt={item.caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary/80 via-primary/0 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <FaSearchPlus className="mb-2 text-white" />
              <p className="text-left text-sm font-medium text-white">{item.caption}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-6"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-6 top-6 text-3xl text-white/80 hover:text-white"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 text-3xl text-white/70 hover:text-white md:left-10"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <motion.img
              key={filtered[lightboxIndex].id}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].caption}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-soft"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 text-3xl text-white/70 hover:text-white md:right-10"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/80">
              {filtered[lightboxIndex].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
