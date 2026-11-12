import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../core/providers.dart';
import '../features/admin/admin_dashboard_page.dart';
import '../features/admin/category_management_page.dart';
import '../features/admin/moderation_list_page.dart';
import '../features/admin/review_material_page.dart';
import '../features/auth/login_page.dart';
import '../features/learner/catalog_page.dart';
import '../features/learner/creator_dashboard_page.dart';
import '../features/learner/leaderboard_page.dart';
import '../features/learner/material_detail_page.dart';
import '../features/learner/material_editor_page.dart';
import '../features/learner/my_materials_page.dart';
import '../features/learner/profile_page.dart';
import '../shared/admin_shell.dart';
import '../shared/learner_shell.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final auth = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/login',
    redirect: (context, state) {
      final loggedIn = auth.isAuthenticated;
      final isAdmin = auth.user?.isAdmin ?? false;
      final loc = state.uri.path;

      final isAuthRoute = loc == '/login';
      if (!loggedIn) return isAuthRoute ? null : '/login';
      if (isAuthRoute) return isAdmin ? '/admin' : '/dashboard';

      // Admin tidak boleh masuk area learner, dan sebaliknya.
      if (isAdmin && loc.startsWith('/dashboard')) return '/admin';
      if (!isAdmin && loc.startsWith('/admin')) return '/dashboard';

      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (_, _) => const LoginPage()),

      // --- Learner / Creator ---
      ShellRoute(
        builder: (context, state, child) => LearnerShell(child: child),
        routes: [
          GoRoute(path: '/dashboard', builder: (_, _) => const CreatorDashboardPage()),
          GoRoute(path: '/dashboard/materi', builder: (_, _) => const CatalogPage()),
          GoRoute(
            path: '/dashboard/materi/create',
            builder: (_, _) => const MaterialEditorPage(),
          ),
          GoRoute(
            path: '/dashboard/materi/edit/:id',
            builder: (_, state) =>
                MaterialEditorPage(materialId: state.pathParameters['id']),
          ),
          GoRoute(
            path: '/dashboard/materi/:slug',
            builder: (_, state) => MaterialDetailPage(slug: state.pathParameters['slug']!),
          ),
          GoRoute(path: '/dashboard/my-materials', builder: (_, _) => const MyMaterialsPage()),
        ],
      ),

      GoRoute(path: '/profile', builder: (_, _) => const ProfilePage()),
      GoRoute(path: '/leaderboard', builder: (_, _) => const LeaderboardPage()),

      // --- Admin ---
      ShellRoute(
        builder: (context, state, child) => AdminShell(child: child),
        routes: [
          GoRoute(path: '/admin', builder: (_, _) => const AdminDashboardPage()),
          GoRoute(path: '/admin/moderation', builder: (_, _) => const ModerationListPage()),
          GoRoute(
            path: '/admin/moderation/:id',
            builder: (_, state) =>
                ReviewMaterialPage(materialId: state.pathParameters['id']!),
          ),
          GoRoute(path: '/admin/categories', builder: (_, _) => const CategoryManagementPage()),
        ],
      ),
    ],
  );
});
