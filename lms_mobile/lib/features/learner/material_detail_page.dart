import 'package:confetti/confetti.dart';
import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/formatters.dart';
import '../../core/models.dart';
import '../../core/providers.dart';
import '../../core/theme.dart';
import '../../shared/widgets.dart';

/// Reader + interaksi materi: konten markdown, klaim EXP, rating, komentar.
class MaterialDetailPage extends ConsumerStatefulWidget {
  const MaterialDetailPage({super.key, required this.slug});
  final String slug;

  @override
  ConsumerState<MaterialDetailPage> createState() => _MaterialDetailPageState();
}

class _MaterialDetailPageState extends ConsumerState<MaterialDetailPage> {
  late final ConfettiController _confetti =
      ConfettiController(duration: const Duration(seconds: 2));

  @override
  void dispose() {
    _confetti.dispose();
    super.dispose();
  }

  void _snack(String msg, {Color? color}) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(SnackBar(
        content: Text(msg),
        backgroundColor: color,
        behavior: SnackBarBehavior.floating,
      ));
  }

  Future<void> _complete(LearningMaterial m) async {
    try {
      final res = await ref.read(repositoryProvider).completeMaterial(m.id);
      ref.read(authProvider.notifier).refresh();
      ref.invalidate(materialDetailProvider(widget.slug));
      if (!mounted) return;
      _confetti.play();
      _snack('Selamat! Kamu mendapatkan +${res.expGained} EXP 🎉', color: AppColors.emerald);
      if (res.isLevelUp) {
        _showLevelUpDialog(res.currentLevel);
      }
    } catch (e) {
      _snack(e.toString().replaceFirst('Exception: ', ''), color: AppColors.rose);
    }
  }

  Future<void> _rate(LearningMaterial m, int value) async {
    try {
      final res = await ref.read(repositoryProvider).rateMaterial(m.id, value);
      ref.read(authProvider.notifier).refresh();
      ref.invalidate(materialDetailProvider(widget.slug));
      _snack('Rating terkirim! +${res.pointsGained} Poin ⭐', color: AppColors.emerald);
    } catch (e) {
      _snack(e.toString().replaceFirst('Exception: ', ''), color: AppColors.rose);
    }
  }

  void _showLevelUpDialog(int level) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        icon: const Icon(Icons.celebration, color: AppColors.amber, size: 40),
        title: const Text('LEVEL UP! 🎉', textAlign: TextAlign.center),
        content: Text('Kamu sekarang berada di Level $level.',
            textAlign: TextAlign.center),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Lanjut'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final detail = ref.watch(materialDetailProvider(widget.slug));

    return Scaffold(
      appBar: AppBar(title: const Text('Detail Materi')),
      body: Stack(
        children: [
          detail.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, _) => Center(child: Text('Gagal memuat: $e')),
            data: (material) {
              if (material == null) {
                return const EmptyState(
                  icon: Icons.search_off,
                  title: 'Materi Tidak Ditemukan',
                  message: 'Materi yang kamu cari tidak tersedia.',
                );
              }
              return _buildBody(material);
            },
          ),
          Align(
            alignment: Alignment.topCenter,
            child: ConfettiWidget(
              confettiController: _confetti,
              blastDirectionality: BlastDirectionality.explosive,
              numberOfParticles: 30,
              colors: const [AppColors.primary, AppColors.amber, AppColors.emerald],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBody(LearningMaterial m) {
    final muted = Theme.of(context).textTheme.bodySmall?.color;
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (m.coverImageUrl != null)
          ClipRRect(
            borderRadius: BorderRadius.circular(14),
            child: Image.network(
              m.coverImageUrl!,
              height: 190,
              width: double.infinity,
              fit: BoxFit.cover,
              errorBuilder: (_, _, _) => const SizedBox.shrink(),
            ),
          ),
        const SizedBox(height: 16),
        Text(m.title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
        const SizedBox(height: 12),
        Wrap(
          spacing: 14,
          runSpacing: 6,
          children: [
            _meta(Icons.person_outline, m.author.name),
            _meta(Icons.folder_outlined, m.category.name),
            _meta(Icons.calendar_today_outlined, Formatters.long(m.createdAt)),
          ],
        ),
        const SizedBox(height: 14),
        Row(
          children: [
            StarRating(value: m.averageRating),
            const SizedBox(width: 8),
            Text('${m.averageRating.toStringAsFixed(1)} (${m.ratingsCount} rating)',
                style: TextStyle(fontSize: 12, color: muted)),
          ],
        ),
        const Divider(height: 32),
        MarkdownBody(
          data: m.content,
          styleSheet: MarkdownStyleSheet.fromTheme(Theme.of(context)).copyWith(
            p: TextStyle(fontSize: 15, height: 1.6, color: isDark ? AppColors.slate200 : AppColors.slate700),
            code: TextStyle(
              backgroundColor: isDark ? AppColors.slate800 : AppColors.slate100,
              fontFamily: 'monospace',
              fontSize: 13,
            ),
            codeblockDecoration: BoxDecoration(
              color: isDark ? AppColors.slate800 : AppColors.slate100,
              borderRadius: BorderRadius.circular(10),
            ),
          ),
        ),
        const Divider(height: 40),

        // --- Gamifikasi: klaim EXP ---
        Row(
          children: [
            const StatChip(icon: Icons.bolt, label: '+50 EXP', color: AppColors.amber),
            const SizedBox(width: 8),
            const StatChip(icon: Icons.workspace_premium, label: '+10 Poin', color: AppColors.emerald),
          ],
        ),
        const SizedBox(height: 14),
        SizedBox(
          height: 50,
          child: FilledButton.icon(
            onPressed: m.isCompleted ? null : () => _complete(m),
            icon: Icon(m.isCompleted ? Icons.check_circle : Icons.check_circle_outline),
            label: Text(m.isCompleted ? 'Materi Selesai' : 'Tandai Selesai & Klaim EXP'),
            style: FilledButton.styleFrom(
              backgroundColor: m.isCompleted ? AppColors.emerald : AppColors.primary,
            ),
          ),
        ),
        const SizedBox(height: 28),

        // --- Rating ---
        const Text('Beri Rating', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
        const SizedBox(height: 6),
        if (m.hasRated)
          Row(children: [
            const Icon(Icons.check_circle, color: AppColors.emerald, size: 18),
            const SizedBox(width: 8),
            Text('Kamu sudah memberi rating untuk materi ini.',
                style: TextStyle(fontSize: 13, color: muted)),
          ])
        else
          StarRating(value: 0, size: 34, onChanged: (v) => _rate(m, v)),
        const SizedBox(height: 28),

        // --- Komentar ---
        const Text('Komentar', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
        const SizedBox(height: 12),
        _CommentsSection(materialId: m.id),
      ],
    );
  }

  Widget _meta(IconData icon, String text) => Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: AppColors.primary),
          const SizedBox(width: 5),
          Text(text,
              style: TextStyle(
                  fontSize: 12, color: Theme.of(context).textTheme.bodySmall?.color)),
        ],
      );
}

class _CommentsSection extends ConsumerStatefulWidget {
  const _CommentsSection({required this.materialId});
  final String materialId;

  @override
  ConsumerState<_CommentsSection> createState() => _CommentsSectionState();
}

class _CommentsSectionState extends ConsumerState<_CommentsSection> {
  final _controller = TextEditingController();
  bool _sending = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    setState(() => _sending = true);
    try {
      await ref.read(repositoryProvider).addComment(widget.materialId, text);
      _controller.clear();
      ref.invalidate(commentsProvider(widget.materialId));
    } finally {
      if (mounted) setState(() => _sending = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final comments = ref.watch(commentsProvider(widget.materialId));
    final muted = Theme.of(context).textTheme.bodySmall?.color;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: TextField(
                controller: _controller,
                maxLines: 3,
                minLines: 1,
                decoration: const InputDecoration(hintText: 'Tulis komentar...'),
              ),
            ),
            const SizedBox(width: 8),
            IconButton.filled(
              onPressed: _sending ? null : _send,
              icon: _sending
                  ? const SizedBox(
                      width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                  : const Icon(Icons.send),
            ),
          ],
        ),
        const SizedBox(height: 16),
        comments.when(
          loading: () => const Padding(
            padding: EdgeInsets.all(16),
            child: Center(child: CircularProgressIndicator()),
          ),
          error: (e, _) => Text('Gagal memuat komentar: $e'),
          data: (list) {
            if (list.isEmpty) {
              return Text('Belum ada komentar. Jadilah yang pertama!',
                  style: TextStyle(fontSize: 13, color: muted));
            }
            return Column(
              children: list
                  .map((c) => Container(
                        margin: const EdgeInsets.only(bottom: 10),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Theme.of(context).dividerColor),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(c.author.name,
                                    style: const TextStyle(
                                        fontSize: 13, fontWeight: FontWeight.w700)),
                                const SizedBox(width: 6),
                                Text('• Lv ${c.author.level}',
                                    style: TextStyle(fontSize: 11, color: muted)),
                                const Spacer(),
                                Text(Formatters.relative(c.createdAt),
                                    style: TextStyle(fontSize: 11, color: muted)),
                              ],
                            ),
                            const SizedBox(height: 6),
                            Text(c.text, style: const TextStyle(fontSize: 13)),
                          ],
                        ),
                      ))
                  .toList(),
            );
          },
        ),
      ],
    );
  }
}
