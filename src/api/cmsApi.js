const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE_URL = isLocalHost
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
  : '/api';

export const getAuthToken = () => {
  return localStorage.getItem('calor_mega_cms_token') || localStorage.getItem('calor_mega_admin_token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('calor_mega_cms_token', token);
  localStorage.setItem('calor_mega_admin_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('calor_mega_cms_token');
  localStorage.removeItem('calor_mega_admin_token');
};

const getHeaders = (isJson = true) => {
  const headers = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// 1. Fetch public compiled content
export const fetchContentApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/content`);
    if (!res.ok) throw new Error('API returned status ' + res.status);
    return await res.json();
  } catch (err) {
    console.warn('CMS API Server unreachable, falling back to static local defaults:', err.message);
    return null;
  }
};

// 2. Auth APIs
export const getSetupStatusApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/setup-status`);
    if (!res.ok) throw new Error('Failed to get setup status');
    return await res.json();
  } catch (err) {
    console.error('Setup status error:', err);
    return null;
  }
};

export const setupSuperAdminApi = async ({ name, email, password, masterKey }) => {
  const res = await fetch(`${API_BASE_URL}/auth/setup-superadmin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, masterKey }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to setup Super Admin');
  if (data.token) setAuthToken(data.token);
  return data;
};

export const registerAdminApi = async ({ name, email, password, inviteCode }) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, inviteCode }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
};

export const loginApi = async (email, password, isGuest = false) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, isGuest }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setAuthToken(data.token);
  return data;
};

export const logoutApi = () => {
  removeAuthToken();
};

export const updateProfileApi = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/auth/update-profile`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update profile');
  if (data.token) setAuthToken(data.token);
  return data;
};

export const verifySessionApi = async () => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      removeAuthToken();
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('Session verify error:', err);
    // In local demo mode with instant token, keep session active
    if (token === 'local_demo_token_admin' || token === 'guest_admin_instant_token') {
      return { user: { name: 'Instant Guest Admin', role: 'guest_admin', status: 'active' } };
    }
    return null;
  }
};

// 3. Super Admin User & Team Management APIs
export const getUsersApi = async () => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch users');
  return data.users || [];
};

export const createAdminApi = async ({ name, email, password, role }) => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name, email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create admin');
  return data;
};

export const updateUserStatusApi = async (userId, status) => {
  const res = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update user status');
  return data;
};

export const deleteUserApi = async (userId) => {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete user');
  return data;
};

export const resetUserPasswordApi = async (userId, newPassword) => {
  const res = await fetch(`${API_BASE_URL}/users/${userId}/reset-password`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to reset password');
  return data;
};

export const getAdminSettingsApi = async () => {
  const res = await fetch(`${API_BASE_URL}/users/settings`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to get admin settings');
  return data;
};

export const updateAdminSettingsApi = async (settings) => {
  const res = await fetch(`${API_BASE_URL}/users/settings`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(settings),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update admin settings');
  return data;
};

// 3. Unified Publish API
export const publishContentApi = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/content/publish`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to publish content');
  return data;
};

// 4. Section Update APIs
export const updateSiteSettingsApi = async (data) => {
  return publishContentApi({ section: 'siteSettings', data });
};

export const updateHeroSectionApi = async (data) => {
  return publishContentApi({ section: 'heroSection', data });
};

export const updateAboutSectionApi = async (data) => {
  return publishContentApi({ section: 'aboutSection', data });
};

export const saveCollectionApi = async (endpoint, items) => {
  const res = await fetch(`${API_BASE_URL}/content/${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error((await res.json()).error || `Failed to save ${endpoint}`);
  return await res.json();
};

// 5. File Upload API
export const uploadFileApi = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = getAuthToken();

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data.url;
};
