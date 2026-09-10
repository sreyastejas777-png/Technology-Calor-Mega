import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CMSProvider } from './context/CMSContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminDashboard from './pages/AdminDashboard';

createRoot(document.getElementById('admin-root')).render(
  <StrictMode>
    <ThemeProvider>
      <CMSProvider>
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      </CMSProvider>
    </ThemeProvider>
  </StrictMode>
);
