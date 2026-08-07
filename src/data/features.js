import {
  MdOutlineDashboard,
  MdSensors,
  MdSecurity,
  MdOutlineTune,
} from 'react-icons/md';
import { GiHeatHaze, GiWindsock, GiMetalBar } from 'react-icons/gi';
import { FaWarehouse, FaBolt, FaWater } from 'react-icons/fa';

export const features = [
  {
    icon: MdOutlineDashboard,
    title: 'Digital Control',
    description:
      'Full-color touch panel lets operators set temperature, time and fan speed with pinpoint accuracy.',
  },
  {
    icon: FaWater,
    title: 'Humidity Stability',
    description:
      'Closed-loop humidity sensors continuously adjust airflow to keep moisture levels perfectly stable.',
  },
  {
    icon: GiHeatHaze,
    title: 'Heating Coils',
    description:
      'Industrial-grade coils deliver consistent, even heat across every chamber and tray.',
  },
  {
    icon: GiWindsock,
    title: 'Air Circulation',
    description:
      'High-velocity fans force air through every shelf, eliminating hot and cold spots.',
  },
  {
    icon: GiMetalBar,
    title: 'Food Grade Aluminium',
    description:
      'A fully food-safe interior resists corrosion and meets international hygiene standards.',
  },
  {
    icon: FaWarehouse,
    title: 'Large Capacity',
    description:
      'Modular tray racks scale from small batches to multi-ton commercial production runs.',
  },
  {
    icon: FaBolt,
    title: 'Energy Efficient',
    description:
      'Insulated double-wall panels and smart heat recovery minimize energy consumption.',
  },
  {
    icon: MdSecurity,
    title: 'Secure Door Lock',
    description:
      'Reinforced locking doors protect your product and maintain a sealed drying environment.',
  },
  {
    icon: MdSensors,
    title: 'Sensor Based Monitoring',
    description:
      'Real-time temperature and humidity sensors feed live data to the control panel.',
  },
  {
    icon: MdOutlineTune,
    title: 'Smart Control Panel',
    description:
      'Program custom drying profiles for every produce type and save them for repeat use.',
  },
];
