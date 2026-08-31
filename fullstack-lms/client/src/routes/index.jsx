import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';

// Learner Pages
import MaterialCatalogPage from '../pages/learner/MaterialCatalogPage';
import MaterialDetailPage from '../pages/learner/MaterialDetailPage';
import MyMaterialsPage from '../pages/learner/MyMaterialsPage';

// Creator Pages
import CreatorDashboardPage from '../pages/creator/CreatorDashboardPage';
import CreateMaterialPage from '../pages/creator/CreateMaterialPage';
import EditMaterialPage from '../pages/creator/EditMaterialPage';

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import ModerationListPage from '../pages/admin/ModerationListPage';
import ReviewMaterialPage from '../pages/admin/ReviewMaterialPage';
import CategoryManagementPage from '../pages/admin/CategoryManagementPage';

const router = createBrowserRouter([
  // 1. Single Auth Page (Login & Register)
  {
    path: '/auth',
    element: <AuthPage />,
  },

  // 2. Public Routes
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
    ],
  },

  // 3. Creator & Learner Dashboard Routes
  {
    path: '/dashboard',
    element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <CreatorDashboardPage /> },
          
          // Rute Katalog & Detail Pembelajaran
          { path: 'materi', element: <MaterialCatalogPage /> },
          { path: 'materi/create', element: <CreateMaterialPage /> },
          { path: 'materi/my-materials', element: <MyMaterialsPage /> },
          { path: 'materi/edit/:id', element: <EditMaterialPage /> },
          { path: 'materi/:slug', element: <MaterialDetailPage /> },
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
          { index: true, element: <AdminDashboardPage /> },
          { path: 'moderation', element: <ModerationListPage /> },
          { path: 'moderation/:id', element: <ReviewMaterialPage /> },
          { path: 'categories', element: <CategoryManagementPage /> },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}