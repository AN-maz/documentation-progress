import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers.dart';
import '../../core/theme.dart';
import '../../shared/widgets.dart';

/// Dashboard admin: statistik sistem + shortcut.
class AdminDashboardPage extends ConsumerWidget {
  const AdminDashboardPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stats = ref.watch(adminStatsProvider);

    return RefreshIndicator(
      onRefresh: () async => ref.invalidate(adminStatsProvider),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 96),
        children: [
          const Text('Admin Console 👋',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text('Kelola publikasi materi dan struktur kategori platform.',
              style: Theme.of(context).textTheme.bodySmall),
          const SizedBox(height: 20),
          stats.when(
            loading: () => const Padding(
              padding: EdgeInsets.symmetric(vertical: 40),
              child: Center(child: CircularProgressIndicator()),
            ),
            error: (e, _) => Text('Gagal memuat statistik: $e'),
            data: (s) => Column(
              children: [
                SummaryCard(
                    icon: Icons.schedule,
                    title: 'Pending Moderasi',
                    value: '${s.pendingMaterials}',
                    color: AppColors.amber),
                const SizedBox(height: 12),
                SummaryCard(
                    icon: Icons.check_circle_outline,
                    title: 'Materi Disetujui',
                    value: '${s.approvedMaterials}',
                    color: AppColors.emerald),
                const SizedBox(height: 12),
                SummaryCard(
                    icon: Icons.description_outlined,
                    title: 'Total Materi',
                    value: '${s.totalMaterials}',
                    color: AppColors.primary),
                const SizedBox(height: 12),
                SummaryCard(
                    icon: Icons.folder_outlined,
                    title: 'Total Kategori',
                    value: '${s.totalCategories}',
                    color: AppColors.sky),
                const SizedBox(height: 12),
                SummaryCard(
                    icon: Icons.people_outline,
                    title: 'Total Pengguna',
                    value: '${s.totalUsers}',
                    color: AppColors.primary),
                const SizedBox(height: 12),
                SummaryCard(
                    icon: Icons.done_all,
                    title: 'Materi Selesai Dibaca',
                    value: '${s.totalCompletions}',
                    color: AppColors.emerald),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Card(
            child: ListTile(
              leading: const Icon(Icons.fact_check_outlined, color: AppColors.amber),
              title: const Text('Antrean Moderasi',
                  style: TextStyle(fontWeight: FontWeight.w700)),
              subtitle: const Text('Tinjau materi yang menunggu persetujuan'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 14),
              onTap: () => context.go('/admin/moderation'),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: ListTile(
              leading: const Icon(Icons.folder_outlined, color: AppColors.sky),
              title: const Text('Kelola Kategori', style: TextStyle(fontWeight: FontWeight.w700)),
              subtitle: const Text('Tambah, ubah, atau hapus kategori'),
              trailing: const Icon(Icons.arrow_forward_ios, size: 14),
              onTap: () => context.go('/admin/categories'),
            ),
          ),
        ],
      ),
    );
  }
}
