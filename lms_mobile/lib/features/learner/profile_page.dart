import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/providers.dart';
import '../../core/theme.dart';

/// Profil pengguna + info gamifikasi.
class ProfilePage extends ConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;
    if (user == null) return const SizedBox.shrink();

    final nextLevelExp = user.level * 100;
    final progress = ((user.totalExp % 100) / 100).clamp(0.0, 1.0);

    return Scaffold(
      appBar: AppBar(title: const Text('Profil Saya')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: Column(
              children: [
                CircleAvatar(
                  radius: 40,
                  backgroundColor: AppColors.primary.withValues(alpha: 0.15),
                  child: Text(user.name[0].toUpperCase(),
                      style: const TextStyle(
                          fontSize: 30, fontWeight: FontWeight.w800, color: AppColors.primary)),
                ),
                const SizedBox(height: 12),
                Text(user.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
                Text(user.email, style: Theme.of(context).textTheme.bodySmall),
                const SizedBox(height: 6),
                Chip(
                  label: Text(user.isAdmin ? 'ADMIN' : 'LEARNER',
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
                  backgroundColor: AppColors.primary.withValues(alpha: 0.1),
                  side: BorderSide.none,
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Level ${user.level}',
                          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                      Text('${user.totalExp} / $nextLevelExp EXP',
                          style: Theme.of(context).textTheme.bodySmall),
                    ],
                  ),
                  const SizedBox(height: 10),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(999),
                    child: LinearProgressIndicator(
                      value: progress,
                      minHeight: 10,
                      backgroundColor: AppColors.primary.withValues(alpha: 0.12),
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _StatBox(
                  icon: Icons.bolt,
                  label: 'Total EXP',
                  value: '${user.totalExp}',
                  color: AppColors.amber,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _StatBox(
                  icon: Icons.workspace_premium,
                  label: 'Poin',
                  value: '${user.totalPoints}',
                  color: AppColors.emerald,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          OutlinedButton.icon(
            onPressed: () async {
              await ref.read(authProvider.notifier).logout();
              if (context.mounted) Navigator.of(context).popUntil((r) => r.isFirst);
            },
            icon: const Icon(Icons.logout, color: AppColors.rose),
            label: const Text('Keluar', style: TextStyle(color: AppColors.rose)),
          ),
        ],
      ),
    );
  }
}

class _StatBox extends StatelessWidget {
  const _StatBox({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });
  final IconData icon;
  final String label;
  final String value;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(icon, color: color, size: 26),
            const SizedBox(height: 8),
            Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
            Text(label, style: Theme.of(context).textTheme.bodySmall),
          ],
        ),
      ),
    );
  }
}
