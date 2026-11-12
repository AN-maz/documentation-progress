import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'mock_database.dart';
import 'models.dart';
import 'repository.dart';

/// Titik tunggal untuk mengganti sumber data.
/// Sekarang: MockRepository. Nanti: ApiRepository.
final repositoryProvider = Provider<LmsRepository>((ref) {
  return MockRepository(MockDatabase.instance);
});

/// State sesi pengguna yang sedang login.
class AuthState {
  const AuthState({this.user, this.loading = false, this.error});
  final AppUser? user;
  final bool loading;
  final String? error;

  bool get isAuthenticated => user != null;

  AuthState copyWith({AppUser? user, bool? loading, String? error, bool clearError = false}) =>
      AuthState(
        user: user ?? this.user,
        loading: loading ?? this.loading,
        error: clearError ? null : (error ?? this.error),
      );
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier(this._repo) : super(const AuthState());
  final LmsRepository _repo;

  Future<bool> login(String email, String password) async {
    state = state.copyWith(loading: true, clearError: true);
    try {
      final user = await _repo.login(email: email, password: password);
      state = AuthState(user: user);
      return true;
    } catch (e) {
      state = AuthState(error: e.toString().replaceFirst('Exception: ', ''));
      return false;
    }
  }

  Future<void> logout() async {
    await _repo.logout();
    state = const AuthState();
  }

  void updateUser(AppUser user) => state = state.copyWith(user: user);

  void refresh() {
    final u = _repo.currentUser();
    if (u != null) state = state.copyWith(user: u);
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(ref.watch(repositoryProvider));
});

/// Katalog materi (dengan filter kategori & pencarian).
final catalogProvider = FutureProvider.autoDispose<List<LearningMaterial>>((ref) async {
  final repo = ref.watch(repositoryProvider);
  return repo.getCatalog();
});

/// Daftar kategori.
final categoriesProvider = FutureProvider.autoDispose<List<Category>>((ref) async {
  return ref.watch(repositoryProvider).getCategories();
});

/// Materi milik pengguna saat ini.
final myMaterialsProvider = FutureProvider.autoDispose<List<LearningMaterial>>((ref) async {
  return ref.watch(repositoryProvider).getMyMaterials();
});

/// Antrean moderasi (admin).
final pendingMaterialsProvider = FutureProvider.autoDispose<List<LearningMaterial>>((ref) async {
  return ref.watch(repositoryProvider).getPendingMaterials();
});

/// Statistik dashboard admin.
final adminStatsProvider = FutureProvider.autoDispose<AdminStats>((ref) async {
  return ref.watch(repositoryProvider).getStats();
});

/// Papan peringkat.
final leaderboardProvider = FutureProvider.autoDispose<List<LeaderboardEntry>>((ref) async {
  return ref.watch(repositoryProvider).getLeaderboard();
});

/// Detail materi berdasarkan slug (family).
final materialDetailProvider =
    FutureProvider.autoDispose.family<LearningMaterial?, String>((ref, slug) async {
  return ref.watch(repositoryProvider).getMaterialBySlug(slug);
});

/// Komentar per materi.
final commentsProvider =
    FutureProvider.autoDispose.family<List<Comment>, String>((ref, materialId) async {
  return ref.watch(repositoryProvider).getComments(materialId);
});
