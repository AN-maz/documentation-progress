# 🧪 Lab Pertemuan 1 — Introduction to Dart

Folder ini adalah ruang kerjakanmu untuk materi **Pertemuan 1**.

> 📖 Teori: [`materi/01-introduction.md`](../../materi/01-introduction.md)

## Peta Folder

```
lab/01-introduction/
├── README.md            # briefs latihan (kamu)
├── hello.dart           #(latihan) output program sederhana
├── student_intro.dart   # Project 1 — profiler mahasiswa
├── exercises/           # latihan kecil per submateri
│   ├── latihan_01_print_dasar.dart
│   ├── latihan_02_komentar.dart
│   └── latihan_03_kuotasi_dan_interpolasi.dart
└── solusi/              # referensi jawaban (buka hanya setelah mencoba)
    └── student_intro.dart
```

## Cara Menjalankan

Dari root repo `dart-learning/`:

```bash
dart run lab/01-introduction/hello.dart
dart run lab/01-introduction/student_intro.dart
dart run lab/01-introduction/exercises/latihan_01_print_dasar.dart
```

Alternatif: `dart lab/01-introduction/hello.dart` (lebih cepat, tanpa analisis).

## Project 1 — Student Introduction Program

Buat program sederhana yang menampilkan profil mahasiswa melalui terminal.

### Ketentuan

1. Buat file bernama `student_intro.dart`.
2. Gunakan fungsi `main()`.
3. Gunakan minimal tiga pemanggilan `print()`.
4. Tampilkan nama, jurusan, dan semester.
5. Tambahkan minimal satu komentar.
6. Jalankan program melalui terminal VS Code.

### Contoh hasil yang diharapkan

```
=== PROFIL MAHASISWA ===
Nama: Purwa
Jurusan: Informatika
Semester: 3
Saya sedang belajar Dart!
```

### Status

- [ ] File dibuat
- [ ] Program dijalankan tanpa error
- [ ] Output sesuai contoh
- [ ] Data diganti dengan data.latihanmu sendiri

### Contoh implementasi (referensi)

```dart
void main() {
  // Menampilkan profil mahasiswa
  print('=== PROFIL MAHASISWA ===');
  print('Nama: Purwa');
  print('Jurusan: Informatika');
  print('Semester: 3');
  print('Saya sedang belajar Dart!');
}
```

Coba ubah nama, jurusan, dan semester sesuai data latihanmu sendiri.

## Latihan Kecil

| File                | Topik                                    | Status |
| ------------------- | ---------------------------------------- | ------ |
| `exercises/latihan_01_print_dasar.dart` | `print()`, `main()`, statement & `;` | [ ] |
| `exercises/latihan_02_komentar.dart` | single-line, multi-line, doc comment   | [ ] |
| `exercises/latihan_03_kuotasi_dan_interpolasi.dart` | string `'`, `"`, `$interpolasi` | [ ] |
