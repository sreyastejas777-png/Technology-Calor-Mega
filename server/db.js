import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const dataDir = isVercel ? path.join('/tmp', 'data') : path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
  } catch (e) {
    console.warn('Could not create dataDir:', e.message);
  }
}

const uploadsDir = isVercel ? path.join('/tmp', 'uploads') : path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (e) {
    console.warn('Could not create uploadsDir:', e.message);
  }
}

const dbPath = path.join(dataDir, 'calor_mega.db');
const sqlite = sqlite3.verbose();
export const db = new sqlite.Database(dbPath);

export const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

export const getQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const allQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const initDb = async () => {
  console.log('🔄 Initializing SQLite database at:', dbPath);

  // Users table
  await runQuery(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Migrate existing users table to ensure status and updated_at exist
  try {
    const cols = await allQuery('PRAGMA table_info(users)');
    const colNames = cols.map((c) => c.name);
    if (!colNames.includes('status')) {
      await runQuery("ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active'");
    }
    if (!colNames.includes('updated_at')) {
      await runQuery("ALTER TABLE users ADD COLUMN updated_at DATETIME");
    }
  } catch (err) {
    console.warn('Users table migration check warning:', err.message);
  }

  // Admin settings table
  await runQuery(`
    CREATE TABLE IF NOT EXISTS admin_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Seed default admin settings if missing
  const regMode = await getQuery('SELECT value FROM admin_settings WHERE key = ?', ['registration_mode']);
  if (!regMode) {
    await runQuery('INSERT INTO admin_settings (key, value) VALUES (?, ?)', ['registration_mode', 'approval_required']);
  }
  const inviteCode = await getQuery('SELECT value FROM admin_settings WHERE key = ?', ['invite_code']);
  if (!inviteCode) {
    await runQuery('INSERT INTO admin_settings (key, value) VALUES (?, ?)', ['invite_code', 'CALOR-ADMIN-2026']);
  }

  // Key-value JSON storage tables for modular sections
  const tables = [
    'site_settings',
    'hero_section',
    'about_section',
    'technical_datasheet',
    'key_metrics',
    'feature_cards',
    'machine_explorer',
    'products',
    'applications',
    'testimonials',
    'gallery_media',
    'faq_items',
    'timeline_milestones',
  ];

  for (const table of tables) {
    await runQuery(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  console.log('✅ SQLite database initialized successfully with admin controls.');
};
