import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/formatters.dart';
import '../../core/models.dart';
import '../../core/providers.dart';
import '../../core/theme.dart';
import '../../shared/widgets.dart';

/// Kelola materi milik sendiri: lihat status, edit, hapus, lihat alasan reject.
class MyMaterialsPage extends ConsumerWidget {
  const MyMaterialsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final myMaterials = ref.watch(myMaterialsProvider);

    return RefreshIndicator(
      onRefresh: () async => ref.invalidate(myMaterialsProvider),
      child: myMaterials.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Gagal memuat: $e')),
        data: (list) {
          if (list.isEmpty) {
            return ListView(
              children: [
                const SizedBox(height: 80),
                EmptyState(
                  icon: Icons.book_outlined,
                  title: 'Belum Ada Materi',
                  message: 'Kamu belum membuat materi pembelajaran apapun.',
                  action: FilledButton.icon(
                    onPressed: () => context.push('/dashboard/materi/create'),
                    icon: const Icon(Icons.add),
                    label: const Text('Buat Materi Pertama'),
                  ),
                ),
              ],
            );
          }
          return ListView.builder(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 96),
            itemCount: list.length,
            itemBuilder: (context, i) => _MyMaterialTile(material: list[i]),
          );
        },
      ),
    );
  }
}

class _MyMaterialTile extends ConsumerWidget {
  const _MyMaterialTile({required this.material});
  final LearningMaterial material;

  Future<void> _confirmDelete(BuildContext context, WidgetRef ref) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Hapus Materi'),
        content: Text('Yakin ingin menghapus "${material.title}"? Tindakan ini tidak dapat dibatalkan.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Batal')),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: AppColors.rose),
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Hapus'),
          ),
        ],
      ),
    );
    if (ok == true) {
      await ref.read(repositoryProvider).deleteMaterial(material.id);
      ref.invalidate(myMaterialsProvider);
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Materi "${material.title}" dihapus'), behavior: SnackBarBehavior.floating),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final muted = Theme.of(context).textTheme.bodySmall?.color;
    return Card(
      margin: const EdgeInsets.only(bottom: 14),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(material.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                ),
                const SizedBox(width: 8),
                StatusBadge(material.status),
              ],
            ),
            const SizedBox(height: 6),
            Text('${material.category.name} • ${Formatters.short(material.createdAt)}',
                style: TextStyle(fontSize: 12, color: muted)),
            if (material.status == MaterialStatus.rejected && material.rejectionReason != null) ...[
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: AppColors.rose.withValues(alpha: 0.08),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppColors.rose.withValues(alpha: 0.25)),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.info_outline, size: 16, color: AppColors.rose),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(material.rejectionReason!,
                          style: const TextStyle(fontSize: 12, color: AppColors.rose)),
                    ),
                  ],
                ),
              ),
            ],
            const Divider(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton.icon(
                  onPressed: () => context.push('/dashboard/materi/${material.slug}'),
                  icon: const Icon(Icons.visibility_outlined, size: 17),
                  label: const Text('Lihat'),
                ),
                TextButton.icon(
                  onPressed: () => context.push('/dashboard/materi/edit/${material.id}'),
                  icon: const Icon(Icons.edit_outlined, size: 17),
                  label: const Text('Edit'),
                ),
                IconButton(
                  onPressed: () => _confirmDelete(context, ref),
                  icon: const Icon(Icons.delete_outline, color: AppColors.rose, size: 20),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
