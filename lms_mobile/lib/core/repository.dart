import 'mock_database.dart';
import 'models.dart';

/// Kontrak repositori. UI hanya berbicara dengan antarmuka ini.
///
/// Saat backend siap, cukup buat `ApiRepository implements LmsRepository`
/// yang memanggil HTTP, lalu ganti provider-nya. Tidak ada perubahan di UI.
abstract class LmsRepository {
  Future<AppUser> login({required String email, required String password});
  Future<void> logout();
  AppUser? currentUser();

  Future<List<LearningMaterial>> getCatalog({int? categoryId, String? search, String sort});
  Future<LearningMaterial?> getMaterialBySlug(String slug);
  Future<List<LearningMaterial>> getMyMaterials();

  Future<Category> createCategory(String name);
  Future<Category> updateCategory(int id, String name);
  Future<void> deleteCategory(int id);
  Future<List<Category>> getCategories();

  Future<LearningMaterial> createMaterial({
    required int categoryId,
    required String title,
    required String content,
    String? coverImageUrl,
  });

  Future<LearningMaterial> updateMaterial({
    required String id,
    required int categoryId,
    required String title,
    required String content,
    String? coverImageUrl,
  });

  Future<void> deleteMaterial(String id);

  Future<CompletionResult> completeMaterial(String id);
  Future<RatingResult> rateMaterial(String id, int value);
  Future<List<Comment>> getComments(String materialId);
  Future<Comment> addComment(String materialId, String text);

  Future<List<LeaderboardEntry>> getLeaderboard();

  Future<AdminStats> getStats();
  Future<List<LearningMaterial>> getPendingMaterials();
  Future<LearningMaterial> moderateMaterial({required String id, required MaterialStatus status, String? reason});
}

/// Implementasi mock: semua operasi in-memory.
class MockRepository implements LmsRepository {
  MockRepository(this._db);
  final MockDatabase _db;

  AppUser? _session;
  int _nextCategoryId = 100;
  int _nextId = 100;

  static const _expPerLevel = 100;

  @override
  Future<AppUser> login({required String email, required String password}) async {
    await Future<void>.delayed(const Duration(milliseconds: 400));
    final isLearner = email == MockDatabase.demoLearnerEmail &&
        password == MockDatabase.demoLearnerPassword;
    final isAdmin =
        email == MockDatabase.demoAdminEmail && password == MockDatabase.demoAdminPassword;

    if (!isLearner && !isAdmin) {
      throw Exception('Email atau Password Salah');
    }
    _session = _db.users.firstWhere((u) => u.email == email);
    return _session!;
  }

  @override
  Future<void> logout() async {
    _session = null;
  }

  @override
  AppUser? currentUser() => _session;

  @override
  Future<List<LearningMaterial>> getCatalog({int? categoryId, String? search, String sort = 'latest'}) async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    var list = _db.materials
        .where((m) => m.status == MaterialStatus.approved)
        .toList();

    if (categoryId != null) {
      list = list.where((m) => m.category.id == categoryId).toList();
    }
    if (search != null && search.trim().isNotEmpty) {
      final q = search.toLowerCase();
      list = list
          .where((m) => m.title.toLowerCase().contains(q) || m.content.toLowerCase().contains(q))
          .toList();
    }
    if (sort == 'popular') {
      list.sort((a, b) => b.averageRating.compareTo(a.averageRating));
    } else {
      list.sort((a, b) => b.createdAt.compareTo(a.createdAt));
    }
    return list;
  }

  @override
  Future<LearningMaterial?> getMaterialBySlug(String slug) async {
    await Future<void>.delayed(const Duration(milliseconds: 250));
    for (final m in _db.materials) {
      if (m.slug == slug) return m;
    }
    return null;
  }

  @override
  Future<List<LearningMaterial>> getMyMaterials() async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    final uid = _session?.id ?? 'u1';
    return _db.materials.where((m) => m.author.id == uid).toList()
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt));
  }

  @override
  Future<List<Category>> getCategories() async {
    await Future<void>.delayed(const Duration(milliseconds: 200));
    return List.of(_db.categories);
  }

  @override
  Future<Category> createCategory(String name) async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    if (_db.categories.any((c) => c.name.toLowerCase() == name.toLowerCase())) {
      throw Exception('Kategori dengan nama tersebut sudah ada');
    }
    final cat = Category(id: _nextCategoryId++, name: name, slug: _slugify(name));
    _db.categories.add(cat);
    return cat;
  }

  @override
  Future<Category> updateCategory(int id, String name) async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    final idx = _db.categories.indexWhere((c) => c.id == id);
    if (idx == -1) throw Exception('Kategori tidak ditemukan');
    final updated = Category(id: id, name: name, slug: _slugify(name));
    _db.categories[idx] = updated;
    return updated;
  }

  @override
  Future<void> deleteCategory(int id) async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    final used = _db.materials.any((m) => m.category.id == id);
    if (used) throw Exception('Kategori tidak dapat dihapus karena masih digunakan oleh materi');
    _db.categories.removeWhere((c) => c.id == id);
  }

  @override
  Future<LearningMaterial> createMaterial({
    required int categoryId,
    required String title,
    required String content,
    String? coverImageUrl,
  }) async {
    await Future<void>.delayed(const Duration(milliseconds: 500));
    final cat = _db.categories.firstWhere((c) => c.id == categoryId);
    final material = LearningMaterial(
      id: 'm${_nextId++}',
      title: title,
      slug: '${_slugify(title)}-${DateTime.now().millisecondsSinceEpoch % 10000}',
      content: content,
      author: CategoryRef(id: _session?.id ?? 'u1', name: _session?.name ?? 'Kreator'),
      category: cat,
      status: MaterialStatus.pending,
      coverImageUrl: coverImageUrl,
      createdAt: DateTime.now(),
    );
    _db.materials.insert(0, material);
    return material;
  }

  @override
  Future<LearningMaterial> updateMaterial({
    required String id,
    required int categoryId,
    required String title,
    required String content,
    String? coverImageUrl,
  }) async {
    await Future<void>.delayed(const Duration(milliseconds: 500));
    final idx = _db.materials.indexWhere((m) => m.id == id);
    if (idx == -1) throw Exception('Materi tidak ditemukan');
    final existing = _db.materials[idx];
    final cat = _db.categories.firstWhere((c) => c.id == categoryId);
    final updated = LearningMaterial(
      id: existing.id,
      title: title,
      slug: '${_slugify(title)}-${DateTime.now().millisecondsSinceEpoch % 10000}',
      content: content,
      author: existing.author,
      category: cat,
      status: MaterialStatus.pending, // revisi -> kembali ke pending
      coverImageUrl: coverImageUrl,
      createdAt: existing.createdAt,
    );
    _db.materials[idx] = updated;
    return updated;
  }

  @override
  Future<void> deleteMaterial(String id) async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    _db.materials.removeWhere((m) => m.id == id);
  }

  @override
  Future<CompletionResult> completeMaterial(String id) async {
    await Future<void>.delayed(const Duration(milliseconds: 400));
    final uid = _session?.id ?? 'u1';
    final idx = _db.materials.indexWhere((m) => m.id == id);
    if (idx == -1) throw Exception('Materi tidak ditemukan');

    final material = _db.materials[idx];
    if (material.isCompleted) {
      throw Exception('Kamu sudah klaim EXP dari materi ini sebelumnya');
    }
    _db.materials[idx] = material.copyWith(isCompleted: true);

    const exp = 50;
    final uIdx = _db.users.indexWhere((u) => u.id == uid);
    if (uIdx != -1) {
      final u = _db.users[uIdx];
      final newExp = u.totalExp + exp;
      final newLevel = newExp ~/ _expPerLevel + 1;
      final isLevelUp = newLevel > u.level;
      _db.users[uIdx] = u.copyWith(totalExp: newExp, level: newLevel);
      _session = _db.users[uIdx];
      return CompletionResult(
        expGained: exp,
        currentTotalExp: newExp,
        currentLevel: newLevel,
        isLevelUp: isLevelUp,
      );
    }
    return const CompletionResult(expGained: exp, currentTotalExp: exp, currentLevel: 1, isLevelUp: false);
  }

  @override
  Future<RatingResult> rateMaterial(String id, int value) async {
    await Future<void>.delayed(const Duration(milliseconds: 400));
    final idx = _db.materials.indexWhere((m) => m.id == id);
    if (idx == -1) throw Exception('Materi tidak ditemukan');
    final material = _db.materials[idx];
    if (material.hasRated) {
      throw Exception('Kamu sudah memberikan rating untuk materi ini');
    }

    const points = 10;
    final newCount = material.ratingsCount + 1;
    final newAvg =
        ((material.averageRating * material.ratingsCount) + value) / newCount;

    _db.materials[idx] = material.copyWith(
      hasRated: true,
      ratingsCount: newCount,
      averageRating: newAvg,
    );

    final uid = _session?.id ?? 'u1';
    final uIdx = _db.users.indexWhere((u) => u.id == uid);
    var newPoints = points;
    if (uIdx != -1) {
      final u = _db.users[uIdx];
      newPoints = u.totalPoints + points;
      _db.users[uIdx] = u.copyWith(totalPoints: newPoints);
      _session = _db.users[uIdx];
    }

    return RatingResult(
      pointsGained: points,
      currentTotalPoints: newPoints,
      newAverageRating: newAvg,
    );
  }

  @override
  Future<List<Comment>> getComments(String materialId) async {
    await Future<void>.delayed(const Duration(milliseconds: 200));
    return List.of(_db.comments[materialId] ?? const []);
  }

  @override
  Future<Comment> addComment(String materialId, String text) async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    final comment = Comment(
      id: 'c${DateTime.now().millisecondsSinceEpoch}',
      text: text,
      author: CategoryRef(
        id: _session?.id ?? 'u1',
        name: _session?.name ?? 'Pengguna',
        level: _session?.level ?? 1,
      ),
      createdAt: DateTime.now(),
    );
    _db.comments.putIfAbsent(materialId, () => []).insert(0, comment);
    return comment;
  }

  @override
  Future<List<LeaderboardEntry>> getLeaderboard() async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    return List.of(_db.leaderboard);
  }

  @override
  Future<AdminStats> getStats() async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    return _db.stats();
  }

  @override
  Future<List<LearningMaterial>> getPendingMaterials() async {
    await Future<void>.delayed(const Duration(milliseconds: 300));
    return _db.materials.where((m) => m.status == MaterialStatus.pending).toList();
  }

  @override
  Future<LearningMaterial> moderateMaterial({
    required String id,
    required MaterialStatus status,
    String? reason,
  }) async {
    await Future<void>.delayed(const Duration(milliseconds: 400));
    final idx = _db.materials.indexWhere((m) => m.id == id);
    if (idx == -1) throw Exception('Materi tidak ditemukan');
    final updated = _db.materials[idx].copyWith(
      status: status,
      rejectionReason: status == MaterialStatus.rejected ? reason : null,
    );
    _db.materials[idx] = updated;
    return updated;
  }

  String _slugify(String text) => text
      .toLowerCase()
      .trim()
      .replaceAll(RegExp(r'\s+'), '-')
      .replaceAll(RegExp(r'[^\w\-]+'), '')
      .replaceAll(RegExp(r'\-+'), '-');
}
