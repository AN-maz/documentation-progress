import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';

import MaterialCatalogPage from '../pages/learner/MaterialCatalogPage';
import MaterialDetailPage from '../pages/learner/MaterialDetailPage';
import CreatorDashboardPage from '../pages/creator/CreatorDashboardPage';
import CreateMaterialPage from '../pages/creator/CreateMaterialPage';

const router = createBrowserRouter([
  // 1. Single Auth Page (Login & Register)
  {
    path: '/auth',
    element: <AuthPage />,
  },

  // 2. Public / Learner Routes
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'materi', element: <MaterialCatalogPage /> },
      {
        element: <ProtectedRoute />, // Melindungi detail materi
        children: [
          {
            path: 'materi/:slug',
            element: <MaterialDetailPage />,
          },
        ],
      },
    ],
  },

  // 3. Creator / User Dashboard Routes (PERBAIKAN DI SINI)
  {
    path: '/dashboard',
    element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // Gunakan 'index: true' untuk rute utama '/dashboard'
          { index: true, element: <CreatorDashboardPage /> },
          
          // Gunakan path relatif 'materi/create' (otomatis menjadi /dashboard/materi/create)
          { path: 'materi/create', element: <CreateMaterialPage /> },
        ],
      },
    ],
  },

  // 4. Admin Dashboard Routes
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        element: <DashboardLayout isAdmin />,
        children: [
          // { index: true, element: <AdminDashboardPage /> },
          // { path: 'moderation', element: <ModerationListPage /> },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}