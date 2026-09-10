import { getQuery, runQuery } from '../db.js';

// Helper to get JSON data from table
const getTableData = async (table) => {
  const row = await getQuery(`SELECT data FROM ${table} WHERE id = 'default'`);
  if (!row) return null;
  try {
    return JSON.parse(row.data);
  } catch {
    return null;
  }
};

// Helper to upsert JSON data in table
const upsertTableData = async (table, data) => {
  const jsonStr = JSON.stringify(data);
  const existing = await getQuery(`SELECT id FROM ${table} WHERE id = 'default'`);
  if (existing) {
    await runQuery(`UPDATE ${table} SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 'default'`, [jsonStr]);
  } else {
    await runQuery(`INSERT INTO ${table} (id, data) VALUES ('default', ?)`, [jsonStr]);
  }
};

// 1. Get full compiled site content
export const getAllContent = async (req, res) => {
  try {
    const [
      siteSettings,
      heroSection,
      aboutSection,
      technicalDatasheet,
      keyMetrics,
      featureCards,
      machineExplorer,
      products,
      applications,
      testimonials,
      galleryMedia,
      faqItems,
      timelineMilestones,
    ] = await Promise.all([
      getTableData('site_settings'),
      getTableData('hero_section'),
      getTableData('about_section'),
      getTableData('technical_datasheet'),
      getTableData('key_metrics'),
      getTableData('feature_cards'),
      getTableData('machine_explorer'),
      getTableData('products'),
      getTableData('applications'),
      getTableData('testimonials'),
      getTableData('gallery_media'),
      getTableData('faq_items'),
      getTableData('timeline_milestones'),
    ]);

    res.json({
      siteSettings: siteSettings || {},
      heroSection: heroSection || {},
      aboutSection: aboutSection || {},
      technicalDatasheet: technicalDatasheet || [],
      keyMetrics: keyMetrics || [],
      featureCards: featureCards || [],
      machineExplorer: machineExplorer || [],
      products: products || [],
      applications: applications || [],
      testimonials: testimonials || [],
      galleryMedia: galleryMedia || [],
      faqItems: faqItems || [],
      timelineMilestones: timelineMilestones || [],
    });
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ error: 'Failed to retrieve site content' });
  }
};

// 2. Unified Publish Endpoint: POST /api/content/publish
export const publishContent = async (req, res) => {
  try {
    const payload = req.body;
    const tableMap = {
      siteSettings: 'site_settings',
      heroSection: 'hero_section',
      aboutSection: 'about_section',
      technicalDatasheet: 'technical_datasheet',
      keyMetrics: 'key_metrics',
      featureCards: 'feature_cards',
      machineExplorer: 'machine_explorer',
      products: 'products',
      applications: 'applications',
      testimonials: 'testimonials',
      galleryMedia: 'gallery_media',
      faqItems: 'faq_items',
      timelineMilestones: 'timeline_milestones',
    };

    // Case 1: Specific single section payload { section: 'products', data: [...] }
    if (payload.section && payload.data !== undefined) {
      const tableName = tableMap[payload.section] || payload.section;
      await upsertTableData(tableName, payload.data);
      return res.json({ success: true, message: `Section ${payload.section} published successfully` });
    }

    // Case 2: Multi-section payload { products: [...], heroSection: {...}, ... }
    for (const [key, val] of Object.entries(payload)) {
      if (tableMap[key] && val !== undefined) {
        await upsertTableData(tableMap[key], val);
      }
    }

    res.json({ success: true, message: 'Changes successfully published live!' });
  } catch (err) {
    console.error('Error in publishContent:', err);
    res.status(500).json({ error: 'Failed to publish content changes' });
  }
};

// 3. Section specific handlers
export const updateSiteSettings = async (req, res) => {
  try {
    await upsertTableData('site_settings', req.body);
    res.json({ success: true, siteSettings: req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHeroSection = async (req, res) => {
  try {
    await upsertTableData('hero_section', req.body);
    res.json({ success: true, heroSection: req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAboutSection = async (req, res) => {
  try {
    await upsertTableData('about_section', req.body);
    res.json({ success: true, aboutSection: req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const makeCollectionSaver = (table) => async (req, res) => {
  try {
    const items = req.body.items !== undefined ? req.body.items : req.body;
    await upsertTableData(table, items);
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const saveTechnicalDatasheet = makeCollectionSaver('technical_datasheet');
export const saveKeyMetrics = makeCollectionSaver('key_metrics');
export const saveFeatureCards = makeCollectionSaver('feature_cards');
export const saveMachineExplorer = makeCollectionSaver('machine_explorer');
export const saveProducts = makeCollectionSaver('products');
export const saveApplications = makeCollectionSaver('applications');
export const saveTestimonials = makeCollectionSaver('testimonials');
export const saveGalleryMedia = makeCollectionSaver('gallery_media');
export const saveFAQItems = makeCollectionSaver('faq_items');
export const saveTimelineMilestones = makeCollectionSaver('timeline_milestones');
