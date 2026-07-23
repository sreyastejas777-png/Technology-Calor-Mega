import React from 'react';
import { Shield, Users, Landmark, Award, Milestone } from 'lucide-react';

export default function About() {
  const timelineEvents = [
    { year: '2019', title: 'Company Founded', desc: 'Established by thermal engineers to reduce crop waste in farming hubs.' },
    { year: '2021', title: 'Patented Loop', desc: 'Patented our energy-efficient heat-pump dehydration loop.' },
    { year: '2023', title: 'Cooperative Deployments', desc: 'Deployed cabinets in 15 cooperatives, preserving 500+ tons of crops.' },
    { year: '2026', title: 'Calor Mega Release', desc: 'Released walk-in commercial chambers for large-scale exports.' }
  ];

  return (
    <div className="w-full pt-2 pb-16 px-6 md:px-12 bg-bg transition-colors duration-300 min-h-[calc(100svh-144px)]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
        
        {/* 1. VISION & MISSION HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="text-[18px] font-black uppercase text-accent tracking-wider">
              Engineering Better Yields
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-outfit text-primary-text leading-tight">
              About CalorTech Systems
            </h1>
            <p className="text-[20px] md:text-[22px] text-primary-text leading-relaxed font-semibold">
              We engineer high-efficiency, robust dehumidification systems that bridge the gap between harvests and markets.
            </p>
            <p className="text-[18px] text-secondary-text leading-relaxed">
              Our simple-to-operate commercial dehydrators empower farmers and cooperatives to eliminate crop waste, preserve nutrients, and maximize yield value.
            </p>
          </div>

          {/* Interactive Wireframe Column */}
          <div className="lg:col-span-4 flex justify-center items-center h-[300px] perspective-[1000px] select-none">
            {/* 3D Wireframe container */}
            <div className="w-[140px] h-[190px] relative transform-style-3d wireframe-box-animate">
              {/* Faces */}
              <div className="absolute w-[140px] h-[190px] border border-accent/40 bg-accent/5 transform rotate-y-0 translate-z-[70px] flex items-center justify-center text-[10px] text-accent/80 font-mono">FRONT</div>
              <div className="absolute w-[140px] h-[190px] border border-accent/40 bg-accent/5 transform rotate-y-180 translate-z-[70px] flex items-center justify-center text-[10px] text-accent/80 font-mono">BACK</div>
              <div className="absolute w-[140px] h-[190px] border border-accent/40 bg-accent/5 transform rotate-y-[-90deg] translate-z-[70px]"></div>
              <div className="absolute w-[140px] h-[190px] border border-accent/40 bg-accent/5 transform rotate-y-[90deg] translate-z-[70px]"></div>
              <div className="absolute w-[140px] h-[140px] border border-accent/40 bg-accent/5 transform rotate-x-[90deg] translate-z-[70px]"></div>
              <div className="absolute w-[140px] h-[140px] border border-accent/40 bg-accent/5 transform rotate-x-[-90deg] translate-z-[120px]"></div>
            </div>
          </div>
        </div>

        {/* 2. WHY HUMIDITY CONTROL MATTERS */}
        <div className="p-8 md:p-12 rounded-3xl bg-brand-light border border-border shadow-skeuo-in grid grid-cols-1 md:grid-cols-2 gap-8 items-start transition-colors duration-300">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text">
              Why Humidity Control Matters
            </h2>
            <p className="text-[18px] text-secondary-text leading-relaxed">
              Traditional drying uses high heat, damaging crop nutrients and cellular structure. CalorTech utilizes low-temperature **Heat-Pump Dehumidification** (38°C–55°C) to safely extract moisture and keep quality intact.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="p-6 bg-surface border border-border rounded-2xl flex gap-4 transition-colors">
              <Shield className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <strong className="text-[18px] text-primary-text block font-bold">100% Nutrient Retention</strong>
                <span className="text-[18px] text-secondary-text">Preserves vitamins, color pigments, and natural aromas.</span>
              </div>
            </div>
            <div className="p-6 bg-surface border border-border rounded-2xl flex gap-4 transition-colors">
              <Award className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <strong className="text-[18px] text-primary-text block font-bold">Longer Shelf Stability</strong>
                <span className="text-[18px] text-secondary-text">Maintains a stable 5% moisture baseline to prevent mold.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUALITY, CERTIFICATIONS & SUSTAINABILITY */}
        <div className="flex flex-col gap-8">
          <div className="text-center max-w-[800px] mx-auto flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold font-outfit text-primary-text">
              Standards & Certifications
            </h2>
            <p className="text-[18px] text-secondary-text">
              Built using food-grade materials and eco-friendly guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-surface border border-border shadow-skeuo-out text-center flex flex-col gap-4 items-center transition-colors duration-300">
              <Users className="w-12 h-12 text-accent" />
              <h3 className="text-xl font-bold text-primary-text font-outfit">Local Support</h3>
              <p className="text-[18px] text-secondary-text">
                On-site staff training and 24/7 technical hotline support.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border shadow-skeuo-out text-center flex flex-col gap-4 items-center transition-colors duration-300">
              <Landmark className="w-12 h-12 text-accent" />
              <h3 className="text-xl font-bold text-primary-text font-outfit">Eco Certified</h3>
              <p className="text-[18px] text-secondary-text">
                Zero ozone depletion potential using eco-compliant refrigerants.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-surface border border-border shadow-skeuo-out text-center flex flex-col gap-4 items-center transition-colors duration-300">
              <Award className="w-12 h-12 text-accent" />
              <h3 className="text-xl font-bold text-primary-text font-outfit">ISO 9001 Quality</h3>
              <p className="text-[18px] text-secondary-text">
                Manufactured in certified facilities following strict safety protocols.
              </p>
            </div>
          </div>
        </div>

        {/* 4. COMPANY TIMELINE */}
        <div className="flex flex-col gap-12 border-t border-border pt-12">
          <h2 className="text-3xl font-extrabold font-outfit text-primary-text text-center">
            Our Journey & Growth
          </h2>

          <div className="relative max-w-[800px] mx-auto flex flex-col gap-12 before:content-[''] before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[3px] before:bg-border before:z-0">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative pl-12 z-10 flex flex-col gap-2">
                {/* Bullet */}
                <div className="absolute left-[3px] top-1.5 w-7 h-7 rounded-full bg-bg border-4 border-accent flex items-center justify-center shadow-md">
                  <Milestone className="w-3.5 h-3.5 text-accent" />
                </div>
                {/* Content */}
                <div>
                  <span className="text-accent text-[18px] font-black">{event.year}</span>
                  <h3 className="text-2xl font-bold text-primary-text font-outfit">{event.title}</h3>
                </div>
                <p className="text-[18px] text-secondary-text leading-relaxed">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
