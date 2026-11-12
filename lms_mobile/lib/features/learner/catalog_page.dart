import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/models.dart';
import '../../core/providers.dart';
import '../../core/theme.dart';
import '../../shared/widgets.dart';

/// Katalog materi: pencarian + filter kategori + urutkan.
class CatalogPage extends ConsumerStatefulWidget {
  const CatalogPage({super.key});

  @override
  ConsumerState<CatalogPage> createState() => _CatalogPageState();
}

class _CatalogPageState extends ConsumerState<CatalogPage> {
  final _search = TextEditingController();
  int? _categoryId;
  String _sort = 'latest';

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final catalog = ref.watch(catalogProvider);
    final categories = ref.watch(categoriesProvider);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Column(
            children: [
              TextField(
                controller: _search,
                onChanged: (_) => setState(() {}),
                decoration: const InputDecoration(
                  hintText: 'Cari materi pembelajaran...',
                  prefixIcon: Icon(Icons.search),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: categories.when(
                      loading: () => const SizedBox(height: 44),
                      error: (_, _) => const SizedBox.shrink(),
                      data: (cats) => DropdownButtonFormField<int?>(
                        initialValue: _categoryId,
                        isExpanded: true,
                        decoration: const InputDecoration(
                          isDense: true,
                          contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                        ),
                        hint: const Text('Semua Kategori', style: TextStyle(fontSize: 13)),
                        items: [
                          const DropdownMenuItem(value: null, child: Text('Semua Kategori', style: TextStyle(fontSize: 13))),
                          ...cats.map((c) => DropdownMenuItem(
                                value: c.id,
                                child: Text(c.name,
                                    style: const TextStyle(fontSize: 13),
                                    overflow: TextOverflow.ellipsis),
                              )),
                        ],
                        onChanged: (v) => setState(() => _categoryId = v),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  DropdownButton<String>(
                    value: _sort,
                    underline: const SizedBox.shrink(),
                    items: const [
                      DropdownMenuItem(value: 'latest', child: Text('Terbaru', style: TextStyle(fontSize: 13))),
                      DropdownMenuItem(value: 'popular', child: Text('Terpopuler', style: TextStyle(fontSize: 13))),
                    ],
                    onChanged: (v) => setState(() => _sort = v ?? 'latest'),
                  ),
                ],
              ),
            ],
          ),
        ),
        Expanded(
          child: catalog.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, _) => Center(child: Text('Gagal memuat katalog: $e')),
            data: (all) {
              final q = _search.text.toLowerCase().trim();
              var list = all;
              if (_categoryId != null) {
                list = list.where((m) => m.category.id == _categoryId).toList();
              }
              if (q.isNotEmpty) {
                list = list
                    .where((m) =>
                        m.title.toLowerCase().contains(q) || m.content.toLowerCase().contains(q))
                    .toList();
              }
              if (list.isEmpty) {
                return const EmptyState(
                  icon: Icons.search_off,
                  title: 'Materi Tidak Ditemukan',
                  message: 'Coba ubah kata kunci atau filter kategori.',
                );
              }
              return ListView.builder(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
                itemCount: list.length,
                itemBuilder: (context, i) => _MaterialCard(material: list[i]),
              );
            },
          ),
        ),
      ],
    );
  }
}

class _MaterialCard extends StatelessWidget {
  const _MaterialCard({required this.material});
  final LearningMaterial material;

  @override
  Widget build(BuildContext context) {
    final muted = Theme.of(context).textTheme.bodySmall?.color;
    return Card(
      margin: const EdgeInsets.only(bottom: 14),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => context.push('/dashboard/materi/${material.slug}'),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (material.coverImageUrl != null)
              Image.network(
                material.coverImageUrl!,
                height: 150,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (_, _, _) => Container(
                  height: 150,
                  color: AppColors.slate800,
                  child: const Icon(Icons.image_not_supported, color: Colors.white38),
                ),
              ),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(material.category.name,
                        style: const TextStyle(
                            fontSize: 10, color: AppColors.primary, fontWeight: FontWeight.w700)),
                  ),
                  const SizedBox(height: 8),
                  Text(material.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      const Icon(Icons.person_outline, size: 14),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(material.author.name,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(fontSize: 12, color: muted)),
                      ),
                      const Icon(Icons.star_rounded, size: 15, color: AppColors.amber),
                      const SizedBox(width: 2),
                      Text(material.averageRating.toStringAsFixed(1),
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700)),
                      Text(' (${material.ratingsCount})',
                          style: TextStyle(fontSize: 11, color: muted)),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
