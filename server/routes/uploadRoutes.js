import express from 'express';
import { upload } from '../middleware/upload.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename,
    size: req.file.size,
  });
});

export default router;
