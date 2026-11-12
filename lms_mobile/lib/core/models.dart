/// Model domain aplikasi LMS.
///
/// Semua model punya `fromJson` supaya saat backend sudah siap, cukup
/// mengganti sumber data (mock -> API) tanpa mengubah UI.
library;

enum UserRole {
  learner,
  admin;

  static UserRole fromString(String value) =>
      value == 'admin' ? UserRole.admin : UserRole.learner;
}

enum MaterialStatus {
  pending,
  approved,
  rejected;

  static MaterialStatus fromString(String value) {
    switch (value) {
      case 'approved':
        return MaterialStatus.approved;
      case 'rejected':
        return MaterialStatus.rejected;
      default:
        return MaterialStatus.pending;
    }
  }

  String get label => switch (this) {
        MaterialStatus.pending => 'Pending Review',
        MaterialStatus.approved => 'Approved',
        MaterialStatus.rejected => 'Rejected',
      };
}

class AppUser {
  const AppUser({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.level = 1,
    this.totalExp = 0,
    this.totalPoints = 0,
    this.avatarUrl,
  });

  final String id;
  final String name;
  final String email;
  final UserRole role;
  final int level;
  final int totalExp;
  final int totalPoints;
  final String? avatarUrl;

  bool get isAdmin => role == UserRole.admin;

  AppUser copyWith({
    String? name,
    int? level,
    int? totalExp,
    int? totalPoints,
    String? avatarUrl,
  }) {
    return AppUser(
      id: id,
      name: name ?? this.name,
      email: email,
      role: role,
      level: level ?? this.level,
      totalExp: totalExp ?? this.totalExp,
      totalPoints: totalPoints ?? this.totalPoints,
      avatarUrl: avatarUrl ?? this.avatarUrl,
    );
  }

  factory AppUser.fromJson(Map<String, dynamic> json) => AppUser(
        id: json['id'] as String,
        name: json['name'] as String,
        email: json['email'] as String? ?? '',
        role: UserRole.fromString(json['role'] as String? ?? 'learner'),
        level: json['level'] as int? ?? 1,
        totalExp: json['total_exp'] as int? ?? 0,
        totalPoints: json['total_points'] as int? ?? 0,
        avatarUrl: json['avatar_url'] as String?,
      );

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'role': role.name,
        'level': level,
        'total_exp': totalExp,
        'total_points': totalPoints,
        'avatar_url': avatarUrl,
      };
}

class Category {
  const Category({
    required this.id,
    required this.name,
    required this.slug,
    this.description,
  });

  final int id;
  final String name;
  final String slug;
  final String? description;

  factory Category.fromJson(Map<String, dynamic> json) => Category(
        id: json['id'] as int,
        name: json['name'] as String,
        slug: json['slug'] as String,
        description: json['description'] as String?,
      );
}

class LearningMaterial {
  const LearningMaterial({
    required this.id,
    required this.title,
    required this.slug,
    required this.content,
    required this.author,
    required this.category,
    required this.status,
    this.coverImageUrl,
    this.averageRating = 0,
    this.ratingsCount = 0,
    this.rejectionReason,
    this.isCompleted = false,
    this.hasRated = false,
    required this.createdAt,
  });

  final String id;
  final String title;
  final String slug;
  final String content;
  final CategoryRef author;
  final Category category;
  final MaterialStatus status;
  final String? coverImageUrl;
  final double averageRating;
  final int ratingsCount;
  final String? rejectionReason;
  final bool isCompleted;
  final bool hasRated;
  final DateTime createdAt;

  LearningMaterial copyWith({
    MaterialStatus? status,
    String? rejectionReason,
    bool? isCompleted,
    bool? hasRated,
    double? averageRating,
    int? ratingsCount,
  }) {
    return LearningMaterial(
      id: id,
      title: title,
      slug: slug,
      content: content,
      author: author,
      category: category,
      status: status ?? this.status,
      coverImageUrl: coverImageUrl,
      averageRating: averageRating ?? this.averageRating,
      ratingsCount: ratingsCount ?? this.ratingsCount,
      rejectionReason: rejectionReason ?? this.rejectionReason,
      isCompleted: isCompleted ?? this.isCompleted,
      hasRated: hasRated ?? this.hasRated,
      createdAt: createdAt,
    );
  }

  factory LearningMaterial.fromJson(Map<String, dynamic> json) => LearningMaterial(
        id: json['id'] as String,
        title: json['title'] as String,
        slug: json['slug'] as String,
        content: json['content'] as String? ?? '',
        author: CategoryRef(
          id: (json['author']?['id'] ?? '') as String,
          name: (json['author']?['name'] ?? 'Anonim') as String,
        ),
        category: Category(
          id: (json['category']?['id'] ?? 0) as int,
          name: (json['category']?['name'] ?? 'Umum') as String,
          slug: (json['category']?['slug'] ?? '') as String,
        ),
        status: MaterialStatus.fromString(json['status'] as String? ?? 'approved'),
        coverImageUrl: json['cover_image_url'] as String?,
        averageRating: (json['average_rating'] as num? ?? 0).toDouble(),
        ratingsCount: json['ratings_count'] as int? ?? 0,
        rejectionReason: json['rejection_reason'] as String?,
        createdAt: DateTime.tryParse(json['created_at'] as String? ?? '') ??
            DateTime.now(),
      );
}

/// Referensi ringan untuk author (dipakai di list & detail).
class CategoryRef {
  const CategoryRef({required this.id, required this.name, this.level = 1});

  final String id;
  final String name;
  final int level;
}

class Comment {
  const Comment({
    required this.id,
    required this.text,
    required this.author,
    required this.createdAt,
  });

  final String id;
  final String text;
  final CategoryRef author;
  final DateTime createdAt;
}

class LeaderboardEntry {
  const LeaderboardEntry({
    required this.rank,
    required this.userId,
    required this.name,
    required this.level,
    required this.totalExp,
  });

  final int rank;
  final String userId;
  final String name;
  final int level;
  final int totalExp;
}

class AdminStats {
  const AdminStats({
    required this.totalUsers,
    required this.totalMaterials,
    required this.pendingMaterials,
    required this.approvedMaterials,
    required this.totalCategories,
    required this.totalCompletions,
  });

  final int totalUsers;
  final int totalMaterials;
  final int pendingMaterials;
  final int approvedMaterials;
  final int totalCategories;
  final int totalCompletions;

  factory AdminStats.fromJson(Map<String, dynamic> json) => AdminStats(
        totalUsers: json['total_users'] as int? ?? 0,
        totalMaterials: json['total_materials'] as int? ?? 0,
        pendingMaterials: json['total_pending_materials'] as int? ?? 0,
        approvedMaterials: json['total_approved_materials'] as int? ?? 0,
        totalCategories: json['total_categories'] as int? ?? 0,
        totalCompletions: json['total_completions'] as int? ?? 0,
      );
}

/// Hasil klaim EXP ketika menyelesaikan materi.
class CompletionResult {
  const CompletionResult({
    required this.expGained,
    required this.currentTotalExp,
    required this.currentLevel,
    required this.isLevelUp,
  });

  final int expGained;
  final int currentTotalExp;
  final int currentLevel;
  final bool isLevelUp;
}

/// Hasil kirim rating.
class RatingResult {
  const RatingResult({
    required this.pointsGained,
    required this.currentTotalPoints,
    required this.newAverageRating,
  });

  final int pointsGained;
  final int currentTotalPoints;
  final double newAverageRating;
}
