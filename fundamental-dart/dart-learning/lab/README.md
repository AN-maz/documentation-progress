# 🧪 Lab — Dart Fundamentals

Semua kode yang kamu tulis sendiri ada di folder ini.

## Aturan Lab

1. **Satu folder per pertemuan**: `NN-nama-topik/`. Nomornya sama dengan nomor pertemuan di materi, jadi jelas mana yang sedang dikerjakan.
2. **Teori ada di `materi/`**, latihan ada di sini. Materi tidak perlu ikut berubah karena kamu bereksperimen.
3. **Brief latihan di `README.md` tiap folder** — isi checklist `- [ ]` sebagai penanda progres.
4. **Jawaban referensi di `solusi/`** — jangan dibuka sebelum mencoba sendiri.
5. **Project besar di `projects/`** — capstone lintas pertemuan.

## Peta Folder

```
lab/
├── 01-introduction/       # Pertemuan 1 — Introduction to Dart
│   ├── README.md
│   ├── hello.dart
│   ├── student_intro.dart
│   ├── exercises/
│   └── solusi/
├── 02-variables/          # Pertemuan 2 — Variables, Data Types & Operators
│   ├── README.md
│   ├── kalkulator_nilai.dart
│   ├── exercises/
│   └── solusi/
├── 03-conditions-loops/   # Pertemuan 3 — Conditions & Loops
│   ├── README.md
│   ├── sistem_penilaian_kelas.dart
│   ├── exercises/
│   └── solusi/
├── 04-functions/          # Pertemuan 4 — Functions
│   ├── README.md
│   ├── kasir_sederhana.dart
│   ├── exercises/
│   └── solusi/
├── 05-collections/        # Pertemuan 5 — Collections
│   ├── README.md
│   ├── analisis_nilai_kelas.dart
│   ├── exercises/
│   └── solusi/
└── projects/              # capstone lintas pertemuan
```

## Menjalankan Kode

Dari root `dart-learning/`:

```bash
dart run lab/01-introduction/hello.dart
```

Atau jalankan semua file di satu folder:

```bash
for f in lab/01-introduction/exercises/*.dart; do echo "== $f"; dart run "$f"; done
```

## Progress

| Pertemuan | Topik | Materi | Latihan |
| --------- | ----- | ------ | ------- |
| 1 | Introduction to Dart | ✅ | [ ] |
| 2 | Variables, Data Types & Operators | ✅ | [ ] |
| 3 | Conditions & Loops | ✅ | [ ] |
| 4 | Functions | ✅ | [ ] |
| 5 | Collections | ✅ | [ ] |
