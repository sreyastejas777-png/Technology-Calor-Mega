import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Thermometer, Battery, MapPin } from 'lucide-react';
import calorMegaImg from '../assets/calor_mega.png';
import calorMiniImg from '../assets/calor_mini.png';
import calorStandardImg from '../assets/calor_standard.png';

export default function Products() {
  const products = [
    {
      id: 'mega',
      name: 'Calor Mega',
      tagline: 'The Complete Dehydration System',
      img: calorMegaImg,
      desc: 'Premium commercial walk-in food dehydrator utilizing highly efficient heat-pump moisture extraction. Built as a 10x10 foot insulated room, it is perfect for agricultural hubs and high-volume cooperatives looking to eliminate post-harvest crop waste.',
      capacity: '1200 Liters / 24 hrs',
      sizing: 'Suitable for spaces up to 1,000 sq ft',
      energy: '5-Star Energy Rating (Heat-Pump Tech)',
      specs: ['10x10x8 ft modular Aluminium room', 'Polyurethane foam double-insulation', 'Precision digital thermostat & hydrostat', 'Multi-point air distribution blowers'],
      price: '$12,500',
    },
    {
      id: 'standard',
      name: 'Calor Standard',
      tagline: 'Artisanal & Cooperative Mid-Range',
      img: calorStandardImg,
      desc: 'A heavy-duty, stand-alone commercial cabinet dehumidifier. Highly recommended for regional food processing labs, specialized seed drying, and medium-scale farms that require constant relative humidity controls.',
      capacity: '350 Liters / 24 hrs',
      sizing: 'Suitable for spaces up to 350 sq ft',
      energy: '4.5-Star Energy Rating',
      specs: ['Stainless steel food-grade inner cabinet', '12 adjustable sliding shelves', 'Multi-zone digital feedback sensors', 'Auto-drain continuous hose system'],
      price: '$4,200',
    },
    {
      id: 'mini',
      name: 'Calor Mini',
      tagline: 'Desktop Precision Dehumidifier',
      img: calorMiniImg,
      desc: 'Compact desktop-grade dehydrator scaled down to preserve high-value artisanal batches, botanicals, and small-scale testing. Offers zero-hotspot heat distribution with a premium stainless steel structure.',
      capacity: '80 Liters / 24 hrs',
      sizing: 'Suitable for spaces up to 80 sq ft',
      energy: '4-Star Energy Rating',
      specs: ['Desktop footprint (2x2 ft)', 'Smart touchscreen control panel', '6 slide-out stainless steel mesh trays', 'Dual-axis micro-circulation fans'],
      price: '$1,800',
    }
  ];

  return (
    <div className="w-full pt-2 pb-16 px-6 md:px-12 bg-bg transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-black font-outfit text-primary-text">
            Calor Tech Product Catalog
          </h1>
          <p className="text-[20px] md:text-[22px] text-secondary-text leading-relaxed font-semibold">
            Explore our line of high-capacity post-harvest dehydration hardware. Engineered for maximum reliability and ease of use.
          </p>
        </div>

        {/* Catalog List */}
        <div className="flex flex-col gap-12">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="p-8 md:p-12 rounded-3xl bg-surface border border-border shadow-skeuo-out hover:shadow-card-hover hover:scale-[1.005] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Product Image Column */}
              <div className="lg:col-span-5 flex justify-center p-4 bg-bg rounded-2xl border border-border/50">
                <img
                  src={product.img}
                  alt={`${product.name} Cabinet`}
                  className="max-h-[350px] w-auto object-contain hover:scale-105 transition-transform duration-500 rounded-xl"
                />
              </div>

              {/* Product Info Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="text-[16px] font-black uppercase tracking-wider text-accent">
                    {product.tagline}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-primary-text mt-1">
                    {product.name}
                  </h2>
                </div>

                <p className="text-[18px] text-secondary-text leading-relaxed">
                  {product.desc}
                </p>

                {/* Key specs highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-border/80 py-4 text-[16px]">
                  <div className="flex flex-col">
                    <span className="text-secondary-text font-bold">Capacity</span>
                    <span className="text-primary-text font-black text-[18px]">{product.capacity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-text font-bold">Energy Rating</span>
                    <span className="text-primary-text font-black text-[18px]">{product.energy}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-secondary-text font-bold">Ideal Room Sizing</span>
                    <span className="text-primary-text font-black text-[18px]">{product.sizing}</span>
                  </div>
                </div>

                {/* Quick specs lists */}
                <div>
                  <h4 className="text-[18px] font-bold text-primary-text mb-2">Key Hardware Specifications:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex gap-2 items-start text-[18px] text-secondary-text">
                        <span className="text-accent mt-1.5">&#9670;</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions & Price */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-border/40">
                  <div className="flex flex-col">
                    <span className="text-secondary-text text-[18px]">Starting Price</span>
                    <span className="text-3xl font-extrabold text-primary-text">{product.price} USD</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center justify-center px-8 h-14 bg-accent hover:bg-accent/90 active:scale-95 text-white text-[18px] font-bold rounded-lg transition-all shadow-btn focus:outline-none focus:ring-4 focus:ring-accent"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/1234567890?text=Hello%20CalorTech%2C%20I%20would%20like%20to%20place%20an%20enquiry%20regarding%20the%20${encodeURIComponent(product.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 h-14 bg-whatsapp hover:bg-whatsapp/90 active:scale-95 text-white text-[18px] font-bold rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-whatsapp"
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
