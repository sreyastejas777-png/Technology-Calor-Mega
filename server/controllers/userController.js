import bcrypt from 'bcryptjs';
import { getQuery, runQuery, allQuery } from '../db.js';

// 1. Get All Admin Users (Super Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await allQuery(
      'SELECT id, name, email, role, status, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    const normalizedUsers = users.map((u) => ({
      ...u,
      role: (u.role === 'superadmin' || u.role === 'super_admin') ? 'super_admin' : 'admin',
      status: u.status || 'active',
    }));
    res.json({ users: normalizedUsers });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// 2. Direct Provisioning of Admin by Super Admin
export const createAdmin = async (req, res) => {
  const { name, email, password, role = 'admin' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  try {
    const existing = await getQuery('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [email.trim()]);
    if (existing) {
      return res.status(400).json({ error: 'An admin with this email address already exists' });
    }

    const assignedRole = role === 'super_admin' ? 'super_admin' : 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await runQuery(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.trim().toLowerCase(), hashedPassword, assignedRole, 'active']
    );

    const newUser = await getQuery(
      'SELECT id, name, email, role, status, created_at FROM users WHERE id = ?',
      [result.lastID]
    );

    res.json({
      message: 'Admin account created successfully!',
      user: newUser,
    });
  } catch (err) {
    console.error('Create admin error:', err);
    res.status(500).json({ error: 'Failed to create admin: ' + err.message });
  }
};

// 3. Update User Status (Activate or Suspend)
export const updateUserStatus = async (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const { status } = req.body;

  if (!['active', 'suspended', 'pending'].includes(status)) {
    return res.status(400).json({ error: "Status must be 'active', 'suspended', or 'pending'" });
  }

  try {
    const targetUser = await getQuery('SELECT id, role FROM users WHERE id = ?', [targetId]);
    if (!targetUser) {
      return res.status(404).json({ error: 'Admin account not found' });
    }

    // Safety guard: Super Admin cannot suspend themselves
    if (targetUser.id === req.user.id) {
      return res.status(400).json({ error: 'You cannot suspend your own Super Admin account' });
    }

    await runQuery('UPDATE users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, targetId]);

    res.json({
      message: `Admin account status updated to '${status}' successfully.`,
    });
  } catch (err) {
    console.error('Update user status error:', err);
    res.status(500).json({ error: 'Failed to update user status: ' + err.message });
  }
};

// 4. Delete an Admin Account (Super Admin Only)
export const deleteUser = async (req, res) => {
  const targetId = parseInt(req.params.id, 10);

  try {
    const targetUser = await getQuery('SELECT id, role, email FROM users WHERE id = ?', [targetId]);
    if (!targetUser) {
      return res.status(404).json({ error: 'Admin account not found' });
    }

    // Protection: Cannot delete yourself or the primary super admin
    if (targetUser.id === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete your own Super Admin account' });
    }

    if (targetUser.role === 'super_admin' || targetUser.role === 'superadmin') {
      return res.status(403).json({ error: 'Super Admin accounts are protected and cannot be deleted directly' });
    }

    await runQuery('DELETE FROM users WHERE id = ?', [targetId]);

    res.json({
      message: `Admin account '${targetUser.email}' removed successfully.`,
    });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Failed to delete user: ' + err.message });
  }
};

// 5. Reset Admin Password (Super Admin Only)
export const resetUserPassword = async (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }

  try {
    const targetUser = await getQuery('SELECT id FROM users WHERE id = ?', [targetId]);
    if (!targetUser) {
      return res.status(404).json({ error: 'Admin account not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await runQuery('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [hashedPassword, targetId]);

    res.json({
      message: 'Password reset successfully for administrator.',
    });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Failed to reset password: ' + err.message });
  }
};

// 6. Get Admin Settings (Registration mode, Invite Code)
export const getAdminSettings = async (req, res) => {
  try {
    const rows = await allQuery('SELECT key, value FROM admin_settings');
    const settings = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });
    res.json({
      registration_mode: settings.registration_mode || 'approval_required',
      invite_code: settings.invite_code || 'CALOR-ADMIN-2026',
    });
  } catch (err) {
    console.error('Get admin settings error:', err);
    res.status(500).json({ error: 'Failed to retrieve admin settings' });
  }
};

// 7. Update Admin Settings
export const updateAdminSettings = async (req, res) => {
  const { registration_mode, invite_code } = req.body;

  try {
    if (registration_mode && ['approval_required', 'invite_only', 'disabled'].includes(registration_mode)) {
      await runQuery('INSERT OR REPLACE INTO admin_settings (key, value) VALUES (?, ?)', ['registration_mode', registration_mode]);
    }
    if (invite_code && invite_code.trim()) {
      await runQuery('INSERT OR REPLACE INTO admin_settings (key, value) VALUES (?, ?)', ['invite_code', invite_code.trim().toUpperCase()]);
    }

    res.json({
      message: 'Admin access settings updated successfully!',
    });
  } catch (err) {
    console.error('Update admin settings error:', err);
    res.status(500).json({ error: 'Failed to update admin settings: ' + err.message });
  }
};
