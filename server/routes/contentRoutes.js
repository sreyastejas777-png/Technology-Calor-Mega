import express from 'express';
import {
  getAllContent,
  publishContent,
  updateSiteSettings,
  updateHeroSection,
  updateAboutSection,
  saveTechnicalDatasheet,
  saveKeyMetrics,
  saveFeatureCards,
  saveMachineExplorer,
  saveProducts,
  saveApplications,
  saveTestimonials,
  saveGalleryMedia,
  saveFAQItems,
  saveTimelineMilestones,
} from '../controllers/contentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Public route to fetch compiled site content
router.get('/', getAllContent);

// Unified Publish Endpoint
router.post('/publish', requireAuth, publishContent);

// Protected section-specific routes
router.put('/site-settings', requireAuth, updateSiteSettings);
router.put('/hero-section', requireAuth, updateHeroSection);
router.put('/about-section', requireAuth, updateAboutSection);
router.post('/technical-datasheet', requireAuth, saveTechnicalDatasheet);
router.post('/key-metrics', requireAuth, saveKeyMetrics);
router.post('/feature-cards', requireAuth, saveFeatureCards);
router.post('/machine-explorer', requireAuth, saveMachineExplorer);
router.post('/products', requireAuth, saveProducts);
router.post('/applications', requireAuth, saveApplications);
router.post('/testimonials', requireAuth, saveTestimonials);
router.post('/gallery-media', requireAuth, saveGalleryMedia);
router.post('/faq-items', requireAuth, saveFAQItems);
router.post('/timeline-milestones', requireAuth, saveTimelineMilestones);

export default router;
