# 📘 Pertemuan 3 — Conditions & Loops

Dart Fundamentals · Beginner Level

## Tujuan Pembelajaran

Setelah menyelesaikan pertemuan ini, kamu diharapkan mampu:

- Memahami konsep percabangan dan perulangan.
- Menggunakan `if`, `else if`, dan `else` untuk mengambil keputusan.
- Menulis kondisi bersarang (nested conditions).
- Menggunakan `switch` statement dan `switch` expression (Dart 3).
- Memahami empat jenis loop: `for`, `for-in`, `while`, dan `do-while`.
- Mengendalikan alur loop dengan `break` dan `continue`.
- Menulis program yang mengulang dan memproses data secara dinamis.

## 3.1 Conditional Statements

### Apa itu percabangan?

Percabangan (conditional) adalah cara program mengambil keputusan. Program membaca suatu kondisi, mengevaluasi apakah kondisi itu benar (`true`) atau salah (`false`), lalu menjalankan kode yang sesuai.

Bayangkan처럼 saklar lampu: saklar dalam posisi `if` menyalakan lampu A, posisi `else` menyalakan lampu B. Program kamu juga bekerja seperti itu — satu kondisi, dua jalur eksekusi yang berbeda.

```
Kondisi?  ── ya ──>  Jalur 1 (jalankan kode A)
             │
             └── tidak --> Jalur 2 (jalankan kode B)
```

### Nilai kebenaran

Semua kondisi di Dart menghasilkan nilai `bool`, yaitu `true` atau `false`.

```dart
void main() {
  int umur = 20;

  print(umur >= 17);
  print(umur < 17);
  print(umur == 20);
  print(umur != 20);
}
```

Output:

```
true
false
true
false
```

### Operator yang sering dipakai dalam kondisi

| Operator              | Arti                          | Contoh             |
| --------------------- | ----------------------------- | ------------------ |
| `==`                  | Sama dengan                   | `nilai == 80`      |
| `!=`                  | Tidak sama dengan             | `nilai != 80`      |
| `>`                   | Lebih besar dari              | `nilai > 80`       |
| `<`                   | Lebih kecil dari              | `nilai < 80`       |
| `>=`                  | Lebih besar atau sama dengan  | `nilai >= 80`      |
| `<=`                  | Lebih kecil atau sama dengan  | `nilai <= 80`      |
| `&&`                  | Dan (AND)                     | `umur >= 17 && punyaKtp` |
| `\|\|`                | Atau (OR)                     | `nilai >= 85 \|\| nilai == 70` |
| `!`                   | Bukan (NOT)                   | `!lulus`           |

## 3.2 Basic `if` Statement

Bentuk paling sederhana dari percabangan: `if`. Kode di dalam kurung kurawal hanya dijalankan kalau kondisinya bernilai `true`.

```dart
void main() {
  int umur = 20;

  if (umur >= 17) {
    print('Boleh membuat KTP');
  }

  print('Program selesai');
}
```

Output:

```
Boleh membuat KTP
Program selesai
```

Kalau kondisinya `false`, blok `if` dilewati.

```dart
void main() {
  int umur = 15;

  if (umur >= 17) {
    print('Boleh membuat KTP');
  }

  print('Program selesai');
}
```

Output:

```
Program selesai
```

### `if` tanpa kurung kurawal

Kurung kurawal boleh dilewati kalau isinya hanya satu statement.

```dart
void main() {
  int umur = 15;

  if (umur >= 17) print('Boleh membuat KTP');

  print('Program selesai');
}
```

Output:

```
Program selesai
```

Hasilnya sama, tapi kurung kurawal lebih disarankan karena lebih mudah dibaca dan aman saat kode bertambah.

## 3.3 `if`, `else if`, and `else`

Ketika ada lebih dari dua kemungkinan, gunakan rangkaian `if`, `else if`, dan `else`.

```dart
void main() {
  int nilai = 75;

  if (nilai >= 85) {
    print('Predikat A');
  } else if (nilai >= 75) {
    print('Predikat B');
  } else if (nilai >= 65) {
    print('Predikat C');
  } else {
    print('Predikat D');
  }
}
```

Output:

```
Predikat B
```

### Cara kerjanya

Dart mengecek kondisi **dari atas ke bawah** dan menjalankan **blok pertama yang kondisinya benar**. Setelah satu blok berjalan, seluruh rangkaian `if` berhenti.

```dart
void main() {
  int nilai = 90;

  if (nilai >= 60) {
    print('Lulus');
  }

  if (nilai >= 60) {
    print('Minimal 60');
  }
}
```

Output:

```
Lulus
Minimal 60
```

Kedua blok `if` berdiri sendiri, tidak berpasangan. Karena itu, saat kamu hanya ingin satu jalur yang terpilih, gunakan `else if`.

### Perbandingan:if terpisah vs else if

```dart
void main() {
  int nilai = 90;

  // Versi 1: if terpisah -> bisa menghasilkan lebih dari satu output
  if (nilai >= 60) {
    print('Lulus');
  }
  if (nilai >= 90) {
    print('Nilai Sangat Bagus');
  }

  print('---');

  // Versi 2: else if -> hanya satu output
  if (nilai >= 90) {
    print('Nilai Sangat Bagus');
  } else if (nilai >= 60) {
    print('Lulus');
  }
}
```

Output:

```
Lulus
Nilai Sangat Bagus
---
Nilai Sangat Bagus
```

### Aturan penting

- Hanya boleh ada **satu** `else`, dan `else` selalu diletakkan **paling akhir**.
- `else if` harus berada **di antara** `if` dan `else`.
- Kondisi `if` dicek berurutan, jadi tulislah dari kondisi paling spesifik ke paling umum.

## 3.4 Nested Conditions

Kondisi bersarang adalah kondisi `if` yang berada di dalam kondisi `if` lainnya. Ini dipakai saat ada keputusan yang bergantung pada lebih dari satu faktor.

```dart
void main() {
  int umur = 20;
  bool punyaKtp = true;

  if (umur >= 17) {
    if (punyaKtp) {
      print('Boleh membuat KTP');
    } else {
      print('Umur cukup, tapi belum punya KTP');
    }
  } else {
    print('Umur belum cukup');
  }
}
```

Output:

```
Boleh membuat KTP
```

### Menggabungkan kondisi dengan operator logika

Kondisi bersarang yang sederhana sering lebih mudah ditulis sebagai satu kondisi dengan `&&` atau `||`.

```dart
void main() {
  int umur = 20;
  bool punyaKtp = true;

  if (umur >= 17 && punyaKtp) {
    print('Boleh membuat KTP');
  } else {
    print('Syarat belum terpenuhi');
  }
}
```

Output:

```
Boleh membuat KTP
```

### `if` dengan kondisi majemuk

```dart
void main() {
  int nilai = 55;
  int absensi = 85;

  if (nilai >= 60 || absensi >= 80) {
    print('Lolos minimal salah satu syarat');
  } else {
    print('Belum lolos');
  }
}
```

Output:

```
Lolos minimal salah satu syarat
```

## 3.5 `switch` Statements and Expressions

`switch` dipakai ketika kamu punya banyak nilai yang masing-masing menghasilkan tindakan berbeda.

### 3.5.1 `switch` statement

```dart
void main() {
  int hari = 3;

  switch (hari) {
    case 1:
      print('Senin');
    case 2:
      print('Selasa');
    case 3:
      print('Rabu');
    default:
      print('Hari tidak dikenal');
  }
}
```

Output:

```
Rabu
```

### Cara kerja `switch`

1. Nilai pada `switch` dibandingkan dengan setiap `case` satu per satu.
2. Begitu nilai yang cocok ditemukan, blok `case` tersebut dijalankan.
3. **`case` yang tidak kosong tidak lanjut ke `case` berikutnya.** Di Dart 3, blok `case` yang selesai otomatis berhenti di akhir `switch`, jadi `break` tidak wajib ditulis.
4. **`case` yang kosong** (tanpa kode) justru **jatuh ke `case` berikutnya** (*fall-through*), sehingga beberapa `case` bisa memakai satu blok kode yang sama.
5. `default` dijalankan kalau tidak ada `case` yang cocok. `default` boleh diletakkan di mana saja, tapi konvensinya di paling akhir.

### Catatan: `break` di Dart 3

Di Dart 2, `break` wajib ditulis di setiap `case` yang tidak kosong, dan tanpa `break` program akan jatuh ke `case` berikutnya. Di Dart 3 aturan ini berubah: blok `case` yang tidak kosong **selalu berhenti sendiri** setelah selesai.

Jadi kode seperti ini **tidak** mencetak semua hari sekaligus:

```dart
void main() {
  int hari = 1;

  switch (hari) {
    case 1:
      print('Senin');
    case 2:
      print('Selasa');
    case 3:
      print('Rabu');
    default:
      print('Hari lain');
  }
}
```

Output:

```
Senin
```

`break` masih boleh ditulis (berguna untuk kode yang dibaca orang lain atau saat `case` kosong tidak boleh jatuh ke bawah), tapi tidak lagi dibutuhkan.

### Menggabungkan beberapa `case` (fall-through yang disengaja)

`case` yang kosong jatuh ke `case` berikutnya. Ini berguna ketika beberapa nilai harus menghasilkan aksi yang sama.

```dart
void main() {
  String hari = 'Sabtu';

  switch (hari) {
    case 'Sabtu':
    case 'Minggu':
      print('Akhir pekan');
    default:
      print('Hari kerja');
  }
}
```

Output:

```
Akhir pekan
```

Kalau kamu ingin `case` kosong **tidak** jatuh ke bawah, akhiri dengan `break`.

```dart
void main() {
  String hari = 'Sabtu';

  switch (hari) {
    case 'Sabtu':
      print('Akhir pekan');
      break;
    case 'Minggu':
      print('Minggu santai');
      break;
    default:
      print('Hari kerja');
  }
}
```

Output:

```
Akhir pekan
```

### 3.5.2 `switch` expression (Dart 3)

Mulai Dart 3, `switch` bisa dipakai sebagai **ekspresi**, yaitu menghasilkan nilai. Bentuknya tanpa kata `case`, memakai `=>`.

```dart
void main() {
  int hari = 3;

  String namaHari = switch (hari) {
    1 => 'Senin',
    2 => 'Selasa',
    3 => 'Rabu',
    _ => 'Hari tidak dikenal',
  };

  print(namaHari);
}
```

Output:

```
Rabu
```

Tanda `_` adalah **wildcard pattern** — pola yang berfungsi sebagai nilai bawaan ketika tidak ada pola lain yang cocok.

Kelebihan `switch` expression dibanding `switch` statement:

- Tidak perlu `break` dan tidak ada risiko fall-through.
- Menghasilkan nilai, sehingga bisa langsung dipakai di dalam ekspresi.
- Ringkas dan mudah dibaca.

### 3.5.3 `switch` expression dengan pola

`switch` expression Dart 3 mendukung pencocokan pola (pattern matching), sehingga bisa menangani rentang nilai dengan rapi.

```dart
void main() {
  int nilai = 85;

  String predikat = switch (nilai) {
    >= 85 => 'A',
    >= 75 => 'B',
    >= 65 => 'C',
    _ => 'D',
  };

  print(predikat);
}
```

Output:

```
A
```

Pola `>= 85` berarti "nilai yang lebih besar atau sama dengan 85". Karena Dart memeriksa pola dari atas, nilai 85 lebih dulu cocok dengan `>= 85`.

### Kapan memakai yang mana?

| Kebutuhan                                     | Pilihan                    |
| --------------------------------------------- | -------------------------- |
| Banyak pilihan, masing-masing menjalankan kode | `switch` statement         |
| Banyak pilihan, masing-masing menghasilkan nilai | `switch` expression      |
| Hanya dua kemungkinan                         | `if` / `else`              |
| Kondisi majemuk (lebih dari 2 faktor)          | `if` dengan `&&` / `\|\|`   |

## 3.6 Loops

### Apa itu loop?

Loop (perulangan) adalah 语句 yang menjalankan blok kode berulang kali selama kondisi tertentu masih terpenuhi. Loop sangat penting karena membuat programmu bisa memproses data sebanyak apa pun tanpa menulis kode berulang.

```
Mulai
  │
  ▼
Cek kondisi ── tidak ──> Selesai
  │ ya
  ▼
Jalankan blok kode
  │
  └── Kembali ke cek kondisi
```

### 3.6.1 `for` Loop

`for` loop dipakai ketika kamu tahu **berapa kali** perulangan harus berjalan. Ada tiga bagian: inisialisasi, kondisi, dan increment.

```dart
void main() {
  for (int i = 1; i <= 5; i++) {
    print('Iterasi ke-$i');
  }
}
```

Output:

```
Iterasi ke-1
Iterasi ke-2
Iterasi ke-3
Iterasi ke-4
Iterasi ke-5
```

Cara membacanya:

- `int i = 1` → mulai dari 1.
- `i <= 5` → lanjut selama `i` belum melewati 5.
- `i++` → tambah 1 setiap akhir satu putaran.

### Menghitung mundur

```dart
void main() {
  for (int i = 5; i >= 1; i--) {
    print(i);
  }
}
```

Output:

```
5
4
3
2
1
```

### Menghitung jumlah

```dart
void main() {
  int total = 0;

  for (int i = 1; i <= 10; i++) {
    total += i;
  }

  print('Total 1-10: $total');
}
```

Output:

```
Total 1-10: 55
```

### Menghitung faktorial

```dart
void main() {
  int angka = 5;
  int faktorial = 1;

  for (int i = 1; i <= angka; i++) {
    faktorial *= i;
  }

  print('Faktorial dari $angka = $faktorial');
}
```

Output:

```
Faktorial dari 5 = 120
```

### 3.6.2 `for-in` Loop

`for-in` dipakai saat kamu mengiterasi **isi dari sebuah koleksi** (List, Set, Map, atau String) dan tidak butuh indeks.

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga'];

  for (String nama in buah) {
    print(nama);
  }
}
```

Output:

```
apel
jeruk
mangga
```

Bentuknya juga bisa ditulis dengan `var` atau `final`.

```dart
void main() {
  var angka = [10, 20, 30];

  for (final nilai in angka) {
    print('Nilai: $nilai');
  }
}
```

Output:

```
Nilai: 10
Nilai: 20
Nilai: 30
```

### Mengiterasi Map dengan `for-in`

Dengan `for-in`, variabel di `in` adalah satu pasangan `key` dan `value`.

```dart
void main() {
  Map<String, int> stok = {'apel': 10, 'jeruk': 20};

  for (final entry in stok.entries) {
    print('${entry.key} tersedia ${entry.value} buah');
  }
}
```

Output:

```
apel tersedia 10 buah
jeruk tersedia 20 buah
```

### Mengiterasi String

String di Dart bukan `Iterable`, jadi untuk mengiterasi hurufnya kamu perlu memecah String menjadi List terlebih dahulu memakai `split('')`.

```dart
void main() {
  String kata = 'Dart';

  for (final huruf in kata.split('')) {
    print(huruf);
  }
}
```

Output:

```
D
a
r
t
```

Untuk teks yang mengandung karakter non-ASCII (misalnya aksara Indonesia), gunakan `runes` supaya setiap karakter tetap terhitung satu.

```dart
void main() {
  String kata = 'Dart';

  for (final huruf in kata.runes) {
    print(String.fromCharCode(huruf));
  }
}
```

Output:

```
D
a
r
t
```

### 3.6.3 `while` Loop

`while` dipakai ketika **kondisi** menentukan panjang perulangan, bukan banyaknya perulangan. Perulangan bisa berjalan nol kali kalau kondisinya langsung `false`.

```dart
void main() {
  int i = 1;

  while (i <= 5) {
    print('Angka: $i');
    i++;
  }
}
```

Output:

```
Angka: 1
Angka: 2
Angka: 3
Angka: 4
Angka: 5
```

Penting: pastikan variabel penghitung **selalu berubah** di dalam loop. Kalau tidak, program akan berjalan tanpa henti (*infinite loop*).

### 3.6.4 `do-while` Loop

`do-while` sama seperti `while`, tapi blok kodenya dijalankan **minimal satu kali** sebelum kondisinya dicek.

```dart
void main() {
  int i = 1;

  do {
    print('Angka: $i');
    i++;
  } while (i <= 5);
}
```

Output:

```
Angka: 1
Angka: 2
Angka: 3
Angka: 4
Angka: 5
```

Perbandingan dengan `while`:

```dart
void main() {
  int angka = 10;

  print('while:');
  while (angka < 5) {
    print(angka);
    angka++;
  }

  print('do-while:');
  int angka2 = 10;
  do {
    print(angka2);
    angka2++;
  } while (angka2 < 5);
}
```

Output:

```
while:
do-while:
10
```

`while` tidak menghasilkan output apa pun karena kondisinya langsung salah, sedangkan `do-while` tetap menjalankan blok minimal satu kali.

### Ringkasan perbandingan loop

| Loop       | Dipakai saat                          | Dijalankan minimal |
| ---------- | ------------------------------------- | ------------------- |
| `for`      | Tahu banyaknya perulangan              | 0 kali              |
| `for-in`   | Mengiterasi isi sebuah koleksi        | 0 kali              |
| `while`    | Bergantung pada kondisi                | 0 kali              |
| `do-while` | Minimal harus dijalankan sekali        | 1 kali              |

## 3.7 `break` and `continue`

### `break`

`break` menghentikan loop yang sedang berjalan. Eksekusi dilanjutkan ke pernyataan setelah loop.

```dart
void main() {
  for (int i = 1; i <= 10; i++) {
    if (i == 5) {
      print('Berhenti di angka $i');
      break;
    }
    print(i);
  }
}
```

Output:

```
1
2
3
4
Berhenti di angka 5
```

### `continue`

`continue` melewati sisa isi loop pada iterasi tersebut dan langsung lanjut ke iterasi berikutnya.

```dart
void main() {
  for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      continue; // lewati angka genap
    }
    print(i);
  }
}
```

Output:

```
1
3
5
7
9
```

### Perbandingan

| Kebutuhan                                    | Gunakan   |
| --------------------------------------------- | --------- |
| Menghentikan loop sepenuhnya                 | `break`   |
| Melewati iterasi ini, lanjut ke iterasi berikutnya | `continue` |

### Kapan berhenti mendahulukan continue?

Biasanya `continue` diletakkan **di awal** blok, lalu kode utama follows setelahnya.

```dart
void main() {
  for (int i = 1; i <= 10; i++) {
    if (i < 5) {
      continue;
    }
    print(i);
  }
}
```

Output:

```
5
6
7
8
9
10
```

## 3.8 Nested Loops

Loop di dalam loop disebut **nested loop**. Loop luar mengatur iterasi luar, dan loop inner berjalan sepenuhnya untuk setiap iterasi luar.

```dart
void main() {
  for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
      print('i=$i, j=$j');
    }
  }
}
```

Output:

```
i=1, j=1
i=1, j=2
i=1, j=3
i=2, j=1
i=2, j=2
i=2, j=3
i=3, j=1
i=3, j=2
i=3, j=3
```

Perhatikan polanya: untuk setiap `i`, `j` berjalan dari 1 sampai 3. Total perulangan = 3 × 3 = 9.

### Tabel perkalian

```dart
void main() {
  for (int i = 1; i <= 3; i++) {
    String baris = '';
    for (int j = 1; j <= 3; j++) {
      baris += '${i * j}\t';
    }
    print(baris);
  }
}
```

Output:

```
1	2	3
2	4	6
3	6	9
```

### Menghentikan loop bagian dalam

`break` tanpa label hanya menghentikan loop **paling dalam** yang sedang berjalan.

```dart
void main() {
  for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
      if (j == 2) {
        break; // hentikan hanya loop j
      }
      print('i=$i, j=$j');
    }
  }
}
```

Output:

```
i=1, j=1
i=2, j=1
i=3, j=1
```

### Label pada loop

Kadang kamu ingin menghentikan loop **luar** dari dalam loop bagian dalam. Untuk itu, beri **label** pada loop, lalu pakai `break label` atau `continue label`.

```dart
void main() {
  outer:
  for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
      if (i == 2 && j == 2) {
        print('Menghentikan loop luar di i=$i, j=$j');
        break outer;
      }
      print('i=$i, j=$j');
    }
  }
}
```

Output:

```
i=1, j=1
i=1, j=2
i=1, j=3
i=2, j=1
Menghentikan loop luar di i=2, j=2
```

### Bentuk lain tabel perkalian

```dart
void main() {
  for (int baris = 1; baris <= 5; baris++) {
    String isi = '';
    for (int kolom = 1; kolom <= baris; kolom++) {
      isi += '*';
    }
    print(isi);
  }
}
```

Output:

```
*
**
***
****
*****
```

### Perhatikan: loop di dalam loop bisa mahal

Loop bersarang dengan batas besar menghasilkan banyak iterasi. `for (int i = 0; i < 1000; i++)` di dalam `for (int j = 0; j < 1000; j++)` berarti **1.000.000 iterasi**. Selalu pertimbangkan apakah loop bersarang benar-benar diperlukan.

## 3.9 Praktik Terapan

### Menentukan grade nilai

```dart
void main() {
  List<int> daftarNilai = [95, 78, 60, 88, 45];

  for (final nilai in daftarNilai) {
    String grade;

    if (nilai >= 85) {
      grade = 'A';
    } else if (nilai >= 75) {
      grade = 'B';
    } else if (nilai >= 65) {
      grade = 'C';
    } else {
      grade = 'D';
    }

    print('Nilai $nilai -> $grade');
  }
}
```

Output:

```
Nilai 95 -> A
Nilai 78 -> B
Nilai 60 -> D
Nilai 88 -> A
Nilai 45 -> D
```

### Mencari nilai dalam list

```dart
void main() {
  List<int> daftarNilai = [72, 85, 90, 66];
  int cari = 85;
  bool ditemukan = false;

  for (final nilai in daftarNilai) {
    if (nilai == cari) {
      ditemukan = true;
      break;
    }
  }

  print(ditemukan ? 'Nilai $cari ditemukan' : 'Nilai $cari tidak ditemukan');
}
```

Output:

```
Nilai 85 ditemukan
```

### Menghitung rata-rata dengan while

```dart
void main() {
  List<double> nilai = [80, 90, 70, 85];
  double total = 0;
  int index = 0;

  while (index < nilai.length) {
    total += nilai[index];
    index++;
  }

  double rataRata = total / nilai.length;
  print('Rata-rata: ${rataRata.toStringAsFixed(2)}');
}
```

Output:

```
Rata-rata: 81.25
```

### Validasi input sederhana

```dart
void main() {
  int nilai = 30;

  if (nilai < 0 || nilai > 100) {
    print('Nilai tidak valid');
  } else if (nilai >= 85) {
    print('Nilai sangat baik');
  } else if (nilai >= 65) {
    print('Nilai cukup');
  } else {
    print('Nilai perlu diperbaiki');
  }
}
```

Output:

```
Nilai perlu diperbaiki
```

### Troubleshooting dasar

| Masalah                                       | Solusi                                                        |
| --------------------------------------------- | ------------------------------------------------------------- |
| Program berjalan terus-menerus                | Pastikan variabel penghitung di-increment di dalam loop       |
| Output `case` yang tidak terduga ikut tercetak | Tambahkan `break` di setiap `case` yang tidak kosong         |
| Loop hanya jalan sekali                        | Kemungkinan salah pakai `while` — gunakan `do-while`         |
| `case` kosong tidak bisa dilompati             | Gunakan `continue` di dalam `case` kosong                    |
| Loop terlalu lambat                            | Kurangi tingkat nested loop, atau gunakan operasi koleksi     |

## Ringkasan Pertemuan 3

- Percabangan: `if`, `else if`, `else`, dan kondisi majemuk dengan `&&` / `||`.
- `switch` statement untuk banyak cabang aksi; `switch` expression (Dart 3) untuk banyak cabang nilai, dengan `=>` dan pola.
- Loop: `for` (jumlah pasti), `for-in` (iterasi koleksi), `while` (bergfantung kondisi), `do-while` (minimal satu kali).
- `break` menghentikan loop, `continue` melewati iterasi saat ini.
- Nested loop untuk memproses data dua dimensi, dan `break label` untuk menghentikan loop luar.

---

## Praktik

Latihan untuk pertemuan ini ada di folder lab:

👉 [`../lab/03-conditions-loops/`](../lab/03-conditions-loops/README.md)

Folder lab berisi:

- `README.md` — brief latihan dan checklist progres.
- `exercises/` — latihan kecil per submateri (if, switch, for, for-in, while, break/continue, nested loop).
- `sistem_penilaian_kelas.dart` — Project 3 (Sistem Penilaian Kelas).
- `solusi/` — jawaban referensi (buka setelah mencoba).
