import 'models.dart';

/// Sumber data mock in-memory untuk seluruh aplikasi.
///
/// Ini pengganti backend sementara. Semua layar membaca dari sini sehingga
/// aplikasi bisa didemokan TANPA server/MySQL.
///
/// Saat backend siap: buat `ApiRepository` dengan antarmuka yang sama,
/// lalu ganti provider-nya di `lib/core/providers.dart`. UI tidak perlu diubah.
class MockDatabase {
  MockDatabase._();
  static final MockDatabase instance = MockDatabase._();

  // --- Kredensial demo ---
  static const demoLearnerEmail = 'user@lms.com';
  static const demoLearnerPassword = 'password123';
  static const demoAdminEmail = 'admin@lms.com';
  static const demoAdminPassword = 'admin123';

  final List<AppUser> users = [
    const AppUser(
      id: 'u1',
      name: 'Andrian Kreator',
      email: 'user@lms.com',
      role: UserRole.learner,
      level: 5,
      totalExp: 430,
      totalPoints: 120,
    ),
    const AppUser(
      id: 'u2',
      name: 'Sinta Dewi',
      email: 'sinta@lms.com',
      role: UserRole.learner,
      level: 8,
      totalExp: 2450,
      totalPoints: 340,
    ),
    const AppUser(
      id: 'admin',
      name: 'Admin Moderator',
      email: 'admin@lms.com',
      role: UserRole.admin,
      level: 9,
      totalExp: 3000,
      totalPoints: 500,
    ),
  ];

  final List<Category> categories = const [
    Category(id: 1, name: 'Teknologi & Pemrograman', slug: 'teknologi-dan-pemrograman', description: 'Modul pengembangan perangkat lunak dan IT'),
    Category(id: 2, name: 'Bahasa', slug: 'bahasa', description: 'Modul pembelajaran berbagai bahasa internasional'),
    Category(id: 3, name: 'Pengembangan Diri', slug: 'pengembangan-diri', description: 'Materi soft skills, produktivitas, dan kepemimpinan'),
  ];

  final List<LearningMaterial> materials = [
    LearningMaterial(
      id: 'm1',
      title: 'Belajar React dengan Hooks',
      slug: 'belajar-react-dengan-hooks',
      content: '# Intro React Hooks\n\nReact Hooks mempermudah pengelolaan state pada komponen fungsi.\n\n## Contoh useState\n\n```jsx\nimport { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Klik {count}</button>;\n}\n```\n\n## Kesimpulan\n\nHooks membuat kode lebih ringkas dan mudah dipahami.',
      author: const CategoryRef(id: 'u1', name: 'Andrian Kreator'),
      category: const Category(id: 1, name: 'Teknologi & Pemrograman', slug: 'teknologi-dan-pemrograman'),
      status: MaterialStatus.approved,
      coverImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      averageRating: 4.8,
      ratingsCount: 12,
      createdAt: DateTime(2026, 8, 26),
    ),
    LearningMaterial(
      id: 'm2',
      title: 'Dasar SQL Query',
      slug: 'dasar-sql-query',
      content: '# Pengenalan SQL\n\nSQL (Structured Query Language) adalah bahasa untuk mengelola basis data relasional.\n\n## SELECT\n\n```sql\nSELECT * FROM users WHERE level >= 5;\n```\n\n## JOIN\n\nMenggabungkan dua tabel berdasarkan relasi.',
      author: const CategoryRef(id: 'u1', name: 'Andrian Kreator'),
      category: const Category(id: 1, name: 'Teknologi & Pemrograman', slug: 'teknologi-dan-pemrograman'),
      status: MaterialStatus.approved,
      coverImageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
      averageRating: 4.5,
      ratingsCount: 8,
      createdAt: DateTime(2026, 9, 3),
    ),
    LearningMaterial(
      id: 'm3',
      title: 'Bahasa Inggris untuk Pemula',
      slug: 'bahasa-inggris-untuk-pemula',
      content: '# Greetings\n\nBelajar sapaan dasar dalam bahasa Inggris.\n\n- Hello\n- Good morning\n- How are you?',
      author: const CategoryRef(id: 'u2', name: 'Sinta Dewi'),
      category: const Category(id: 2, name: 'Bahasa', slug: 'bahasa'),
      status: MaterialStatus.approved,
      coverImageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
      averageRating: 4.2,
      ratingsCount: 5,
      createdAt: DateTime(2026, 9, 10),
    ),
    // Materi milik learner demo (m1) dengan status beragam -> untuk demo "Materi Saya"
    LearningMaterial(
      id: 'm4',
      title: 'Panduan Git untuk Pemula',
      slug: 'panduan-git-untuk-pemula',
      content: '# Git Basics\n\n`git init`, `git commit`, `git push`.',
      author: const CategoryRef(id: 'u1', name: 'Andrian Kreator'),
      category: const Category(id: 1, name: 'Teknologi & Pemrograman', slug: 'teknologi-dan-pemrograman'),
      status: MaterialStatus.pending,
      createdAt: DateTime(2026, 10, 1),
    ),
    LearningMaterial(
      id: 'm5',
      title: 'Manajemen Waktu Produktif',
      slug: 'manajemen-waktu-produktif',
      content: '# Time Management\n\nTeknik Pomodoro dan Eisenhower Matrix.',
      author: const CategoryRef(id: 'u1', name: 'Andrian Kreator'),
      category: const Category(id: 3, name: 'Pengembangan Diri', slug: 'pengembangan-diri'),
      status: MaterialStatus.rejected,
      rejectionReason: 'Isi materi terlalu singkat, harap tambahkan contoh studi kasus.',
      createdAt: DateTime(2026, 9, 20),
    ),
    // Antrean moderasi admin
    LearningMaterial(
      id: 'm6',
      title: 'Docker untuk Developer',
      slug: 'docker-untuk-developer',
      content: '# Docker\n\nContainer untuk konsistensi environment.\n\n```bash\ndocker build -t app .\ndocker run -p 3000:3000 app\n```',
      author: const CategoryRef(id: 'u2', name: 'Sinta Dewi'),
      category: const Category(id: 1, name: 'Teknologi & Pemrograman', slug: 'teknologi-dan-pemrograman'),
      status: MaterialStatus.pending,
      coverImageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800',
      createdAt: DateTime(2026, 10, 5),
    ),
    LearningMaterial(
      id: 'm7',
      title: 'Public Speaking yang Efektif',
      slug: 'public-speaking-yang-efektif',
      content: '# Public Speaking\n\nKuasai struktur pembuka, isi, dan penutup.',
      author: const CategoryRef(id: 'u1', name: 'Andrian Kreator'),
      category: const Category(id: 3, name: 'Pengembangan Diri', slug: 'pengembangan-diri'),
      status: MaterialStatus.pending,
      createdAt: DateTime(2026, 10, 8),
    ),
  ];

  final Map<String, List<Comment>> comments = {
    'm1': [
      Comment(
        id: 'c1',
        text: 'Penjelasan soal hooks sangat mudah dipahami!',
        author: const CategoryRef(id: 'u2', name: 'Sinta Dewi', level: 8),
        createdAt: DateTime(2026, 9, 1),
      ),
    ],
  };

  final List<LeaderboardEntry> leaderboard = const [
    LeaderboardEntry(rank: 1, userId: 'u2', name: 'Sinta Dewi', level: 8, totalExp: 2450),
    LeaderboardEntry(rank: 2, userId: 'u9', name: 'Budi Santoso', level: 6, totalExp: 980),
    LeaderboardEntry(rank: 3, userId: 'u1', name: 'Andrian Kreator', level: 5, totalExp: 430),
    LeaderboardEntry(rank: 4, userId: 'u7', name: 'Rina Marlina', level: 4, totalExp: 320),
    LeaderboardEntry(rank: 5, userId: 'u4', name: 'Dodi Pratama', level: 3, totalExp: 210),
  ];

  AdminStats stats() => AdminStats(
        totalUsers: users.length + 40,
        totalMaterials: materials.length,
        pendingMaterials: materials.where((m) => m.status == MaterialStatus.pending).length,
        approvedMaterials: materials.where((m) => m.status == MaterialStatus.approved).length,
        totalCategories: categories.length,
        totalCompletions: 132,
      );
}
