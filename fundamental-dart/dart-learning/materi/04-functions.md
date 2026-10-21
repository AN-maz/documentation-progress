# 📘 Pertemuan 4 — Functions

Dart Fundamentals · Beginner Level

## Tujuan Pembelajaran

Setelah menyelesaikan pertemuan ini, kamu diharapkan mampu:

- Memahami konsep fungsi dan bedanya dengan blok kode biasa.
- Mendefinisikan dan memanggil fungsi.
- Membuat fungsi dengan parameter dan nilai balik (*return value*).
- Menggunakan parameter opsional, named parameter, dan `required`.
- Menulis arrow function dan anonymous function.
- Memahami scope variabel dan closure.
- Mengenumerate fungsi bawaan Dart yang sering dipakai.
- Membaca input pengguna dari terminal memakai `dart:io`.

## 4.1 Introduction to Functions

### Apa itu fungsi?

Fungsi adalah potongan kode yang diberi nama dan bisa dipanggil berkali-kali dari tempat mana saja di program. Fungsi punya dua bagian penting: **parameter** (data yang diterima) dan **nilai balik** (data yang dikembalikan).

Bayangkan fungsi seperti sebuah mesin. Kamu memberi mesin ini **bahan baku** (parameter), mesin bekerja, lalu memberikan **hasil** (return value).

```
Input (parameter)  →  [ FUNGSI ]  →  Output (return value)
```

### Mengapa perlu fungsi?

Tanpa fungsi, kode yang sama harus ditulis berulang-ulang. Dengan fungsi, cukup tulis sekali lalu panggil berkali-kali.

Tanpa fungsi:

```dart
void main() {
  print('Halo, Purwa!');
  print('Halo, Purwa!');
  print('Halo, Purwa!');
}
```

Output:

```
Halo, Purwa!
Halo, Purwa!
Halo, Purwa!
```

Dengan fungsi:

```dart
void main() {
  sapa('Purwa');
  sapa('Purwa');
  sapa('Purwa');
}

void sapa(String nama) {
  print('Halo, $nama!');
}
```


Output:

```
Halo, Purwa!
Halo, Purwa!
Halo, Purwa!
```

### Keuntungan fungsi

- **DRY** (*Don't Repeat Yourself*): kode tidak diulang.
- **Lebih mudah dibaca**: program terbaca sebagai rangkaian maksud, bukan detail.
- **Lebih mudah dites**: satu fungsi bisa diuji terpisah.
- **Bisa dipakai ulang**: di file lain, atau di proyek lain.

## 4.2 Defining and Calling Functions

### Struktur fungsi

```
tipeReturn namaFungsi(parameter) {
  // blok kode
}
```

- `tipeReturn` — tipe data yang dikembalikan (`void` jika tidak mengembalikan apa pun).
- `namaFungsi` — nama fungsi, ditulis dengan `lowerCamelCase`.
- `parameter` — daftar data yang diterima fungsi.
- `{}` — blok kode yang dijalankan saat fungsi dipanggil.

### Mendefinisikan fungsi

Fungsi bisa didefinisikan di dalam `main()` atau di luar (top-level). Gaya yang umum adalah menaruhnya di luar `main()`.

```dart
void main() {
  cetakUcapan();
}

void cetakUcapan() {
  print('Halo, dunia!');
}
```

Output:

```
Halo, dunia!
```

> ⚠️ Pemanggilan fungsi harus berada **setelah** deklarasinya, atau fungsi harus berada di atas. Dart mencari deklarasi dari atas ke bawah.

### Memanggil fungsi

Fungsi dipanggil dengan menuliskan namanya followed by tanda kurung.

```dart
void main() {
  cetakUcapan();
  cetakUcapan();
}

void cetakUcapan() {
  print('Halo, dunia!');
}
```

Output:

```
Halo, dunia!
Halo, dunia!
```

### Urutan eksekusi

Program berjalan dari atas ke bawah. Fungsi yang dipanggil di dalam `main()` baru dijalankan ketika baris itu dieksekusi.

```dart
void main() {
  print('1. Mulai');

  langkahDua();

  print('4. Selesai');
}

void langkahDua() {
  print('2. Langkah dua');
  print('3. Langkah tiga');
}
```

Output:

```
1. Mulai
2. Langkah dua
3. Langkah tiga
4. Selesai
```

## 4.3 Functions with Parameters

Parameter adalah nilai yang diterima fungsi agar bisa bekerja dengan data yang berbeda.

```dart
void main() {
  sapa('Purwa');
  sapa('Budi');
  sapa('Sinta');
}

void sapa(String nama) {
  print('Halo, $nama!');
}
```

Output:

```
Halo, Purwa!
Halo, Budi!
Halo, Sinta!
```

### Beberapa parameter

Fungsi bisa menerima lebih dari satu parameter. Urutannya harus sama saat dipanggil.

```dart
void main() {
  cetakData('Purwa', 20, 'Informatika');
}

void cetakData(String nama, int umur, String jurusan) {
  print('Nama    : $nama');
  print('Umur    : $umur');
  print('Jurusan : $jurusan');
}
```

Output:

```
Nama    : Purwa
Umur    : 20
Jurusan : Informatika
```

### Jenis parameter

| Jenis            | Wajib? | Contoh deklarasi                |
| ---------------- | ------ | ------------------------------- |
| Positional       | Ya     | `void f(int a, String b)`       |
| Optional (nama)  | Tidak  | `void f([int a = 0])`           |
| Named            | Tidak  | `void f({int? a})`              |
| Required named   | Ya     | `void f({required int a})`      |

## 4.4 Functions with Return Values

Fungsi bisa **mengembalikan** nilai ke pemanggilnya dengan kata kunci `return`.

```dart
void main() {
  int hasil = tambah(3, 5);
  print('Hasil: $hasil');
}

int tambah(int a, int b) {
  return a + b;
}
```

Output:

```
Hasil: 8
```

### `return` menghentikan fungsi

Begitu `return` dieksekusi, fungsi langsung berhenti. Kode setelah `return` di fungsi tersebut tidak dijalankan.

```dart
void main() {
  print(periksaNilai(90));
  print(periksaNilai(50));
}

String periksaNilai(int nilai) {
  if (nilai >= 60) {
    return 'Lulus';
  }
  return 'Tidak lulus';
}
```

Output:

```
Lulus
Tidak lulus
```

### Fungsi tanpa nilai balik

Fungsi dengan `void` tidak mengembalikan apa pun.

```dart
void main() {
  cetakPemula();
}

void cetakPemula() {
  print('Belum apa-apa');
}
```


Output:

```
Belum apa-apa
```

## 4.5 Return Types

Tipe return ditulis di depan nama fungsi.

| Tipe return  | Arti                                                    |
| ------------ | ------------------------------------------------------- |
| `void`       | Tidak mengembalikan nilai                               |
| `int`        | Mengembalikan bilangan bulat                            |
| `double`     | Mengembalikan bilangan pecahan                          |
| `String`     | Mengembalikan teks                                      |
| `bool`       | Mengembalikan `true` atau `false`                       |
| `List<T>`    | Mengembalikan daftar                                    |
| `Map<K, V>`  | Mengembalikan peta kunci-nilai                          |
| `dynamic`    | Mengembalikan tipe apa pun (kurang aman)                |
| `Object?`    | Mengembalikan objek apa pun, boleh `null`               |

### Contoh setiap tipe

```dart
void main() {
  print(kapitalisasi('dart'));
  print(tambah(2, 3));
  print(luas(4, 5));
  print(ceilHalf(3.2));
  print(keputusan(true));
  print(daftarAngka(3));
  print(petaWarna());
}

String kapitalisasi(String teks) {
  return teks.toUpperCase();
}

int tambah(int a, int b) {
  return a + b;
}

double luas(int panjang, int lebar) {
  return panjang * lebar.toDouble();
}

int ceilHalf(double angka) {
  return angka.ceil();
}

bool keputusan(bool nilai) {
  return !nilai;
}

List<int> daftarAngka(int n) {
  return List.generate(n, (i) => i + 1);
}

Map<String, String> petaWarna() {
  return {'warna1': 'merah', 'warna2': 'biru'};
}
```

Output:

```
DART
5
20.0
4
false
[1, 2, 3]
{warna1: merah, warna2: biru}
```

### Fungsi tanpa `return`

Fungsi bertipe `void` tidak boleh memakai `return` dengan nilai.

```dart
void main() {
  void kosong() {
    return; //Legal: return tanpa nilai
  }

  kosong();

  // return 10; // Error: fungsi void tidak boleh mengembalikan nilai
}
```

## 4.6 Optional Parameters

Parameter opsional berada di dalam kurung siku `[]` dan boleh tidak diberikan saat fungsi dipanggil. Nilainya bisa punya nilai default.

```dart
void main() {
  sapa('Purwa');
  sapa('Budi', 'Selamat pagi');
  sapa('Sinta', 'Selamat sore');
}

void sapa(String nama, [String sapaan = 'Halo']) {
  print('$sapaan, $nama!');
}
```

Output:

```
Halo, Purwa!
Selamat pagi, Budi!
Selamat sore, Sinta!
```

Parameter opsional harus diletakkan **setelah** parameter wajib. Kalau ada dua parameter opsional, pemanggil harus memakai *named parameter* untuk menyebut yang kedua.

```dart
void main() {
  hitung(1);
  hitung(1, 2);
}

void hitung(int a, [int b = 0]) {
  print('a=$a, b=$b');
}
```

Output:

```
a=1, b=0
a=1, b=2
```

## 4.7 Named Parameters

Parameter named berada di dalam kurung kurawal `{}` dan dipanggil dengan menyebut **namanya**. Ini membuat kode lebih jelas, terutama saat parameter banyak.

```dart
void main() {
  buatProfil(
    nama: 'Purwa',
    umur: 20,
    jurusan: 'Informatika',
  );
}

void buatProfil({
  required String nama,
  required int umur,
  String jurusan = 'Belum ditentukan',
}) {
  print('Nama    : $nama');
  print('Umur    : $umur');
  print('Jurusan : $jurusan');
}
```

Output:

```
Nama    : Purwa
Umur    : 20
Jurusan : Informatika
```

Parameter named boleh dipanggil dengan urutan apa pun karena yang dicocokkan adalah namanya.

```dart
void main() {
  buatProfil(umur: 20, nama: 'Purwa', jurusan: 'Informatika');
}

void buatProfil({
  required String nama,
  required int umur,
  String jurusan = 'Belum ditentukan',
}) {
  print('Nama    : $nama');
  print('Umur    : $umur');
  print('Jurusan : $jurusan');
}
```

Output:

```
Nama    : Purwa
Umur    : 20
Jurusan : Informatika
```

## 4.8 Required Parameters

Secara default, parameter named bersifat opsional. Modifier `required` membuatnya **wajib** diisi saat fungsi dipanggil.

```dart
void main() {
  // deskripsi('Produk A'); // Error: parameter 'harga' wajib diisi
  deskripsi('Produk A', harga: 25000);
}

void deskripsi(String nama, {required int harga}) {
  print('$nama: $harga');
}
```

Output:

```
Produk A: 25000
```

### `required` hanya untuk named parameter

Modifier `required` tidak bisa dipakai pada parameter positional.

```dart
void main() {
  hitung(5);
}

void hitung(int a) {
  print(a);
}
```

Output:

```
5
```

### Parameter wajib + named

```dart
void main() {
  transfer(
    500000,
    tujuan: 'BCA',
    catatan: 'Gaji bulan ini',
  );
}

void transfer(int nominal, {String? tujuan, String? catatan}) {
  print('Nominal  : $nominal');
  print('Tujuan   : ${tujuan ?? '-'}');
  print('Catatan  : ${catatan ?? '-'}');
}
```

Output:

```
Nominal  : 500000
Tujuan   : BCA
Catatan  : Gaji bulan ini
```

## 4.9 Arrow Functions

Arrow function (`=>`) adalah cara ringkas menulis fungsi yang **hanya punya satu ekspresi** dan langsung mengembalikan hasilnya.

Bentuk panjang:

```dart
int tambah(int a, int b) {
  return a + b;
}
```

Bentuk panah:

```dart
int tambah(int a, int b) => a + b;
```

Contoh lengkap:

```dart
void main() {
  print(kali(4, 5));
  print(panjang('Dart'));
  print(lebihBesar(3, 7));
}

int kali(int a, int b) => a * b;

int panjang(String teks) => teks.length;

bool lebihBesar(int a, int b) => a > b;
```

Output:

```
20
4
false
```

### Batasan arrow function

Arrow function hanya boleh berisi **satu ekspresi** tanpa titik koma. Kalau butuh beberapa statement atau percabangan, gunakan bentuk blok biasa.

```dart
void main() {
  print(grade(85));
}

String grade(int nilai) {
  if (nilai >= 85) {
    return 'A';
  }
  return 'B';
}
```


Output:

```
A
```

Arrow function juga bisa tanpa tipe return.

```dart
void main() {
  sapa('Purwa');
}

void sapa(String nama) => print('Halo, $nama!');
```

Output:

```
Halo, Purwa!
```

## 4.10 Anonymous Functions

Anonymous function adalah fungsi **tanpa nama** yang langsung ditulis di tempat ia dipakai. Bentuknya sama seperti fungsi biasa, tapi tidak punya nama.

```dart
void main() {
  final tambah = (int a, int b) => a + b;

  print(tambah(3, 5));
}
```

Output:

```
8
```

### Anonymous function dengan bentuk blok

```dart
void main() {
  final sapa = (String nama) {
    print('Halo, $nama!');
  };

  sapa('Purwa');
  sapa('Budi');
}
```

Output:

```
Halo, Purwa!
Halo, Budi!
```

### Anonymous function sebagai argumen

Ini adalah penggunaan paling umum — dipakai oleh fungsi bawaan seperti `map`, `where`, dan `forEach`.

```dart
void main() {
  List<int> angka = [1, 2, 3, 4, 5];

  final hasil = angka.map((n) => n * 2).toList();

  print(hasil);
}
```

Output:

```
[2, 4, 6, 8, 10]
```

### Closure

Anonymous function yang dibuat di dalam fungsi lain bisa **mengakses variabel dari scope luarnya**. Kemampuan ini disebut *closure*.

```dart
void main() {
  int pengali = 3;

  final kaliTiga = (int angka) => angka * pengali;

  print(kaliTiga(5));
}
```

Output:

```
15
```

## 4.11 Variable Scope

Scope adalah jangkauan di mana sebuah variabel bisa diakses.

### 4.11.1 Local scope

Variabel yang dideklarasikan di dalam sebuah fungsi hanya bisa diakses di fungsi itu.

```dart
void main() {
  int umur = 20;
  print(umur);
}

void fungsiLain() {
  // print(umur); // Error: umur tidak dikenal di sini
}
```

### 4.11.2 Global scope

Variabel yang dideklarasikan di luar semua fungsi bisa diakses dari mana saja di file tersebut.

```dart
int pengali = 3;

void main() {
  print(kali(5));
}

int kali(int angka) {
  return angka * pengali;
}
```

Output:

```
15
```

Secara umum, hindari variabel global karena membuat program sulit dilacak. Sebaiknya gunakan variabel lokal dan konstanta dengan nama yang jelas.

### 4.11.3 Bayangan variabel (*shadowing*)

Variabel di dalam fungsi boleh memiliki nama yang sama dengan variabel global. Variabel lokal akan "menutupi" (shadow) variabel global selama fungsi berjalan.

```dart
int nilai = 100;

void main() {
  print(nilai); // 100

  fungsiLain();
}

void fungsiLain() {
  int nilai = 50;
  print(nilai); // 50, variabel lokal menutupi yang global
}
```

Output:

```
100
50
```

### 4.11.4 Variabel blok

Variabel yang dideklarasikan di dalam `if`, `for`, atau `while` hanya hidup di dalam blok tersebut.

```dart
void main() {
  for (int i = 0; i < 3; i++) {
    print(i);
  }

  // print(i); // Error: i hanya ada di dalam blok for
}
```

## 4.12 Built-in Functions

Dart menyediakan banyak fungsi bawaan yang bisa langsung dipakai.

### String

| Fungsi                    | Contoh                                | Hasil        |
| ------------------------- | ------------------------------------- | ------------ |
| `toUpperCase()`           | `'dart'.toUpperCase()`                | `DART`       |
| `toLowerCase()`           | `'DART'.toLowerCase()`                | `dart`       |
| `length`                  | `'Dart'.length`                       | `4`          |
| `substring()`             | `'Dart'.substring(0, 3)`              | `Dar`        |
| `split()`                 | `'a,b,c'.split(',')`                  | `[a, b, c]`  |
| `trim()`                  | `'  Dart  '.trim()`                   | `Dart`       |
| `contains()`              | `'Dart'.contains('ar')`               | `true`       |
| `startsWith()`            | `'Dart'.startsWith('D')`              | `true`       |
| `endsWith()`              | `'Dart'.endsWith('t')`                | `true`       |
| `indexOf()`               | `'Dart'.indexOf('r')`                 | `2`          |
| `replaceAll()`            | `'a-b'.replaceAll('-', '+')`           | `a+b`        |
| `padLeft()`               | `'5'.padLeft(3, '0')`                 | `005`        |
| `isEmpty`                 | `''.isEmpty`                          | `true`       |

```dart
void main() {
  print('dart'.toUpperCase());
  print('Dart'.length);
  print('Dart'.substring(0, 3));
  print('a,b,c'.split(','));
  print('  Dart  '.trim());
  print('Dart'.contains('ar'));
  print('5'.padLeft(3, '0'));
}
```

Output:

```
DART
4
Dar
[a, b, c]
Dart
true
005
```

### Angka

| Fungsi                 | Contoh                    | Hasil  |
| ---------------------- | ------------------------- | ------ |
| `abs()`                | `(-5).abs()`              | `5`    |
| `round()`              | `3.6.round()`             | `4`    |
| `floor()`              | `3.9.floor()`             | `3`    |
| `ceil()`               | `3.1.ceil()`              | `4`    |
| `toInt()`              | `3.9.toInt()`             | `3`    |
| `toDouble()`           | `3.toDouble()`            | `3.0`   |
| `toStringAsFixed()`    | `3.14159.toStringAsFixed(2)` | `3.14` |
| `parse()`              | `int.parse('42')`         | `42`   |
| `tryParse()`           | `int.tryParse('abc')`     | `null` |

### Koleksi

| Fungsi                                | Contoh                              | Hasil              |
| ------------------------------------- | ----------------------------------- | ------------------ |
| `List.generate()`                     | `List.generate(3, (i) => i * 2)`    | `[0, 2, 4]`        |
| `List.filled()`                       | `List.filled(3, 0)`                 | `[0, 0, 0]`        |
| `add()` / `addAll()`                  | `daftar.add(1)`                     | —                  |
| `removeAt()`                          | `daftar.removeAt(0)`                | —                  |
| `first` / `last`                      | `daftar.first`                      | elemen pertama     |
| `isEmpty` / `isNotEmpty`              | `daftar.isEmpty`                    | `bool`             |
| `contains()`                          | `daftar.contains(1)`                | `bool`             |
| `where()`                             | `daftar.where((e) => e > 2)`        | `List`             |
| `map()`                               | `daftar.map((e) => e * 2)`          | `Iterable`         |
| `forEach()`                           | `daftar.forEach(print)`             | `void`             |
| `sort()`                              | `daftar.sort()`                     | —                  |
| `reduce()`                            | `daftar.reduce((a, b) => a + b)`     | nilai akhir        |
| `keys` / `values` / `entries`         | `peta.keys`                         | `Iterable`         |

```dart
void main() {
  List<int> angka = [5, 3, 8, 1];

  angka.sort();
  print(angka);

  print(angka.map((e) => e * 2).toList());
  print(angka.where((e) => e > 3).toList());
  print(angka.reduce((a, b) => a + b));
  print(List.generate(4, (i) => i * i));
}
```

Output:

```
[1, 3, 5, 8]
[2, 6, 10, 16]
[5, 8]
17
[0, 1, 4, 9]
```

### `dart:math`

Untuk perhitungan matematika, Dart menyediakan library `dart:math`.

```dart
import 'dart:math';

void main() {
  print(sqrt(16)); // 4.0
  print(pow(2, 10)); // 1024
  print(min(3, 7)); // 3
  print(max(3, 7)); // 7
  print(pi); // 3.141592653589793
}
```

Output:

```
4.0
1024
3
7
3.141592653589793
```

## 4.13 Input dari Terminal (`dart:io`)

Semua program sejauh ini memakai nilai yang ditulis langsung di dalam kode. Untuk program interaktif, kamu perlu membaca input pengguna dari terminal. Dart menyediakan library `dart:io` untuk ini.

### Membaca input teks

Fungsi `stdin.readLineSync()` membaca satu baris dari keyboard. Nilainya bertipe `String?` karena bisa saja tidak ada yang diinput.

```dart
import 'dart:io';

void main() {
  print('Masukkan nama kamu: ');
  String? nama = stdin.readLineSync();

  print('Halo, $nama!');
}
```

Contoh (jika yang diinput adalah `Purwa`):

```
Masukkan nama kamu: 
Halo, Purwa!
```

### Mengambil input yang sudah pasti terisi

Karena `readLineSync()` bisa `null`, pola yang aman adalah memakai operator `??`.

```dart
import 'dart:io';

void main() {
  print('Masukkan nama kamu: ');
  String nama = stdin.readLineSync() ?? 'Tamu';

  print('Halo, $nama!');
}
```

Contoh (jika yang diinput adalah `Purwa`):

```
Masukkan nama kamu: 
Halo, Purwa!
```

### Membaca input angka

Input dari keyboard selalu berupa teks, jadi harus dikonversi. Gunakan `int.tryParse()` agar program tidak crash kalau pengguna mengetik yang salah.

```dart
import 'dart:io';

void main() {
  print('Masukkan umur: ');
  int? umur = int.tryParse(stdin.readLineSync() ?? '');

  if (umur == null) {
    print('Input tidak valid');
  } else {
    print('Umur kamu $umur tahun');
  }
}
```

Contoh (jika yang diinput adalah `20`):

```
Masukkan umur: 
Umur kamu 20 tahun
```

### Membaca input angka dengan nilai default

Supaya program tetap berjalan walau input salah, gunakan nilai bawaan:

```dart
import 'dart:io';

void main() {
  print('Masukkan umur: ');
  int umur = int.tryParse(stdin.readLineSync() ?? '') ?? 0;

  print('Umur kamu $umur tahun');
}
```

Contoh (jika yang diinput adalah `20`):

```
Masukkan umur: 
Umur kamu 20 tahun
```

### Fungsi pembantu untuk input

Supaya kode tidak berulang, buat fungsi sendiri yang menerima pesan dan mengembalikan hasil yang sudah dikonversi.

```dart
import 'dart:io';

void main() {
  String nama = bacaTeks('Masukkan nama: ');
  int umur = bacaAngka('Masukkan umur: ');

  print('$nama berumur $umur tahun');
}

String bacaTeks(String prompt) {
  stdout.write(prompt);
  return stdin.readLineSync() ?? '';
}

int bacaAngka(String prompt) {
  while (true) {
    stdout.write(prompt);
    int? nilai = int.tryParse(stdin.readLineSync() ?? '');

    if (nilai != null) {
      return nilai;
    }
    print('Input tidak valid, coba lagi.');
  }
}
```

Contoh (jika inputnya `Purwa` lalu `20`):

```
Masukkan nama: Masukkan umur: Purwa berumur 20 tahun
```

## 4.14 Praktik Terapan

### Menghitung luas dan keliling

```dart
void main() {
  double luasPersegi(double sisi) {
    return sisi * sisi;
  }

  double kelilingPersegi(double sisi) {
    return 4 * sisi;
  }

  double luasPersegiPanjang(double panjang, double lebar) {
    return panjang * lebar;
  }

  print('Luas persegi      : ${luasPersegi(4).toStringAsFixed(2)}');
  print('Keliling persegi  : ${kelilingPersegi(4).toStringAsFixed(2)}');
  print('Luas persegi panjang: ${luasPersegiPanjang(5, 3).toStringAsFixed(2)}');
}
```

Output:

```
Luas persegi      : 16.00
Keliling persegi  : 16.00
Luas persegi panjang: 15.00
```

### Fungsi dengan nilai balik majemuk

Fungsi hanya bisa mengembalikan **satu** nilai. Kalau butuh lebih dari satu, kembalikan objek `Map` atau `List`.

```dart
void main() {
  Map<String, dynamic> analisisNilai(int nilai) {
    String predikat;
    String status;

    if (nilai >= 85) {
      predikat = 'A';
    } else if (nilai >= 75) {
      predikat = 'B';
    } else if (nilai >= 65) {
      predikat = 'C';
    } else {
      predikat = 'D';
    }

    status = nilai >= 65 ? 'Lulus' : 'Tidak Lulus';

    return {'predikat': predikat, 'status': status};
  }

  final hasil = analisisNilai(78);
  print('Predikat: ${hasil['predikat']}');
  print('Status  : ${hasil['status']}');
}
```

Output:

```
Predikat: B
Status  : Lulus
```

### Fungsi penghitung diskon bertingkat

```dart
void main() {
  double hitungHarga(double harga, double diskon) {
    return harga - (harga * diskon);
  }

  double hargaAkhir(double harga) {
    if (harga >= 500000) {
      return hitungHarga(harga, 0.2);
    } else if (harga >= 200000) {
      return hitungHarga(harga, 0.1);
    }
    return harga;
  }

  print(hargaAkhir(600000).toStringAsFixed(0));
  print(hargaAkhir(300000).toStringAsFixed(0));
  print(hargaAkhir(100000).toStringAsFixed(0));
}
```

Output:

```
480000
270000
100000
```

### Troubleshooting dasar

| Masalah                                        | Solusi                                                          |
| ---------------------------------------------- | --------------------------------------------------------------- |
| `The function 'x' isn't defined`               | Nama fungsi salah, atau dipanggil sebelum dideklarasikan        |
| `Too many positional arguments`                 | Jumlah parameter saat memanggil tidak cocok                     |
| `Missing named argument 'harga'`                | Parameter `required` belum diisi saat pemanggilan               |
| `A value of type 'Null' can't be returned`      | Kembalikan `null` dari fungsi non-null, atau ubah tipe return |
| Program berhenti tanpa output                  | `stdin.readLineSync()` menunggu input — pastikan program dijalankan di terminal |
| `Undefined name 'sqrRoot'`                      | `sqrt` berada di `dart:math` — tambahkan `import 'dart:math';` |

## Ringkasan Pertemuan 4

- Fungsi = parameter + nilai balik, dipakai untuk menghindari pengulangan kode.
- Parameter: positional (wajib), optional `[ ]`, named `{ }`, dan `required` untuk named.
- Tipe return: `void`, `int`, `double`, `String`, `bool`, `List<T>`, `Map<K, V>`, `dynamic`.
- Arrow function `=>` untuk satu ekspresi; anonymous function untuk fungsi tanpa nama.
- Scope: lokal, global, bayangan variabel, dan closure.
- Fungsi bawaan Dart (`toUpperCase`, `parse`, `map`, `where`, `sort`, `reduce`, `dart:math`).
- Input terminal dengan `import 'dart:io';` dan `stdin.readLineSync()`.

---

## Praktik

Latihan untuk pertemuan ini ada di folder lab:

👉 [`../lab/04-functions/`](../lab/04-functions/README.md)

Folder lab berisi:

- `README.md` — brief latihan dan checklist progres.
- `exercises/` — latihan kecil per submateri (fungsi dasar, parameter, return, parameter opsional/named, arrow & anonymous, scope, input terminal).
- `kasir_sederhana.dart` — Project 4 (Program Kasir Sederhana, interaktif).
- `solusi/` — jawaban referensi (buka setelah mencoba).
