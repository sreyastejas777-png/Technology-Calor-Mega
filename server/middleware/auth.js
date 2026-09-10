import jwt from 'jsonwebtoken';
import { getQuery } from '../db.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'calor_mega_secret_jwt_key_2026_industrial_secure';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  // Support local demo token if requested
  if (token === 'local_demo_token_admin' || token === 'guest_admin_instant_token') {
    req.user = { id: 999, name: 'Instant Guest Admin', email: 'guest@calormega.com', role: 'guest_admin', status: 'active' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify fresh user status from database
    const user = await getQuery('SELECT id, name, email, role, status FROM users WHERE id = ?', [decoded.id]);
    if (!user) {
      return res.status(401).json({ error: 'User account not found' });
    }
    if (user.status === 'suspended') {
      return res.status(403).json({ error: 'Account suspended by Super Admin' });
    }
    if (user.status === 'pending') {
      return res.status(403).json({ error: 'Account pending Super Admin approval' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired session token' });
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'super_admin' && req.user.role !== 'superadmin')) {
    return res.status(403).json({
      error: 'Forbidden: Super Admin privileges required. Ultimate administrative control is restricted to Super Admin.'
    });
  }
  next();
};
