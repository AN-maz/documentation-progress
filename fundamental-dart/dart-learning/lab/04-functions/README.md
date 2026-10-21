# 🧪 Lab Pertemuan 4 — Functions

Folder ini adalah ruang kerjakanmu untuk materi **Pertemuan 4**.

> 📖 Teori: [`materi/04-functions.md`](../../materi/04-functions.md)

## Peta Folder

```
lab/04-functions/
├── README.md                    # briefs latihan + checklist (kamu)
├── kasir_sederhana.dart          # Project 4 — program kasir interaktif
├── exercises/
│   ├── latihan_01_fungsi_dasar.dart
│   ├── latihan_02_parameter.dart
│   ├── latihan_03_return_value.dart
│   ├── latihan_04_parameter_opsional.dart
│   ├── latihan_05_named_parameter.dart
│   ├── latihan_06_arrow_anonymous.dart
│   ├── latihan_07_scope.dart
│   └── latihan_08_input_terminal.dart
└── solusi/
    └── kasir_sederhana.dart      # referensi jawaban
```

## Cara Menjalankan

Dari root `dart-learning/`:

```bash
dart run lab/04-functions/kasir_sederhana.dart
dart run lab/04-functions/exercises/latihan_01_fungsi_dasar.dart
```

> Program yang memakai `dart:io` menunggu input dari keyboard. Jalankan di terminal, **bukan** lewat preview teks.

## Latihan Kecil

| File                                       | Topik                                            | Status |
| ------------------------------------------ | ------------------------------------------------ | ------ |
| `exercises/latihan_01_fungsi_dasar.dart`   | mendefinisikan & memanggil fungsi                 | [ ] |
| `exercises/latihan_02_parameter.dart`      | parameter positional & multiple                    | [ ] |
| `exercises/latihan_03_return_value.dart`   | `return` & tipe return                             | [ ] |
| `exercises/latihan_04_parameter_opsional.dart` | optional positional `[ ]`                     | [ ] |
| `exercises/latihan_05_named_parameter.dart`| named `{ }` & `required`                           | [ ] |
| `exercises/latihan_06_arrow_anonymous.dart` | arrow function & anonymous function                | [ ] |
| `exercises/latihan_07_scope.dart`          | scope global, lokal, bayangan variabel             | [ ] |
| `exercises/latihan_08_input_terminal.dart`  | `dart:io`, `readLineSync`, konversi input          | [ ] |

## Project 4 — Program Kasir Sederhana

Buat program kasir interaktif yang menerima data dari user lewat terminal.

### Ketentuan

1. Gunakan `import 'dart:io';` dan baca input dengan `stdin.readLineSync()`.
2. Buat **fungsi pembantu**:
   - `String bacaTeks(String prompt)` — membaca teks.
   - `double bacaAngka(String prompt)` — membaca angka, mengulang bila input tidak valid.
3. Input yang diminta:
   - Nama barang
   - Harga satuan
   - Jumlah barang
   - Diskon (dalam persen, boleh desimal)
4. Hitung dengan fungsi terpisah:
   - `double hitungSubtotal(double harga, int jumlah)`
   - `double hitungDiskon(double subtotal, double persen)`
   - `double hitungTotal(double subtotal, double diskon)`
5. Validasi: harga dan jumlah harus lebih dari 0, diskon maksimal 100.
6. Tampilkan struk akhir dengan format rapi, contoh:

```
==================== STRUK BELANJA ====================
Nama barang   : Kaos Polos
Harga satuan  : 85000
Jumlah        : 3
Subtotal      : 255000
Diskon        : 25500
Total         : 229500
=======================================================
```

7. Gunakan **named parameter** pada salah satu fungsi (misalnya `cetakStruk({required String nama, ...})`).

### Contoh interaksi

```
Masukkan nama barang: Kaos Polos
Masukkan harga satuan: 85000
Masukkan jumlah: 3
Masukkan diskon (%): 10
==================== STRUK BELANJA ====================
...
```

### Status

- [ ] Fungsi pembantu `bacaTeks` dan `bacaAngka` bekerja
- [ ] Input angka tidak valid menghasilkan permintaan ulang
- [ ] Subtotal, diskon, dan total terhitung benar
- [ ] Validasi harga/jumlah/diskon bekerja
- [ ] Struk terformat rapi
- [ ] Minimal satu fungsi memakai named parameter

### Catatan

- Input dari keyboard selalu `String` — wajib dikonversi (`double.tryParse`).
- Percent diskon dipakai sebagai pembagi 100: `subtotal * persen / 100`.
- `toStringAsFixed(0)` untuk nilai rupiah supaya tidak ada desimal.
