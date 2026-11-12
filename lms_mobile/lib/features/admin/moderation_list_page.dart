import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/formatters.dart';
import '../../core/providers.dart';
import '../../core/theme.dart';
import '../../shared/widgets.dart';

/// Antrean moderasi: daftar materi pending + pencarian.
class ModerationListPage extends ConsumerStatefulWidget {
  const ModerationListPage({super.key});

  @override
  ConsumerState<ModerationListPage> createState() => _ModerationListPageState();
}

class _ModerationListPageState extends ConsumerState<ModerationListPage> {
  final _search = TextEditingController();

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final pending = ref.watch(pendingMaterialsProvider);
    final muted = Theme.of(context).textTheme.bodySmall?.color;

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: TextField(
            controller: _search,
            onChanged: (_) => setState(() {}),
            decoration: const InputDecoration(
              hintText: 'Cari judul atau kreator...',
              prefixIcon: Icon(Icons.search),
            ),
          ),
        ),
        Expanded(
          child: pending.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, _) => Center(child: Text('Gagal memuat: $e')),
            data: (list) {
              final q = _search.text.toLowerCase().trim();
              final filtered = q.isEmpty
                  ? list
                  : list
                      .where((m) =>
                          m.title.toLowerCase().contains(q) ||
                          m.author.name.toLowerCase().contains(q))
                      .toList();

              if (filtered.isEmpty) {
                return RefreshIndicator(
                  onRefresh: () async => ref.invalidate(pendingMaterialsProvider),
                  child: ListView(
                    children: const [
                      SizedBox(height: 60),
                      EmptyState(
                        icon: Icons.inbox_outlined,
                        title: 'Tidak Ada Antrean',
                        message: 'Semua pengajuan materi telah diproses.',
                      ),
                    ],
                  ),
                );
              }
              return RefreshIndicator(
                onRefresh: () async => ref.invalidate(pendingMaterialsProvider),
                child: ListView.builder(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
                  itemCount: filtered.length,
                  itemBuilder: (context, i) {
                    final m = filtered[i];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(16),
                        onTap: () => context.push('/admin/moderation/${m.id}'),
                        child: Padding(
                          padding: const EdgeInsets.all(14),
                          child: Row(
                            children: [
                              if (m.coverImageUrl != null)
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: Image.network(
                                    m.coverImageUrl!,
                                    width: 54,
                                    height: 54,
                                    fit: BoxFit.cover,
                                    errorBuilder: (_, _, _) => Container(
                                      width: 54,
                                      height: 54,
                                      color: AppColors.slate800,
                                      child: const Icon(Icons.image_not_supported,
                                          color: Colors.white38, size: 18),
                                    ),
                                  ),
                                )
                              else
                                Container(
                                  width: 54,
                                  height: 54,
                                  decoration: BoxDecoration(
                                    color: AppColors.primary.withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: const Icon(Icons.description_outlined,
                                      color: AppColors.primary),
                                ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(m.title,
                                        maxLines: 2,
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(
                                            fontWeight: FontWeight.w700, fontSize: 14)),
                                    const SizedBox(height: 6),
                                    Text('${m.author.name} • ${m.category.name}',
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(fontSize: 12, color: muted)),
                                    const SizedBox(height: 4),
                                    Text(Formatters.short(m.createdAt),
                                        style: TextStyle(fontSize: 11, color: muted)),
                                  ],
                                ),
                              ),
                              const Icon(Icons.arrow_forward_ios, size: 13, color: AppColors.slate400),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
