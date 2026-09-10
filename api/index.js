import app, { initDb, seedData } from '../server/index.js';

let initialized = false;
let initPromise = null;

async function ensureDbReady() {
  if (initialized) return;
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await initDb();
        await seedData();
        initialized = true;
      } catch (err) {
        console.error('Vercel serverless DB initialization error:', err);
      }
    })();
  }
  await initPromise;
}

export default async function handler(req, res) {
  await ensureDbReady();
  return app(req, res);
}
