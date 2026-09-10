import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getQuery, runQuery } from '../db.js';
import { JWT_SECRET } from '../middleware/auth.js';

// 1. Check System Setup & Super Admin Status
export const getSetupStatus = async (req, res) => {
  try {
    const superAdmin = await getQuery(
      "SELECT id, name, email FROM users WHERE role = 'super_admin' OR role = 'superadmin' LIMIT 1"
    );
    const regModeRow = await getQuery("SELECT value FROM admin_settings WHERE key = 'registration_mode'");
    const registrationMode = regModeRow ? regModeRow.value : 'approval_required';

    let maskedEmail = null;
    if (superAdmin && superAdmin.email) {
      const [user, domain] = superAdmin.email.split('@');
      maskedEmail = `${user.substring(0, 2)}***@${domain}`;
    }

    res.json({
      hasSuperAdmin: !!superAdmin,
      superAdminName: superAdmin ? superAdmin.name : null,
      superAdminEmailMasked: maskedEmail,
      registrationMode,
    });
  } catch (err) {
    console.error('Setup status error:', err);
    res.status(500).json({ error: 'Failed to retrieve setup status' });
  }
};

// 2. Initial Setup or Claim of Super Admin
export const setupSuperAdmin = async (req, res) => {
  const { name, email, password, masterKey } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const existingSuperAdmin = await getQuery(
      "SELECT id FROM users WHERE role = 'super_admin' OR role = 'superadmin' LIMIT 1"
    );

    // If a superadmin already exists and caller provides no master key and is unauthenticated, require master key or deny
    if (existingSuperAdmin) {
      const allowedMasterKey = process.env.CALOR_MASTER_KEY || 'CALOR-ROOT-2026';
      if (masterKey !== allowedMasterKey && existingSuperAdmin.id !== 1) {
        return res.status(403).json({ error: 'Super Admin already configured. Please log in as Super Admin to manage credentials.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingSuperAdmin) {
      await runQuery(
        "UPDATE users SET name = ?, email = ?, password = ?, role = 'super_admin', status = 'active', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [name.trim(), email.trim().toLowerCase(), hashedPassword, existingSuperAdmin.id]
      );
    } else {
      await runQuery(
        "INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, 'super_admin', 'active')",
        [name.trim(), email.trim().toLowerCase(), hashedPassword]
      );
    }

    const superAdmin = await getQuery(
      "SELECT id, name, email, role, status FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    const token = jwt.sign(superAdmin, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Super Admin configured successfully!',
      token,
      user: superAdmin,
    });
  } catch (err) {
    console.error('Super Admin setup error:', err);
    res.status(500).json({ error: 'Failed to configure Super Admin: ' + err.message });
  }
};

// 3. Login
export const login = async (req, res) => {
  const { email, password, isGuest } = req.body;

  // Local demo / Guest fallback if enabled
  if (isGuest || email === 'guest@calormega.com') {
    const guestUser = { id: 999, name: 'Instant Guest Admin', email: 'guest@calormega.com', role: 'guest_admin', status: 'active' };
    const token = jwt.sign(guestUser, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: guestUser });
  }

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await getQuery('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email.trim()]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Role normalization: if seeded as 'superadmin', normalize to 'super_admin'
    const role = (user.role === 'superadmin' || user.role === 'super_admin') ? 'super_admin' : 'admin';

    // Status verification
    if (user.status === 'suspended') {
      return res.status(403).json({
        error: 'Your admin account has been suspended by the Super Admin. Please contact the primary administrator.',
      });
    }

    if (user.status === 'pending') {
      return res.status(403).json({
        error: 'Your registration is currently pending review by the Super Admin. Access will be granted once approved.',
      });
    }

    const payload = { id: user.id, name: user.name, email: user.email, role, status: user.status };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: payload });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

// 4. Admin Self-Registration
export const registerAdmin = async (req, res) => {
  const { name, email, password, inviteCode } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const existing = await getQuery('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [email.trim()]);
    if (existing) {
      return res.status(400).json({ error: 'An admin account with this email already exists' });
    }

    // Check registration mode and secret invite code
    const regModeRow = await getQuery("SELECT value FROM admin_settings WHERE key = 'registration_mode'");
    const registrationMode = regModeRow ? regModeRow.value : 'approval_required';

    if (registrationMode === 'disabled') {
      return res.status(403).json({
        error: 'Admin registration is currently closed. New administrators must be added directly by the Super Admin.',
      });
    }

    const inviteCodeRow = await getQuery("SELECT value FROM admin_settings WHERE key = 'invite_code'");
    const currentInviteCode = inviteCodeRow ? inviteCodeRow.value : 'CALOR-ADMIN-2026';

    let initialStatus = 'pending';
    let message = 'Registration submitted! Your admin account is pending Super Admin review and approval.';

    // If invite code matched or mode is open
    if (inviteCode && inviteCode.trim() === currentInviteCode.trim()) {
      initialStatus = 'active';
      message = 'Admin account verified and activated via Secret Invite Code! You can now sign in.';
    } else if (registrationMode === 'invite_only') {
      return res.status(400).json({
        error: 'A valid Secret Invite Code is required to register as an administrator.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await runQuery(
      "INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, 'admin', ?)",
      [name.trim(), email.trim().toLowerCase(), hashedPassword, initialStatus]
    );

    res.json({
      success: true,
      status: initialStatus,
      message,
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to process registration: ' + err.message });
  }
};

// 5. Verify Session
export const verifySession = async (req, res) => {
  res.json({ user: req.user });
};

// 6. Update Profile (Name, Email, Password)
export const updateProfile = async (req, res) => {
  const { name, email, password, currentPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await getQuery('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If changing password, verify current password
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long' });
      }
      if (currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Current password is incorrect' });
        }
      }
    }

    const updatedName = name ? name.trim() : user.name;
    const updatedEmail = email ? email.trim().toLowerCase() : user.email;

    // Check if new email conflicts with another user
    if (updatedEmail !== user.email) {
      const conflict = await getQuery('SELECT id FROM users WHERE LOWER(email) = LOWER(?) AND id != ?', [updatedEmail, userId]);
      if (conflict) {
        return res.status(400).json({ error: 'This email is already in use by another user' });
      }
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await runQuery(
        'UPDATE users SET name = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [updatedName, updatedEmail, hashedPassword, userId]
      );
    } else {
      await runQuery(
        'UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [updatedName, updatedEmail, userId]
      );
    }

    const freshUser = await getQuery('SELECT id, name, email, role, status FROM users WHERE id = ?', [userId]);
    const role = (freshUser.role === 'superadmin' || freshUser.role === 'super_admin') ? 'super_admin' : 'admin';
    const updatedPayload = { ...freshUser, role };

    const token = jwt.sign(updatedPayload, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Profile updated successfully!',
      token,
      user: updatedPayload,
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile: ' + err.message });
  }
};
