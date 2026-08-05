import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders,
  Lock,
  Layers,
  Grid,
  ShieldCheck,
  Wind,
  Gauge,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import heroDryer from '../assets/images/hero-dryer.jpeg';
import Hotspot from './Hotspot';
import SectionHeading from './SectionHeading';
import { hotspots } from '../data/hotspots';

const iconMap = {
  'control-panel': Sliders,
  'door-lock': Lock,
  'trays-left': Layers,
  'trays-right': Grid,
  'insulation': ShieldCheck,
  'airflow': Wind,
  'sensors': Gauge,
  'heating': Flame,
};

export default function MachineOverview() {
  const [activeId, setActiveId] = useState(hotspots[0].id);
  const imageRef = useRef(null);
  const [coords, setCoords] = useState(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const activeIndex = hotspots.findIndex((h) => h.id === activeId);
  const activeHotspot = activeIndex !== -1 ? hotspots[activeIndex] : hotspots[0];
  const ActiveIcon = iconMap[activeHotspot.id] || Sparkles;

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + hotspots.length) % hotspots.length;
    setActiveId(hotspots[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % hotspots.length;
    setActiveId(hotspots[nextIdx].id);
  };

  const isLeft = activeHotspot.side === 'left' || activeHotspot.x < 45;
  const clampedY = Math.max(20, Math.min(activeHotspot.y, 80));

  // Synchronous coordinate calculation using useLayoutEffect to prevent frame-lag glitches
  useLayoutEffect(() => {
    const updateCoords = () => {
      if (!imageRef.current) return;
      const imageRect = imageRef.current.getBoundingClientRect();
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      const pinPxX = (activeHotspot.x / 100) * imageRect.width;
      const pinPxY = (activeHotspot.y / 100) * imageRect.height;
      const clampedPxY = (clampedY / 100) * imageRect.height;

      let targetX, targetY, elbowX;

      if (desktop) {
        if (isLeft) {
          targetX = -18;
          targetY = clampedPxY;
          elbowX = pinPxX - Math.max(24, pinPxX * 0.55);
        } else {
          targetX = imageRect.width + 18;
          targetY = clampedPxY;
          elbowX = pinPxX + Math.max(24, (imageRect.width - pinPxX) * 0.55);
        }
      } else {
        targetX = imageRect.width / 2;
        targetY = imageRect.height + 20;
        elbowX = pinPxX;
      }

      setCoords({
        pinX: pinPxX,
        pinY: pinPxY,
        elbowX,
        targetX,
        targetY,
        width: imageRect.width,
        height: imageRect.height,
        isLeft,
      });
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, [activeId, activeHotspot, isLeft, clampedY]);

  return (
    <section className="relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-center px-4 py-14 sm:px-6 md:px-8 overflow-visible">
      <SectionHeading
        eyebrow="Inside the Machine"
        title="Interactive Engineering Explorer"
        subtitle="Click any &ldquo;+&rdquo; pin to trace the component and view its engineering specs."
      />

      {/* SHOWCASE WRAPPER */}
      <div className="relative mx-auto mt-10 w-full flex flex-col items-center overflow-visible">
        {/* CENTRALIZED PHOTO FRAME */}
        <div
          ref={imageRef}
          className="group relative aspect-[2.15/1] w-full max-w-[680px] lg:max-w-[740px] xl:max-w-[820px] 2xl:max-w-[880px] rounded-3xl border-2 border-accent/30 bg-slate-950 p-1 shadow-2xl backdrop-blur-md dark:border-white/15 overflow-visible"
        >
          {/* Inner Image Container with rounded corners */}
          <div className="relative h-full w-full overflow-hidden rounded-[22px]">
            <img
              src={heroDryer}
              alt="CALOR MEGA Industrial Food Dehydrator with feature hotspots"
              className="h-full w-full object-cover object-left select-none"
              loading="eager"
            />

            {/* Ambient Lighting Gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />

            {/* ALL 8 GLITCH-FREE HOTSPOT PINS */}
            {hotspots.map((h, i) => (
              <Hotspot
                key={h.id}
                {...h}
                index={i + 1}
                isActive={h.id === activeId}
                onClick={() => setActiveId(h.id)}
              />
            ))}

            {/* Status Guide on bottom-left */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-full bg-black/70 px-3.5 py-1.5 text-[11px] font-semibold text-white/95 backdrop-blur-md border border-white/20 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>Click any &ldquo;+&rdquo; pin</span>
            </div>
          </div>

          {/* SMOOTH ANIMATED SVG LEADER LINE */}
          {coords && (
            <svg
              className="pointer-events-none absolute inset-0 z-35 h-full w-full overflow-visible"
              style={{ overflow: 'visible' }}
            >
              {/* Glowing anchor pulse at the '+' pin */}
              <motion.circle
                key={`pulse-circle-${activeHotspot.id}`}
                cx={coords.pinX}
                cy={coords.pinY}
                r="7"
                fill="none"
                stroke="#E09F3E"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: [1, 2.4], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
              />

              {/* Pin Center Node */}
              <circle
                cx={coords.pinX}
                cy={coords.pinY}
                r="3.5"
                fill="#E09F3E"
              />

              {/* Smooth Clean Leader Line without arrowhead */}
              <motion.path
                key={`leader-line-${activeHotspot.id}`}
                d={
                  isDesktop
                    ? `M ${coords.pinX} ${coords.pinY} C ${coords.elbowX} ${coords.pinY}, ${coords.elbowX} ${coords.targetY}, ${coords.targetX} ${coords.targetY}`
                    : `M ${coords.pinX} ${coords.pinY} C ${coords.pinX} ${coords.height + 10}, ${coords.targetX} ${coords.height + 10}, ${coords.targetX} ${coords.targetY}`
                }
                fill="none"
                stroke="#E09F3E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              />

              {/* Terminal Connection Node at the box edge */}
              <motion.circle
                key={`terminal-node-${activeHotspot.id}`}
                cx={coords.targetX}
                cy={coords.targetY}
                r="3.5"
                fill="#E09F3E"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.15 }}
              />
            </svg>
          )}

          {/* DETAILS BOX OUTSIDE THE PHOTO FRAME */}
          <div
            className={`z-40 ${
              isDesktop
                ? `absolute w-[270px] sm:w-[285px] xl:w-[310px] ${
                    isLeft
                      ? 'right-[calc(100%+18px)]'
                      : 'left-[calc(100%+18px)]'
                  }`
                : 'relative mt-6 mx-auto w-full max-w-sm'
            }`}
            style={
              isDesktop
                ? {
                    top: `${clampedY}%`,
                    transform: 'translateY(-50%)',
                  }
                : undefined
            }
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="relative rounded-2xl border-2 border-accent/40 bg-white/95 dark:border-accent/40 dark:bg-[#151518]/95 p-4 sm:p-4.5 shadow-2xl backdrop-blur-xl ring-1 ring-black/10 dark:ring-white/10"
              >
                {/* Header: Category Badge & Steppers */}
                <div className="flex items-center justify-between border-b border-secondary/15 dark:border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-accent/20 text-accent dark:bg-accent/30 shadow-sm">
                      <ActiveIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-accent">
                      {activeHotspot.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-primary/50 dark:text-paper/50 mr-1">
                      {String(activeIndex + 1).padStart(2, '0')}/{String(hotspots.length).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-secondary/20 dark:border-white/10 bg-white/70 dark:bg-white/5 text-primary dark:text-paper hover:bg-accent hover:text-primary transition-colors"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex h-5.5 w-5.5 items-center justify-center rounded-full border border-secondary/20 dark:border-white/10 bg-white/70 dark:bg-white/5 text-primary dark:text-paper hover:bg-accent hover:text-primary transition-colors"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Short Description */}
                <div className="my-2.5">
                  <h4 className="font-display text-sm sm:text-base font-bold text-primary dark:text-paper leading-snug">
                    {activeHotspot.title}
                  </h4>
                  {activeHotspot.subtitle && (
                    <p className="text-[11px] font-semibold text-accent mt-0.5">
                      {activeHotspot.subtitle}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs leading-relaxed text-primary/75 dark:text-paper/75">
                    {activeHotspot.description}
                  </p>
                </div>

                {/* Mini Specifications Chips */}
                {activeHotspot.specs && (
                  <div className="mt-2.5 pt-2 border-t border-secondary/10 dark:border-white/5 space-y-1">
                    {activeHotspot.specs.slice(0, 2).map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-center justify-between rounded-md bg-secondary/5 dark:bg-white/[0.03] px-2.5 py-1 text-[11px]"
                      >
                        <span className="flex items-center gap-1 font-medium text-primary/70 dark:text-paper/70">
                          <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                          {spec.label}
                        </span>
                        <span className="font-bold text-primary dark:text-paper">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* QUICK FEATURE SELECTOR PILLS BELOW */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-2.5 sm:gap-3.5"
      >
        {/* Row 1: Structural & Enclosure Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {hotspots.slice(0, 5).map((h) => {
            const Icon = iconMap[h.id] || Sparkles;
            const isCurrent = h.id === activeId;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveId(h.id)}
                className={`flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 border shadow-sm ${
                  isCurrent
                    ? 'border-accent bg-accent text-primary shadow-md scale-105 ring-2 ring-accent/30'
                    : 'border-secondary/20 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] text-primary/85 dark:text-paper/85 hover:border-accent/50 hover:bg-white/90 dark:hover:bg-white/10 hover:scale-[1.02]'
                }`}
              >
                <Icon className="h-4 w-4 text-secondary dark:text-accent" />
                <span>{h.title.replace(' (Left Bay)', '').replace(' (Right Bay)', '')}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Airflow, Heating & Climate Sensing */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {hotspots.slice(5).map((h) => {
            const Icon = iconMap[h.id] || Sparkles;
            const isCurrent = h.id === activeId;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveId(h.id)}
                className={`flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 border shadow-sm ${
                  isCurrent
                    ? 'border-accent bg-accent text-primary shadow-md scale-105 ring-2 ring-accent/30'
                    : 'border-secondary/20 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] text-primary/85 dark:text-paper/85 hover:border-accent/50 hover:bg-white/90 dark:hover:bg-white/10 hover:scale-[1.02]'
                }`}
              >
                <Icon className="h-4 w-4 text-secondary dark:text-accent" />
                <span>{h.title.replace(' (Left Bay)', '').replace(' (Right Bay)', '')}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
