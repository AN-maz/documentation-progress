import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';

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
      // { path: 'materi', element: <MaterialCatalogPage /> },
      // { path: 'materi/:slug', element: <MaterialDetailPage /> },
      // { path: 'leaderboard', element: <LeaderboardPage /> },
    ],
  },

  // 3. Creator / User Dashboard Routes
  {
    path: '/dashboard',
    element: <ProtectedRoute allowedRoles={['user', 'admin']} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // { index: true, element: <CreatorDashboardPage /> },
          // { path: 'materi/create', element: <CreateMaterialPage /> },
          // { path: 'materi/my-materials', element: <MyMaterialsPage /> },
          // { path: 'materi/:id/edit', element: <EditMaterialPage /> },
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