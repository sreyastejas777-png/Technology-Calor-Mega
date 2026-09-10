import express from 'express';
import {
  login,
  verifySession,
  getSetupStatus,
  setupSuperAdmin,
  registerAdmin,
  updateProfile,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/setup-status', getSetupStatus);
router.post('/setup-superadmin', setupSuperAdmin);
router.post('/login', login);
router.post('/register', registerAdmin);
router.get('/verify', requireAuth, verifySession);
router.get('/me', requireAuth, verifySession);
router.post('/update-profile', requireAuth, updateProfile);

export default router;
