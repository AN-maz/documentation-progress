# 🧪 Lab Pertemuan 2 — Variables, Data Types & Operators

Folder ini adalah ruang kerjakanmu untuk materi **Pertemuan 2**.

> 📖 Teori: [`materi/02-variables.md`](../../materi/02-variables.md)

## Peta Folder

```
lab/02-variables/
├── README.md                    # briefs latihan + checklist (kamu)
├── kalkulator_nilai.dart        # Project 2 — kalkulator nilai mahasiswa
├── exercises/
│   ├── latihan_01_variabel.dart
│   ├── latihan_02_tipe_data.dart
│   ├── latihan_03_final_const.dart
│   ├── latihan_04_konversi_tipe.dart
│   ├── latihan_05_operator.dart
│   └── latihan_06_interpolasi.dart
└── solusi/
    └── kalkulator_nilai.dart    # referensi jawaban
```

## Cara Menjalankan

Dari root `dart-learning/`:

```bash
dart run lab/02-variables/kalkulator_nilai.dart
dart run lab/02-variables/exercises/latihan_01_variabel.dart
```

## Latihan Kecil

| File                              | Topik                                        | Status |
| --------------------------------- | -------------------------------------------- | ------ |
| `exercises/latihan_01_variabel.dart`   | deklarasi variabel, `var` vs eksplisit     | [ ] |
| `exercises/latihan_02_tipe_data.dart`   | `int`, `double`, `String`, `bool`, List/Set/Map | [ ] |
| `exercises/latihan_03_final_const.dart` | `final` vs `const`                          | [ ] |
| `exercises/latihan_04_konversi_tipe.dart`| `parse()`, `toString()`, `toInt()`          | [ ] |
| `exercises/latihan_05_operator.dart`     | aritmetika, perbandingan, logika, ternary    | [ ] |
| `exercises/latihan_06_interpolasi.dart` | `$nama` dan `${ekspresi}`                    | [ ] |

## Project 2 — Kalkulator Nilai Mahasiswa

Buat program yang menghitung nilai akhir mahasiswa beserta predikat dan status kelulusannya.

### Ketentuan

1. Buat file bernama `kalkulator_nilai.dart`.
2. Simpan tiga nilai (Tugas, UTS, UAS) sebagai `double`.
3. Hitung rata-rata dengan pembulatan 2 desimal (`toStringAsFixed(2)`).
4. Tentukan predikat dengan operator ternary:

   | Rentang | Predikat |
   | ------- | -------- |
   | ≥ 85    | A        |
   | ≥ 75    | B        |
   | ≥ 65    | C        |
   | < 65    | D        |

5. Tentukan status lulus (`lulus` / `tidak lulus`) dengan batas minimal 65.
6. Gunakan string interpolation untuk menampilkan seluruh output.
7. Gunakan `final` untuk variabel yang nilainya tidak berubah setelah dihitung.

### Contoh hasil yang diharapkan

```
=== KALKULATOR NILAI MAHASISWA ===
Nama     : Purwa
NIM      : 2023001
Tugas    : 85.00
UTS      : 90.00
UAS      : 88.00
-----------------
Rata-rata: 87.67
Predikat : A
Status   : LULUS
```

### Status

- [ ] File dibuat
- [ ] Program berjalan tanpa error
- [ ] Rata-rata dan predikat sesuai
- [ ] Data diganti dengan data latihanmu sendiri

### Catatan

Gunakan `double` untuk nilai (bisa pecahan). Kalau kamu ingin menerima input dari terminal, tambahkan `dart:io` — we'll bahas pola input lengkapnya di Pertemuan 4.
