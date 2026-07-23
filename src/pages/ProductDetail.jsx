import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Check, Info, Hammer, PenTool, Flame, Zap, HelpCircle } from 'lucide-react';
import calorMegaImg from '../assets/calor_mega.png';
import calorMiniImg from '../assets/calor_mini.png';
import calorStandardImg from '../assets/calor_standard.png';

export default function ProductDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'installation', 'maintenance'

  // Detailed product database
  const productDb = {
    mega: {
      name: 'Calor Mega Dehydrator',
      tagline: 'Flagship Walk-In Controlled Post-Harvest Preservation System',
      price: '$12,500',
      img: calorMegaImg,
      gallery: [calorMegaImg, calorMiniImg, calorStandardImg],
      overview: 'The Calor Mega represents the pinnacle of commercial post-harvest crop preservation technology. Engineered as a modular 10x10 foot insulated walk-in unit, it operates on a highly sophisticated heat-pump dehumidification system. Unlike traditional hot-air dryers that scorch crops and degrade nutrients, the Calor Mega extracts moisture gently at moderate temperatures, preserving critical carotenoids, vitamins, and natural colorings.',
      warranty: '2-Year Premium Commercial Warranty (including on-site repairs)',
      energy: 'Average consumption: 3.2 kW. Highly optimized heat-recycling compressor cycle reduces electricity usage by up to 45% compared to resistance heaters.',
      specs: [
        { label: 'Room Dimensions', value: '10 x 10 x 8 feet (Modular)' },
        { label: 'Dehumidification Capacity', value: '1,200 Liters / 24 Hours' },
        { label: 'Structure', value: 'Double-walled food-grade rust-free Aluminium' },
        { label: 'Thermal Core', value: 'Polyurethane injected foam insulation (R-16 value)' },
        { label: 'Air Flow Rate', value: '4,500 CFM balanced multi-axis circulation' },
        { label: 'Control Terminal', value: 'Externally mounted LCD PLC touchscreen' }
      ],
      features: [
        'Precise Relative Humidity (RH) tuning down to 5% baseline.',
        'Intelligent crop-specific profiles (e.g. mango slices, seeds, herbs).',
        'Balanced multi-fan arrangement prevents temperature dead-zones.',
        'Continuous automatic drainage system (no manual reservoirs to empty).',
        'Double-sealed airtight doors with heavy-duty secure clamp locks.'
      ],
      useCases: [
        'Large agriculture cooperatives seeking to eliminate harvest waste.',
        'Dehydrated fruit and segment export businesses.',
        'High-capacity commercial powder, flour, and snack manufacturing.',
        'Regional seed banking and premium crop preservation.'
      ],
      installation: 'Requires a level concrete slab or flat indoor floor. Requires a dedicated 220V/30A single-phase power hookup. The modular panels are delivered on pallets and assembled on-site by CalorTech certified technicians within 6-8 hours.',
      maintenance: 'Clean internal air filters once every two weeks using warm water. Sanitize the food-grade interior walls monthly with mild antimicrobial wash. Schedule annual condenser coil cleaning by a certified HVAC technician.'
    },
    standard: {
      name: 'Calor Standard Dehydrator',
      tagline: 'Cooperative-Grade Mid-Sized Cabinet Dehumidifier',
      price: '$4,200',
      img: calorStandardImg,
      gallery: [calorStandardImg, calorMegaImg, calorMiniImg],
      overview: 'The Calor Standard is a stand-alone cabinet dehumidifier designed for medium-scale processing facilities, regional seed drying labs, and artisanal food creators. Constructed from high-strength stainless steel, it features 12 adjustable trays and a robust automated compressor system that ensures stable humidity control without manual intervention.',
      warranty: '2-Year Hardware Warranty (parts replacement and phone support)',
      energy: 'Average consumption: 1.2 kW. Energy Star compliant rotary compressor.',
      specs: [
        { label: 'Dimensions', value: '3 x 3 x 6 feet (H x W x D)' },
        { label: 'Capacity', value: '350 Liters / 24 Hours' },
        { label: 'Interior Shelves', value: '12 food-grade adjustable stainless steel grids' },
        { label: 'Structure Material', value: 'Brushed SUS304 stainless steel interior & exterior' },
        { label: 'Controller', value: 'Digital panel with LED status displays' },
        { label: 'Drainage Type', value: 'Auto-drain hose outlet or integrated 10L tank' }
      ],
      features: [
        'Relative Humidity control adjustable between 20% and 80%.',
        'Quiet-run scroll compressor design minimizes workshop noise.',
        'Sturdy industrial castor wheels with locking brakes for mobility.',
        'Overheat cut-off safety switch automatically halts operation if exceeded.',
        'High-efficiency condensation trap collection coils.'
      ],
      useCases: [
        'Boutique dried fruit, beef jerky, and snack food artisans.',
        'Seed multiplication and processing laboratories.',
        'Medium-sized organic herb and tea growers.',
        'Preservation testing before scaling up to Calor Mega.'
      ],
      installation: 'Fully assembled upon arrival. Place on a flat interior floor surface. Plugs into a standard 110V/15A or 220V electrical outlet. Connect the drainage hose to a nearby drain or ensure the collection bucket is monitored.',
      maintenance: 'Empty collection bucket when full (if not using hose). Clean mesh trays in a commercial dishwasher after each run. Check air filters monthly and blow out any accumulated dust.'
    },
    mini: {
      name: 'Calor Mini Dehydrator',
      tagline: 'Desktop Precision Thermal Dehumidifier',
      price: '$1,800',
      img: calorMiniImg,
      gallery: [calorMiniImg, calorMegaImg, calorStandardImg],
      overview: 'The Calor Mini is our compact, desktop-class dehydrator designed to offer professional-grade humidity control for small artisanal batches, culinary labs, and botanical creators. Constructed with a premium stainless steel chassis, it delivers highly balanced, zero-hotspot heat distribution via dual-axis micro-fans.',
      warranty: '1-Year Limited Parts & Repair Warranty',
      energy: 'Average consumption: 0.45 kW. Highly efficient low-amp thermal micro-heater.',
      specs: [
        { label: 'Dimensions', value: '2 x 2 x 2.2 feet (Desktop sized)' },
        { label: 'Capacity', value: '80 Liters / 24 Hours' },
        { label: 'Tray Count', value: '6 food-grade slide-out stainless steel mesh trays' },
        { label: 'Total Tray Area', value: '24 sq ft total drying space' },
        { label: 'Controller', value: 'Smart touchscreen control with presets' },
        { label: 'Air Circulation', value: 'Dual-axis micro-fans for zero-hotspot heat' }
      ],
      features: [
        'Ultra-precise digital thermostat control (30°C to 75°C).',
        'Glass viewport window with interior LED lamp to monitor cycles.',
        'Quiet-flow ventilation system runs at under 45 decibels.',
        'Compact footprint easily fits on standard laboratory tables.',
        'Dishwasher-safe trays make sanitation extremely quick.'
      ],
      useCases: [
        'Culinary testing, restaurant kitchens, and recipe formulation.',
        'High-value botanical and medicinal herb drying.',
        'Small-scale home gardeners and preserving specialty ingredients.',
        'University agricultural labs and research projects.'
      ],
      installation: 'Fully assembled. Place on any sturdy countertop or desktop table. Standard 110V household plug-and-play hookup. No special ventilation required.',
      maintenance: 'Wipe down the interior cabinet walls with a damp microfiber cloth after use. Wash the mesh shelves. Clean the rear fan grill monthly to maintain proper airflow.'
    }
  };

  const product = productDb[id];

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-bold text-primary-text font-outfit">Product Not Found</h2>
        <p className="text-[18px] text-secondary-text">The product you are looking for does not exist in our system.</p>
        <Link to="/products" className="px-6 py-3 bg-accent text-white text-[18px] font-bold rounded-lg hover:bg-accent/90 transition-all">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-2 pb-16 px-6 md:px-12 bg-bg transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        
        {/* Navigation Breadcrumb */}
        <div className="text-[18px] text-secondary-text font-bold">
          <Link to="/" className="hover:text-accent">Home</Link> &gt;&nbsp;
          <Link to="/products" className="hover:text-accent">Products</Link> &gt;&nbsp;
          <span className="text-primary-text">{product.name}</span>
        </div>

        {/* 1. PRODUCT INTRO BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-8 bg-surface border border-border rounded-2xl shadow-skeuo-out flex items-center justify-center">
              <img
                src={product.img}
                alt={product.name}
                className="max-h-[450px] w-auto object-contain rounded-xl"
              />
            </div>
            {/* Small thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((thumb, idx) => (
                <div key={idx} className="p-2 bg-surface border border-border rounded-lg shadow-skeuo-in flex items-center justify-center cursor-pointer hover:border-accent transition-colors">
                  <img src={thumb} alt="thumbnail" className="h-16 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Core Info Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-[18px] font-black uppercase text-accent tracking-wider">
                {product.tagline}
              </span>
              <h1 className="text-4xl md:text-5xl font-black font-outfit text-primary-text mt-2 leading-tight">
                {product.name}
              </h1>
            </div>

            <p className="text-[20px] text-primary-text leading-relaxed font-medium">
              {product.overview}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-brand-light border border-border mt-4">
              <div className="flex flex-col">
                <span className="text-secondary-text text-[18px] font-bold">Pricing Starts At</span>
                <span className="text-4xl font-extrabold text-primary-text">{product.price} USD</span>
              </div>
              <a
                href={`https://wa.me/1234567890?text=Hello%20CalorTech%2C%20I%20would%20like%20to%20request%20information%20and%20purchase%20enquiry%20on%20the%20${encodeURIComponent(product.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 h-14 bg-whatsapp hover:bg-whatsapp/90 active:scale-95 text-white text-[18px] font-bold rounded-lg transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-whatsapp"
              >
                Inquire via WhatsApp
              </a>
            </div>

            {/* Safety & warranty alerts */}
            <div className="flex gap-4 items-start p-4 bg-accent/5 border border-accent/20 rounded-xl">
              <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div className="text-[18px]">
                <strong className="text-primary-text block font-bold">Warranty Shield Protected</strong>
                <span className="text-secondary-text">{product.warranty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TABBED DETAILED SPECIFICATIONS SECTION */}
        <div className="mt-8 border-t border-border pt-12">
          {/* Tabs header */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-px">
            {[
              { id: 'specs', label: 'Technical Specifications', icon: <Zap className="w-5 h-5" /> },
              { id: 'installation', label: 'Installation Requirements', icon: <Hammer className="w-5 h-5" /> },
              { id: 'maintenance', label: 'Maintenance & Service', icon: <PenTool className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-[18px] font-bold rounded-t-xl transition-all border-t border-l border-r ${
                  activeTab === tab.id
                    ? 'bg-surface border-border text-accent shadow-sm translate-y-px z-10'
                    : 'bg-transparent border-transparent text-secondary-text hover:text-primary-text hover:bg-brand-light'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tabs Content */}
          <div className="p-8 bg-surface border-b border-l border-r border-border rounded-b-2xl shadow-skeuo-out transition-colors duration-300">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Tech specifications table */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-primary-text font-outfit">Physical Specs Sheet</h3>
                  <table className="w-full text-left border-collapse text-[18px]">
                    <tbody>
                      {product.specs.map((item, i) => (
                        <tr key={i} className="border-b border-border/60 hover:bg-brand-light transition-colors">
                          <td className="py-3 pr-4 font-bold text-secondary-text w-1/3">{item.label}</td>
                          <td className="py-3 text-primary-text font-semibold">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Features & use cases */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-text font-outfit mb-3">Key Design Advantages</h3>
                    <ul className="flex flex-col gap-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex gap-2 items-start text-[18px] text-secondary-text">
                          <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-primary-text font-outfit mb-3">Ideal Sizing & Use Cases</h3>
                    <ul className="flex flex-col gap-2">
                      {product.useCases.map((use, i) => (
                        <li key={i} className="flex gap-2 items-start text-[18px] text-secondary-text">
                          <Info className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-primary-text font-outfit">Installation Procedures & Site Readiness</h3>
                <p className="text-[18px] text-secondary-text leading-relaxed max-w-[900px]">
                  {product.installation}
                </p>
                <div className="mt-4 p-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-700 dark:text-orange-300 text-[18px] flex gap-4 items-start max-w-[900px]">
                  <HelpCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block font-bold">Need Help Planning Your Space?</strong>
                    Our engineering team offers complimentary remote site evaluation to verify power lines and air circulation layout. Contact sales today to arrange a layout design review.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'maintenance' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-primary-text font-outfit">Routine Maintenance and Longevity Protocol</h3>
                <p className="text-[18px] text-secondary-text leading-relaxed max-w-[900px]">
                  {product.maintenance}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-w-[900px]">
                  <div className="p-6 border border-border rounded-xl bg-bg">
                    <strong className="text-primary-text block mb-2 font-bold">Weekly Diagnostics Checklist</strong>
                    <ul className="list-disc pl-5 text-[18px] text-secondary-text flex flex-col gap-1">
                      <li>Verify drain hose drainage clearance</li>
                      <li>Check display screen console warnings</li>
                      <li>Inspect polyurethane door gaskets for seal</li>
                    </ul>
                  </div>
                  <div className="p-6 border border-border rounded-xl bg-bg">
                    <strong className="text-primary-text block mb-2 font-bold">Energy Performance Audit</strong>
                    <p className="text-[18px] text-secondary-text">
                      {product.energy}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. CTA CARD TO ANOTHER PRODUCT */}
        <div className="mt-8 p-8 md:p-12 rounded-3xl bg-brand-light border border-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left transition-colors duration-300">
          <div>
            <h3 className="text-2xl font-extrabold font-outfit text-primary-text">Want to compare other capacities?</h3>
            <p className="text-[18px] text-secondary-text mt-1">Review the full CalorTech line from compact desktop units to commercial systems.</p>
          </div>
          <Link
            to="/products"
            className="px-8 py-4 bg-surface text-primary-text border border-border text-[18px] font-bold rounded-lg shadow-skeuo-out hover:bg-toggle-bg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent"
          >
            Back to Catalog
          </Link>
        </div>

      </div>
    </div>
  );
}
