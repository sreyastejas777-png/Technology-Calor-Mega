import { motion } from 'framer-motion';
import heroDryer from '../assets/images/hero-dryer.jpeg';
import Hotspot from './Hotspot';
import SectionHeading from './SectionHeading';
import { hotspots } from '../data/hotspots';

export default function MachineOverview() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col justify-center px-5 py-16 md:py-20 md:px-8">
      <SectionHeading
        eyebrow="Inside the Machine"
        title="Machine Overview"
        subtitle="Click any marker to explore the engineering behind every drying cycle."
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-4xl shadow-soft"
      >
        <div className="overflow-hidden rounded-3xl">
          <img src={heroDryer} alt="CALOR MEGA machine overview" className="w-full" />
        </div>
        {hotspots.map((h) => (
          <Hotspot key={h.id} {...h} />
        ))}
      </motion.div>
    </section>
  );
}
