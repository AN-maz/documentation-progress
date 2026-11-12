import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/formatters.dart';
import '../../core/providers.dart';
import '../../core/theme.dart';
import '../../shared/widgets.dart';

/// Dashboard learner/creator: ringkasan gamifikasi + materi yang dibuat.
class CreatorDashboardPage extends ConsumerWidget {
  const CreatorDashboardPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;
    final myMaterials = ref.watch(myMaterialsProvider);

    return RefreshIndicator(
      onRefresh: () async {
        ref.invalidate(myMaterialsProvider);
      },
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 96),
        children: [
          Text('Selamat datang, ${user?.name ?? 'Kreator'} 👋',
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text('Pantau progres gamifikasi dan kelola materi buatanmu.',
              style: Theme.of(context).textTheme.bodySmall),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: SummaryCard(
                  icon: Icons.military_tech,
                  title: 'Level',
                  value: '${user?.level ?? 1}',
                  color: AppColors.amber,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: SummaryCard(
                  icon: Icons.bolt,
                  title: 'EXP',
                  value: '${user?.totalExp ?? 0}',
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          SummaryCard(
            icon: Icons.workspace_premium,
            title: 'Poin Saya',
            value: '${user?.totalPoints ?? 0} PTS',
            color: AppColors.emerald,
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              const Expanded(
                child: Text('Materi yang Saya Buat',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
              ),
              TextButton.icon(
                onPressed: () => context.push('/dashboard/materi/create'),
                icon: const Icon(Icons.add, size: 18),
                label: const Text('Buat'),
              ),
            ],
          ),
          const SizedBox(height: 4),
          myMaterials.when(
            loading: () => const Padding(
              padding: EdgeInsets.symmetric(vertical: 40),
              child: Center(child: CircularProgressIndicator()),
            ),
            error: (e, _) => Text('Gagal memuat: $e'),
            data: (list) {
              if (list.isEmpty) {
                return const Padding(
                  padding: EdgeInsets.symmetric(vertical: 32),
                  child: EmptyState(
                    icon: Icons.book_outlined,
                    title: 'Belum Ada Materi',
                    message: 'Mulai bagikan pengetahuanmu dengan membuat materi pertama.',
                  ),
                );
              }
              return Column(
                children: list
                    .take(5)
                    .map((m) => Card(
                          margin: const EdgeInsets.only(bottom: 10),
                          child: ListTile(
                            contentPadding:
                                const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                            title: Text(m.title,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontWeight: FontWeight.w700)),
                            subtitle: Padding(
                              padding: const EdgeInsets.only(top: 6),
                              child: Row(
                                children: [
                                  StatusBadge(m.status),
                                  const SizedBox(width: 8),
                                  Text(Formatters.short(m.createdAt),
                                      style: const TextStyle(fontSize: 11)),
                                ],
                              ),
                            ),
                          ),
                        ))
                    .toList(),
              );
            },
          ),
        ],
      ),
    );
  }
}
