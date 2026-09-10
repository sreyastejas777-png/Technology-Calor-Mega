import bcrypt from 'bcryptjs';
import { runQuery, getQuery } from './db.js';

export const seedData = async (force = false) => {
  // 1. Seed Super Admin User
  const existingUser = await getQuery('SELECT * FROM users WHERE email = ?', ['admin@calormega.com']);
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('Admin@123456', 10);
    await runQuery(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Super Admin', 'admin@calormega.com', hashedPassword, 'superadmin']
    );
    console.log('✅ Default superadmin seeded: admin@calormega.com / Admin@123456');
  }

  // 2. Default Content Objects
  const defaultSiteSettings = {
    site_name: 'CALOR MEGA',
    contact_email: 'contact@calormega.com',
    contact_phone: '+91 98765 43210',
    factory_address: 'Industrial Zone, Hubli-Dharwad, Karnataka, India',
    working_hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    facebook_url: 'https://facebook.com/calormega',
    linkedin_url: 'https://linkedin.com/company/calormega',
    twitter_url: 'https://twitter.com/calormega',
    instagram_url: 'https://instagram.com/calormega',
    youtube_url: 'https://youtube.com/calormega',
    meta_title: 'CALOR MEGA | Commercial Food Dehydrators',
    meta_description: 'High-efficiency industrial commercial food dehydrators.',
    og_image: '/src/assets/images/hero-dryer.jpeg',
    favicon_url: '/favicon.svg',
  };

  const defaultHeroSection = {
    headline: 'Premium Drying\nSolutions.\nTaste and Preserve.',
    subheadline: 'Industrial-grade moisture control engineered to eliminate food waste and unlock agricultural profitability for family farms and cooperatives.',
    cta_text: 'Get a Free Quote',
    cta_link: '/quote',
    secondary_cta_text: 'Explore Products',
    secondary_cta_link: '/products',
    tertiary_cta_text: 'Explore Technology',
    tertiary_cta_link: '/technology',
    banner_image: '/src/assets/images/hero-dryer.jpeg',
  };

  const defaultAboutSection = {
    title: 'About CalorTech Systems',
    subtitle: 'Engineering Better Yields',
    body: 'We engineer high-efficiency, robust dehumidification systems that bridge the gap between harvests and markets. Our simple-to-operate commercial dehydrators empower farmers and cooperatives to eliminate crop waste, preserve nutrients, and maximize yield value.',
    certifications: [
      { id: 'cert-1', title: 'Local Support', desc: 'On-site staff training and 24/7 technical hotline support.' },
      { id: 'cert-2', title: 'Eco Certified', desc: 'Zero ozone depletion potential using eco-compliant refrigerants.' },
      { id: 'cert-3', title: 'ISO 9001 Quality', desc: 'Manufactured in certified facilities following strict safety protocols.' },
    ],
    brochure_url: '/assets/downloads/CALOR_MEGA_Specs.pdf',
  };

  const defaultTechnicalDatasheet = [
    { id: 'ds-1', category: 'Construction', details: 'Double-walled heavy gauge Stainless Steel (SS304 outer/inner, optional SS316 internal chamber for high-acid produce). Reinforced structural framing.' },
    { id: 'ds-2', category: 'Thermal Insulation', details: '75mm high-density rockwool / mineral wool insulation, minimizing heat dissipation and casing temperature.' },
    { id: 'ds-3', category: 'Control System', details: 'Microprocessor-based PID Digital Controller with dual displays for PV (Process Value) and SV (Set Value). Dynamic Pt100 RTD sensor.' },
    { id: 'ds-4', category: 'Capacity Range', details: 'Standard industrial configurations of 50 kg, 100 kg, 200 kg, 500 kg, and custom 1000+ kg continuous batch processing setups.' },
    { id: 'ds-5', category: 'Drying Trays', details: 'Removable SS304 mesh tray racks. Wire mesh spacing customized for tiny seeds, herbs, or large fruit chunks.' },
    { id: 'ds-6', category: 'Heating Method', details: 'Finned stainless steel armored electric heating elements, with support for steam heating coils or hot water heat exchangers.' },
    { id: 'ds-7', category: 'Airflow System', details: 'Direct-drive, dynamically balanced axial flow fans with high-temperature resistance and adjustable speed control for tailored laminar airflow.' },
    { id: 'ds-8', category: 'Temperature Range', details: 'Ambient to 90°C, adjustable with ±1°C accuracy. Built-in thermal safety override cut-off.' },
    { id: 'ds-9', category: 'Humidity Control', details: 'Active electronic humidity transmitter. Automated electric actuator dampers for exhaust air evacuation.' },
    { id: 'ds-10', category: 'Installation and Service', details: 'Factory-assembled skid-mounted design for rapid commissioning. Simple three-phase electrical input connection.' },
  ];

  const defaultKeyMetrics = [
    { id: 'stat-1', value: 1000, suffix: '+', label: 'Farmers Served' },
    { id: 'stat-2', value: 95, suffix: '%', label: 'Moisture Reduction' },
    { id: 'stat-3', value: 12, suffix: ' Months', label: 'Shelf Life Achieved' },
    { id: 'stat-4', value: 40, suffix: '% Less', label: 'Energy Consumption' },
  ];

  const defaultFeatureCards = [
    { id: 'feat-1', title: 'Controlled Low-Temp Dehydration', desc: 'Preserves delicate vitamins, enzymes, aromas, and natural pigments that thermal roasting destroys.' },
    { id: 'feat-2', title: 'Closed-Loop Heat Pump Cycle', desc: 'Re-circulates latent heat energy, reducing electricity consumption by up to 65% compared to open-air vented dryers.' },
    { id: 'feat-3', title: 'Food-Grade Stainless Steel', desc: 'Constructed entirely from SS304/SS316 food-grade stainless steel for hygienic operations and effortless cleaning.' },
    { id: 'feat-4', title: 'Precision Touchscreen PLC', desc: 'Multi-stage temperature and humidity ramping profiles tailored specifically for fruits, herbs, or spices.' },
  ];

  const defaultMachineExplorer = [
    { id: 'hotspot-1', title: 'Axial Turbo Fan Assembly', description: 'Engineered for continuous laminar airflow across every single tray shelf, preventing localized hot or cold pockets.', x: 50, y: 22, z: 10 },
    { id: 'hotspot-2', title: 'SS304 Finned Heating Coils', description: 'Even heating core with fast thermal recovery time and long operational lifespan.', x: 30, y: 48, z: 20 },
    { id: 'hotspot-3', title: 'Digital PID Touchscreen', description: 'Dual-display microprocessor controller with multi-stage programmable drying cycles.', x: 78, y: 35, z: 15 },
    { id: 'hotspot-4', title: 'Condensate Drain & Damper', description: 'Automated electric damper flap opens dynamically when chamber humidity exceeds setpoint.', x: 45, y: 82, z: 5 },
  ];

  const defaultProducts = [
    {
      id: 'mega',
      name: 'Calor Mega',
      tagline: 'The Complete Dehydration System',
      image: '/src/assets/calor_mega.png',
      desc: 'Premium commercial walk-in food dehydrator utilizing highly efficient heat-pump moisture extraction. Built as a 10x10 foot insulated room, it is perfect for agricultural hubs and high-volume cooperatives looking to eliminate post-harvest crop waste.',
      capacity: '1200 Liters / 24 hrs',
      sizing: 'Suitable for spaces up to 1,000 sq ft',
      energy: '5-Star Energy Rating (Heat-Pump Tech)',
      specs: [
        '10x10x8 ft modular Aluminium room',
        'Polyurethane foam double-insulation',
        'Precision digital thermostat & hydrostat',
        'Multi-point air distribution blowers',
      ],
      price: '$12,500',
    },
    {
      id: 'standard',
      name: 'Calor Standard',
      tagline: 'Artisanal & Cooperative Mid-Range',
      image: '/src/assets/calor_standard.png',
      desc: 'A heavy-duty, stand-alone commercial cabinet dehumidifier. Highly recommended for regional food processing labs, specialized seed drying, and medium-scale farms that require constant relative humidity controls.',
      capacity: '350 Liters / 24 hrs',
      sizing: 'Suitable for spaces up to 350 sq ft',
      energy: '4.5-Star Energy Rating',
      specs: [
        'Stainless steel food-grade inner cabinet',
        '12 adjustable sliding shelves',
        'Multi-zone digital feedback sensors',
        'Auto-drain continuous hose system',
      ],
      price: '$4,200',
    },
    {
      id: 'mini',
      name: 'Calor Mini',
      tagline: 'Desktop Precision Dehumidifier',
      image: '/src/assets/calor_mini.png',
      desc: 'Compact desktop-grade dehydrator scaled down to preserve high-value artisanal batches, botanicals, and small-scale testing. Offers zero-hotspot heat distribution with a premium stainless steel structure.',
      capacity: '80 Liters / 24 hrs',
      sizing: 'Suitable for spaces up to 80 sq ft',
      energy: '4-Star Energy Rating',
      specs: [
        'Desktop footprint (2x2 ft)',
        'Smart touchscreen control panel',
        '6 slide-out stainless steel mesh trays',
        'Dual-axis micro-circulation fans',
      ],
      price: '$1,800',
    },
  ];

  const defaultApplications = [
    {
      id: 'app-jackfruit',
      name: 'Jackfruit Bulbs',
      category: 'Fruits',
      temp: '55°C - 60°C',
      duration: '14 - 18 Hours',
      inputMoisture: '80%',
      outputMoisture: '10 - 12%',
      image: '/src/assets/images/hero-dryer.jpeg',
      description: 'Preserves golden hue and sweet flavor without browning or hardening.',
    },
    {
      id: 'app-banana',
      name: 'Banana Slices & Coins',
      category: 'Fruits',
      temp: '50°C - 55°C',
      duration: '12 - 15 Hours',
      inputMoisture: '75%',
      outputMoisture: '8 - 10%',
      image: '/src/assets/images/hero-dryer.jpeg',
      description: 'Crunchy or chewy dried banana chips with no added sugar or sulfur.',
    },
    {
      id: 'app-mango',
      name: 'Mango Slices',
      category: 'Fruits',
      temp: '55°C - 62°C',
      duration: '12 - 16 Hours',
      inputMoisture: '82%',
      outputMoisture: '12 - 14%',
      image: '/src/assets/images/hero-dryer.jpeg',
      description: 'Vibrant orange-yellow dried mango strips rich in Vitamin A.',
    },
    {
      id: 'app-turmeric',
      name: 'Turmeric Fingers & Slices',
      category: 'Herbs & Spices',
      temp: '50°C - 55°C',
      duration: '16 - 20 Hours',
      inputMoisture: '80%',
      outputMoisture: '8 - 10%',
      image: '/src/assets/images/hero-dryer.jpeg',
      description: 'Protects curcumin volatile oils and rich deep yellow medicinal pigment.',
    },
    {
      id: 'app-moringa',
      name: 'Moringa & Herbal Leaves',
      category: 'Herbs & Spices',
      temp: '38°C - 45°C',
      duration: '6 - 8 Hours',
      inputMoisture: '78%',
      outputMoisture: '5 - 7%',
      image: '/src/assets/images/hero-dryer.jpeg',
      description: 'Ultra-gentle low temperature drying locks in live chlorophyll and vitamins.',
    },
    {
      id: 'app-specialty-fish',
      name: 'Specialty Fish & Seafood',
      category: 'Specialty & Seafood',
      temp: '45°C - 52°C',
      duration: '10 - 14 Hours',
      inputMoisture: '72%',
      outputMoisture: '15 - 18%',
      image: '/src/assets/images/hero-dryer.jpeg',
      description: 'Clean, hygienic, zero-insect exposure drying for high-value dried seafood.',
    },
  ];

  const defaultTestimonials = [
    {
      id: 't-1',
      name: 'Rajesh Patil',
      role: 'President, Konkan Farmers Cooperative',
      content: 'Calor Mega transformed our seasonal mango and jackfruit glut. We reduced post-harvest wastage from 35% down to less than 2%, creating export-ready dried fruit chips.',
      avatar: 'RP',
    },
    {
      id: 't-2',
      name: 'Ananya Deshmukh',
      role: 'Operations Director, BioSpices Organics',
      content: 'The low-temperature heat pump dehydration loop preserved the essential oils of our ginger and turmeric far better than any conventional solar tunnel dryer.',
      avatar: 'AD',
    },
  ];

  const defaultGalleryMedia = [
    { id: 'g-1', category: 'Machines', title: 'Calor Mega Walk-In Chamber', url: '/src/assets/calor_mega.png' },
    { id: 'g-2', category: 'Installations', title: 'Factory Commissioning in Hubli', url: '/src/assets/images/hero-dryer.jpeg' },
    { id: 'g-3', category: 'Dried Samples', title: 'Dehydrated Jackfruit Chips', url: '/src/assets/images/hero-dryer.jpeg' },
    { id: 'g-4', category: 'Factory', title: 'CNC Precision SS304 Sheet Fabrication', url: '/src/assets/images/hero-dryer.jpeg' },
  ];

  const defaultFaqItems = [
    { id: 'faq-1', question: 'How much energy does Calor Mega save compared to electrical resistance dryers?', answer: 'Our heat pump dehydration loop recovers sensible and latent heat from the humid exhaust air, achieving up to 60-65% electricity savings per batch.' },
    { id: 'faq-2', question: 'What crops can be processed in Calor Mega machines?', answer: 'Virtually all fruits, vegetables, culinary herbs, medicinal roots, spices, seeds, nuts, and clean seafood can be processed with customized temperature curves.' },
    { id: 'faq-3', question: 'Do you offer on-site commissioning and operator training?', answer: 'Yes! Our engineering field team provides complete on-site installation, three-phase electrical commissioning, and multi-day operator training.' },
  ];

  const defaultTimelineMilestones = [
    { id: 'm1', year: '2019', title: 'Company Founded', description: 'Established by thermal engineers to reduce crop waste in farming hubs.' },
    { id: 'm2', year: '2021', title: 'Patented Loop', description: 'Patented our energy-efficient heat-pump dehydration loop.' },
    { id: 'm3', year: '2023', title: 'Cooperative Deployments', description: 'Deployed cabinets in 15 cooperatives, preserving 500+ tons of crops.' },
    { id: 'm4', year: '2026', title: 'Calor Mega Release', description: 'Released walk-in commercial chambers for large-scale exports.' },
  ];

  // Helper to upsert JSON tables
  const seedTable = async (table, data) => {
    const existing = await getQuery(`SELECT id FROM ${table} WHERE id = 'default'`);
    if (!existing) {
      await runQuery(`INSERT INTO ${table} (id, data) VALUES ('default', ?)`, [JSON.stringify(data)]);
    } else if (force) {
      await runQuery(`UPDATE ${table} SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 'default'`, [JSON.stringify(data)]);
    }
  };

  await seedTable('site_settings', defaultSiteSettings);
  await seedTable('hero_section', defaultHeroSection);
  await seedTable('about_section', defaultAboutSection);
  await seedTable('technical_datasheet', defaultTechnicalDatasheet);
  await seedTable('key_metrics', defaultKeyMetrics);
  await seedTable('feature_cards', defaultFeatureCards);
  await seedTable('machine_explorer', defaultMachineExplorer);
  await seedTable('products', defaultProducts);
  await seedTable('applications', defaultApplications);
  await seedTable('testimonials', defaultTestimonials);
  await seedTable('gallery_media', defaultGalleryMedia);
  await seedTable('faq_items', defaultFaqItems);
  await seedTable('timeline_milestones', defaultTimelineMilestones);

  console.log('✅ Default CMS content tables seeded successfully.');
};

// Allow direct CLI execution: node server/seed.js
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  (async () => {
    try {
      const { initDb } = await import('./db.js');
      await initDb();
      await seedData();
      console.log('🌱 Seed script completed successfully.');
      process.exit(0);
    } catch (e) {
      console.error('❌ Seed error:', e);
      process.exit(1);
    }
  })();
}
