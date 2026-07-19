import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaArrowRight, FaPlayCircle, FaChevronDown, FaCheckCircle, FaThermometerHalf } from 'react-icons/fa';
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

export default function Home() {
  const [selectedApp, setSelectedApp] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-transparent to-secondary/5 pt-24"
      >
        <div className="dot-grid absolute inset-0 opacity-60" />
        <GradientBlobs variant="hero" />
        <ParticlesBackground />
        
        {/* SVG Dial Gauge Schematic Design */}
        <svg className="absolute -left-16 bottom-20 h-64 w-64 text-secondary/15 dark:text-accent/10 opacity-30 pointer-events-none hidden lg:block" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="80" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="60" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" strokeWidth="2" strokeDasharray="20 10" />
          <line x1="100" y1="20" x2="100" y2="180" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20" y1="100" x2="180" y2="100" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M 100 100 L 140 60" strokeWidth="2" strokeLinecap="round" />
          <circle cx="140" cy="60" r="3" fill="currentColor" />
        </svg>

        {/* SVG Airflow Wave Cycle Design */}
        <svg className="absolute right-10 top-16 h-40 w-96 text-secondary/10 dark:text-accent/5 opacity-30 pointer-events-none hidden lg:block" viewBox="0 0 400 100" fill="none" stroke="currentColor">
          <path d="M 10 50 C 50 20, 80 80, 120 50 C 160 20, 190 80, 230 50 C 270 20, 300 80, 340 50" strokeWidth="1.5" strokeDasharray="5 5" />
          <path d="M 10 60 C 50 30, 80 90, 120 60 C 160 30, 190 90, 230 60 C 270 30, 300 90, 340 60" strokeWidth="1" />
          <path d="M 10 40 C 50 10, 80 70, 120 40 C 160 10, 190 70, 230 40 C 270 10, 300 70, 340 40" strokeWidth="1" />
          <circle cx="120" cy="50" r="4" fill="currentColor" />
          <circle cx="230" cy="50" r="4" fill="currentColor" />
          <circle cx="340" cy="50" r="4" fill="currentColor" />
        </svg>

        {/* SVG Technical Grid Panel Design */}
        <svg className="absolute left-[38%] top-10 h-32 w-32 text-secondary/10 dark:text-accent/5 opacity-25 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <line x1="10" y1="10" x2="90" y2="10" strokeWidth="1" />
          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="10" y1="90" x2="90" y2="90" strokeWidth="1" />
          <line x1="10" y1="10" x2="10" y2="90" strokeWidth="1" />
          <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="90" y1="10" x2="90" y2="90" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" strokeWidth="1" />
        </svg>

        {/* Schematic horizontal & vertical grid lines */}
        <div className="pointer-events-none absolute left-0 top-[15%] h-px w-full bg-gradient-to-r from-secondary/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-secondary/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-[10%] top-0 h-full w-px bg-gradient-to-b from-accent/10 via-transparent to-transparent" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-primary dark:text-base sm:text-5xl lg:text-6xl">
              Premium Drying
              <br />
              Solutions.
              <br />
              <span className="text-accent">Taste and Preserve.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-primary/70 dark:text-base/70">
              Industrial-grade moisture control engineered to eliminate food waste and unlock
              agricultural profitability for family farms and cooperatives.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <span className="relative inline-flex">
                <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40" />
                <Button as={Link} to="/quote" variant="primary" icon={FaArrowRight}>
                  Get Quote
                </Button>
              </span>
              <Button as={Link} to="/products" variant="outline">
                Explore Machine
              </Button>
              <Button as={Link} to="/technology" variant="glass" icon={FaPlayCircle}>
                Watch Demo
              </Button>
            </div>

            <div className="mt-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary/40 dark:text-base/40">
                Trusted to Dry
              </p>
              <div className="flex flex-wrap gap-3">
                {applications.slice(0, 6).map((app, i) => (
                  <motion.div
                    key={app.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.06 }}
                    className="flex items-center gap-2 rounded-full bg-white dark:bg-white/5 py-2 pl-2 pr-4 shadow-soft"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/10 text-sm text-secondary dark:text-accent">
                      <app.icon />
                    </span>
                    <span className="text-sm font-medium text-primary/80 dark:text-base/80">{app.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: heroImageY }}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative min-w-0"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-secondary/30 to-accent/30 blur-2xl" />
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
              className="hero-swiper relative aspect-square w-full min-w-0 rounded-[2rem] shadow-soft glow-secondary"
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
              className="-left-6 top-8"
              delay={0.1}
              floatDelay={0}
            />
            <FloatingBadge
              icon={FaThermometerHalf}
              label="Digital Precision Control"
              className="-right-6 bottom-10"
              delay={0.3}
              floatDelay={2}
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/50 dark:text-base/50"
        >
          <FaChevronDown className="text-2xl" />
        </motion.div>
      </section>

      {/* TRUST MARQUEE */}
      <TrustMarquee />

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="relative rounded-3xl border border-secondary/15 dark:border-white/5 bg-white/10 dark:bg-white/[0.01] p-8 md:p-12 overflow-hidden shadow-soft">
          {/* Tech crosshairs */}
          <div className="absolute top-3 left-3 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-accent/40"></span><span className="h-1.5 w-1.5 rounded-full bg-secondary/30"></span></div>
          <div className="absolute top-3 right-3 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-secondary/30"></span><span className="h-1.5 w-1.5 rounded-full bg-accent/40"></span></div>
          <div className="absolute bottom-3 left-3 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-accent/40"></span><span className="h-1.5 w-1.5 rounded-full bg-secondary/30"></span></div>
          <div className="absolute bottom-3 right-3 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-secondary/30"></span><span className="h-1.5 w-1.5 rounded-full bg-accent/40"></span></div>
          
          {/* Background Grid Pattern */}
          <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-white/40 dark:bg-white/[0.01] backdrop-blur-[2px] py-24">
        <GradientBlobs variant="section" />
        
        {/* Tech Flow Grid SVG Background Design */}
        <svg className="pointer-events-none absolute right-12 top-10 h-80 w-80 text-secondary/10 dark:text-white/5 opacity-40" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="60" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="30" strokeWidth="0.5" strokeDasharray="6 2" />
          <path d="M 10 100 L 190 100 M 100 10 L 100 190" strokeWidth="0.5" strokeDasharray="4 4" />
          <path d="M 36.4 36.4 L 163.6 163.6 M 36.4 163.6 L 163.6 36.4" strokeWidth="0.5" strokeDasharray="8 8" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="The CALOR MEGA Difference"
            title="Why Choose CALOR MEGA"
            subtitle="Every machine is engineered for consistency, efficiency and food safety at scale."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <FeatureCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">

        <SectionHeading
          eyebrow="Built to Dry Anything"
          title="Applications"
          subtitle="From tropical fruit to medicinal herbs, CALOR MEGA adapts to your produce."
        />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {applications.map((app, i) => (
            <ApplicationCard key={app.title} application={app} index={i} onSelect={setSelectedApp} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button as={Link} to="/applications" variant="outline" icon={FaArrowRight}>
            View All Applications
          </Button>
        </div>
      </section>

      {/* MACHINE OVERVIEW */}
      <div className="bg-white/40 dark:bg-white/[0.01] backdrop-blur-[2px]">
        <MachineOverview />
      </div>

      {/* TESTIMONIALS */}
      <section className="relative overflow-hidden py-24">
        <GradientBlobs variant="section" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Why Farmers Trust Us"
            title="What Our Customers Say"
            subtitle="Real results from farmers, processors and exporters using CALOR MEGA."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHeading eyebrow="Questions & Answers" title="Frequently Asked Questions" />
        <FAQAccordion items={faqs} />
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-5xl px-5 pb-24 md:px-8">
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
