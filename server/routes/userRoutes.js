import express from 'express';
import {
  getAllUsers,
  createAdmin,
  updateUserStatus,
  deleteUser,
  resetUserPassword,
  getAdminSettings,
  updateAdminSettings,
} from '../controllers/userController.js';
import { requireAuth, requireSuperAdmin } from '../middleware/auth.js';

const router = express.Router();

// Enforce that only authenticated Super Admins can access user management
router.use(requireAuth);
router.use(requireSuperAdmin);

// Settings routes (placed before :id params)
router.get('/settings', getAdminSettings);
router.post('/settings', updateAdminSettings);

// User roster & management routes
router.get('/', getAllUsers);
router.post('/', createAdmin);
router.patch('/:id/status', updateUserStatus);
router.delete('/:id', deleteUser);
router.post('/:id/reset-password', resetUserPassword);

export default router;
