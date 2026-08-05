import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 40]);

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
                className="-right-4 sm:-right-6 bottom-8 sm:bottom-10"
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
      <section className="relative flex min-h-[100svh] w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-6 sm:py-8 overflow-hidden">
        {/* Subtle Ambient Golden Bloom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-secondary/10 dark:bg-accent/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Blurred Glass Frame with Soft Light Shade Moving Light */}
        <div className="relative z-10 w-full max-w-[1600px] p-[1.5px] rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-secondary/15 dark:bg-white/10 shadow-[0_20px_60px_-15px_rgba(184,133,15,0.15)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)]">
          {/* Gentle Light Shade Moving Glow */}
          <div className="animate-border-beam absolute -inset-[200%] [background:conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_260deg,rgba(184,133,15,0.12)_290deg,rgba(251,191,36,0.35)_340deg,rgba(255,255,255,0.6)_360deg)] pointer-events-none opacity-60" />

          {/* Inner Frosted Glass Body */}
          <div className="relative w-full rounded-[calc(1.5rem-1.5px)] sm:rounded-[calc(2.5rem-1.5px)] bg-white/60 dark:bg-[#0c1613]/90 backdrop-blur-3xl p-5 sm:p-7 md:p-9 lg:p-11 overflow-hidden">
            {/* Background Dot Grid */}
            <div className="dot-grid absolute inset-0 opacity-25 pointer-events-none" />

            {/* 4 Clean Stat Cards */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {stats.map((s, idx) => (
                <StatCard key={s.label} {...s} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative flex min-h-[100svh] w-full flex-col justify-center items-center overflow-hidden bg-white/40 dark:bg-white/[0.01] backdrop-blur-[2px] px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-6 sm:py-8">
        <GradientBlobs variant="section" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <SectionHeading
            eyebrow="The CALOR MEGA Difference"
            title="Why Choose CALOR MEGA"
            subtitle="Every machine is engineered for consistency, efficiency and food safety at scale."
            className="mb-5 sm:mb-6 lg:mb-8 max-w-2xl mx-auto text-center"
          />
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
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

      {/* TESTIMONIALS */}
      <section className="relative flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-12 py-14 sm:py-16 md:py-20">
        <GradientBlobs variant="section" />
        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <SectionHeading
            eyebrow="Why Farmers Trust Us"
            title="What Our Customers Say"
            subtitle="Real results from farmers, processors and exporters using CALOR MEGA."
            className="mb-6 sm:mb-8 max-w-2xl mx-auto text-center"
          />
          <div className="grid gap-4 sm:gap-5 lg:gap-5.5 xl:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={t.name} {...t} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 py-14 md:px-8">
        <SectionHeading eyebrow="Questions and Answers" title="Frequently Asked Questions" />
        <FAQAccordion items={faqs} />
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto flex max-w-5xl flex-col justify-center px-5 py-16 md:py-20 md:px-8">
        <Newsletter />
      </section>

      <ApplicationModal
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
        onSelectRelated={setSelectedApp}
      />
    </>
  );
}
