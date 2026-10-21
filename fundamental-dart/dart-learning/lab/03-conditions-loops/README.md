# 🧪 Lab Pertemuan 3 — Conditions & Loops

Folder ini adalah ruang kerjakanmu untuk materi **Pertemuan 3**.

> 📖 Teori: [`materi/03-conditions-loops.md`](../../materi/03-conditions-loops.md)

## Peta Folder

```
lab/03-conditions-loops/
├── README.md                        # briefs latihan + checklist (kamu)
├── sistem_penilaian_kelas.dart      # Project 3 — sistem penilaian kelas
├── exercises/
│   ├── latihan_01_if.dart
│   ├── latihan_02_switch.dart
│   ├── latihan_03_for.dart
│   ├── latihan_04_for_in.dart
│   ├── latihan_05_while.dart
│   ├── latihan_06_break_continue.dart
│   └── latihan_07_nested_loop.dart
└── solusi/
    └── sistem_penilaian_kelas.dart  # referensi jawaban
```

## Cara Menjalankan

Dari root `dart-learning/`:

```bash
dart run lab/03-conditions-loops/sistem_penilaian_kelas.dart
dart run lab/03-conditions-loops/exercises/latihan_01_if.dart
```

## Latihan Kecil

| File                                  | Topik                                        | Status |
| ------------------------------------- | -------------------------------------------- | ------ |
| `exercises/latihan_01_if.dart`        | `if`, `else if`, `else`, kondisi majemuk       | [ ] |
| `exercises/latihan_02_switch.dart`    | `switch` statement & `switch` expression      | [ ] |
| `exercises/latihan_03_for.dart`       | `for` (jumlah pasti, mundur, akumulasi)        | [ ] |
| `exercises/latihan_04_for_in.dart`    | iterasi List, Set, Map, String                 | [ ] |
| `exercises/latihan_05_while.dart`     | `while` vs `do-while`                          | [ ] |
| `exercises/latihan_06_break_continue.dart` | menghentikan & melewati iterasi            | [ ] |
| `exercises/latihan_07_nested_loop.dart`   | loop bersarang & label                     | [ ] |

## Project 3 — Sistem Penilaian Kelas

Buat program yang mengolah data nilai sekelas dan menampilkan ringkasannya.

### Data

Gunakan `List<Map<String, dynamic>>` yang berisi data mahasiswa, minimal 4 orang:

```dart
final List<Map<String, dynamic>> mahasiswa = [
  {'nama': 'Purwa', 'nilai': 88},
  {'nama': 'Budi', 'nilai': 76},
  // ...
];
```

### Ketentuan

1. Cetak **predikat tiap mahasiswa** dengan `for-in` loop.
   Predikat: A (≥ 85), B (≥ 75), C (≥ 65), D (< 65).
2. Hitung **rata-rata kelas** dengan menjumlahkan semua nilai, lalu bagi jumlah data.
3. Tentukan **predikat kelas** dari rata-rata tersebut (pakai operator ternary).
4. Cari **nilai tertinggi** dan **nilai terendah** di kelas.
5. Tentukan **jumlah mahasiswa yang lulus** (nilai ≥ 65).
6. Tampilkan **tabel ringkasan** memakai nested loop:
   - loop luar untuk setiap mahasiswa,
   - loop dalam untuk kolom `Nilai`, `Predikat`, `Status`.
7. Gunakan `break` atau `continue` di salah satu bagian untuk sneak-in filter (misal: lewati mahasiswa yang nilainya < 65 saat menghitung rata-rata lulus).

### Contoh hasil yang diharapkan

```
=== SISTEM PENILAIAN KELAS ===
Jumlah mahasiswa : 4
Purwa -> A
Budi -> B
Sinta -> A
Rizky -> C
Rata-rata kelas  : 81.00
Predikat kelas   : B
Nilai tertinggi  : 92
Nilai terendah  : 68
Mahasiswa lulus  : 4

--- TABEL RINGKASAN ---
Purwa  | Nilai: 88 | Predikat: A | Status: Lulus |
Budi   | Nilai: 76 | Predikat: B | Status: Lulus |
Sinta  | Nilai: 92 | Predikat: A | Status: Lulus |
Rizky  | Nilai: 68 | Predikat: C | Status: Lulus |
```

### Status

- [ ] Data mahasiswa diganti dengan data latihanmu sendiri
- [ ] Predikat tiap mahasiswa benar
- [ ] Rata-rata kelas benar (2 desimal)
- [ ] Nilai tertinggi / terendah benar
- [ ] Jumlah yang lulus benar
- [ ] Tabel ringkasan terformat rapi

### Catatan

Format angka desimal memakai `toStringAsFixed(2)`, contoh: `82.50`.
