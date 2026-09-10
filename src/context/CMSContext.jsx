import { createContext, useContext, useState, useEffect } from 'react';
import { fetchContentApi } from '../api/cmsApi';
import { stats as defaultStats } from '../data/stats';
import { features as defaultFeatures } from '../data/features';
import { hotspots as defaultHotspots } from '../data/hotspots';
import { applications as defaultApplications } from '../data/applications';
import { testimonials as defaultTestimonials } from '../data/testimonials';
import { galleryItems as defaultGallery } from '../data/gallery';
import { faqs as defaultFaqs } from '../data/faqs';

const CMSContext = createContext(null);

export const defaultProducts = [
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

export const defaultTechnicalSpecs = [
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

export const defaultAboutData = {
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

const checkUrlIsPreview = () => {
  if (typeof window === 'undefined') return false;
  return window.location.search.includes('preview=true') || window.location.hash.includes('preview=true');
};

export const CMSProvider = ({ children }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(checkUrlIsPreview);

  const [content, setContent] = useState({
    siteSettings: {
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
      meta_description: 'High-efficiency commercial food dehydrators.',
    },
    heroSection: {
      headline: 'Premium Drying\nSolutions.\nTaste and Preserve.',
      subheadline: 'Industrial-grade moisture control engineered to eliminate food waste and unlock agricultural profitability for family farms and cooperatives.',
      cta_text: 'Get a Free Quote',
      cta_link: '/quote',
      secondary_cta_text: 'Explore Products',
      secondary_cta_link: '/products',
      tertiary_cta_text: 'Explore Technology',
      tertiary_cta_link: '/technology',
      banner_image: '/src/assets/images/hero-dryer.jpeg',
    },
    aboutSection: defaultAboutData,
    keyMetrics: defaultStats,
    featureCards: defaultFeatures,
    machineExplorer: defaultHotspots,
    products: defaultProducts,
    technicalDatasheet: defaultTechnicalSpecs,
    applications: defaultApplications,
    testimonials: defaultTestimonials,
    galleryMedia: defaultGallery,
    faqItems: defaultFaqs.map((f, i) => ({ id: `faq-${i}`, question: f.q || f.question, answer: f.a || f.answer })),
    timelineMilestones: [
      { id: 'm1', year: '2019', title: 'Company Founded', description: 'Established by thermal engineers to reduce crop waste in farming hubs.' },
      { id: 'm2', year: '2021', title: 'Patented Loop', description: 'Patented our energy-efficient heat-pump dehydration loop.' },
      { id: 'm3', year: '2023', title: 'Cooperative Deployments', description: 'Deployed cabinets in 15 cooperatives, preserving 500+ tons of crops.' },
      { id: 'm4', year: '2026', title: 'Calor Mega Release', description: 'Released walk-in commercial chambers for large-scale exports.' },
    ],
    isLoaded: false,
    isApiConnected: false,
  });

  const mergeDraftIfAvailable = (baseContent) => {
    try {
      const draftStr = localStorage.getItem('calor_mega_preview_draft');
      if (draftStr) {
        const draft = JSON.parse(draftStr);
        return {
          ...baseContent,
          siteSettings: draft.siteSettings || baseContent.siteSettings,
          heroSection: draft.heroSection || baseContent.heroSection,
          aboutSection: draft.aboutSection || baseContent.aboutSection,
          keyMetrics: draft.keyMetrics || baseContent.keyMetrics,
          featureCards: draft.featureCards || baseContent.featureCards,
          machineExplorer: draft.machineExplorer || baseContent.machineExplorer,
          products: draft.products || baseContent.products,
          technicalDatasheet: draft.technicalDatasheet || baseContent.technicalDatasheet,
          applications: draft.applications || baseContent.applications,
          galleryMedia: draft.galleryMedia || baseContent.galleryMedia,
        };
      }
    } catch (e) {
      console.warn('Could not parse preview draft from localStorage:', e);
    }
    return baseContent;
  };

  const loadContent = async () => {
    const data = await fetchContentApi();
    let updated;
    if (data) {
      updated = {
        siteSettings: data.siteSettings?.site_name ? data.siteSettings : content.siteSettings,
        heroSection: data.heroSection?.headline ? data.heroSection : content.heroSection,
        aboutSection: data.aboutSection?.title ? data.aboutSection : content.aboutSection,
        keyMetrics: data.keyMetrics?.length ? data.keyMetrics : content.keyMetrics,
        featureCards: data.featureCards?.length ? data.featureCards : content.featureCards,
        machineExplorer: data.machineExplorer?.length ? data.machineExplorer : content.machineExplorer,
        products: data.products?.length ? data.products : content.products,
        technicalDatasheet: data.technicalDatasheet?.length ? data.technicalDatasheet : content.technicalDatasheet,
        applications: data.applications?.length ? data.applications : content.applications,
        testimonials: data.testimonials?.length ? data.testimonials : content.testimonials,
        galleryMedia: data.galleryMedia?.length ? data.galleryMedia : content.galleryMedia,
        faqItems: data.faqItems?.length ? data.faqItems : content.faqItems,
        timelineMilestones: data.timelineMilestones?.length ? data.timelineMilestones : content.timelineMilestones,
        isLoaded: true,
        isApiConnected: true,
      };
    } else {
      updated = {
        ...content,
        isLoaded: true,
        isApiConnected: false,
      };
    }

    if (checkUrlIsPreview()) {
      setIsPreviewMode(true);
      updated = mergeDraftIfAvailable(updated);
    } else {
      setIsPreviewMode(false);
    }

    setContent(updated);
  };

  useEffect(() => {
    loadContent();

    const handleStorage = (e) => {
      if (e.key === 'calor_mega_preview_draft' && checkUrlIsPreview()) {
        setContent((prev) => mergeDraftIfAvailable(prev));
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('calor_draft_update', () => {
      if (checkUrlIsPreview()) {
        setContent((prev) => mergeDraftIfAvailable(prev));
      }
    });

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const refreshContent = async () => {
    await loadContent();
  };

  const exitPreviewMode = () => {
    localStorage.removeItem('calor_mega_preview_mode');
    setIsPreviewMode(false);
    if (window.location.search.includes('preview=true')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('preview');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
    if (window.location.hash.includes('preview=true')) {
      window.location.hash = window.location.hash.replace('?preview=true', '').replace('&preview=true', '');
    }
    loadContent();
  };

  return (
    <CMSContext.Provider
      value={{
        ...content,
        refreshContent,
        setContent,
        isPreviewMode,
        exitPreviewMode,
        setIsPreviewMode,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
