import { useState, useEffect, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';
import { useTheme } from '../context/ThemeContext';
import {
  removeAuthToken,
  publishContentApi,
  uploadFileApi,
  getUsersApi,
  createAdminApi,
  updateUserStatusApi,
  deleteUserApi,
  resetUserPasswordApi,
  getAdminSettingsApi,
  updateAdminSettingsApi,
  updateProfileApi,
  logoutApi,
} from '../api/cmsApi';
import {
  FaHome,
  FaBoxOpen,
  FaMicrochip,
  FaSeedling,
  FaImages,
  FaInfoCircle,
  FaPhoneAlt,
  FaSignOutAlt,
  FaSave,
  FaUpload,
  FaPlus,
  FaTrash,
  FaUndo,
  FaRedo,
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaSpinner,
  FaExternalLinkAlt,
  FaCube,
  FaFilePdf,
  FaSun,
  FaMoon,
  FaEye,
  FaTimes,
  FaLaptop,
  FaTabletAlt,
  FaMobileAlt,
  FaGlobe,
  FaBolt,
  FaUsersCog,
  FaUserShield,
  FaUserCheck,
  FaUserSlash,
  FaKey,
  FaCopy,
  FaCrown,
  FaEnvelope,
  FaLock,
  FaUserPlus,
} from 'react-icons/fa';

// Universal Webpage Route Mapping for Live Draft Previews
const TAB_PREVIEW_PATHS = {
  home: '/',
  products: '/products',
  technology: '/technology',
  applications: '/applications',
  gallery: '/gallery',
  about: '/about',
  contact: '/contact',
  users: '/',
};

// Universal Sticky Tab Toolbar
function UniversalTabToolbar({
  title,
  tabCode,
  description,
  onSave,
  saving,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  isDark,
  onPreviewDraft,
}) {
  return (
    <div
      className={`sticky top-16 z-20 mb-6 flex flex-col justify-between gap-4 rounded-2xl border p-4 backdrop-blur-md shadow-sm transition-colors duration-200 sm:flex-row sm:items-center sm:p-5 ${
        isDark ? 'border-slate-800 bg-slate-900/90 shadow-black/40' : 'border-slate-200 bg-white/95 shadow-slate-200/50'
      }`}
    >
      <div>
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-bold text-amber-500 tracking-wider">
            {tabCode}
          </span>
          <span className={`text-slate-400 ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>//</span>
          <h2 className={`text-xl font-black tracking-tight font-roboto sm:text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h2>
          <span className="hidden rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-500 border border-amber-500/30 sm:inline-block">
            Live Parameter Grid
          </span>
        </div>
        <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Preview Live Draft of this webpage */}
        {onPreviewDraft && (
          <button
            type="button"
            onClick={onPreviewDraft}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition shadow-xs ${
              isDark
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300'
                : 'border-amber-400 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:text-amber-950'
            }`}
            title="Preview live draft of this specific webpage"
          >
            <FaEye className="text-xs text-amber-500" />
            <span>Preview Draft</span>
          </button>
        )}

        {/* Undo / Redo Actions */}
        <div className={`flex items-center rounded-xl border p-1 shadow-inner ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo last change"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-30 disabled:hover:bg-transparent ${
              isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-white hover:text-slate-900 shadow-xs'
            }`}
          >
            <FaUndo className="text-[11px]" /> Undo
          </button>
          <div className={`mx-1 h-4 w-px ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo change"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-30 disabled:hover:bg-transparent ${
              isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-white' : 'text-slate-700 hover:bg-white hover:text-slate-900 shadow-xs'
            }`}
          >
            <FaRedo className="text-[11px]" /> Redo
          </button>
        </div>

        {/* Save & Publish Primary CTA */}
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/25 transition duration-200 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 hover:shadow-lg hover:shadow-amber-500/30"
        >
          {saving ? <FaSpinner className="animate-spin text-sm" /> : <FaSave className="text-sm" />}
          <span>{saving ? 'Persisting to Core...' : 'Save & Publish'}</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard({ currentUser: propUser, onLogout }) {
  const cms = useCMS();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const storedUserStr = typeof window !== 'undefined' ? localStorage.getItem('calor_mega_current_user') : null;
  const initialUser = propUser || (storedUserStr ? JSON.parse(storedUserStr) : null) || { role: 'admin', name: 'Admin', email: '' };
  const [currentUser, setCurrentUser] = useState(initialUser);
  const isSuperAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'superadmin';

  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [, setUploading] = useState(false);

  // User Management State (Super Admin)
  const [usersList, setUsersList] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [adminSettings, setAdminSettings] = useState({ registration_mode: 'approval_required', invite_code: 'CALOR-ADMIN-2026' });
  const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [superAdminProfileForm, setSuperAdminProfileForm] = useState({
    name: initialUser?.name || 'Super Admin',
    email: initialUser?.email || '',
    password: '',
    confirmPassword: '',
    currentPassword: '',
  });
  const [resetPasswordModalUser, setResetPasswordModalUser] = useState(null);
  const [newResetPassword, setNewResetPassword] = useState('');

  // Live Draft Preview Modal State
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewViewport, setPreviewViewport] = useState('desktop'); // desktop | tablet | mobile
  const [previewKey, setPreviewKey] = useState(1);
  const [previewPath, setPreviewPath] = useState('/');

  // Form states
  const [homeHero, setHomeHero] = useState(cms.heroSection || {});
  const [homeMetrics, setHomeMetrics] = useState(cms.keyMetrics || []);
  const [homeFeatures, setHomeFeatures] = useState(cms.featureCards || []);
  const [productsForm, setProductsForm] = useState(cms.products || []);
  const [techDatasheet, setTechDatasheet] = useState(cms.technicalDatasheet || []);
  const [techHotspots, setTechHotspots] = useState(cms.machineExplorer || []);
  const [appsForm, setAppsForm] = useState(cms.applications || []);
  const [appsCategoryFilter, setAppsCategoryFilter] = useState('All');
  const [galleryForm, setGalleryForm] = useState(cms.galleryMedia || []);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');
  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', category: 'Machines', url: '' });
  const [aboutForm, setAboutForm] = useState(cms.aboutSection || {});
  const [contactSettings, setContactSettings] = useState(cms.siteSettings || {});

  // History Stacks for each of the 7 Tabs
  const [homeHistory, setHomeHistory] = useState([]);
  const [homeHistoryIndex, setHomeHistoryIndex] = useState(-1);

  const [productsHistory, setProductsHistory] = useState([]);
  const [productsHistoryIndex, setProductsHistoryIndex] = useState(-1);

  const [techHistory, setTechHistory] = useState([]);
  const [techHistoryIndex, setTechHistoryIndex] = useState(-1);

  const [appsHistory, setAppsHistory] = useState([]);
  const [appsHistoryIndex, setAppsHistoryIndex] = useState(-1);

  const [galleryHistory, setGalleryHistory] = useState([]);
  const [galleryHistoryIndex, setGalleryHistoryIndex] = useState(-1);

  const [aboutHistory, setAboutHistory] = useState([]);
  const [aboutHistoryIndex, setAboutHistoryIndex] = useState(-1);

  const [contactHistory, setContactHistory] = useState([]);
  const [contactHistoryIndex, setContactHistoryIndex] = useState(-1);

  // Current Compiled Draft Package
  const currentDraftPayload = useMemo(() => ({
    heroSection: homeHero,
    keyMetrics: homeMetrics,
    featureCards: homeFeatures,
    products: productsForm,
    technicalDatasheet: techDatasheet,
    machineExplorer: techHotspots,
    applications: appsForm,
    galleryMedia: galleryForm,
    aboutSection: aboutForm,
    siteSettings: contactSettings,
  }), [
    homeHero,
    homeMetrics,
    homeFeatures,
    productsForm,
    techDatasheet,
    techHotspots,
    appsForm,
    galleryForm,
    aboutForm,
    contactSettings,
  ]);

  // Sync with initial context
  useEffect(() => {
    if (cms.heroSection) {
      setHomeHero(cms.heroSection);
      setHomeMetrics(cms.keyMetrics || []);
      setHomeFeatures(cms.featureCards || []);
      const initHome = JSON.stringify({ hero: cms.heroSection, metrics: cms.keyMetrics || [], features: cms.featureCards || [] });
      setHomeHistory([initHome]);
      setHomeHistoryIndex(0);
    }
    if (cms.products) {
      setProductsForm(cms.products);
      setProductsHistory([JSON.stringify(cms.products)]);
      setProductsHistoryIndex(0);
    }
    if (cms.technicalDatasheet || cms.machineExplorer) {
      setTechDatasheet(cms.technicalDatasheet || []);
      setTechHotspots(cms.machineExplorer || []);
      const initTech = JSON.stringify({ datasheet: cms.technicalDatasheet || [], hotspots: cms.machineExplorer || [] });
      setTechHistory([initTech]);
      setTechHistoryIndex(0);
    }
    if (cms.applications) {
      setAppsForm(cms.applications);
      setAppsHistory([JSON.stringify(cms.applications)]);
      setAppsHistoryIndex(0);
    }
    if (cms.galleryMedia) {
      setGalleryForm(cms.galleryMedia);
      setGalleryHistory([JSON.stringify(cms.galleryMedia)]);
      setGalleryHistoryIndex(0);
    }
    if (cms.aboutSection) {
      setAboutForm(cms.aboutSection);
      setAboutHistory([JSON.stringify(cms.aboutSection)]);
      setAboutHistoryIndex(0);
    }
    if (cms.siteSettings) {
      setContactSettings(cms.siteSettings);
      setContactHistory([JSON.stringify(cms.siteSettings)]);
      setContactHistoryIndex(0);
    }
  }, [cms.isLoaded]);

  // Floating Toast Trigger
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = () => {
    removeAuthToken();
    window.location.reload();
  };

  // Push to history helper
  const pushHistory = (val, history, setHistory, index, setIndex) => {
    const serialized = JSON.stringify(val);
    const updated = [...history.slice(0, index + 1), serialized];
    setHistory(updated);
    setIndex(updated.length - 1);
  };

  const undoHelper = (history, index, setIndex, applyState) => {
    if (index > 0) {
      const prev = JSON.parse(history[index - 1]);
      applyState(prev);
      setIndex(index - 1);
      showToast('Undid previous change', 'info');
    }
  };

  const redoHelper = (history, index, setIndex, applyState) => {
    if (index < history.length - 1) {
      const next = JSON.parse(history[index + 1]);
      applyState(next);
      setIndex(index + 1);
      showToast('Redid change', 'info');
    }
  };

  // Generic File Upload Handler
  const handleFileUpload = async (e, onUrl) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFileApi(file);
      onUrl(url);
      showToast('File uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'File upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Live Draft Preview Handler (defaults to current webpage section)
  const handleOpenLiveDraftPreview = (targetPath) => {
    // 1. Persist current uncommitted draft state to localStorage
    localStorage.setItem('calor_mega_preview_draft', JSON.stringify(currentDraftPayload));
    localStorage.setItem('calor_mega_preview_mode', 'true');
    window.dispatchEvent(new CustomEvent('calor_draft_update'));

    // 2. Resolve target route corresponding to current section
    const path = targetPath || TAB_PREVIEW_PATHS[activeTab] || '/';
    setPreviewPath(path);

    // 3. Open interactive in-CMS preview modal
    setPreviewKey((k) => k + 1);
    setPreviewModalOpen(true);
  };

  // Open Fullscreen Tab Preview
  const handleOpenFullscreenDraftTab = () => {
    localStorage.setItem('calor_mega_preview_draft', JSON.stringify(currentDraftPayload));
    localStorage.setItem('calor_mega_preview_mode', 'true');
    const path = previewPath || TAB_PREVIEW_PATHS[activeTab] || '/';
    window.open(`./index.html?preview=true#${path}`, '_blank');
  };

  // --- SAVE & PUBLISH HANDLERS ---
  const handlePublishHome = async () => {
    setSaving(true);
    try {
      await publishContentApi({
        heroSection: homeHero,
        keyMetrics: homeMetrics,
        featureCards: homeFeatures,
      });
      await cms.refreshContent();
      showToast('Changes successfully published live!');
    } catch (err) {
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishProducts = async () => {
    setSaving(true);
    try {
      await publishContentApi({ products: productsForm });
      await cms.refreshContent();
      showToast('Changes successfully published live!');
    } catch (err) {
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishTech = async () => {
    setSaving(true);
    try {
      await publishContentApi({
        technicalDatasheet: techDatasheet,
        machineExplorer: techHotspots,
      });
      await cms.refreshContent();
      showToast('Changes successfully published live!');
    } catch (err) {
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishApps = async () => {
    setSaving(true);
    try {
      await publishContentApi({ applications: appsForm });
      await cms.refreshContent();
      showToast('Changes successfully published live!');
    } catch (err) {
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishGallery = async () => {
    setSaving(true);
    try {
      await publishContentApi({ galleryMedia: galleryForm });
      await cms.refreshContent();
      showToast('Changes successfully published live!');
    } catch (err) {
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishAbout = async () => {
    setSaving(true);
    try {
      await publishContentApi({ aboutSection: aboutForm });
      await cms.refreshContent();
      showToast('Changes successfully published live!');
    } catch (err) {
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishContact = async () => {
    setSaving(true);
    try {
      await publishContentApi({ siteSettings: contactSettings });
      await cms.refreshContent();
      showToast('Changes successfully published live!');
    } catch (err) {
      showToast(err.message || 'Publish failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  // --- USER & TEAM MANAGEMENT HANDLERS (SUPER ADMIN) ---
  const loadUsersAndSettings = async () => {
    if (!isSuperAdmin) return;
    setUsersLoading(true);
    try {
      const [users, settings] = await Promise.all([
        getUsersApi(),
        getAdminSettingsApi(),
      ]);
      setUsersList(users || []);
      if (settings) {
        setAdminSettings({
          registration_mode: settings.registration_mode || 'approval_required',
          invite_code: settings.invite_code || 'CALOR-ADMIN-2026',
        });
      }
    } catch (err) {
      console.error('Failed to load user management data:', err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin && activeTab === 'users') {
      loadUsersAndSettings();
    }
  }, [isSuperAdmin, activeTab]);

  const handlePerformLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logoutApi();
      localStorage.removeItem('calor_mega_current_user');
      window.location.reload();
    }
  };

  const handleCreateAdminDirect = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminApi(newAdminForm);
      showToast('Admin account created successfully!');
      setAddAdminModalOpen(false);
      setNewAdminForm({ name: '', email: '', password: '', role: 'admin' });
      await loadUsersAndSettings();
    } catch (err) {
      showToast(err.message || 'Failed to create admin', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleUserStatus = async (user, overrideStatus = null) => {
    const nextStatus = overrideStatus || (user.status === 'active' ? 'suspended' : 'active');
    try {
      await updateUserStatusApi(user.id, nextStatus);
      showToast(`Admin account status updated to ${nextStatus}`);
      await loadUsersAndSettings();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to remove administrator ${user.email}? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteUserApi(user.id);
      showToast('Administrator removed successfully');
      await loadUsersAndSettings();
    } catch (err) {
      showToast(err.message || 'Failed to delete user', 'error');
    }
  };

  const handleResetUserPassword = async (e) => {
    e.preventDefault();
    if (!resetPasswordModalUser || !newResetPassword) return;
    setSaving(true);
    try {
      await resetUserPasswordApi(resetPasswordModalUser.id, newResetPassword);
      showToast('Password reset successfully for administrator!');
      setResetPasswordModalUser(null);
      setNewResetPassword('');
    } catch (err) {
      showToast(err.message || 'Failed to reset password', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAdminSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAdminSettingsApi(adminSettings);
      showToast('Registration policy & invite code updated!');
    } catch (err) {
      showToast(err.message || 'Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSuperAdminCredentials = async (e) => {
    e.preventDefault();
    if (superAdminProfileForm.password && superAdminProfileForm.password !== superAdminProfileForm.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await updateProfileApi({
        name: superAdminProfileForm.name,
        email: superAdminProfileForm.email,
        password: superAdminProfileForm.password || undefined,
        currentPassword: superAdminProfileForm.currentPassword || undefined,
      });
      if (res && res.user) {
        setCurrentUser(res.user);
        localStorage.setItem('calor_mega_current_user', JSON.stringify(res.user));
      }
      showToast('Super Admin profile updated successfully!');
      setSuperAdminProfileForm((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
        currentPassword: '',
      }));
      await loadUsersAndSettings();
    } catch (err) {
      showToast(err.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  // State mutations with automatic history tracking
  const updateHomeState = (newHero, newMetrics, newFeatures) => {
    const heroVal = newHero !== undefined ? newHero : homeHero;
    const metricsVal = newMetrics !== undefined ? newMetrics : homeMetrics;
    const featuresVal = newFeatures !== undefined ? newFeatures : homeFeatures;
    if (newHero !== undefined) setHomeHero(heroVal);
    if (newMetrics !== undefined) setHomeMetrics(metricsVal);
    if (newFeatures !== undefined) setHomeFeatures(featuresVal);
    pushHistory({ hero: heroVal, metrics: metricsVal, features: featuresVal }, homeHistory, setHomeHistory, homeHistoryIndex, setHomeHistoryIndex);
  };

  const updateProductsState = (newProducts) => {
    setProductsForm(newProducts);
    pushHistory(newProducts, productsHistory, setProductsHistory, productsHistoryIndex, setProductsHistoryIndex);
  };

  const updateTechState = (newDatasheet, newHotspots) => {
    const dsVal = newDatasheet !== undefined ? newDatasheet : techDatasheet;
    const hsVal = newHotspots !== undefined ? newHotspots : techHotspots;
    if (newDatasheet !== undefined) setTechDatasheet(dsVal);
    if (newHotspots !== undefined) setTechHotspots(hsVal);
    pushHistory({ datasheet: dsVal, hotspots: hsVal }, techHistory, setTechHistory, techHistoryIndex, setTechHistoryIndex);
  };

  const updateAppsState = (newApps) => {
    setAppsForm(newApps);
    pushHistory(newApps, appsHistory, setAppsHistory, appsHistoryIndex, setAppsHistoryIndex);
  };

  const updateGalleryState = (newGallery) => {
    setGalleryForm(newGallery);
    pushHistory(newGallery, galleryHistory, setGalleryHistory, galleryHistoryIndex, setGalleryHistoryIndex);
  };

  const updateAboutState = (newAbout) => {
    setAboutForm(newAbout);
    pushHistory(newAbout, aboutHistory, setAboutHistory, aboutHistoryIndex, setAboutHistoryIndex);
  };

  const updateContactState = (newSettings) => {
    setContactSettings(newSettings);
    pushHistory(newSettings, contactHistory, setContactHistory, contactHistoryIndex, setContactHistoryIndex);
  };

  // Navigation tabs config
  const navTabs = [
    { id: 'home', code: '01', label: 'Home Webpage', icon: FaHome, subtitle: 'Hero headline, background showcase image, counter stats, and feature cards' },
    { id: 'products', code: '02', label: 'Products Webpage', icon: FaBoxOpen, subtitle: 'Commercial dehydrator catalog, specifications, reordering, and technical parameters' },
    { id: 'technology', code: '03', label: 'Technology Webpage', icon: FaMicrochip, subtitle: 'Interactive 3D hotspots, vector coordinates, and technical engineering datasheet' },
    { id: 'applications', code: '04', label: 'Applications Webpage', icon: FaSeedling, subtitle: 'Food & crop drying profiles, moisture percentages, cycle times, and categories' },
    { id: 'gallery', code: '05', label: 'Gallery Webpage', icon: FaImages, subtitle: 'Media asset manager, image categorisation, uploads, and caption overlays' },
    { id: 'about', code: '06', label: 'About Us Webpage', icon: FaInfoCircle, subtitle: 'Company narrative, certifications, warranties, and official PDF brochure asset' },
    { id: 'contact', code: '07', label: 'Contact & Settings', icon: FaPhoneAlt, subtitle: 'Business address, contact lines, operating hours, social links, and SEO tags' },
    ...(isSuperAdmin
      ? [
          {
            id: 'users',
            code: '08',
            label: 'Access & Admins',
            icon: FaUsersCog,
            subtitle: 'Super Admin credentials, team accounts roster, invite codes, and registration controls',
          },
        ]
      : []),
  ];

  const currentTabObj = navTabs.find((t) => t.id === activeTab) || navTabs[0];

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans selection:bg-amber-400 selection:text-slate-950 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 text-sm font-bold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-300 ${
            isDark ? 'border-emerald-500/40 bg-slate-900/95 text-emerald-400 shadow-black' : 'border-emerald-300 bg-white/95 text-emerald-800 shadow-slate-300'
          }`}
        >
          <FaCheckCircle className="text-base text-emerald-500" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* IN-CMS INTERACTIVE LIVE DEVICE PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          {/* Modal Header Bar */}
          <div className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6 text-white shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
                </span>
                <span className="font-bold text-sm text-white font-roboto tracking-tight">
                  LIVE DRAFT SIMULATOR
                </span>
              </div>
              <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-400 font-mono">
                UNSAVED EDITS INJECTED
              </span>
            </div>

            {/* Viewport Switcher */}
            <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => setPreviewViewport('desktop')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  previewViewport === 'desktop' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FaLaptop className="text-sm" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setPreviewViewport('tablet')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  previewViewport === 'tablet' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FaTabletAlt className="text-sm" /> Tablet (768px)
              </button>
              <button
                type="button"
                onClick={() => setPreviewViewport('mobile')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  previewViewport === 'mobile' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FaMobileAlt className="text-sm" /> Mobile (375px)
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenFullscreenDraftTab}
                className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20 transition"
              >
                <FaExternalLinkAlt className="text-[10px]" /> Open Fullscreen Tab
              </button>

              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-red-500 transition"
              >
                <FaTimes /> Return to Editor
              </button>
            </div>
          </div>

          {/* Webpage Route Switcher Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 py-2 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-500">
                PREVIEWING WEBPAGE:
              </span>
              {[
                { id: 'home', label: '01 Home', path: '/' },
                { id: 'products', label: '02 Products', path: '/products' },
                { id: 'technology', label: '03 Technology', path: '/technology' },
                { id: 'applications', label: '04 Applications', path: '/applications' },
                { id: 'gallery', label: '05 Gallery', path: '/gallery' },
                { id: 'about', label: '06 About Us', path: '/about' },
                { id: 'contact', label: '07 Contact', path: '/contact' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPreviewPath(p.path);
                    setPreviewKey((k) => k + 1);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    previewPath === p.path
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span>Hash Route:</span>
              <span className="rounded bg-slate-950 px-2 py-0.5 text-amber-400 border border-slate-800">
                #{previewPath}
              </span>
            </div>
          </div>

          {/* Iframe Viewport Container */}
          <div className="flex flex-1 items-center justify-center overflow-auto p-4 bg-slate-950/60">
            <div
              className={`h-full overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-2xl transition-all duration-300 ${
                previewViewport === 'desktop'
                  ? 'w-full max-w-[1400px]'
                  : previewViewport === 'tablet'
                  ? 'w-[768px]'
                  : 'w-[375px]'
              }`}
            >
              <iframe
                key={`${previewKey}-${previewPath}`}
                src={`./index.html?preview=true#${previewPath}`}
                title="Live Draft Website Preview"
                className="h-full w-full border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP COMMAND & TELEMETRY BAR */}
      {/* ========================================================================= */}
      <header
        className={`sticky top-0 z-30 flex h-16 items-center justify-between border-b px-6 backdrop-blur-md transition-colors duration-200 ${
          isDark ? 'border-slate-800 bg-slate-900/90 text-white' : 'border-slate-200 bg-white/95 text-slate-900 shadow-xs'
        }`}
      >
        {/* Top Left: Live Draft Preview + Site Link Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleOpenLiveDraftPreview()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition hover:from-red-500 hover:to-amber-400"
            title={`Preview current uncommitted edits for ${currentTabObj.label} before publishing`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <FaEye className="text-sm" />
            <span>Preview Draft Website</span>
          </button>

          <a
            href="https://sreyastejas777-png.github.io/Technology-Calor-Mega/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-500 hover:bg-amber-500/20 transition"
            title="Open live production website hosted on GitHub Pages"
          >
            <FaGlobe className="text-[11px]" />
            <span className="hidden sm:inline">Live Cloud Site</span>
          </a>
        </div>

        {/* Top Center: System Telemetry Breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
          <span className="text-amber-500 font-bold">CALOR-MEGA</span>
          <span className="text-slate-400">//</span>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>CMS CONSOLE</span>
          <span className="text-slate-400">//</span>
          <span className="font-bold text-amber-500">{currentTabObj.code} {currentTabObj.label.toUpperCase()}</span>
        </div>

        {/* Top Right: Theme Switcher & Admin Info */}
        <div className="flex items-center gap-3">
          {/* SINGLE-BUTTON SUN / MOON THEME SWITCHER */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 ${
              isDark
                ? 'border-amber-500/30 bg-slate-950 text-amber-400 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-300'
                : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-950'
            }`}
          >
            {isDark ? (
              <FaSun className="text-lg text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <FaMoon className="text-lg text-slate-800 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* User Role Badge */}
          <div
            className={`hidden sm:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs ${
              isSuperAdmin
                ? isDark
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                  : 'border-amber-300 bg-amber-50 text-amber-900'
                : isDark
                ? 'border-slate-800 bg-slate-950 text-slate-300'
                : 'border-slate-200 bg-slate-100 text-slate-700'
            }`}
          >
            {isSuperAdmin ? (
              <>
                <FaCrown className="text-amber-500 text-xs" />
                <span className="font-bold">Super Admin</span>
              </>
            ) : (
              <>
                <FaUserShield className="text-blue-500 text-xs" />
                <span className="font-bold">Admin</span>
              </>
            )}
            {currentUser?.email && (
              <span className="text-[10px] opacity-75 max-w-[130px] truncate font-mono">
                {currentUser.email}
              </span>
            )}
          </div>

          {/* Explicit Log Out Button */}
          <button
            type="button"
            onClick={handlePerformLogout}
            title="Log Out of CMS"
            className={`flex h-10 items-center gap-1.5 rounded-xl border px-3 text-xs font-bold transition duration-200 ${
              isDark
                ? 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50'
                : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300'
            }`}
          >
            <FaSignOutAlt className="text-xs" />
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CMS LAYOUT BODY: SIDEBAR + MAIN VIEW */}
      {/* ========================================================================= */}
      <div className="flex">
        {/* LEFT FIXED SIDEBAR */}
        <aside
          className={`fixed left-0 top-16 bottom-0 z-20 flex w-72 flex-col border-r p-5 shadow-sm transition-colors duration-200 ${
            isDark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'
          }`}
        >
          {/* Brand Insignia */}
          <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-black shadow-md shadow-amber-500/30">
                CM
              </div>
              <div>
                <h1 className={`text-base font-black tracking-tight font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  CALOR <span className="text-amber-500">MEGA</span>
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Industrial CMS Core
                </p>
              </div>
            </div>
          </div>

          {/* Telemetry Status Pill */}
          <div className={`mt-4 flex items-center justify-between rounded-xl border px-3.5 py-2 ${
            isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'
          }`}>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>System Online</span>
            </div>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30 font-mono">
              v2.5 Live
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="mt-5 flex-1 space-y-1.5 overflow-y-auto pr-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-500 font-bold shadow-xs'
                      : isDark
                      ? 'text-slate-400 hover:border-slate-800 hover:bg-slate-800/60 hover:text-white'
                      : 'text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`text-base ${isActive ? 'text-amber-500' : isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  <span className={`font-mono text-[10px] ${isActive ? 'text-amber-500' : isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                    {tab.code}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className={`border-t pt-4 space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <button
              type="button"
              onClick={handleOpenLiveDraftPreview}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-amber-500/10 py-2.5 text-xs font-bold text-red-500 transition hover:bg-red-500/20"
            >
              <FaBolt className="text-amber-500" /> Test Unsaved Draft
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
            >
              <FaSignOutAlt className="text-xs" /> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN EDITING VIEW */}
        <main className="ml-72 flex-1 p-6 lg:p-10 max-w-7xl">
          {/* ========================================================================= */}
          {/* TAB 1: HOME WEBPAGE */}
          {/* ========================================================================= */}
          {activeTab === 'home' && (
            <div>
              <UniversalTabToolbar
                title="Home Webpage Content"
                tabCode="01"
                description="Edit the hero headline, machine showcase image, live counter statistics, and core value cards."
                onSave={handlePublishHome}
                saving={saving}
                canUndo={homeHistoryIndex > 0}
                canRedo={homeHistoryIndex < homeHistory.length - 1}
                onUndo={() =>
                  undoHelper(homeHistory, homeHistoryIndex, setHomeHistoryIndex, (s) => {
                    setHomeHero(s.hero);
                    setHomeMetrics(s.metrics);
                    setHomeFeatures(s.features);
                  })
                }
                onRedo={() =>
                  redoHelper(homeHistory, homeHistoryIndex, setHomeHistoryIndex, (s) => {
                    setHomeHero(s.hero);
                    setHomeMetrics(s.metrics);
                    setHomeFeatures(s.features);
                  })
                }
                isDark={isDark}
                onPreviewDraft={() => handleOpenLiveDraftPreview('/')}
              />

              <div className="space-y-8">
                {/* Hero Section Card */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-6 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Hero Header & Call to Actions</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Primary headline, value proposition, and conversion buttons.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Main Headline
                      </label>
                      <input
                        type="text"
                        value={homeHero.headline || ''}
                        onChange={(e) => updateHomeState({ ...homeHero, headline: e.target.value })}
                        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Sub-Headline
                      </label>
                      <textarea
                        rows={3}
                        value={homeHero.subheadline || ''}
                        onChange={(e) => updateHomeState({ ...homeHero, subheadline: e.target.value })}
                        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Primary CTA Text
                      </label>
                      <input
                        type="text"
                        value={homeHero.cta_text || ''}
                        onChange={(e) => updateHomeState({ ...homeHero, cta_text: e.target.value })}
                        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Primary CTA Target Link
                      </label>
                      <input
                        type="text"
                        value={homeHero.cta_link || ''}
                        onChange={(e) => updateHomeState({ ...homeHero, cta_link: e.target.value })}
                        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Secondary CTA Text
                      </label>
                      <input
                        type="text"
                        value={homeHero.secondary_cta_text || ''}
                        onChange={(e) => updateHomeState({ ...homeHero, secondary_cta_text: e.target.value })}
                        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Secondary CTA Target Link
                      </label>
                      <input
                        type="text"
                        value={homeHero.secondary_cta_link || ''}
                        onChange={(e) => updateHomeState({ ...homeHero, secondary_cta_link: e.target.value })}
                        className={`mt-1.5 w-full rounded-xl border px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Hero Showcase Image */}
                  <div className={`border-t pt-5 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <label className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Hero Showcase Machine Image
                    </label>
                    <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className={`h-24 w-40 overflow-hidden rounded-xl border ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                        {homeHero.banner_image ? (
                          <img src={homeHero.banner_image} alt="Hero banner" className="h-full w-full object-cover" />
                        ) : (
                          <div className={`flex h-full items-center justify-center text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>No Image</div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={homeHero.banner_image || ''}
                          onChange={(e) => updateHomeState({ ...homeHero, banner_image: e.target.value })}
                          placeholder="Image URL or upload below..."
                          className={`w-full rounded-xl border px-4 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-500 transition hover:bg-amber-500/20 shadow-xs">
                          <FaUpload /> Replace Machine Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (url) => updateHomeState({ ...homeHero, banner_image: url }))}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Key Metrics / Counter Statistics */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-6 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div>
                      <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Key Performance Metrics</h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Real-time statistics displayed on the homepage counter strip.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newStat = { id: `stat-${Date.now()}`, value: 100, label: 'New Metric', suffix: '+' };
                        updateHomeState(undefined, [...homeMetrics, newStat]);
                      }}
                      className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-500 transition hover:bg-amber-500/20 shadow-xs"
                    >
                      <FaPlus /> Add Metric
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {homeMetrics.map((stat, idx) => (
                      <div key={stat.id || idx} className={`rounded-xl border p-4 space-y-3 ${isDark ? 'border-slate-800 bg-slate-800/60' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                            Stat #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = homeMetrics.filter((_, i) => i !== idx);
                              updateHomeState(undefined, updated);
                            }}
                            className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Value</label>
                            <input
                              type="text"
                              value={stat.value || ''}
                              onChange={(e) => {
                                const updated = [...homeMetrics];
                                updated[idx].value = e.target.value;
                                updateHomeState(undefined, updated);
                              }}
                              className={`mt-1 w-full rounded-lg border px-2.5 py-1.5 text-xs ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                          </div>
                          <div>
                            <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Suffix</label>
                            <input
                              type="text"
                              value={stat.suffix || ''}
                              onChange={(e) => {
                                const updated = [...homeMetrics];
                                updated[idx].suffix = e.target.value;
                                updateHomeState(undefined, updated);
                              }}
                              className={`mt-1 w-full rounded-lg border px-2.5 py-1.5 text-xs ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Label</label>
                          <input
                            type="text"
                            value={stat.label || ''}
                            onChange={(e) => {
                              const updated = [...homeMetrics];
                              updated[idx].label = e.target.value;
                              updateHomeState(undefined, updated);
                            }}
                            className={`mt-1 w-full rounded-lg border px-2.5 py-1.5 text-xs ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Feature Highlights */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-6 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div>
                      <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Core Feature Highlights</h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Pillars detailing smart airflow, heat recovery, and automated PLC control.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newFeat = { id: `feat-${Date.now()}`, title: 'New Technological Feature', desc: 'Feature explanation text...' };
                        updateHomeState(undefined, undefined, [...homeFeatures, newFeat]);
                      }}
                      className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-500 transition hover:bg-amber-500/20 shadow-xs"
                    >
                      <FaPlus /> Add Feature
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {homeFeatures.map((feat, idx) => (
                      <div key={feat.id || idx} className={`rounded-xl border p-4 space-y-3 ${isDark ? 'border-slate-800 bg-slate-800/60' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                            Feature #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = homeFeatures.filter((_, i) => i !== idx);
                              updateHomeState(undefined, undefined, updated);
                            }}
                            className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>

                        <div>
                          <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Title</label>
                          <input
                            type="text"
                            value={feat.title || ''}
                            onChange={(e) => {
                              const updated = [...homeFeatures];
                              updated[idx].title = e.target.value;
                              updateHomeState(undefined, undefined, updated);
                            }}
                            className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Description</label>
                          <textarea
                            rows={2}
                            value={feat.desc || ''}
                            onChange={(e) => {
                              const updated = [...homeFeatures];
                              updated[idx].desc = e.target.value;
                              updateHomeState(undefined, undefined, updated);
                            }}
                            className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PRODUCTS WEBPAGE */}
          {/* ========================================================================= */}
          {activeTab === 'products' && (
            <div>
              <UniversalTabToolbar
                title="Products Webpage Content"
                tabCode="02"
                description="Manage the complete industrial machine catalog, ordering, technical specifications, and imagery."
                onSave={handlePublishProducts}
                saving={saving}
                canUndo={productsHistoryIndex > 0}
                canRedo={productsHistoryIndex < productsHistory.length - 1}
                onUndo={() => undoHelper(productsHistory, productsHistoryIndex, setProductsHistoryIndex, setProductsForm)}
                onRedo={() => redoHelper(productsHistory, productsHistoryIndex, setProductsHistoryIndex, setProductsForm)}
                isDark={isDark}
                onPreviewDraft={() => handleOpenLiveDraftPreview('/products')}
              />

              <div className="space-y-6">
                <div className={`flex items-center justify-between rounded-2xl border p-4 shadow-sm ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                    Total Models in Catalog: <strong className="text-amber-500 font-mono">{productsForm.length}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newProduct = {
                        id: `calor-custom-${Date.now()}`,
                        name: 'Calor Custom Model',
                        tagline: 'High-Efficiency Industrial Food Dehydrator',
                        capacity: '300 - 600 kg / batch',
                        trays: '40 - 80 Trays',
                        power: '7.5 kW (3-Phase)',
                        temp: '35°C - 85°C',
                        dimensions: '2400 x 1400 x 1900 mm',
                        image: '/src/assets/calor_standard.png',
                        isQuoteOnly: true,
                        specs: [
                          { label: 'Chamber Material', value: 'SS304 Food-Grade Stainless Steel' },
                          { label: 'Air Circulation', value: 'Laminar Airflow' },
                        ],
                      };
                      updateProductsState([...productsForm, newProduct]);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20"
                  >
                    <FaPlus /> Add New Model
                  </button>
                </div>

                {productsForm.map((prod, idx) => (
                  <div key={prod.id || idx} className={`rounded-2xl border p-6 shadow-sm space-y-6 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                    {/* Card Header & Reorder Controls */}
                    <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 font-mono text-xs font-black text-amber-500 border border-amber-500/30">
                          {idx + 1}
                        </span>
                        <h3 className={`text-base font-black font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>{prod.name}</h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const updated = [...productsForm];
                            const temp = updated[idx];
                            updated[idx] = updated[idx - 1];
                            updated[idx - 1] = temp;
                            updateProductsState(updated);
                          }}
                          className={`rounded-lg border p-2 disabled:opacity-20 ${
                            isDark ? 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                          }`}
                          title="Move Up"
                        >
                          <FaArrowUp className="text-xs" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === productsForm.length - 1}
                          onClick={() => {
                            const updated = [...productsForm];
                            const temp = updated[idx];
                            updated[idx] = updated[idx + 1];
                            updated[idx + 1] = temp;
                            updateProductsState(updated);
                          }}
                          className={`rounded-lg border p-2 disabled:opacity-20 ${
                            isDark ? 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                          }`}
                          title="Move Down"
                        >
                          <FaArrowDown className="text-xs" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = productsForm.filter((_, i) => i !== idx);
                            updateProductsState(updated);
                          }}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-500 hover:bg-red-500/20"
                          title="Delete Model"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>

                    {/* Primary Product Inputs */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Model Name</label>
                        <input
                          type="text"
                          value={prod.name || ''}
                          onChange={(e) => {
                            const updated = [...productsForm];
                            updated[idx].name = e.target.value;
                            updateProductsState(updated);
                          }}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Tagline</label>
                        <input
                          type="text"
                          value={prod.tagline || ''}
                          onChange={(e) => {
                            const updated = [...productsForm];
                            updated[idx].tagline = e.target.value;
                            updateProductsState(updated);
                          }}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Capacity</label>
                        <input
                          type="text"
                          value={prod.capacity || ''}
                          onChange={(e) => {
                            const updated = [...productsForm];
                            updated[idx].capacity = e.target.value;
                            updateProductsState(updated);
                          }}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Tray Count</label>
                        <input
                          type="text"
                          value={prod.trays || ''}
                          onChange={(e) => {
                            const updated = [...productsForm];
                            updated[idx].trays = e.target.value;
                            updateProductsState(updated);
                          }}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Power kW</label>
                        <input
                          type="text"
                          value={prod.power || ''}
                          onChange={(e) => {
                            const updated = [...productsForm];
                            updated[idx].power = e.target.value;
                            updateProductsState(updated);
                          }}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Temperature Range</label>
                        <input
                          type="text"
                          value={prod.temp || ''}
                          onChange={(e) => {
                            const updated = [...productsForm];
                            updated[idx].temp = e.target.value;
                            updateProductsState(updated);
                          }}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Dimensions</label>
                        <input
                          type="text"
                          value={prod.dimensions || ''}
                          onChange={(e) => {
                            const updated = [...productsForm];
                            updated[idx].dimensions = e.target.value;
                            updateProductsState(updated);
                          }}
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs focus:border-amber-500 focus:outline-none ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div className="flex items-center pt-5">
                        <label className={`flex cursor-pointer items-center gap-2.5 text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                          <input
                            type="checkbox"
                            checked={prod.isQuoteOnly ?? true}
                            onChange={(e) => {
                              const updated = [...productsForm];
                              updated[idx].isQuoteOnly = e.target.checked;
                              updateProductsState(updated);
                            }}
                            className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                          />
                          <span>"Request Quote" Mode (B2B Price on Request)</span>
                        </label>
                      </div>
                    </div>

                    {/* Product Image Preview & Uploader */}
                    <div className={`rounded-xl border p-4 ${isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'}`}>
                      <label className={`block text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Product Image</label>
                      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className={`h-20 w-28 overflow-hidden rounded-lg border ${isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-white'}`}>
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="h-full w-full object-contain p-1" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[10px] text-slate-400">No Image</div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={prod.image || ''}
                            onChange={(e) => {
                              const updated = [...productsForm];
                              updated[idx].image = e.target.value;
                              updateProductsState(updated);
                            }}
                            className={`w-full rounded-lg border px-3 py-1.5 text-xs ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                            placeholder="Image URL..."
                          />
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-500 hover:bg-amber-500/20">
                            <FaUpload /> Upload Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileUpload(e, (url) => {
                                  const updated = [...productsForm];
                                  updated[idx].image = url;
                                  updateProductsState(updated);
                                })
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Specifications Editor */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className={`text-xs font-bold uppercase ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Technical Specifications List</label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...productsForm];
                            const currentSpecs = updated[idx].specs || [];
                            updated[idx].specs = [...currentSpecs, { label: 'Spec Parameter', value: 'Engineering Value' }];
                            updateProductsState(updated);
                          }}
                          className="flex items-center gap-1 text-[11px] font-bold text-amber-500 hover:underline"
                        >
                          <FaPlus className="text-[10px]" /> Add Spec Row
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(prod.specs || []).map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3">
                            <input
                              type="text"
                              value={spec.label || ''}
                              onChange={(e) => {
                                const updated = [...productsForm];
                                updated[idx].specs[sIdx].label = e.target.value;
                                updateProductsState(updated);
                              }}
                              placeholder="Specification Key"
                              className={`w-1/3 rounded-lg border px-3 py-1.5 text-xs ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                            <input
                              type="text"
                              value={spec.value || ''}
                              onChange={(e) => {
                                const updated = [...productsForm];
                                updated[idx].specs[sIdx].value = e.target.value;
                                updateProductsState(updated);
                              }}
                              placeholder="Specification Value"
                              className={`flex-1 rounded-lg border px-3 py-1.5 text-xs ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...productsForm];
                                updated[idx].specs = updated[idx].specs.filter((_, i) => i !== sIdx);
                                updateProductsState(updated);
                              }}
                              className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: TECHNOLOGY WEBPAGE */}
          {/* ========================================================================= */}
          {activeTab === 'technology' && (
            <div>
              <UniversalTabToolbar
                title="Technology Webpage Content"
                tabCode="03"
                description="Configure 3D interactive hotspot callouts with vector coordinates and engineering datasheet tables."
                onSave={handlePublishTech}
                saving={saving}
                canUndo={techHistoryIndex > 0}
                canRedo={techHistoryIndex < techHistory.length - 1}
                onUndo={() =>
                  undoHelper(techHistory, techHistoryIndex, setTechHistoryIndex, (s) => {
                    setTechDatasheet(s.datasheet);
                    setTechHotspots(s.hotspots);
                  })
                }
                onRedo={() =>
                  redoHelper(techHistory, techHistoryIndex, setTechHistoryIndex, (s) => {
                    setTechDatasheet(s.datasheet);
                    setTechHotspots(s.hotspots);
                  })
                }
                isDark={isDark}
                onPreviewDraft={() => handleOpenLiveDraftPreview('/technology')}
              />

              <div className="space-y-8">
                {/* 3D Hotspot Annotations */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-6 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div className="flex items-center gap-2.5">
                      <FaCube className="text-amber-500 text-lg" />
                      <div>
                        <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Interactive 3D Hotspot Annotations</h3>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Position 3D coordinate pins (X, Y, Z) and callout descriptions.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newHotspot = {
                          id: `hotspot-${Date.now()}`,
                          title: 'New Hotspot Assembly',
                          description: 'Detailed mechanical engineering callout description...',
                          x: 50,
                          y: 50,
                          z: 10,
                        };
                        updateTechState(undefined, [...techHotspots, newHotspot]);
                      }}
                      className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-500 hover:bg-amber-500/20"
                    >
                      <FaPlus /> Add 3D Hotspot
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {techHotspots.map((hs, idx) => (
                      <div key={hs.id || idx} className={`rounded-xl border p-4 space-y-3 ${isDark ? 'border-slate-800 bg-slate-800/60' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                            Callout #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = techHotspots.filter((_, i) => i !== idx);
                              updateTechState(undefined, updated);
                            }}
                            className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>

                        <div>
                          <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Callout Title</label>
                          <input
                            type="text"
                            value={hs.title || ''}
                            onChange={(e) => {
                              const updated = [...techHotspots];
                              updated[idx].title = e.target.value;
                              updateTechState(undefined, updated);
                            }}
                            className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Description</label>
                          <textarea
                            rows={2}
                            value={hs.description || ''}
                            onChange={(e) => {
                              const updated = [...techHotspots];
                              updated[idx].description = e.target.value;
                              updateTechState(undefined, updated);
                            }}
                            className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          />
                        </div>

                        {/* 3D Vector Coordinate Triggers */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div>
                            <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Coordinate X</label>
                            <input
                              type="number"
                              value={hs.x ?? 50}
                              onChange={(e) => {
                                const updated = [...techHotspots];
                                updated[idx].x = Number(e.target.value);
                                updateTechState(undefined, updated);
                              }}
                              className={`mt-1 w-full rounded-lg border px-2 py-1 text-xs font-mono ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                          </div>
                          <div>
                            <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Coordinate Y</label>
                            <input
                              type="number"
                              value={hs.y ?? 50}
                              onChange={(e) => {
                                const updated = [...techHotspots];
                                updated[idx].y = Number(e.target.value);
                                updateTechState(undefined, updated);
                              }}
                              className={`mt-1 w-full rounded-lg border px-2 py-1 text-xs font-mono ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                          </div>
                          <div>
                            <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Coordinate Z</label>
                            <input
                              type="number"
                              value={hs.z ?? 10}
                              onChange={(e) => {
                                const updated = [...techHotspots];
                                updated[idx].z = Number(e.target.value);
                                updateTechState(undefined, updated);
                              }}
                              className={`mt-1 w-full rounded-lg border px-2 py-1 text-xs font-mono ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Technical Engineering Datasheet */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-6 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div>
                      <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Structured Engineering Datasheet</h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Detailed parameters for materials, insulation, sensors, and heating elements.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newRow = { id: `ds-${Date.now()}`, category: 'New Engineering Category', details: 'Engineering specification details...' };
                        updateTechState([...techDatasheet, newRow], undefined);
                      }}
                      className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-500 hover:bg-amber-500/20"
                    >
                      <FaPlus /> Add Datasheet Row
                    </button>
                  </div>

                  <div className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                    {techDatasheet.map((row, idx) => (
                      <div key={row.id || idx} className="py-3 grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-4">
                          <input
                            type="text"
                            value={row.category || ''}
                            onChange={(e) => {
                              const updated = [...techDatasheet];
                              updated[idx].category = e.target.value;
                              updateTechState(updated, undefined);
                            }}
                            className={`w-full rounded-lg border px-3 py-1.5 text-xs font-bold text-amber-500 ${
                              isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-300 bg-white'
                            }`}
                          />
                        </div>
                        <div className="col-span-7">
                          <input
                            type="text"
                            value={row.details || ''}
                            onChange={(e) => {
                              const updated = [...techDatasheet];
                              updated[idx].details = e.target.value;
                              updateTechState(updated, undefined);
                            }}
                            className={`w-full rounded-lg border px-3 py-1.5 text-xs font-medium ${
                              isDark ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-300 bg-white text-slate-800'
                            }`}
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = techDatasheet.filter((_, i) => i !== idx);
                              updateTechState(updated, undefined);
                            }}
                            className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: APPLICATIONS WEBPAGE */}
          {/* ========================================================================= */}
          {activeTab === 'applications' && (
            <div>
              <UniversalTabToolbar
                title="Applications Webpage Content"
                tabCode="04"
                description="Manage food drying recipes, crop directories, moisture ranges, and drying cycle curves."
                onSave={handlePublishApps}
                saving={saving}
                canUndo={appsHistoryIndex > 0}
                canRedo={appsHistoryIndex < appsHistory.length - 1}
                onUndo={() => undoHelper(appsHistory, appsHistoryIndex, setAppsHistoryIndex, setAppsForm)}
                onRedo={() => redoHelper(appsHistory, appsHistoryIndex, setAppsHistoryIndex, setAppsForm)}
                isDark={isDark}
                onPreviewDraft={() => handleOpenLiveDraftPreview('/applications')}
              />

              <div className="space-y-6">
                {/* Category Filter Bar */}
                <div className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 shadow-sm ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    {['All', 'Fruits', 'Vegetables', 'Herbs & Spices', 'Specialty & Seafood'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setAppsCategoryFilter(cat)}
                        className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                          appsCategoryFilter === cat
                            ? 'border border-amber-500/40 bg-amber-500/10 text-amber-500 shadow-xs'
                            : isDark
                            ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            : 'border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newCrop = {
                        id: `crop-${Date.now()}`,
                        name: 'New Produce Item',
                        category: appsCategoryFilter === 'All' ? 'Fruits' : appsCategoryFilter,
                        temp: '50°C - 55°C',
                        duration: '12 - 16 Hours',
                        inputMoisture: '80%',
                        outputMoisture: '10 - 12%',
                        image: '/src/assets/images/hero-dryer.jpeg',
                        description: 'Optimal low-temperature dehydration curve for premium nutrient retention.',
                      };
                      updateAppsState([...appsForm, newCrop]);
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20"
                  >
                    <FaPlus /> Add Crop Profile
                  </button>
                </div>

                {/* Crop Cards Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {appsForm
                    .filter((crop) => appsCategoryFilter === 'All' || crop.category === appsCategoryFilter)
                    .map((crop) => {
                      const realIdx = appsForm.findIndex((c) => c.id === crop.id);
                      return (
                        <div key={crop.id || realIdx} className={`rounded-2xl border p-5 shadow-sm space-y-4 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                            <span className="rounded-md bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-black text-amber-500 border border-amber-500/30">
                              {crop.category}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = appsForm.filter((_, i) => i !== realIdx);
                                updateAppsState(updated);
                              }}
                              className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2">
                              <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Crop Name</label>
                              <input
                                type="text"
                                value={crop.name || ''}
                                onChange={(e) => {
                                  const updated = [...appsForm];
                                  updated[realIdx].name = e.target.value;
                                  updateAppsState(updated);
                                }}
                                className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs ${
                                  isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                                }`}
                              />
                            </div>

                            <div>
                              <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Category</label>
                              <select
                                value={crop.category || 'Fruits'}
                                onChange={(e) => {
                                  const updated = [...appsForm];
                                  updated[realIdx].category = e.target.value;
                                  updateAppsState(updated);
                                }}
                                className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs font-medium ${
                                  isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                                }`}
                              >
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Herbs & Spices">Herbs & Spices</option>
                                <option value="Specialty & Seafood">Specialty & Seafood</option>
                              </select>
                            </div>

                            <div>
                              <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Drying Temp</label>
                              <input
                                type="text"
                                value={crop.temp || ''}
                                onChange={(e) => {
                                  const updated = [...appsForm];
                                  updated[realIdx].temp = e.target.value;
                                  updateAppsState(updated);
                                }}
                                className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs font-medium ${
                                  isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                                }`}
                              />
                            </div>

                            <div>
                              <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Cycle Duration</label>
                              <input
                                type="text"
                                value={crop.duration || ''}
                                onChange={(e) => {
                                  const updated = [...appsForm];
                                  updated[realIdx].duration = e.target.value;
                                  updateAppsState(updated);
                                }}
                                className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs font-medium ${
                                  isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                                }`}
                              />
                            </div>

                            <div>
                              <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Moisture (In → Out)</label>
                              <div className="mt-1 flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={crop.inputMoisture || ''}
                                  onChange={(e) => {
                                    const updated = [...appsForm];
                                    updated[realIdx].inputMoisture = e.target.value;
                                    updateAppsState(updated);
                                  }}
                                  placeholder="80%"
                                  className={`w-1/2 rounded-lg border px-2 py-1.5 text-xs font-medium ${
                                    isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                                  }`}
                                />
                                <span className="text-slate-400">→</span>
                                <input
                                  type="text"
                                  value={crop.outputMoisture || ''}
                                  onChange={(e) => {
                                    const updated = [...appsForm];
                                    updated[realIdx].outputMoisture = e.target.value;
                                    updateAppsState(updated);
                                  }}
                                  placeholder="10%"
                                  className={`w-1/2 rounded-lg border px-2 py-1.5 text-xs font-medium ${
                                    isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <div className="col-span-2">
                              <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Description</label>
                              <textarea
                                rows={2}
                                value={crop.description || ''}
                                onChange={(e) => {
                                  const updated = [...appsForm];
                                  updated[realIdx].description = e.target.value;
                                  updateAppsState(updated);
                                }}
                                className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs font-medium ${
                                  isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Image preview & upload */}
                          <div className={`flex items-center gap-3 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                            <div className={`h-12 w-16 overflow-hidden rounded-lg border ${isDark ? 'border-slate-700 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                              {crop.image ? (
                                <img src={crop.image} alt={crop.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="flex h-full items-center justify-center text-[10px] text-slate-400">No img</div>
                              )}
                            </div>
                            <label className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold ${
                              isDark ? 'border-slate-700 bg-slate-950 text-slate-300 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}>
                              <FaUpload className="text-[10px]" /> Change Image
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) => {
                                    const updated = [...appsForm];
                                    updated[realIdx].image = url;
                                    updateAppsState(updated);
                                  })
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: GALLERY WEBPAGE */}
          {/* ========================================================================= */}
          {activeTab === 'gallery' && (
            <div>
              <UniversalTabToolbar
                title="Gallery Webpage Content"
                tabCode="05"
                description="Organize installations, factory shots, machine photos, and dried food samples."
                onSave={handlePublishGallery}
                saving={saving}
                canUndo={galleryHistoryIndex > 0}
                canRedo={galleryHistoryIndex < galleryHistory.length - 1}
                onUndo={() => undoHelper(galleryHistory, galleryHistoryIndex, setGalleryHistoryIndex, setGalleryForm)}
                onRedo={() => redoHelper(galleryHistory, galleryHistoryIndex, setGalleryHistoryIndex, setGalleryForm)}
                isDark={isDark}
                onPreviewDraft={() => handleOpenLiveDraftPreview('/gallery')}
              />

              <div className="space-y-6">
                {/* Add Media Card */}
                <div className={`rounded-2xl border p-5 shadow-sm space-y-4 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <h3 className={`text-sm font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Add New Media Asset</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="sm:col-span-2">
                      <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Caption / Title</label>
                      <input
                        type="text"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                        placeholder="e.g. Calor Mega Industrial Chamber"
                        className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs ${
                          isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Category Tag</label>
                      <select
                        value={newGalleryItem.category}
                        onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      >
                        <option value="Machines">Machines</option>
                        <option value="Installations">Installations</option>
                        <option value="Dried Samples">Dried Samples</option>
                        <option value="Factory">Factory</option>
                      </select>
                    </div>

                    <div className="flex items-end gap-2">
                      <label className="flex-1 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-500 hover:bg-amber-500/20">
                        <FaUpload /> Pick Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setNewGalleryItem({ ...newGalleryItem, url }))}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          if (!newGalleryItem.title || !newGalleryItem.url) {
                            showToast('Please provide a title and image', 'error');
                            return;
                          }
                          const item = {
                            id: `g-${Date.now()}`,
                            title: newGalleryItem.title,
                            category: newGalleryItem.category,
                            url: newGalleryItem.url,
                          };
                          updateGalleryState([item, ...galleryForm]);
                          setNewGalleryItem({ title: '', category: 'Machines', url: '' });
                        }}
                        className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-500 hover:to-amber-400"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {newGalleryItem.url && (
                    <div className="flex items-center gap-3 pt-2">
                      <img src={newGalleryItem.url} alt="Upload preview" className="h-12 w-16 object-cover rounded-lg border border-amber-500" />
                      <span className="text-xs font-bold text-emerald-500">Image staged for addition</span>
                    </div>
                  )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {['All', 'Machines', 'Installations', 'Dried Samples', 'Factory'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryCategoryFilter(cat)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                        galleryCategoryFilter === cat
                          ? 'border border-amber-500/40 bg-amber-500/10 text-amber-500 shadow-xs'
                          : isDark
                          ? 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryForm
                    .filter((item) => galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter)
                    .map((item) => {
                      const realIdx = galleryForm.findIndex((g) => g.id === item.id);
                      return (
                        <div key={item.id || realIdx} className={`group relative overflow-hidden rounded-2xl border shadow-sm ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                          <div className={`h-48 w-full overflow-hidden ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
                            <img src={item.url} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                          </div>

                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-black text-amber-500 border border-amber-500/30">
                                {item.category}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = galleryForm.filter((_, i) => i !== realIdx);
                                  updateGalleryState(updated);
                                }}
                                className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>

                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => {
                                const updated = [...galleryForm];
                                updated[realIdx].title = e.target.value;
                                updateGalleryState(updated);
                              }}
                              className={`w-full rounded-lg border px-3 py-1.5 text-xs font-bold ${
                                isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: ABOUT US WEBPAGE */}
          {/* ========================================================================= */}
          {activeTab === 'about' && (
            <div>
              <UniversalTabToolbar
                title="About Us Webpage Content"
                tabCode="06"
                description="Update company history, engineering mission narrative, quality certifications, and official brochure assets."
                onSave={handlePublishAbout}
                saving={saving}
                canUndo={aboutHistoryIndex > 0}
                canRedo={aboutHistoryIndex < aboutHistory.length - 1}
                onUndo={() => undoHelper(aboutHistory, aboutHistoryIndex, setAboutHistoryIndex, setAboutForm)}
                onRedo={() => redoHelper(aboutHistory, aboutHistoryIndex, setAboutHistoryIndex, setAboutForm)}
                isDark={isDark}
                onPreviewDraft={() => handleOpenLiveDraftPreview('/about')}
              />

              <div className="space-y-8">
                {/* Mission Narrative */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-5 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Company Story & Narrative</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Core narrative presented to potential cooperative and industrial clients.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Section Title</label>
                      <input
                        type="text"
                        value={aboutForm.title || ''}
                        onChange={(e) => updateAboutState({ ...aboutForm, title: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-bold ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={aboutForm.subtitle || ''}
                        onChange={(e) => updateAboutState({ ...aboutForm, subtitle: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Main Narrative Body</label>
                      <textarea
                        rows={5}
                        value={aboutForm.body || ''}
                        onChange={(e) => updateAboutState({ ...aboutForm, body: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2.5 text-xs leading-relaxed font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                </section>

                {/* Certifications & Guarantees */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-6 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div>
                      <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Certifications & Guarantees</h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Badges reinforcing industrial standards and after-sales support.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCert = { id: `cert-${Date.now()}`, title: 'New Guarantee', desc: 'Certification description...' };
                        const currentCerts = aboutForm.certifications || [];
                        updateAboutState({ ...aboutForm, certifications: [...currentCerts, newCert] });
                      }}
                      className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-500 hover:bg-amber-500/20"
                    >
                      <FaPlus /> Add Certification
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {(aboutForm.certifications || []).map((cert, idx) => (
                      <div key={cert.id || idx} className={`rounded-xl border p-4 space-y-3 ${isDark ? 'border-slate-800 bg-slate-800/60' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                            Badge #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = aboutForm.certifications.filter((_, i) => i !== idx);
                              updateAboutState({ ...aboutForm, certifications: updated });
                            }}
                            className="rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>

                        <div>
                          <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Title</label>
                          <input
                            type="text"
                            value={cert.title || ''}
                            onChange={(e) => {
                              const updated = [...aboutForm.certifications];
                              updated[idx].title = e.target.value;
                              updateAboutState({ ...aboutForm, certifications: updated });
                            }}
                            className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs font-bold ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          />
                        </div>

                        <div>
                          <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Description</label>
                          <textarea
                            rows={2}
                            value={cert.desc || ''}
                            onChange={(e) => {
                              const updated = [...aboutForm.certifications];
                              updated[idx].desc = e.target.value;
                              updateAboutState({ ...aboutForm, certifications: updated });
                            }}
                            className={`mt-1 w-full rounded-lg border px-3 py-1.5 text-xs font-medium ${
                              isDark ? 'border-slate-700 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Downloadable Brochure Asset */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-4 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`flex items-center gap-2 border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <FaFilePdf className="text-red-500 text-lg" />
                    <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Downloadable Specifications PDF Brochure</h3>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      value={aboutForm.brochure_url || ''}
                      onChange={(e) => updateAboutState({ ...aboutForm, brochure_url: e.target.value })}
                      placeholder="/assets/downloads/CALOR_MEGA_Specs.pdf"
                      className={`flex-1 rounded-xl border px-4 py-2.5 text-xs font-medium ${
                        isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                      }`}
                    />
                    <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-500 hover:bg-amber-500/20">
                      <FaUpload /> Upload PDF Brochure
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, (url) => updateAboutState({ ...aboutForm, brochure_url: url }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: CONTACT & GLOBAL SITE SETTINGS */}
          {/* ========================================================================= */}
          {activeTab === 'contact' && (
            <div>
              <UniversalTabToolbar
                title="Contact & Global Site Settings"
                tabCode="07"
                description="Manage business inquiries, phone lines, social profiles, and search engine meta optimization."
                onSave={handlePublishContact}
                saving={saving}
                canUndo={contactHistoryIndex > 0}
                canRedo={contactHistoryIndex < contactHistory.length - 1}
                onUndo={() => undoHelper(contactHistory, contactHistoryIndex, setContactHistoryIndex, setContactSettings)}
                onRedo={() => redoHelper(contactHistory, contactHistoryIndex, setContactHistoryIndex, setContactSettings)}
                isDark={isDark}
                onPreviewDraft={() => handleOpenLiveDraftPreview('/contact')}
              />

              <div className="space-y-8">
                {/* Business Details */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-5 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Company Contact Coordinates</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Direct contact details shown in the header, footer, and contact page.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Official Brand Name</label>
                      <input
                        type="text"
                        value={contactSettings.site_name || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, site_name: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-bold ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Inquiries Email</label>
                      <input
                        type="email"
                        value={contactSettings.contact_email || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, contact_email: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Support Phone / Hotline</label>
                      <input
                        type="text"
                        value={contactSettings.contact_phone || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, contact_phone: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Operating Hours</label>
                      <input
                        type="text"
                        value={contactSettings.working_hours || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, working_hours: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Factory & Engineering Works Address</label>
                      <input
                        type="text"
                        value={contactSettings.factory_address || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, factory_address: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                </section>

                {/* Social Media Channels */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-5 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Social Media Channels</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>External profile links for marketing and industrial presence.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>LinkedIn URL</label>
                      <input
                        type="text"
                        value={contactSettings.linkedin_url || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, linkedin_url: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Facebook URL</label>
                      <input
                        type="text"
                        value={contactSettings.facebook_url || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, facebook_url: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Twitter / X URL</label>
                      <input
                        type="text"
                        value={contactSettings.twitter_url || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, twitter_url: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Instagram URL</label>
                      <input
                        type="text"
                        value={contactSettings.instagram_url || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, instagram_url: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>YouTube Channel URL</label>
                      <input
                        type="text"
                        value={contactSettings.youtube_url || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, youtube_url: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                </section>

                {/* SEO & Meta Tags */}
                <section className={`rounded-2xl border p-6 shadow-sm space-y-5 ${isDark ? 'border-slate-800 bg-slate-900 shadow-xl' : 'border-slate-200 bg-white'}`}>
                  <div className={`border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <h3 className={`text-base font-bold font-roboto ${isDark ? 'text-white' : 'text-slate-900'}`}>Global SEO & Social Graph Meta Tags</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Search engine snippet and social card configuration.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Global Meta Title</label>
                      <input
                        type="text"
                        value={contactSettings.meta_title || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, meta_title: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-bold ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Global Meta Description</label>
                      <textarea
                        rows={2}
                        value={contactSettings.meta_description || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, meta_description: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>OpenGraph Share Thumbnail URL</label>
                      <input
                        type="text"
                        value={contactSettings.og_image || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, og_image: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>Favicon URL</label>
                      <input
                        type="text"
                        value={contactSettings.favicon_url || ''}
                        onChange={(e) => updateContactState({ ...contactSettings, favicon_url: e.target.value })}
                        className={`mt-1 w-full rounded-xl border px-4 py-2 text-xs font-medium ${
                          isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 08: ACCESS & ADMINS (SUPER ADMIN ONLY) */}
          {/* ========================================================================= */}
          {activeTab === 'users' && isSuperAdmin && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Sticky Tab Toolbar */}
              <div
                className={`sticky top-16 z-20 flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 backdrop-blur-md ${
                  isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white/95'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-500">08 // ACCESS & ADMINS</span>
                    <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-500">
                      SUPER ADMIN EXCLUSIVE
                    </span>
                  </div>
                  <h1 className="mt-0.5 text-lg font-bold">Team Privileges & Super Admin Credentials</h1>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Ultimate administrative control: manage team administrators, review registrations, and secure root credentials.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAddAdminModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-500 hover:to-amber-400 transition"
                >
                  <FaUserPlus className="text-sm" />
                  <span>+ Provision New Admin</span>
                </button>
              </div>

              <div className="px-6 space-y-8 pb-16">
                {/* 1. Super Admin Profile & Security Card */}
                <section
                  className={`rounded-2xl border p-6 shadow-sm ${
                    isDark ? 'border-amber-500/30 bg-slate-900/70' : 'border-amber-200 bg-gradient-to-br from-amber-50/40 to-white'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-600">
                        <FaCrown className="text-lg" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold tracking-tight">Super Admin Credentials (Primary Owner)</h2>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Update the root administrator name, official email, or password.
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600">
                      ● Root Authority Active
                    </span>
                  </div>

                  <form onSubmit={handleUpdateSuperAdminCredentials} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                          Super Admin Full Name
                        </label>
                        <input
                          type="text"
                          value={superAdminProfileForm.name}
                          onChange={(e) => setSuperAdminProfileForm({ ...superAdminProfileForm, name: e.target.value })}
                          required
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                          Super Admin Email Address
                        </label>
                        <input
                          type="email"
                          value={superAdminProfileForm.email}
                          onChange={(e) => setSuperAdminProfileForm({ ...superAdminProfileForm, email: e.target.value })}
                          required
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                          New Password <span className="text-slate-400 font-normal">(Leave blank to keep unchanged)</span>
                        </label>
                        <input
                          type="password"
                          value={superAdminProfileForm.password}
                          onChange={(e) => setSuperAdminProfileForm({ ...superAdminProfileForm, password: e.target.value })}
                          placeholder="••••••••"
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                          Current Password <span className="text-slate-400 font-normal">(Required if setting new password)</span>
                        </label>
                        <input
                          type="password"
                          value={superAdminProfileForm.currentPassword}
                          onChange={(e) => setSuperAdminProfileForm({ ...superAdminProfileForm, currentPassword: e.target.value })}
                          placeholder="••••••••"
                          className={`mt-1 w-full rounded-xl border px-3.5 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition"
                      >
                        <FaSave /> Save Super Admin Profile
                      </button>
                    </div>
                  </form>
                </section>

                {/* 2. Admin Registration & Invite Code Policy */}
                <section
                  className={`rounded-2xl border p-6 shadow-sm ${
                    isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                      <FaKey className="text-base" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold tracking-tight">Admin Registration & Secret Invite Code Policy</h2>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Control how new team members gain access to the CMS.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveAdminSettings} className="space-y-6">
                    <div>
                      <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Registration Access Mode
                      </label>
                      <div className="mt-2.5 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                            adminSettings.registration_mode === 'approval_required'
                              ? 'border-amber-500 bg-amber-500/10'
                              : isDark
                              ? 'border-slate-800 bg-slate-950/50'
                              : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reg_mode"
                            checked={adminSettings.registration_mode === 'approval_required'}
                            onChange={() => setAdminSettings({ ...adminSettings, registration_mode: 'approval_required' })}
                            className="mt-0.5 text-amber-600"
                          />
                          <div>
                            <span className="block text-xs font-bold">Approval Required</span>
                            <span className={`block text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Anyone can register, but Super Admin must approve before they can log in.
                            </span>
                          </div>
                        </label>

                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                            adminSettings.registration_mode === 'invite_only'
                              ? 'border-amber-500 bg-amber-500/10'
                              : isDark
                              ? 'border-slate-800 bg-slate-950/50'
                              : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reg_mode"
                            checked={adminSettings.registration_mode === 'invite_only'}
                            onChange={() => setAdminSettings({ ...adminSettings, registration_mode: 'invite_only' })}
                            className="mt-0.5 text-amber-600"
                          />
                          <div>
                            <span className="block text-xs font-bold">Invite Code Only</span>
                            <span className={`block text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Requires the Secret Invite Code to submit registration.
                            </span>
                          </div>
                        </label>

                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                            adminSettings.registration_mode === 'disabled'
                              ? 'border-red-500 bg-red-500/10'
                              : isDark
                              ? 'border-slate-800 bg-slate-950/50'
                              : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reg_mode"
                            checked={adminSettings.registration_mode === 'disabled'}
                            onChange={() => setAdminSettings({ ...adminSettings, registration_mode: 'disabled' })}
                            className="mt-0.5 text-red-600"
                          />
                          <div>
                            <span className="block text-xs font-bold text-red-600">Registration Closed</span>
                            <span className={`block text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Only Super Admin can provision new accounts manually.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Secret Invite Code
                      </label>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Share this secret code with trusted team members for instant account activation.
                      </p>
                      <div className="mt-2 flex max-w-md items-center gap-2">
                        <input
                          type="text"
                          value={adminSettings.invite_code}
                          onChange={(e) => setAdminSettings({ ...adminSettings, invite_code: e.target.value })}
                          className={`w-full rounded-xl border px-3.5 py-2 text-xs font-mono font-bold uppercase ${
                            isDark ? 'border-slate-800 bg-slate-950 text-amber-400' : 'border-slate-300 bg-white text-amber-700'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(adminSettings.invite_code);
                            showToast('Invite code copied to clipboard!');
                          }}
                          className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                            isDark ? 'border-slate-800 bg-slate-950 hover:bg-slate-800' : 'border-slate-300 bg-slate-100 hover:bg-slate-200'
                          }`}
                        >
                          <FaCopy /> Copy
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-sm hover:from-amber-500 hover:to-amber-400 transition"
                      >
                        <FaSave /> Save Policy Settings
                      </button>
                    </div>
                  </form>
                </section>

                {/* 3. Pending Approvals Queue */}
                {usersList.some((u) => u.status === 'pending') && (
                  <section className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-600" />
                        </span>
                        <h2 className="text-sm font-bold tracking-tight text-amber-600 dark:text-amber-400">
                          Pending Admin Approval Requests ({usersList.filter((u) => u.status === 'pending').length})
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {usersList
                        .filter((u) => u.status === 'pending')
                        .map((u) => (
                          <div
                            key={u.id}
                            className={`flex items-center justify-between p-4 rounded-xl border ${
                              isDark ? 'border-slate-800 bg-slate-950' : 'border-amber-200 bg-white'
                            }`}
                          >
                            <div>
                              <div className="font-bold text-xs">{u.name}</div>
                              <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{u.email}</div>
                              <div className="text-[10px] text-amber-500 mt-1 font-mono">Registered: {u.created_at}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleToggleUserStatus(u, 'active')}
                                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-500 transition"
                              >
                                <FaUserCheck /> Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(u)}
                                className="flex items-center gap-1 rounded-lg bg-red-600/10 text-red-600 border border-red-500/30 px-3 py-1.5 text-xs font-bold hover:bg-red-600 hover:text-white transition"
                              >
                                <FaTrash /> Reject
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {/* 4. Active Admin Accounts Roster */}
                <section
                  className={`rounded-2xl border p-6 shadow-sm ${
                    isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                        <FaUsersCog className="text-lg" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold tracking-tight">Administrator Accounts Roster ({usersList.length})</h2>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          All accounts authorized to access and manage the CALOR MEGA website content.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAddAdminModalOpen(true)}
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-sm hover:from-amber-500 hover:to-amber-400 transition"
                    >
                      <FaPlus /> Add Administrator
                    </button>
                  </div>

                  {usersLoading ? (
                    <div className="py-12 text-center text-xs text-slate-500">
                      <FaSpinner className="animate-spin text-lg mx-auto mb-2 text-amber-500" />
                      Loading administrator roster...
                    </div>
                  ) : usersList.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-500">No administrators found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr
                            className={`border-b text-[10px] font-bold uppercase tracking-wider ${
                              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                            }`}
                          >
                            <th className="py-3 px-4">Administrator</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Account Status</th>
                            <th className="py-3 px-4">Date Added</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                          {usersList.map((u) => {
                            const isThisSuperAdmin = u.role === 'super_admin' || u.role === 'superadmin';
                            const isSelf = u.id === currentUser?.id;

                            return (
                              <tr
                                key={u.id}
                                className={`transition ${
                                  isDark ? 'hover:bg-slate-950/40' : 'hover:bg-slate-50'
                                }`}
                              >
                                <td className="py-3 px-4">
                                  <div className="font-bold flex items-center gap-1.5">
                                    {isThisSuperAdmin && <FaCrown className="text-amber-500 text-[11px]" />}
                                    <span>{u.name}</span>
                                    {isSelf && (
                                      <span className="text-[10px] rounded bg-amber-500/20 px-1.5 py-0.2 text-amber-500 font-normal">
                                        (You)
                                      </span>
                                    )}
                                  </div>
                                  <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {u.email}
                                  </div>
                                </td>

                                <td className="py-3 px-4">
                                  {isThisSuperAdmin ? (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-500">
                                      👑 Super Admin
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold">
                                      🛡️ Admin
                                    </span>
                                  )}
                                </td>

                                <td className="py-3 px-4">
                                  {u.status === 'active' ? (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-500">
                                      ● Active
                                    </span>
                                  ) : u.status === 'pending' ? (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-500">
                                      ⏳ Pending
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 rounded-md border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[11px] font-bold text-red-500">
                                      ✕ Suspended
                                    </span>
                                  )}
                                </td>

                                <td className={`py-3 px-4 font-mono text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {u.created_at ? u.created_at.split(' ')[0] : '—'}
                                </td>

                                <td className="py-3 px-4 text-right">
                                  {isThisSuperAdmin ? (
                                    <span className={`text-[11px] italic ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                      Protected Super Admin
                                    </span>
                                  ) : (
                                    <div className="inline-flex items-center gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setResetPasswordModalUser(u);
                                          setNewResetPassword('');
                                        }}
                                        title="Reset Password"
                                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition ${
                                          isDark ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
                                        }`}
                                      >
                                        <FaKey className="inline mr-1" /> Reset PW
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => handleToggleUserStatus(u)}
                                        title={u.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition ${
                                          u.status === 'active'
                                            ? 'border-red-500/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30'
                                            : 'border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                                        }`}
                                      >
                                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => handleDeleteUser(u)}
                                        title="Delete Admin"
                                        className="rounded-lg border border-red-500/30 p-1.5 text-red-600 hover:bg-red-600 hover:text-white transition"
                                      >
                                        <FaTrash className="text-xs" />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </div>

              {/* Modal: Add Admin Directly */}
              {addAdminModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                  <div
                    className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
                      isDark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        <FaUserPlus className="text-amber-500" /> Provision New Administrator
                      </h3>
                      <button
                        type="button"
                        onClick={() => setAddAdminModalOpen(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <form onSubmit={handleCreateAdminDirect} className="mt-4 space-y-3.5">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-slate-500">Full Name</label>
                        <input
                          type="text"
                          value={newAdminForm.name}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                          required
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                          placeholder="Team Member Name"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-slate-500">Email Address</label>
                        <input
                          type="email"
                          value={newAdminForm.email}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                          required
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                          placeholder="admin@calormega.com"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-slate-500">Initial Password</label>
                        <input
                          type="password"
                          value={newAdminForm.password}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                          required
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                          placeholder="••••••••"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-slate-500">Assigned Role</label>
                        <select
                          value={newAdminForm.role}
                          onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                        >
                          <option value="admin">Administrator (Content Editing & Publishing)</option>
                          <option value="super_admin">Super Admin (Full Administrative Authority)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setAddAdminModalOpen(false)}
                          className={`rounded-xl border px-4 py-2 text-xs font-bold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
                          }`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Modal: Reset Password */}
              {resetPasswordModalUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                  <div
                    className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${
                      isDark ? 'border-slate-800 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <h3 className="font-bold text-sm">Reset Password</h3>
                      <button
                        type="button"
                        onClick={() => setResetPasswordModalUser(null)}
                        className="text-slate-400 hover:text-white"
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <form onSubmit={handleResetUserPassword} className="mt-4 space-y-3.5">
                      <p className="text-xs text-slate-500">
                        Set a new password for <strong>{resetPasswordModalUser.name}</strong> ({resetPasswordModalUser.email}).
                      </p>

                      <div>
                        <label className="text-[11px] font-bold uppercase text-slate-500">New Password</label>
                        <input
                          type="password"
                          value={newResetPassword}
                          onChange={(e) => setNewResetPassword(e.target.value)}
                          required
                          className={`mt-1 w-full rounded-xl border px-3 py-2 text-xs font-semibold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-white' : 'border-slate-300 bg-white text-slate-900'
                          }`}
                          placeholder="New password (min 6 chars)"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={() => setResetPasswordModalUser(null)}
                          className={`rounded-xl border px-4 py-2 text-xs font-bold ${
                            isDark ? 'border-slate-800 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
                          }`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition"
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
