import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, CheckCircle2, User, Building2, Calendar, BookOpen, PenTool } from 'lucide-react';

export default function About() {
  const team = [
    { name: 'Manoj KG', role: 'Faculty In-Charge', desc: 'Institutional oversight and academic mentorship', icon: BookOpen },
    { name: 'Ananthan PS', role: 'Team CEO', desc: 'Strategic leadership and operational execution', icon: User },
    { name: 'Midhun Mohan', role: 'Technical Designer', desc: 'Machinery design, prototyping, and technical specifications', icon: PenTool },
    { name: 'Swaroop S', role: 'Sales & Supply Coordinator', desc: 'Supply chain, client outreach, and vendor logistics', icon: Building2 },
    { name: 'Aparna SK', role: 'Documentation Head', desc: 'Compliance, technical reporting, and corporate documentation', icon: CheckCircle2 }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="w-full pt-16 pb-24 px-6 md:px-12 bg-bg transition-colors duration-300 min-h-screen">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-24">
        
        {/* 1. HERO & COMPANY PROFILE */}
        <motion.div 
          className="text-center max-w-[900px] mx-auto flex flex-col gap-6"
          {...fadeUp}
        >
          <span className="text-[18px] font-black uppercase tracking-[0.2em] text-accent">
            IHRD "Earn While Learn" Initiative
          </span>
          <h1 className="text-5xl md:text-7xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-500 to-secondary drop-shadow-sm pb-2">
            INNOVA TECH
          </h1>
          <p className="text-[20px] md:text-[24px] text-transparent bg-clip-text bg-gradient-to-r from-primary-text to-secondary-text leading-relaxed font-bold">
            Industrial Machinery Manufacturing & Applied R&D
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
            <div className="p-6 bg-surface border border-border rounded-2xl shadow-soft flex items-start gap-4">
              <Calendar className="w-6 h-6 text-accent mt-1" />
              <div>
                <strong className="block text-primary-text text-[18px] mb-1">Established</strong>
                <span className="text-secondary-text">March 12, 2026</span>
              </div>
            </div>
            <div className="p-6 bg-surface border border-border rounded-2xl shadow-soft flex items-start gap-4">
              <Building2 className="w-6 h-6 text-accent mt-1" />
              <div>
                <strong className="block text-primary-text text-[18px] mb-1">Inaugurated By</strong>
                <span className="text-secondary-text">Dr. Arunkumar (Former Director, IHRD)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. VISION & MISSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="p-8 md:p-10 rounded-3xl bg-brand-light border border-accent/20 shadow-skeuo-out hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <Lightbulb className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text mb-4">Our Vision</h2>
            <p className="text-[18px] text-secondary-text leading-relaxed">
              To emerge as a pioneer in student-led industrial engineering by developing cutting-edge machinery and advancing research-driven solutions that bridge academic innovation with global industrial standards.
            </p>
          </motion.div>

          <motion.div 
            className="p-8 md:p-10 rounded-3xl bg-brand-light border border-accent/20 shadow-skeuo-out hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <Target className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text mb-4">Our Mission</h2>
            <p className="text-[18px] text-secondary-text leading-relaxed">
              To design and build high-performance industrial machinery through practical innovation under the IHRD "Earn While Learn" framework, empowering engineering talent while delivering reliable, market-ready equipment and research solutions to industry partners.
            </p>
          </motion.div>
        </div>

        {/* 3. TEAM HIERARCHY & LEADERSHIP */}
        <div className="flex flex-col gap-12 pt-8 border-t border-border/50">
          <div className="text-center max-w-[800px] mx-auto flex flex-col gap-4">
            <h2 className="text-4xl font-extrabold font-outfit text-primary-text">
              Leadership & Mentorship
            </h2>
            <p className="text-[20px] text-secondary-text">
              The dedicated team driving innovation under the IHRD framework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, idx) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={idx}
                  className="p-6 rounded-2xl bg-surface border border-border shadow-soft flex flex-col gap-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  initial={fadeUp.initial}
                  whileInView={fadeUp.whileInView}
                  viewport={fadeUp.viewport}
                  transition={{ ...fadeUp.transition, delay: idx * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-outfit text-primary-text mb-1">{member.name}</h3>
                    <span className="text-[14px] font-black uppercase tracking-wider text-accent block mb-3">
                      {member.role}
                    </span>
                    <p className="text-secondary-text text-[16px] leading-relaxed">
                      {member.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
