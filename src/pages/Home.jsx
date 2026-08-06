import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaArrowRight, FaPlayCircle, FaChevronDown, FaCheckCircle, FaThermometerHalf, FaAward, FaShieldAlt } from 'react-icons/fa';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationModal from '../components/ApplicationModal';
import TestimonialCard from '../components/TestimonialCard';
import Newsletter from '../components/Newsletter';
import MachineOverview from '../components/MachineOverview';
import ParticlesBackground from '../components/ParticlesBackground';
import GradientBlobs from '../components/GradientBlobs';
import TrustMarquee from '../components/TrustMarquee';
import FloatingBadge from '../components/FloatingBadge';
import FAQAccordion from '../components/FAQAccordion';
import slideMachine from '../assets/images/slide-machine.svg';
import slideTrays from '../assets/images/slide-trays.svg';
import slideControl from '../assets/images/slide-control.svg';
import { stats } from '../data/stats';
import { whyChooseUs } from '../data/whyChooseUs';
import { applications } from '../data/applications';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faqs';

const homeCategories = ['All Featured', 'Fruits', 'Spices and Herbs', 'Plantations', 'Grains and Pulses', 'Nuts and Tubers'];

export default function Home() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Featured');
  const springConfig = { damping: 25, stiffness: 100, mass: 0.15, restDelta: 0.001 };

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const smoothHeroProgress = useSpring(scrollYProgress, springConfig);
  const heroImageY = useTransform(smoothHeroProgress, [0, 1], [0, 90]);
  const heroTextY = useTransform(smoothHeroProgress, [0, 1], [0, 40]);

  const statsRef = useRef(null);
  const { scrollYProgress: statsScrollProgress } = useScroll({
    target: statsRef,
    offset: ['start end', 'center center'],
  });
  const smoothStatsProgress = useSpring(statsScrollProgress, springConfig);
  const statsScale = useTransform(smoothStatsProgress, [0, 1], [0.96, 1]);
  const statsOpacity = useTransform(smoothStatsProgress, [0, 0.4, 1], [0.4, 0.85, 1]);

  const whyChooseRef = useRef(null);
  const { scrollYProgress: whyScrollProgress } = useScroll({
    target: whyChooseRef,
    offset: ['start end', 'center center'],
  });
  const smoothWhyProgress = useSpring(whyScrollProgress, springConfig);
  const whyY = useTransform(smoothWhyProgress, [0, 1], [40, 0]);
  const whyScale = useTransform(smoothWhyProgress, [0, 1], [0.97, 1]);
  const whyOpacity = useTransform(smoothWhyProgress, [0, 0.3, 1], [0.5, 0.9, 1]);
  const whyRotateBg = useTransform(smoothWhyProgress, [0, 1], [-15, 15]);

  const testiFaqSectionRef = useRef(null);
  const { scrollYProgress: testiFaqScroll } = useScroll({
    target: testiFaqSectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothTestiFaqScroll = useSpring(testiFaqScroll, { damping: 26, stiffness: 85, mass: 0.15, restDelta: 0.001 });

  // Multi-layer Parallax transforms with spring-smoothed motion
  const parallaxBlobY1 = useTransform(smoothTestiFaqScroll, [0, 1], [-120, 160]);
  const parallaxBlobY2 = useTransform(smoothTestiFaqScroll, [0, 1], [140, -140]);
  const parallaxRotate = useTransform(smoothTestiFaqScroll, [0, 1], [-25, 25]);

  const testiHeadingY = useTransform(smoothTestiFaqScroll, [0, 0.4, 0.7], [30, 0, -40]);
  const testiHeadingOpacity = useTransform(smoothTestiFaqScroll, [0, 0.2, 0.5, 0.75], [0.3, 1, 1, 0.4]);
  const cardsOddY = useTransform(smoothTestiFaqScroll, [0.05, 0.45, 0.8], [40, 0, -70]);
  const cardsEvenY = useTransform(smoothTestiFaqScroll, [0.05, 0.45, 0.8], [80, 0, -35]);

  const faqSectionY = useTransform(smoothTestiFaqScroll, [0.3, 0.75], [120, 0]);
  const faqScale = useTransform(smoothTestiFaqScroll, [0.3, 0.75], [0.93, 1]);
  const faqOpacity = useTransform(smoothTestiFaqScroll, [0.3, 0.55, 0.95], [0.15, 1, 1]);
  const faqAccordionY = useTransform(smoothTestiFaqScroll, [0.35, 0.8], [70, 0]);

  const displayedCrops = activeCategory === 'All Featured'
    ? applications.slice(0, 12)
    : applications.filter(a => a.category === activeCategory);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-br from-transparent to-secondary/5 pt-24 pb-14"
      >
        <div className="dot-grid absolute inset-0 opacity-60" />
        <GradientBlobs variant="hero" />
        <ParticlesBackground />

        <div className="mx-auto grid w-full max-w-[1760px] items-center gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-12 2xl:pl-14 pr-6 sm:pr-8 lg:pr-12 xl:pr-16 2xl:pr-20 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center items-start text-left"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-bold uppercase leading-[1.03] tracking-tight text-primary dark:text-paper">
              Premium Drying
              <br />
              Solutions.
              <br />
              <span className="text-accent">Taste and Preserve.</span>
            </h1>
            <p className="mt-6 sm:mt-7 max-w-xl xl:max-w-2xl 2xl:max-w-3xl text-base sm:text-lg xl:text-xl 2xl:text-[1.28rem] text-primary/75 dark:text-paper/75 leading-relaxed">
              Industrial-grade moisture control engineered to eliminate food waste and unlock
              agricultural profitability for family farms and cooperatives.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-5">
              <Button as={Link} to="/quote" variant="primary" icon={FaArrowRight}>
                Get Quote
              </Button>
              <Button as={Link} to="/products" variant="outline">
                Explore Machine
              </Button>
              <Button as={Link} to="/technology" variant="glass" icon={FaPlayCircle}>
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            style={{ y: heroImageY }}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center min-w-0"
          >
            <div className="animate-float relative w-full max-w-[480px] lg:max-w-[540px] xl:max-w-[600px] 2xl:max-w-[680px]">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="hero-swiper relative aspect-square w-full min-w-0 rounded-[2.25rem] shadow-xl"
              >
                <SwiperSlide className="flex items-center justify-center bg-white dark:bg-white/5">
                  <img
                    src={slideMachine}
                    alt="CALOR MEGA industrial food dryer with feature highlights"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-white dark:bg-white/5">
                  <img
                    src={slideTrays}
                    alt="Inside the CALOR MEGA dryer — uniform multi-tray drying"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center bg-white dark:bg-white/5">
                  <img
                    src={slideControl}
                    alt="CALOR MEGA digital precision control panel"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              </Swiper>
              <FloatingBadge
                icon={FaCheckCircle}
                label="Food Grade Certified"
                className="-left-4 sm:-left-6 top-6 sm:top-8"
                delay={0.1}
                floatDelay={0}
              />
              <FloatingBadge
                icon={FaThermometerHalf}
                label="Digital Precision Control"
                className="-right-2 sm:-right-4 lg:-right-6 bottom-8 sm:bottom-10"
                delay={0.3}
                floatDelay={2}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary/50 dark:text-paper/50"
        >
          <FaChevronDown className="text-2xl" />
        </motion.div>
      </section>

      {/* TRUST MARQUEE */}
      <TrustMarquee />

      {/* STATS */}
      <section
        ref={statsRef}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pt-8 sm:pt-12 pb-4 sm:pb-6 overflow-hidden"
      >
        {/* Subtle Ambient Golden Bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-secondary/10 dark:bg-accent/10 blur-[130px] rounded-full pointer-events-none" />

        {/* 4 Clean Stat Cards Grid */}
        <motion.div
          style={{ scale: statsScale, opacity: statsOpacity }}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {stats.map((s, idx) => (
            <StatCard key={s.label} {...s} index={idx} />
          ))}
        </motion.div>

        {/* Visual Connector Pulse to Why Choose Section */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-8 sm:h-12 w-[1.5px] bg-gradient-to-b from-secondary/50 via-accent/40 to-transparent"
          />
          <div className="h-1.5 w-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_rgba(224,159,62,0.8)] animate-pulse" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        ref={whyChooseRef}
        className="relative flex w-full flex-col justify-center items-center overflow-hidden bg-white/40 dark:bg-white/[0.01] backdrop-blur-[2px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pt-6 sm:pt-8 pb-14 sm:pb-18 md:pb-20"
      >
        <GradientBlobs variant="section" />

        {/* Interactive Rotating Tech Diagram */}
        <motion.svg
          style={{ rotate: whyRotateBg }}
          className="pointer-events-none absolute right-8 sm:right-16 top-6 h-64 sm:h-80 w-64 sm:w-80 text-secondary/10 dark:text-white/5 opacity-35"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="60" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="30" strokeWidth="0.5" strokeDasharray="6 2" />
          <path d="M 10 100 L 190 100 M 100 10 L 100 190" strokeWidth="0.5" strokeDasharray="4 4" />
          <path d="M 36.4 36.4 L 163.6 163.6 M 36.4 163.6 L 163.6 36.4" strokeWidth="0.5" strokeDasharray="8 8" />
        </motion.svg>

        <motion.div
          style={{ y: whyY, scale: whyScale, opacity: whyOpacity }}
          className="relative z-10 w-full max-w-[1500px] mx-auto"
        >
          <SectionHeading
            eyebrow="The CALOR MEGA Difference"
            title="Why Choose CALOR MEGA"
            subtitle="Precision moisture control, peak energy efficiency, and certified food safety."
            className="mb-6 sm:mb-8 max-w-2xl mx-auto text-center"
          />
          <div className="grid gap-3.5 sm:gap-4.5 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* APPLICATIONS */}
      <section className="relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-8 sm:py-10">
        <SectionHeading
          eyebrow="Built to Dry Anything"
          title="Featured Crops and Applications"
          subtitle="From commercial cash crops and spices to tropical fruits and medicinal herbs, CALOR MEGA adapts to your produce."
          className="mb-5 sm:mb-6 max-w-3xl mx-auto text-center"
        />

        {/* Category Pills Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          {homeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-primary shadow-md shadow-accent/25 scale-105'
                  : 'bg-white/70 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary/70 dark:text-paper/70 hover:bg-accent/10 hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-3.5 sm:gap-4.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence>
            {displayedCrops.map((app, i) => (
              <ApplicationCard key={app.title} application={app} index={i} onSelect={setSelectedApp} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Button 
            as={Link} 
            to="/applications" 
            variant="accent" 
            icon={FaArrowRight}
            className="shadow-lg shadow-accent/25 hover:shadow-accent/40 text-sm sm:text-base px-8 py-3.5"
          >
            Explore All Applications
          </Button>
        </div>
      </section>

      {/* MACHINE OVERVIEW */}
      <div className="bg-white/40 dark:bg-white/[0.01] backdrop-blur-[2px]">
        <MachineOverview />
      </div>
      {/* TESTIMONIALS & FAQ PARALLAX CONTAINER */}
      <div ref={testiFaqSectionRef} className="relative overflow-hidden transform-gpu">
        {/* Ambient Parallax Background Layer */}
        <motion.div
          style={{ y: parallaxBlobY1, rotate: parallaxRotate }}
          className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-accent/10 dark:bg-accent/15 blur-3xl transform-gpu"
        />
        <motion.div
          style={{ y: parallaxBlobY2 }}
          className="pointer-events-none absolute -right-20 top-1/2 h-[28rem] w-[28rem] rounded-full bg-secondary/15 dark:bg-secondary/20 blur-3xl transform-gpu"
        />

        {/* TESTIMONIALS */}
        <section className="relative z-10 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pt-14 sm:pt-20 pb-10 sm:pb-14">
          <div className="w-full max-w-[1600px] mx-auto">
            <motion.div style={{ y: testiHeadingY, opacity: testiHeadingOpacity }} className="transform-gpu">
              <SectionHeading
                eyebrow="Why Farmers Trust Us"
                title="What Our Customers Say"
                subtitle="Real results from farmers, processors and exporters using CALOR MEGA."
                className="mb-8 sm:mb-10 max-w-2xl mx-auto text-center"
              />
            </motion.div>

            <div className="grid gap-4 sm:gap-5 lg:gap-5.5 xl:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.name}
                  style={{ y: idx % 2 === 0 ? cardsOddY : cardsEvenY }}
                  className="h-full transform-gpu"
                >
                  <TestimonialCard {...t} index={idx} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ WITH PARALLAX CURTAIN ELEVATION */}
        <motion.section
          style={{ y: faqSectionY, scale: faqScale, opacity: faqOpacity }}
          className="relative z-20 flex w-full flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pt-8 sm:pt-14 pb-16 sm:pb-20 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border-t border-primary/5 dark:border-white/10 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.06)] dark:shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)] transform-gpu"
        >
          <div className="w-full max-w-[1600px] mx-auto flex flex-col justify-center items-center">
            <SectionHeading 
              eyebrow="Questions and Answers" 
              title="Frequently Asked Questions" 
              className="mb-6 sm:mb-8 max-w-3xl mx-auto text-center"
            />
            <motion.div style={{ y: faqAccordionY }} className="w-full transform-gpu">
              <FAQAccordion items={faqs} />
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* NEWSLETTER */}
      <section className="relative flex w-full flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <Newsletter />
        </div>
      </section>

      <ApplicationModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onSelectRelated={setSelectedApp}
      />
    </>
  );
}
