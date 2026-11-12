import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/providers.dart';
import '../../core/theme.dart';

/// Editor materi (dipakai untuk Buat & Edit).
///
/// Meniru pola web: form judul + kategori + cover + konten markdown dengan
/// tab Tulis / Preview.
class MaterialEditorPage extends ConsumerStatefulWidget {
  const MaterialEditorPage({super.key, this.materialId});

  /// Null = mode buat. Non-null = mode edit.
  final String? materialId;

  bool get isEdit => materialId != null;

  @override
  ConsumerState<MaterialEditorPage> createState() => _MaterialEditorPageState();
}

class _MaterialEditorPageState extends ConsumerState<MaterialEditorPage> {
  final _formKey = GlobalKey<FormState>();
  final _title = TextEditingController();
  final _cover = TextEditingController();
  final _content = TextEditingController();

  int? _categoryId;
  bool _preview = false;
  bool _submitting = false;
  bool _initialized = false;

  @override
  void dispose() {
    _title.dispose();
    _cover.dispose();
    _content.dispose();
    super.dispose();
  }

  Future<void> _loadForEdit() async {
    if (!widget.isEdit || _initialized) return;
    final list = await ref.read(repositoryProvider).getMyMaterials();
    final m = list.firstWhere((e) => e.id == widget.materialId,
        orElse: () => list.first);
    if (!mounted) return;
    setState(() {
      _title.text = m.title;
      _cover.text = m.coverImageUrl ?? '';
      _content.text = m.content;
      _categoryId = m.category.id;
      _initialized = true;
    });
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate() || _categoryId == null) {
      if (_categoryId == null) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('Pilih kategori terlebih dahulu'),
          behavior: SnackBarBehavior.floating,
        ));
      }
      return;
    }
    setState(() => _submitting = true);
    try {
      final repo = ref.read(repositoryProvider);
      if (widget.isEdit) {
        await repo.updateMaterial(
          id: widget.materialId!,
          categoryId: _categoryId!,
          title: _title.text.trim(),
          content: _content.text,
          coverImageUrl: _cover.text.trim().isEmpty ? null : _cover.text.trim(),
        );
      } else {
        await repo.createMaterial(
          categoryId: _categoryId!,
          title: _title.text.trim(),
          content: _content.text,
          coverImageUrl: _cover.text.trim().isEmpty ? null : _cover.text.trim(),
        );
      }
      ref.invalidate(myMaterialsProvider);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(widget.isEdit
            ? 'Materi diperbarui & dikirim ulang untuk peninjauan admin'
            : 'Materi berhasil diajukan! Menunggu peninjauan admin'),
        backgroundColor: AppColors.emerald,
        behavior: SnackBarBehavior.floating,
      ));
      context.go('/dashboard/my-materials');
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(e.toString().replaceFirst('Exception: ', '')),
          backgroundColor: AppColors.rose,
          behavior: SnackBarBehavior.floating,
        ));
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    _loadForEdit();
    final categories = ref.watch(categoriesProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.isEdit ? 'Edit Materi' : 'Buat Materi Baru'),
        actions: [
          IconButton(
            tooltip: _preview ? 'Tulis' : 'Preview',
            icon: Icon(_preview ? Icons.edit_outlined : Icons.visibility_outlined),
            onPressed: () => setState(() => _preview = !_preview),
          ),
        ],
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
          children: [
            TextFormField(
              controller: _title,
              decoration: const InputDecoration(
                labelText: 'Judul Materi *',
                hintText: 'Contoh: Panduan Lengkap RESTful API',
              ),
              validator: (v) =>
                  (v == null || v.trim().isEmpty) ? 'Judul wajib diisi' : null,
            ),
            const SizedBox(height: 16),
            categories.when(
              loading: () => const LinearProgressIndicator(),
              error: (_, _) => const Text('Gagal memuat kategori'),
              data: (cats) => DropdownButtonFormField<int>(
                initialValue: _categoryId,
                isExpanded: true,
                decoration: const InputDecoration(labelText: 'Kategori *'),
                hint: const Text('-- Pilih Kategori --'),
                items: cats
                    .map((c) => DropdownMenuItem(
                          value: c.id,
                          child: Text(c.name, overflow: TextOverflow.ellipsis),
                        ))
                    .toList(),
                onChanged: (v) => setState(() => _categoryId = v),
              ),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _cover,
              decoration: const InputDecoration(
                labelText: 'URL Gambar Sampul (opsional)',
                hintText: 'https://example.com/image.png',
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                const Expanded(
                  child: Text('Konten Materi (Markdown) *',
                      style: TextStyle(fontWeight: FontWeight.w700)),
                ),
                if (_preview)
                  const Text('Preview', style: TextStyle(fontSize: 12, color: AppColors.primary)),
              ],
            ),
            const SizedBox(height: 10),
            if (_preview)
              Container(
                constraints: const BoxConstraints(minHeight: 300),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.slate900 : Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Theme.of(context).dividerColor),
                ),
                child: _content.text.isEmpty
                    ? Text('Belum ada konten untuk dipratinjau.',
                        style: Theme.of(context).textTheme.bodySmall)
                    : MarkdownBody(data: _content.text),
              )
            else
              TextFormField(
                controller: _content,
                maxLines: 14,
                minLines: 8,
                style: const TextStyle(fontFamily: 'monospace', fontSize: 13),
                decoration: const InputDecoration(
                  hintText: 'Tulis materi dalam format Markdown...\n\n# Judul\n## Sub-judul\n```code```',
                ),
                validator: (v) =>
                    (v == null || v.trim().isEmpty) ? 'Konten wajib diisi' : null,
              ),
            const SizedBox(height: 24),
            SizedBox(
              height: 50,
              child: FilledButton.icon(
                onPressed: _submitting ? null : _submit,
                icon: _submitting
                    ? const SizedBox(
                        width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                    : const Icon(Icons.send),
                label: Text(widget.isEdit ? 'Simpan & Ajukan Ulang' : 'Ajukan Materi'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
