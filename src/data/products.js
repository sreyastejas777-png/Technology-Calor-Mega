import heroDryer from '../assets/images/hero-dryer.jpeg';
import innovatechDryer from '../assets/images/innovatech-dryer.jpeg';

export const products = [
  {
    id: 'industrial-dryer',
    name: 'Industrial Dryer',
    tagline: 'Maximum throughput for large-scale processors',
    image: heroDryer,
    gallery: [heroDryer, innovatechDryer],
    shortDescription:
      'Our flagship dual-chamber dryer built for high-volume commercial operations processing multiple tons per cycle.',
    features: ['20+ Food Grade Trays', 'Dual Chamber Design', 'Digital Touch Control', 'Food Grade Aluminium Interior'],
    specs: {
      Capacity: '500 - 1000 kg / batch',
      'Power Consumption': '18 - 24 kW',
      Dimensions: '2.4m x 1.6m x 2.1m',
      'Tray Count': '20 - 24 trays',
      'Temperature Range': '35°C - 90°C',
      Material: 'Food Grade Stainless & Aluminium',
    },
    benefits: [
      'Engineered for continuous, high-volume commercial output',
      'Dual insulated chambers maximize energy efficiency',
      'Uniform airflow across every tray eliminates hot spots',
      'Secure locking doors protect product integrity',
    ],
    applications: ['Jackfruit', 'Mango', 'Banana', 'Vegetables', 'Herbs & Spices'],
  },
  {
    id: 'small-scale-dryer',
    name: 'Small Scale Dryer',
    tagline: 'Compact power for home businesses and startups',
    image: innovatechDryer,
    gallery: [innovatechDryer, heroDryer],
    shortDescription:
      'A compact, affordable dryer perfect for small farms, home-based food businesses and pilot production runs.',
    features: ['6 Food Grade Trays', 'Single Chamber', 'Digital Timer', 'Compact Footprint'],
    specs: {
      Capacity: '20 - 50 kg / batch',
      'Power Consumption': '2 - 4 kW',
      Dimensions: '0.8m x 0.7m x 1.4m',
      'Tray Count': '6 trays',
      'Temperature Range': '35°C - 80°C',
      Material: 'Food Grade Stainless Steel',
    },
    benefits: [
      'Low upfront investment for new food businesses',
      'Simple digital controls, no training required',
      'Fits comfortably in small kitchens or sheds',
      'Energy efficient for low-volume batches',
    ],
    applications: ['Herbs', 'Spices', 'Fruits', 'Medicinal Plants'],
  },
  {
    id: 'medium-scale-dryer',
    name: 'Medium Scale Dryer',
    tagline: 'Balanced capacity for growing operations',
    image: heroDryer,
    gallery: [heroDryer, innovatechDryer],
    shortDescription:
      'The sweet spot for growing farms and cooperatives that have outgrown small dryers but don’t yet need industrial scale.',
    features: ['12 Food Grade Trays', 'Single Chamber', 'Smart Control Panel', 'Humidity Regulation'],
    specs: {
      Capacity: '100 - 250 kg / batch',
      'Power Consumption': '6 - 10 kW',
      Dimensions: '1.4m x 1.1m x 1.8m',
      'Tray Count': '12 trays',
      'Temperature Range': '35°C - 85°C',
      Material: 'Food Grade Aluminium',
    },
    benefits: [
      'Scales easily as your production grows',
      'Smart panel remembers custom drying profiles',
      'Balanced energy use for mid-size batches',
      'Easy-clean removable tray system',
    ],
    applications: ['Pineapple', 'Coconut', 'Vegetables', 'Fish'],
  },
  {
    id: 'commercial-dryer',
    name: 'Commercial Dryer',
    tagline: 'Built for factories and export-grade production',
    image: innovatechDryer,
    gallery: [innovatechDryer, heroDryer],
    shortDescription:
      'A heavy-duty, multi-zone dryer designed for factories and exporters requiring certified, consistent output.',
    features: ['30+ Food Grade Trays', 'Triple Chamber', 'Sensor Monitoring', 'Export Grade Build'],
    specs: {
      Capacity: '1000 - 2000 kg / batch',
      'Power Consumption': '28 - 36 kW',
      Dimensions: '3.2m x 2.0m x 2.4m',
      'Tray Count': '30 - 36 trays',
      'Temperature Range': '35°C - 95°C',
      Material: 'Food Grade Stainless & Aluminium',
    },
    benefits: [
      'Certified for export-grade food processing',
      'Multi-zone chambers run independent drying profiles',
      'Sensor network provides full batch traceability',
      'Reinforced structure for continuous factory use',
    ],
    applications: ['Jackfruit', 'Mango', 'Banana', 'Spices', 'Medicinal Plants'],
  },
  {
    id: 'future-products',
    name: 'Future Products',
    tagline: 'Next-generation dryers, coming soon',
    image: heroDryer,
    gallery: [heroDryer, innovatechDryer],
    shortDescription:
      'We are engineering solar-hybrid and fully automated IoT-connected dryers for the next generation of food preservation.',
    features: ['Solar-Hybrid Power', 'IoT Remote Monitoring', 'AI Drying Profiles', 'Modular Expansion'],
    specs: {
      Capacity: 'Coming Soon',
      'Power Consumption': 'Solar-Hybrid',
      Dimensions: 'Modular',
      'Tray Count': 'Configurable',
      'Temperature Range': 'Coming Soon',
      Material: 'Food Grade Aluminium',
    },
    benefits: [
      'Reduce grid dependency with solar-hybrid power',
      'Monitor and control batches remotely via app',
      'AI-assisted profiles optimize every produce type',
      'Modular design expands as your business grows',
    ],
    applications: ['Coming Soon'],
  },
];

export const getProductById = (id) => products.find((p) => p.id === id);
