import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers.dart';
import '../../core/theme.dart';

/// Shell dashboard learner/creator: Bottom Navigation + Drawer + AppBar.
class LearnerShell extends ConsumerWidget {
  const LearnerShell({super.key, required this.child});
  final Widget child;

  static const _tabs = [
    (path: '/dashboard', icon: Icons.dashboard_outlined, active: Icons.dashboard, label: 'Home'),
    (path: '/dashboard/materi', icon: Icons.explore_outlined, active: Icons.explore, label: 'Eksplorasi'),
    (path: '/dashboard/my-materials', icon: Icons.book_outlined, active: Icons.book, label: 'Materi Saya'),
    (path: '/leaderboard', icon: Icons.emoji_events_outlined, active: Icons.emoji_events, label: 'Peringkat'),
  ];

  int _indexFor(BuildContext context) {
    final loc = GoRouterState.of(context).uri.path;
    for (var i = _tabs.length - 1; i >= 0; i--) {
      if (_tabs[i].path == '/dashboard') {
        if (loc == '/dashboard') return i;
      } else if (loc.startsWith(_tabs[i].path)) {
        return i;
      }
    }
    return 0;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;
    final index = _indexFor(context);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(9),
              ),
              alignment: Alignment.center,
              child: const Text('L',
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800)),
            ),
            const SizedBox(width: 10),
            const Text('LMS Platform'),
          ],
        ),
        actions: [
          if (user != null)
            Padding(
              padding: const EdgeInsets.only(right: 4),
              child: Center(
                child: Text('⚡ ${user.totalExp} EXP',
                    style: const TextStyle(
                        color: AppColors.amber, fontWeight: FontWeight.w700, fontSize: 12)),
              ),
            ),
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: Center(
              child: CircleAvatar(
                radius: 16,
                backgroundColor: AppColors.primary.withValues(alpha: 0.15),
                child: Text(
                  (user?.name.isNotEmpty ?? false) ? user!.name[0].toUpperCase() : 'U',
                  style: const TextStyle(
                      color: AppColors.primary, fontWeight: FontWeight.w800, fontSize: 13),
                ),
              ),
            ),
          ),
        ],
      ),
      drawer: _AppDrawer(),
      body: child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: index,
        onDestinationSelected: (i) => context.go(_tabs[i].path),
        destinations: _tabs
            .map((t) => NavigationDestination(
                  icon: Icon(t.icon),
                  selectedIcon: Icon(t.active, color: AppColors.primary),
                  label: t.label,
                ))
            .toList(),
      ),
    );
  }
}

class _AppDrawer extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;
    return Drawer(
      child: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: AppColors.primary.withValues(alpha: 0.15),
                    child: Text(
                      (user?.name.isNotEmpty ?? false) ? user!.name[0].toUpperCase() : 'U',
                      style: const TextStyle(
                          color: AppColors.primary, fontWeight: FontWeight.w800, fontSize: 18),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(user?.name ?? 'Pengguna',
                            style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                        Text('Level ${user?.level ?? 1} • ${user?.totalPoints ?? 0} PTS',
                            style: Theme.of(context).textTheme.bodySmall),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),
            ListTile(
              leading: const Icon(Icons.person_outline),
              title: const Text('Profil Saya'),
              onTap: () {
                Navigator.pop(context);
                context.push('/profile');
              },
            ),
            ListTile(
              leading: const Icon(Icons.add_circle_outline),
              title: const Text('Buat Materi'),
              onTap: () {
                Navigator.pop(context);
                context.push('/dashboard/materi/create');
              },
            ),
            const Spacer(),
            ListTile(
              leading: const Icon(Icons.logout, color: AppColors.rose),
              title: const Text('Keluar', style: TextStyle(color: AppColors.rose)),
              onTap: () async {
                await ref.read(authProvider.notifier).logout();
                if (context.mounted) context.go('/login');
              },
            ),
          ],
        ),
      ),
    );
  }
}
