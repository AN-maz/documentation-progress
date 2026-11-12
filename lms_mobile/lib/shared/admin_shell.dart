import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers.dart';
import '../../core/theme.dart';

/// Shell dashboard admin: Bottom Navigation + AppBar khusus admin.
class AdminShell extends ConsumerWidget {
  const AdminShell({super.key, required this.child});
  final Widget child;

  static const _tabs = [
    (path: '/admin', icon: Icons.dashboard_outlined, active: Icons.dashboard, label: 'Overview'),
    (path: '/admin/moderation', icon: Icons.fact_check_outlined, active: Icons.fact_check, label: 'Moderasi'),
    (path: '/admin/categories', icon: Icons.folder_outlined, active: Icons.folder, label: 'Kategori'),
  ];

  int _indexFor(BuildContext context) {
    final loc = GoRouterState.of(context).uri.path;
    for (var i = _tabs.length - 1; i >= 0; i--) {
      if (_tabs[i].path == '/admin') {
        if (loc == '/admin') return i;
      } else if (loc.startsWith(_tabs[i].path)) {
        return i;
      }
    }
    return 0;
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final index = _indexFor(context);
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.admin_panel_settings, color: AppColors.primary),
            SizedBox(width: 10),
            Text('Admin Console'),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'Keluar',
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await ref.read(authProvider.notifier).logout();
              if (context.mounted) context.go('/login');
            },
          ),
        ],
      ),
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
