import { motion } from 'framer-motion';
import { FaCertificate, FaShieldAlt, FaLeaf, FaAward } from 'react-icons/fa';

const certifications = [
  { icon: FaCertificate, label: 'ISO 9001 Certified' },
  { icon: FaShieldAlt, label: 'Food Safety Compliant' },
  { icon: FaLeaf, label: 'Eco-Friendly Manufacturing' },
  { icon: FaAward, label: 'Industry Trusted Since 2015' },
];

export default function CertificationStrip() {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-3xl bg-white dark:bg-white/5 p-8 shadow-soft sm:grid-cols-4">
      {certifications.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-xl text-secondary dark:text-accent">
            <c.icon />
          </span>
          <p className="text-xs font-semibold text-primary/70 dark:text-paper/70">{c.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
