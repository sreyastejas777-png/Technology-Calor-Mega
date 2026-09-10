import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';
import { seedData } from './seed.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDb();
    await seedData();
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🔥 CALOR MEGA CMS API Server running on port ${PORT}`);
      console.log(`🌐 Base API URL: http://localhost:${PORT}/api`);
      console.log(`📁 Uploads URL: http://localhost:${PORT}/uploads`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to start CMS server:', err);
    process.exit(1);
  }
};

startServer();
