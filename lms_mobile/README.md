# LMS Mobile (Flutter)

Versi mobile dari **Gamified Learning Platform**. Target: **Android & iOS** (tugas mata kuliah Mobile Programming).

Saat ini aplikasi berjalan **tanpa backend** — semua data disimpan di memori (mock) sehingga bisa langsung didemokan. Ketika API siap, cukup ganti satu provider tanpa mengubah UI.

---

## Menjalankan aplikasi

```bash
flutter pub get
flutter run                 # pilih device Android/iOS
flutter run -d chrome       # cek cepat di browser
flutter run -d linux        # cek cepat di desktop
```

### Akun demo

| Role    | Email           | Password      |
| ------- | --------------- | ------------- |
| Learner | `user@lms.com`  | `password123` |
| Admin   | `admin@lms.com` | `admin123`    |

---

## Struktur folder

```
lib/
├── main.dart                     # entry point
├── app/
│   ├── app.dart                  # MaterialApp + tema
│   └── router.dart               # routing (go_router) + guard role
├── core/
│   ├── models.dart               # model domain (User, Material, Category, ...)
│   ├── mock_database.dart        # DATA MOCK (pengganti backend)
│   ├── repository.dart           # kontrak LmsRepository + MockRepository
│   ├── providers.dart            # state Riverpod (auth, katalog, dst)
│   ├── theme.dart                # tema (adaptasi warna Tailwind web)
│   └── formatters.dart           # format tanggal id-ID
├── features/
│   ├── auth/login_page.dart
│   ├── learner/                  # dashboard, katalog, reader, editor, dll
│   └── admin/                    # dashboard, moderasi, kategori
└── shared/
    ├── learner_shell.dart        # bottom-nav + drawer learner
    ├── admin_shell.dart          # bottom-nav admin
    └── widgets.dart              # widget bersama (badge, kartu, bintang, dll)
```

## Fitur yang sudah ada

**Learner / Creator**
- Login (learner & admin)
- Dashboard progress gamifikasi (Level, EXP, Poin)
- Katalog materi: pencarian, filter kategori, urutkan
- Reader markdown + klaim EXP (confetti + dialog level up) + rating + komentar
- Buat / edit materi (editor markdown tab Tulis/Preview)
- Materi Saya: status pending/approved/rejected, lihat alasan reject, hapus
- Profil + Papan Peringkat

**Admin**
- Dashboard statistik sistem
- Antrean moderasi + pencarian
- Review materi (preview markdown, Approve / Reject + alasan)
- CRUD kategori

---

## Beralih ke backend asli

Semua akses data melewati satu antarmuka: `LmsRepository` (lihat `lib/core/repository.dart`).

1. Buat `ApiRepository implements LmsRepository` yang memanggil HTTP (mis. pakai `dio`).
2. Ganti isi `repositoryProvider` di `lib/core/providers.dart`:

```dart
final repositoryProvider = Provider<LmsRepository>((ref) {
  return ApiRepository(baseUrl: 'http://10.0.2.2:8000/api/v1');
});
```

Selesai — semua UI otomatis memakai backend. Model sudah punya `fromJson`.

> **Catatan emulator Android:** `localhost` di emulator menunjuk ke emulator sendiri.
> Gunakan `10.0.2.2` untuk mengakses server di komputer host.

---

## Catatan teknis

- **State management:** Riverpod
- **Routing:** go_router (dengan redirect berbasis role)
- **Penyimpanan sesi:** saat ini in-memory; untuk persist, tambahkan `shared_preferences`/`flutter_secure_storage` di `AuthNotifier`.
- Flutter versi 3.50 memunculkan info deprecation untuk `package:flutter/material.dart`
  (arah migrasi ke `material_ui`). Info ini aman diabaikan; `flutter/material.dart`
  masih berfungsi penuh.

## Test

```bash
flutter test
```

Mencakup: render halaman login, login berhasil/gagal, dan filter katalog.
