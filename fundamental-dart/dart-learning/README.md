# 🎯 Dart Learning — Dart Fundamentals

Workspace belajar Dart: **materi teori** di `materi/`, **kode latihanmu** di `lab/`.

> 📋 Daftar lengkap sub-materi: [`../readMe.md`](../readMe.md) (index utama repo `fundamental-dart`)

## Struktur

```
dart-learning/
├── README.md            # kamu sedang di sini — hub
├── pubspec.yaml         # konfigurasi package (untuk lints & analisis)
├── analysis_options.yaml# aturan lint Dart
├── materi/              # 📖 TEORI — satu file per pertemuan
│   ├── 01-introduction.md
│   ├── 02-variables.md
│   ├── 03-conditions-loops.md
│   ├── 04-functions.md
│   └── 05-collections.md
└── lab/                 # 🧪 LATIHAN — kode yang kamu tulis
    ├── README.md        # peta lab + progres
    ├── 01-introduction/
    ├── 02-variables/
    ├── 03-conditions-loops/
    ├── 04-functions/
    ├── 05-collections/
    └── projects/        # 🚀 capstone lintas pertemuan
```

## Alur Belajar

1. Baca `materi/NN-*.md` sampai bagian Latihan Praktik.
2. Buka `lab/NN-*/README.md` — briefs latihan ada di sana.
3. Tulis kode di `lab/NN-*/` (folder `exercises/` untuk latihan kecil, file utama untuk project).
4. Jalankan dari root folder ini:
   ```bash
   dart run lab/01-introduction/hello.dart
   ```
5. Centang `- [ ]` di README lab sebagai penanda selesai.

## Perintah Umum

```bash
dart --version                        # cek SDK
dart run lab/01-introduction/hello.dart   # jalankan satu file
dart analyze                          # cek seluruh kode
dart format .                         # rapikan format kode
dart pub get                          # sync dependency (lints)
```

## Progres

| Pertemuan | Topik | Materi | Latihan |
| --------- | ----- | ------ | ------- |
| 1 | Introduction to Dart | ✅ [lihat](materi/01-introduction.md) | [ ] [kerjakan](lab/01-introduction/README.md) |
| 2 | Variables, Data Types & Operators | ✅ [lihat](materi/02-variables.md) | [ ] [kerjakan](lab/02-variables/README.md) |
| 3 | Conditions & Loops | ✅ [lihat](materi/03-conditions-loops.md) | [ ] [kerjakan](lab/03-conditions-loops/README.md) |
| 4 | Functions | ⬜ | [ ] |
| 5 | Collections | ⬜ | [ ] |
| — | 🚀 Projects (capstone) | — | [ ] |

## Konvensi Penulisan

- **Materi** (`materi/`): gaya yang dipakai — sub-materi bernomor `1.1`, `1.2`, …; bagian penutup `## Praktik`.
- **Lab** (`lab/`): gaya Dart resmi — `lowerCamelCase` untuk variabel/fungsi, `UpperCamelCase` untuk class, 2 spasi indent, `dart format` sebagai jaring pengaman.
- **Nama file Dart**: `snake_case.dart` (mis. `student_intro.dart`).
- **Folder**: `NN-nama-topik` dengan dua digit agar terurut.
