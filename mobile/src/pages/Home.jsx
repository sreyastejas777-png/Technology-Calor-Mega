import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaArrowRight, FaPlayCircle, FaChevronDown, FaCheckCircle, FaThermometerHalf, FaAward, FaShieldAlt } from 'react-icons/fa';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import StatCard from '../components/StatCard';
import FeatureCard from '../components/FeatureCard';
import MobileFeatureCarousel from '../components/MobileFeatureCarousel';
import ApplicationCard from '../components/ApplicationCard';
import MobileApplicationsCarousel from '../components/MobileApplicationsCarousel';
import ApplicationModal from '../components/ApplicationModal';
import TestimonialCard from '../components/TestimonialCard';
import MobileTestimonialSlider from '../components/MobileTestimonialSlider';
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
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Featured');
  const [showDiamondFlash, setShowDiamondFlash] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const springConfig = { damping: 40, stiffness: 60, mass: 0.5, restDelta: 0.001 };

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { amount: 0.1 });

  useEffect(() => {
    let flashTimer, scrollTimer;
    if (heroInView) {
      // Trigger scroll prompt after 20 seconds (20000ms)
      scrollTimer = setTimeout(() => setShowScrollPrompt(true), 20000);
      // Trigger diamond flash after 30 seconds (30000ms)
      flashTimer = setTimeout(() => setShowDiamondFlash(true), 30000);
    } else {
      setShowDiamondFlash(false);
      setShowScrollPrompt(false);
    }
    return () => {
      clearTimeout(flashTimer);
      clearTimeout(scrollTimer);
    };
  }, [heroInView]);

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
  const whyY = useTransform(whyScrollProgress, [0, 1], [40, 0]);
  const whyScale = useTransform(whyScrollProgress, [0, 1], [0.97, 1]);
  const whyOpacity = useTransform(whyScrollProgress, [0, 0.3, 1], [0.5, 0.9, 1]);
  const whyRotateBg = useTransform(whyScrollProgress, [0, 1], [-15, 15]);

  const testiFaqSectionRef = useRef(null);
  const { scrollYProgress: testiFaqScroll } = useScroll({
    target: testiFaqSectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothTestiFaqScroll = useSpring(testiFaqScroll, { damping: 40, stiffness: 60, mass: 0.5, restDelta: 0.001 });

  // Multi-layer Parallax transforms with spring-smoothed motion
  const parallaxBlobY1 = useTransform(smoothTestiFaqScroll, [0, 1], [-120, 160]);
  const parallaxBlobY2 = useTransform(smoothTestiFaqScroll, [0, 1], [140, -140]);
  const parallaxRotate = useTransform(smoothTestiFaqScroll, [0, 1], [-25, 25]);

  const testiHeadingY = useTransform(smoothTestiFaqScroll, [0, 0.4, 0.7], [30, 0, -40]);
  const testiHeadingOpacity = useTransform(smoothTestiFaqScroll, [0, 0.2, 0.5, 0.75], [0.3, 1, 1, 0.4]);
  const cardsOddY = useTransform(smoothTestiFaqScroll, [0.05, 0.45, 0.8], [40, 0, -70]);
  const cardsEvenY = useTransform(smoothTestiFaqScroll, [0.05, 0.45, 0.8], [80, 0, -35]);


  const displayedCrops = activeCategory === 'All Featured'
    ? applications.slice(0, 7)
    : applications.filter(a => a.category === activeCategory).slice(0, 7);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-[calc(100svh-4rem)] lg:min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-br from-transparent to-secondary/5 pt-[clamp(1rem,4vh,2.5rem)] pb-[clamp(1.5rem,5vh,3rem)] sm:pt-24 sm:pb-14"
      >
        <div className="dot-grid absolute inset-0 opacity-60" />
        <GradientBlobs variant="hero" />
        <ParticlesBackground />

        <div className="mx-auto grid w-full max-w-[1760px] min-[1600px]:max-w-[98vw] items-center gap-[clamp(1.5rem,4vh,2.5rem)] sm:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 pl-4 sm:pl-4 md:pl-6 lg:pl-6 xl:pl-8 2xl:pl-10 pr-4 sm:pr-8 lg:pr-12 xl:pr-16 2xl:pr-20 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left lg:-ml-2 xl:-ml-3"
          >
            <div className="relative inline-block">
              <h1 className="font-source sm:font-display text-[clamp(2.1rem,10.5vw,2.7rem)] leading-[1.05] sm:text-[3.5rem] md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-black sm:font-bold uppercase sm:leading-[1.03] tracking-wide sm:tracking-tight text-primary dark:text-paper relative z-10">
                Premium Drying
                <br />
                Solutions.
                <br />
                <span className="text-accent tracking-wide sm:tracking-tight">Taste and Preserve.</span>
              </h1>
              
              <AnimatePresence>
                {showDiamondFlash && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      animate={{ 
                        opacity: [0, 1, 0.8, 0], 
                        scale: [0.5, 1.5, 1.2, 0.5],
                        rotate: [45, 90, 135, 180]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                      className="absolute -top-3 -right-2 sm:hidden z-20 pointer-events-none"
                    >
                      <div className="w-3 h-3 bg-white shadow-[0_0_15px_4px_rgba(224,159,62,0.9)] rotate-45 blur-[1px]"></div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      animate={{ 
                        opacity: [0, 1, 0.8, 0], 
                        scale: [0.5, 1.2, 1, 0.5],
                        rotate: [45, 90, 135, 180]
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 5, delay: 1 }}
                      className="absolute bottom-2 -left-3 sm:hidden z-20 pointer-events-none"
                    >
                      <div className="w-2.5 h-2.5 bg-white shadow-[0_0_12px_3px_rgba(224,159,62,0.9)] rotate-45 blur-[1px]"></div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-[clamp(0.75rem,3vh,1.5rem)] sm:mt-7 max-w-xl xl:max-w-2xl 2xl:max-w-3xl text-[clamp(13px,3.5vw,16px)] sm:text-lg xl:text-xl 2xl:text-[1.28rem] text-primary/75 dark:text-paper/75 leading-snug sm:leading-relaxed">
              Industrial-grade moisture control engineered to eliminate food waste and maximize profitability.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col items-center justify-center lg:items-start w-full sm:w-auto max-w-sm sm:max-w-none mx-auto lg:mx-0">
              {/* Buttons side-by-side on mobile, flex-row on desktop */}
              <div className="flex w-full sm:w-auto justify-center gap-3 sm:gap-5">
                <Button 
                  as={Link} 
                  to="/technology" 
                  variant="primary" 
                  icon={FaPlayCircle}
                  className="flex-1 sm:flex-none justify-center px-2 py-3 text-[13px] sm:text-base sm:px-6 sm:py-3.5 whitespace-nowrap"
                >
                  Watch Demo
                </Button>
                <Button 
                  as={Link} 
                  to="/products" 
                  variant="outline"
                  className="flex-1 sm:flex-none justify-center px-2 py-3 text-[13px] sm:text-base sm:px-6 sm:py-3.5 whitespace-nowrap"
                >
                  Explore Machine
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: heroImageY }}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center min-w-0"
          >
            <div className="animate-float relative w-full max-w-[clamp(250px,75vw,360px)] sm:max-w-[480px] lg:max-w-[540px] xl:max-w-[600px] 2xl:max-w-[680px]">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="hero-swiper relative aspect-[4/5] sm:aspect-square w-full min-w-0 rounded-[2.25rem] shadow-xl"
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

        <AnimatePresence>
          {showScrollPrompt && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                opacity: { duration: 0.8 },
                y: { repeat: Infinity, duration: 1.8 }
              }}
              className="absolute sm:hidden bottom-2 left-1/2 -translate-x-1/2 text-primary/70 dark:text-paper/70 z-20 bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-2.5 shadow-lg flex flex-col items-center gap-1"
            >
              <FaChevronDown className="text-base" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute hidden sm:block bottom-6 left-1/2 -translate-x-1/2 text-primary/50 dark:text-paper/50"
        >
          <FaChevronDown className="text-2xl" />
        </motion.div>
      </section>

      {/* TRUST MARQUEE */}
      <TrustMarquee />

      {/* STATS */}
      <section
        ref={statsRef}
        className="relative z-10 w-full max-w-[1600px] min-[1600px]:max-w-[98vw] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pt-8 sm:pt-12 pb-4 sm:pb-6 overflow-hidden"
      >
        {/* Subtle Ambient Golden Bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-secondary/10 dark:bg-accent/10 blur-[130px] rounded-full pointer-events-none" />

        {/* 4 Clean Stat Cards Grid */}
        <motion.div
          style={{ scale: statsScale, opacity: statsOpacity }}
          className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6"
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
          className="relative z-10 w-full max-w-[1500px] min-[1600px]:max-w-[98vw] mx-auto"
        >
          <SectionHeading
            eyebrow="The CALOR MEGA Difference"
            title="Why Choose CALOR MEGA"
            subtitle="Precision moisture control, peak energy efficiency, and certified food safety."
            className="mb-6 sm:mb-8 max-w-2xl mx-auto text-center"
          />
          {/* Mobile Auto-Rotating Feature Carousel (8-Second Span) */}
          <MobileFeatureCarousel />

          {/* Desktop Feature Grid */}
          <div className="hidden lg:grid gap-5 grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* APPLICATIONS */}
      <section className="relative mx-auto flex min-h-[auto] lg:min-h-[100svh] min-[1600px]:min-h-0 w-full max-w-[1600px] min-[1600px]:max-w-[98vw] flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-10 sm:py-12">
        <SectionHeading
          eyebrow="Built to Dry Anything"
          title="Featured Crops and Applications"
          subtitle="From crops and spices to tropical fruits and medicinal herbs, CALOR MEGA adapts to your produce."
          className="mb-5 sm:mb-6 max-w-3xl mx-auto text-center"
        />

        {/* Category Pills Switcher */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          {homeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                ? 'bg-accent text-primary shadow-md shadow-accent/25 scale-105'
                : 'bg-white/70 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary/70 dark:text-paper/70 hover:bg-accent/10 hover:text-accent'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Horizontal Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="block md:hidden"
        >
          <MobileApplicationsCarousel displayedCrops={displayedCrops} onSelect={setSelectedApp} />
        </motion.div>

        {/* Desktop Grid Layout */}
        <motion.div layout className="hidden md:grid grid-cols-2 gap-3.5 sm:gap-4.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <AnimatePresence>
            {displayedCrops.map((app, i) => (
              <ApplicationCard key={app.title} application={app} index={i} onSelect={setSelectedApp} />
            ))}
            
            {/* 8th Card: View All Crops Box */}
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-primary/90 to-secondary/90 p-4 text-center text-white shadow-soft flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-accent/40 hover:bg-accent/10 transition-colors h-full min-h-[220px]"
              onClick={() => navigate('/technology#applications')}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-3xl text-accent shrink-0 transition-transform hover:scale-110">
                <FaArrowRight />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">View All Crops</h3>
              <p className="text-xs leading-snug text-white/75 mt-2">Explore the full directory</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
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
        <section 
          className="relative z-10 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 pt-14 sm:pt-20 pb-10 sm:pb-14 transform-gpu"
        >
          <div className="w-full max-w-[1600px] min-[1600px]:max-w-[98vw] mx-auto">
            <motion.div style={{ y: testiHeadingY, opacity: testiHeadingOpacity }} className="transform-gpu">
              <SectionHeading
                eyebrow="Why Farmers Trust Us"
                title="What Our Customers Say"
                subtitle="Real results from farmers, processors and exporters using CALOR MEGA."
                className="mb-8 sm:mb-10 max-w-2xl mx-auto text-center"
              />
            </motion.div>

            {/* Mobile Auto-Scrolling Testimonials */}
            <MobileTestimonialSlider />

            {/* Desktop Testimonials Grid */}
            <div className="hidden lg:grid gap-5.5 xl:gap-6 grid-cols-5">
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

        {/* FAQ SECTION (FAST ARRIVAL) */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-20 flex w-full flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 xl:min-h-[80svh] pt-8 sm:pt-14 pb-16 sm:pb-20 bg-white/60 dark:bg-white/[0.02] backdrop-blur-md border-t border-primary/5 dark:border-white/10 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.06)] dark:shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)] transform-gpu"
        >
          <div className="w-full xl:max-w-[98vw] mx-auto flex flex-col justify-center items-center h-full">
            <SectionHeading
              eyebrow="Questions and Answers"
              title="Frequently Asked Questions"
              className="mb-6 sm:mb-8 max-w-3xl mx-auto text-center"
            />
            <div className="w-full transform-gpu flex-1 flex flex-col justify-center">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </motion.section>
      </div>

      {/* NEWSLETTER */}
      <section className="relative flex w-full flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="relative z-10 w-full max-w-[1600px] min-[1600px]:max-w-[98vw] mx-auto">
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
