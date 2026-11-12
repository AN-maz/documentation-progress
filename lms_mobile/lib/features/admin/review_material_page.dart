import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/models.dart';
import '../../core/providers.dart';
import '../../core/theme.dart';

/// Review detail materi: preview markdown + aksi Approve / Reject.
class ReviewMaterialPage extends ConsumerStatefulWidget {
  const ReviewMaterialPage({super.key, required this.materialId});
  final String materialId;

  @override
  ConsumerState<ReviewMaterialPage> createState() => _ReviewMaterialPageState();
}

class _ReviewMaterialPageState extends ConsumerState<ReviewMaterialPage> {
  bool _processing = false;

  Future<void> _moderate(MaterialStatus status, {String? reason}) async {
    setState(() => _processing = true);
    try {
      await ref.read(repositoryProvider).moderateMaterial(
            id: widget.materialId,
            status: status,
            reason: reason,
          );
      ref.invalidate(pendingMaterialsProvider);
      ref.invalidate(adminStatsProvider);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(status == MaterialStatus.approved
            ? 'Materi berhasil disetujui & dipublikasikan'
            : 'Materi ditolak'),
        backgroundColor:
            status == MaterialStatus.approved ? AppColors.emerald : AppColors.rose,
        behavior: SnackBarBehavior.floating,
      ));
      context.go('/admin/moderation');
    } finally {
      if (mounted) setState(() => _processing = false);
    }
  }

  Future<void> _openRejectDialog() async {
    final controller = TextEditingController();
    final reason = await showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Row(
          children: [
            Icon(Icons.error_outline, color: AppColors.rose),
            SizedBox(width: 8),
            Text('Tolak Materi'),
          ],
        ),
        content: TextField(
          controller: controller,
          maxLines: 4,
          autofocus: true,
          decoration: const InputDecoration(
            hintText: 'Berikan alasan penolakan yang jelas...',
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Batal')),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: AppColors.rose),
            onPressed: () {
              if (controller.text.trim().isEmpty) return;
              Navigator.pop(ctx, controller.text.trim());
            },
            child: const Text('Kirim Penolakan'),
          ),
        ],
      ),
    );
    if (reason != null) {
      await _moderate(MaterialStatus.rejected, reason: reason);
    }
  }

  @override
  Widget build(BuildContext context) {
    final pending = ref.watch(pendingMaterialsProvider);
    final muted = Theme.of(context).textTheme.bodySmall?.color;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Review Materi'),
        actions: [
          if (!_processing) ...[
            IconButton(
              tooltip: 'Tolak',
              icon: const Icon(Icons.close, color: AppColors.rose),
              onPressed: _openRejectDialog,
            ),
            IconButton(
              tooltip: 'Setujui',
              icon: const Icon(Icons.check, color: AppColors.emerald),
              onPressed: () => _moderate(MaterialStatus.approved),
            ),
          ] else
            const Padding(
              padding: EdgeInsets.all(16),
              child: SizedBox(
                  width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)),
            ),
        ],
      ),
      body: pending.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Gagal memuat: $e')),
        data: (list) {
          final m = list.where((e) => e.id == widget.materialId).firstOrNull;
          if (m == null) {
            return const Center(child: Text('Materi tidak ditemukan di antrean.'));
          }
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              if (m.coverImageUrl != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(14),
                  child: Image.network(
                    m.coverImageUrl!,
                    height: 200,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (_, _, _) => const SizedBox.shrink(),
                  ),
                ),
              const SizedBox(height: 16),
              Wrap(
                spacing: 12,
                runSpacing: 6,
                children: [
                  _chip(Icons.folder_outlined, m.category.name, AppColors.primary),
                  _chip(Icons.person_outline, m.author.name, AppColors.slate600),
                ],
              ),
              const SizedBox(height: 14),
              Text(m.title, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
              const Divider(height: 32),
              MarkdownBody(
                data: m.content,
                styleSheet: MarkdownStyleSheet.fromTheme(Theme.of(context)),
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _processing ? null : _openRejectDialog,
                      icon: const Icon(Icons.close, color: AppColors.rose),
                      label: const Text('Tolak', style: TextStyle(color: AppColors.rose)),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: FilledButton.icon(
                      onPressed: _processing ? null : () => _moderate(MaterialStatus.approved),
                      icon: const Icon(Icons.check),
                      label: const Text('Setujui'),
                      style: FilledButton.styleFrom(backgroundColor: AppColors.emerald),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text('Tanggal pengajuan: ${m.createdAt}',
                  style: TextStyle(fontSize: 11, color: muted)),
            ],
          );
        },
      ),
    );
  }

  Widget _chip(IconData icon, String text, Color color) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 13, color: color),
            const SizedBox(width: 5),
            Text(text, style: TextStyle(fontSize: 12, color: color, fontWeight: FontWeight.w600)),
          ],
        ),
      );
}
