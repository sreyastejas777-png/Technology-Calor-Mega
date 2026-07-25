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
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-br from-transparent to-secondary/5 pt-24"
      >
        <div className="dot-grid absolute inset-0 opacity-60" />
        <GradientBlobs variant="hero" />
        <ParticlesBackground />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-primary dark:text-paper sm:text-5xl lg:text-6xl">
              Premium Drying
              <br />
              Solutions.
              <br />
              <span className="text-accent">Taste and Preserve.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-primary/70 dark:text-paper/70">
              Industrial-grade moisture control engineered to eliminate food waste and unlock
              agricultural profitability for family farms and cooperatives.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
            className="relative min-w-0"
          >
            <div className="animate-float">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
                className="hero-swiper relative aspect-square w-full min-w-0 rounded-[2rem] shadow-soft"
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
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/50 dark:text-paper/50"
        >
          <FaChevronDown className="text-2xl" />
        </motion.div>
      </section>

      {/* TRUST MARQUEE */}
      <TrustMarquee />

      {/* STATS */}
      <section className="mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 py-14 md:px-8">
        <div className="relative w-full rounded-3xl border border-secondary/15 dark:border-white/5 bg-white/10 dark:bg-white/[0.01] p-8 md:p-12 overflow-hidden shadow-soft">
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
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white/40 dark:bg-white/[0.01] backdrop-blur-[2px] py-14">
        <GradientBlobs variant="section" />

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
      <section className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 py-14 md:px-8">
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
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-14">
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
      <section className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 py-14 md:px-8">
        <SectionHeading eyebrow="Questions & Answers" title="Frequently Asked Questions" />
        <FAQAccordion items={faqs} />
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto flex min-h-[70svh] max-w-5xl flex-col justify-center px-5 py-14 md:px-8">
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
