import { motion } from 'framer-motion';
import {
  GiFruitBowl,
  GiBanana,
  GiPeach,
  GiPineapple,
  GiFishCorpse,
  GiCarrot,
  GiHerbsBundle,
  GiChiliPepper,
  GiFlowerPot,
  GiMedicinePills,
  GiCoconuts,
  GiWheat,
  GiMushrooms,
  GiChestnutLeaf
} from 'react-icons/gi';
import {
  FaLeaf,
  FaPepperHot,
  FaMortarPestle,
  FaCoffee,
  FaLemon,
  FaSeedling,
  FaAppleAlt
} from 'react-icons/fa';

const iconMap = {
  GiFruitBowl,
  GiBanana,
  GiPeach,
  GiPineapple,
  GiFishCorpse,
  GiCarrot,
  GiHerbsBundle,
  GiChiliPepper,
  GiFlowerPot,
  GiMedicinePills,
  GiCoconuts,
  GiWheat,
  GiMushrooms,
  GiChestnutLeaf,
  FaLeaf,
  FaPepperHot,
  FaMortarPestle,
  FaCoffee,
  FaLemon,
  FaSeedling,
  FaAppleAlt
};

export default function ApplicationCard({ application, index = 0, onSelect, disableEntranceAnimation = false, layoutId }) {
  const { icon, title, description } = application || {};
  const finalLayoutId = layoutId || `app-card-${title || index}`;

  let IconComponent = FaSeedling;
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && icon.$$typeof)) {
    IconComponent = icon;
  } else if (typeof icon === 'string' && iconMap[icon]) {
    IconComponent = iconMap[icon];
  }

  return (
    <motion.div
      layoutId={finalLayoutId}
      role="button"
      tabIndex={0}
      onClick={() => onSelect && onSelect(application)}
      initial={disableEntranceAnimation ? false : { opacity: 0, scale: 0.9 }}
      whileInView={disableEntranceAnimation ? undefined : { opacity: 1, scale: 1 }}
      viewport={disableEntranceAnimation ? undefined : { once: true }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2, delay: 0 } }}
      transition={{
        default: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 },
        hover: { type: 'spring', stiffness: 300, damping: 22 },
        layout: { duration: 0.35, ease: 'easeInOut' }
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary to-secondary p-4 sm:p-5 text-center text-white shadow-soft transition-shadow duration-300 hover:shadow-[0_20px_45px_-15px_rgba(224,159,62,0.45)] cursor-pointer flex flex-col items-center justify-between"
    >
      <div className="w-full flex flex-col items-center">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className="mx-auto mb-3 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 text-2xl sm:text-3xl text-accent shrink-0"
        >
          <IconComponent />
        </motion.div>
        <h3 className="mb-1 text-sm sm:text-base font-semibold tracking-tight">{title || 'Produce Item'}</h3>
        <p className="text-[11px] sm:text-xs leading-relaxed text-white/75 line-clamp-3">{description || ''}</p>
      </div>
    </motion.div>
  );
}
