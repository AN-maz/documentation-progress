# 🧪 Lab Pertemuan 5 — Collections

Folder ini adalah ruang kerjakanmu untuk materi **Pertemuan 5**.

> 📖 Teori: [`materi/05-collections.md`](../../materi/05-collections.md)

## Peta Folder

```
lab/05-collections/
├── README.md                        # briefs latihan + checklist (kamu)
├── analisis_nilai_kelas.dart        # Project 5 — analisis data nilai kelas
├── exercises/
│   ├── latihan_01_list.dart
│   ├── latihan_02_set.dart
│   ├── latihan_03_map.dart
│   ├── latihan_04_map_where.dart
│   ├── latihan_05_record.dart
│   └── latihan_06_nested.dart
└── solusi/
    └── analisis_nilai_kelas.dart    # referensi jawaban
```

## Cara Menjalankan

Dari root `dart-learning/`:

```bash
dart run lab/05-collections/analisis_nilai_kelas.dart
dart run lab/05-collections/exercises/latihan_01_list.dart
```

## Latihan Kecil

| File                                  | Topik                                        | Status |
| ------------------------------------- | -------------------------------------------- | ------ |
| `exercises/latihan_01_list.dart`      | membuat, mengakses, memodifikasi List         | [ ] |
| `exercises/latihan_02_set.dart`       | Set unik & operasi himpunan                   | [ ] |
| `exercises/latihan_03_map.dart`       | Map key-value, iterasi, update                | [ ] |
| `exercises/latihan_04_map_where.dart` | `map()`, `where()`, `forEach()`, `reduce()`   | [ ] |
| `exercises/latihan_05_record.dart`    | Record & destructuring (Dart 3)               | [ ] |
| `exercises/latihan_06_nested.dart`    | List dalam List, List of Map, Map of List     | [ ] |

## Project 5 — Analisis Data Nilai Kelas

Buat program yang menganalisis data nilai mahasiswa memakai koleksi.

### Data

```dart
final List<Map<String, dynamic>> mahasiswa = [
  {'nama': 'Purwa', 'kelas': 'A', 'nilai': 88},
  {'nama': 'Budi', 'kelas': 'A', 'nilai': 76},
  {'nama': 'Sinta', 'kelas': 'B', 'nilai': 92},
  {'nama': 'Rizky', 'kelas': 'B', 'nilai': 68},
  {'nama': 'Dewi', 'kelas': 'C', 'nilai': 81},
];
```

### Ketentuan

1. **Ranking** — urutkan nilai dari yang tertinggi ke terendah, lalu tampilkan nomor urut, nama, kelas, dan nilai.
   Gunakan `List.from()` supaya List data asli tidak ikut berubah.
2. **Statistik** — hitung rata-rata, nilai tertinggi, dan nilai terendah.
3. **Lulus / belum lulus** — pakai `where()` untuk memisahkan mahasiswa yang nilai ≥ 65 dan yang < 65.
4. **Rekap predikat** — buat `Map<String, int>` berisi jumlah mahasiswa per predikat (A/B/C/D).
5. **Rata-rata per kelas** — buat `Map<String, List<double>>` yang mengelompokkan nilai per kelas, lalu hitung rata-rata tiap kelas.
6. **Kelas unik** — pakai `Set` untuk menampilkan daftar kelas yang ada.

### Contoh hasil yang diharapkan

```
=== ANALISIS DATA NILAI KELAS ===
Jumlah data     : 5

--- RANKING ---
1. Sinta (B) - 92
2. Purwa (A) - 88
3. Dewi (C) - 81
4. Budi (A) - 76
5. Rizky (B) - 68

--- STATISTIK ---
Rata-rata       : 81.00
Nilai tertinggi  : 92
Nilai terendah  : 68
Mahasiswa lulus  : 5
Belum lulus      : 0

--- REKAP PER PREDIKAT ---
Predikat A : 2 mahasiswa
Predikat B : 2 mahasiswa
Predikat C : 1 mahasiswa

--- RATA-RATA PER KELAS ---
Kelas A : 82.00
Kelas B : 80.00
Kelas C : 81.00

--- KELAS UNIK (Set) ---
Ada 3 kelas: A, B, C
```

### Status

- [ ] Data diganti dengan data latihanmu sendiri
- [ ] Ranking benar urutannya
- [ ] Statistik (rata-rata/tertinggi/terendah) benar
- [ ] Pemisahan lulus dan belum lulus benar
- [ ] Rekap predikat benar
- [ ] Rata-rata per kelas benar
- [ ] Kelas unik benar

### Catatan

- `map()` mengubah, `where()` menyaring, `reduce()` menjumlahkan — ketiganya bisa dirangkai.
- `sort()` **mengubah** List aslinya, jadi salin dulu dengan `List.from()` atau `.toList()`.
- `where()` dan `map()` mengembalikan `Iterable`; tambahkan `.toList()` kalau mau List biasa.
- `Map` bisa `+=` satu kunci baru lewat `map['kunci'] = nilai`.
