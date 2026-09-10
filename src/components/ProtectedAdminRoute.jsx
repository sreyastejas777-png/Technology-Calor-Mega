import React, { useState, useEffect } from 'react';
import {
  getAuthToken,
  loginApi,
  logoutApi,
  verifySessionApi,
  getSetupStatusApi,
  setupSuperAdminApi,
  registerAdminApi,
} from '../api/cmsApi';
import {
  FaLock,
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaSpinner,
  FaCrown,
  FaUserPlus,
  FaSignInAlt,
  FaKey,
  FaInfoCircle,
} from 'react-icons/fa';

export default function ProtectedAdminRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'setup_superadmin'
  const [setupStatus, setSetupStatus] = useState(null);

  // Login inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regInviteCode, setRegInviteCode] = useState('');

  // Super Admin Setup inputs
  const [setupName, setSetupName] = useState('Primary Super Admin');
  const [setupEmail, setSetupEmail] = useState('');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState('');
  const [setupMasterKey, setSetupMasterKey] = useState('CALOR-ROOT-2026');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      // 1. Fetch system setup status
      const status = await getSetupStatusApi();
      setSetupStatus(status);

      if (status && !status.hasSuperAdmin) {
        setAuthMode('setup_superadmin');
      }

      // 2. Check existing session
      const token = getAuthToken();
      if (!token) {
        setIsAuthenticated(false);
        setChecking(false);
        return;
      }

      try {
        const res = await verifySessionApi();
        if (res && res.user) {
          const user = {
            ...res.user,
            role: (res.user.role === 'superadmin' || res.user.role === 'super_admin') ? 'super_admin' : 'admin',
          };
          setCurrentUser(user);
          localStorage.setItem('calor_mega_current_user', JSON.stringify(user));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
      setChecking(false);
    };

    initAuth();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    logoutApi();
    localStorage.removeItem('calor_mega_current_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginPassword('');
    setError('');
    setSuccess('You have been logged out securely.');
    setAuthMode('login');
  };

  // Standard Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await loginApi(loginEmail, loginPassword, false);
      const user = {
        ...res.user,
        role: (res.user.role === 'superadmin' || res.user.role === 'super_admin') ? 'super_admin' : 'admin',
      };
      setCurrentUser(user);
      localStorage.setItem('calor_mega_current_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Admin Self-Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await registerAdminApi({
        name: regName,
        email: regEmail,
        password: regPassword,
        inviteCode: regInviteCode,
      });

      setSuccess(res.message || 'Registration submitted successfully!');
      setLoginEmail(regEmail);
      setLoginPassword('');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirmPassword('');
      setRegInviteCode('');

      if (res.status === 'active') {
        setTimeout(() => setAuthMode('login'), 2000);
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Super Admin Setup / Claim
  const handleSuperAdminSetup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (setupPassword !== setupConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (setupPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await setupSuperAdminApi({
        name: setupName,
        email: setupEmail,
        password: setupPassword,
        masterKey: setupMasterKey,
      });

      const user = {
        ...res.user,
        role: 'super_admin',
      };
      setCurrentUser(user);
      localStorage.setItem('calor_mega_current_user', JSON.stringify(user));
      setSuccess('Super Admin configured successfully! Entering dashboard...');
      setTimeout(() => setIsAuthenticated(true), 1200);
    } catch (err) {
      setError(err.message || 'Failed to configure Super Admin');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-700">Verifying Admin Privileges...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
        {/* Ambient warmth */}
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
          <div className="h-[450px] w-[450px] rounded-full bg-amber-400/10 blur-[130px]" />
        </div>

        <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/80">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300 bg-amber-50 text-amber-600 shadow-inner">
              {authMode === 'setup_superadmin' ? (
                <FaCrown className="text-2xl text-amber-600" />
              ) : authMode === 'register' ? (
                <FaUserPlus className="text-2xl text-amber-600" />
              ) : (
                <FaLock className="text-2xl text-amber-600" />
              )}
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 font-roboto">
              CALOR <span className="text-amber-600">MEGA</span>
            </h1>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              {authMode === 'setup_superadmin'
                ? 'Super Admin Initialization'
                : authMode === 'register'
                ? 'Administrator Registration'
                : 'Content Management Console'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In / Register) */}
          {authMode !== 'setup_superadmin' && (
            <div className="mt-6 flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition duration-200 ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <FaSignInAlt /> Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition duration-200 ${
                  authMode === 'register'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <FaUserPlus /> Register Admin
              </button>
            </div>
          )}

          {/* Alert Messages */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
              {success}
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 1: SIGN IN */}
          {/* ========================================================================= */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="admin@calormega.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/25 transition duration-200 hover:from-amber-500 hover:to-amber-400 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-base" /> Authenticating...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-base" /> Sign In to CMS
                  </>
                )}
              </button>

              {/* Quick info banner */}
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600 flex items-center gap-2">
                <FaShieldAlt className="text-amber-600 shrink-0" />
                <span>Super Admin retains ultimate control over all content and user permissions.</span>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: ADMIN SELF-REGISTRATION */}
          {/* ========================================================================= */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="mt-6 space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Official Email
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                  placeholder="john@calormega.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Confirm
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Secret Invite Code <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={regInviteCode}
                  onChange={(e) => setRegInviteCode(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-mono text-slate-900 outline-none focus:border-amber-500"
                  placeholder="CALOR-ADMIN-2026"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Entering an invite code activates your account instantly. Otherwise, the Super Admin must approve it.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 py-2.5 text-sm font-bold text-white shadow-md transition duration-200 hover:from-red-500 hover:to-amber-400 disabled:opacity-60"
              >
                {loading ? <FaSpinner className="animate-spin text-base" /> : <FaUserPlus className="text-base" />}
                <span>Submit Admin Registration</span>
              </button>
            </form>
          )}

          {/* ========================================================================= */}
          {/* MODE 3: SUPER ADMIN SETUP / CLAIM */}
          {/* ========================================================================= */}
          {authMode === 'setup_superadmin' && (
            <form onSubmit={handleSuperAdminSetup} className="mt-6 space-y-3.5">
              <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-3 text-xs text-amber-900">
                <div className="flex items-start gap-2">
                  <FaCrown className="text-amber-600 text-sm mt-0.5 shrink-0" />
                  <span>
                    Configure the primary <strong>Super Admin</strong> account. This administrator has permanent, ultimate control over the CMS and all team accounts.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Super Admin Name
                </label>
                <input
                  type="text"
                  value={setupName}
                  onChange={(e) => setSetupName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                  placeholder="Master Administrator"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Super Admin Email
                </label>
                <input
                  type="email"
                  value={setupEmail}
                  onChange={(e) => setSetupEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                  placeholder="owner@calormega.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={setupPassword}
                    onChange={(e) => setSetupPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Confirm
                  </label>
                  <input
                    type="password"
                    value={setupConfirmPassword}
                    onChange={(e) => setSetupConfirmPassword(e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Master Root Key
                </label>
                <input
                  type="text"
                  value={setupMasterKey}
                  onChange={(e) => setSetupMasterKey(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-mono text-slate-900 outline-none focus:border-amber-500"
                  placeholder="CALOR-ROOT-2026"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-2.5 text-sm font-bold text-slate-950 shadow-md transition duration-200 hover:from-amber-500 hover:to-amber-400 disabled:opacity-60"
              >
                {loading ? <FaSpinner className="animate-spin text-base" /> : <FaCrown className="text-base" />}
                <span>Initialize Super Admin</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  ← Return to Standard Sign In
                </button>
              </div>
            </form>
          )}

          {/* Footer Navigation */}
          <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-slate-500">
            {authMode === 'login' && (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('setup_superadmin');
                  setError('');
                  setSuccess('');
                }}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-600 transition"
              >
                <FaKey className="text-[10px]" /> Set or Claim Super Admin Account
              </button>
            )}

            <a
              href="/"
              className="inline-flex items-center gap-1.5 font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <FaArrowLeft className="text-[10px]" /> Return to Public Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Pass currentUser and onLogout to child component (AdminDashboard)
  return React.cloneElement(children, { currentUser, onLogout: handleLogout });
}
