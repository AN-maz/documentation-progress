# 📘 Pertemuan 2 — Variables, Data Types & Operators

Dart Fundamentals · Beginner Level

## Tujuan Pembelajaran

Setelah menyelesaikan pertemuan ini, kamu diharapkan mampu:

- Memahami konsep variabel dan cara mendeklarasikan variabel di Dart.
- Membedakan deklarasi `var`, `dynamic`, dan tipe eksplisit.
- Memahami perbedaan `final` dan `const`.
- Mengenalkan tipe data dasar Dart: `int`, `double`, `String`, `bool`, `List`, `Set`, dan `Map`.
- Memahami type inference dan konversi tipe data.
- Menggunakan string interpolation untuk menampilkan nilai.
- Menguasai operator aritmetika, assignment, perbandingan, logika, inkrement/dekrement, ternary, dan null-aware.
- Menulis program sederhana yang memproses data nilai mahasiswa.

## 2.1 Variables in Dart

### Apa itu variabel?

Variabel adalah tempat untuk menyimpan nilai di dalam memori selama program berjalan. Setiap variabel punya **nama**, **tipe data**, dan **nilai**.

Bayangkan variabel seperti kotak berlabel: nama variabel adalah label pada kotak, tipe data menentukan isi kotak apa yang boleh ditaruh, dan nilai adalah isi kotak tersebut.

```
nama    →  "Purwa"     (String)
umur    →  20          (int)
nilai   →  85.5        (double)
aktif   →  true        (bool)
```

### Mendeklarasikan variabel

Pada Dart, deklarasi variabel selalu dimulai dengan kata kunci `var` atau nama tipe datanya, diikuti nama variabel, tanda `=`, lalu nilainya.

```dart
void main() {
  String nama = 'Purwa';
  int umur = 20;
  double nilai = 85.5;
  bool aktif = true;

  print(nama);
  print(umur);
  print(nilai);
  print(aktif);
}
```

Output:

```
Purwa
20
85.5
true
```

### Aturan penamaan variabel

- Nama variabel boleh terdiri dari huruf, angka, `_`, dan `$`.
- Tidak boleh diawali angka.
- Tidak boleh memakai keyword Dart seperti `class`, `if`, `void`, atau `return`.
- Bersifat **case-sensitive**: `nama` dan `Nama` adalah dua variabel berbeda.
- Untuk variabel dan fungsi, gunakan gaya `lowerCamelCase`.

```dart
void main() {
  int umur = 20;
  int Umur = 21; // variabel berbeda, hanya beda huruf besar

  print(umur);
  print(Umur);
}
```

Output:

```
20
21
```

### Mengubah nilai variabel

Variabel yang dideklarasikan tanpa `final` atau `const` bisa nilainya diganti kapan saja.

```dart
void main() {
  int umur = 20;
  print('Umur sekarang: $umur');

  umur = 21;
  print('Umur setelah diubah: $umur');
}
```

Output:

```
Umur sekarang: 20
Umur setelah diubah: 21
```

### Variabel tanpa nilai awal

Variabel bisa dideklarasikan dulu tanpa nilai, lalu diisi nanti. Namun, Dart memberikan nilai default berupa `null`, dan variabel tersebut bertipe `null` sampai diisi.

```dart
void main() {
  String? nama; // ? menandakan nilai null diizinkan

  print(nama); // null

  nama = 'Purwa';
  print(nama); // Purwa
}
```

Output:

```
null
Purwa
```

Variabel `nama` di atas tidak langsung bisa dipakai sebelum diisi karena Dart menerapkan null safety. Kita akan membahas null safety lebih lanjut pada Pertemuan 6.

## 2.2 Variable Declaration: `var`, `dynamic`, and Explicit Types

Dart menyediakan tiga cara utama untuk mendeklarasikan variabel.

### 2.2.1 `var` — tipe disimpulkan otomatis

`var` berarti Dart yang menentukan tipe datanya berdasarkan nilai yang kamu berikan.

```dart
void main() {
  var nama = 'Purwa'; // String
  var umur = 20; // int
  var nilai = 85.5; // double
  var aktif = true; // bool

  print(nama.runtimeType);
  print(umur.runtimeType);
  print(nilai.runtimeType);
  print(aktif.runtimeType);
}
```

Output:

```
String
int
double
bool
```

Walaupun `var` memberi fleksibilitas, Dart tetap menjaga kode tetap aman: `var nama = 'Purwa';` berarti `nama` bertipe `String` dan tidak bisa diisi angka.

```dart
void main() {
  var nama = 'Purwa';
  nama = 20; // Error: tipe String tidak bisa menerima int
}
```

### 2.2.2 Tipe eksplisit

Kamu juga bisa menulis tipe datanya langsung. Ini dianggap lebih baik karena kode lebih mudah dibaca dan intent-nya jelas.

```dart
void main() {
  String nama = 'Purwa';
  int umur = 20;
  double nilai = 85.5;
  bool aktif = true;

  print('$nama berumur $umur tahun, nilai $nilai, aktif: $aktif');
}
```

Output:

```
Purwa berumur 20 tahun, nilai 85.5, aktif: true
```

### 2.2.3 `dynamic` — tipe ditentukan saat runtime

`dynamic` membuat variabel yang bisa menampung nilai apa saja. Nilainya diperiksa baru ketika program berjalan.

```dart
void main() {
  dynamic data = 'Purwa';
  print(data);

  data = 20;
  print(data);

  data = true;
  print(data);
}
```

Output:

```
Purwa
20
true
```

### 2.2.4 Perbandingan ketiganya

| Aspek                | `var`                      | Tipe eksplisit             | `dynamic`                     |
| -------------------- | -------------------------- | -------------------------- | ----------------------------- |
| Tipe ditentukan      | Saat compile (dari nilai)  | Saat compile (ditulis)     | Saat runtime                  |
| Contoh               | `var umur = 20;`           | `int umur = 20;`           | `dynamic umur = 20;`          |
| Bisa ganti tipe      | Tidak                      | Tidak                      | Ya                            |
| Keamanan             | Tinggi                     | Tinggi                     | Rendah (error baru saat jalan) |
| Disarankan           | Ya                         | Ya                         | Jangan berlebihan            |

Rekomendasi praktis: gunakan `var` bila tipenya sudah jelas dari nilai, gunakan tipe eksplisit bila kamu ingin menegaskan, dan hindari `dynamic` kecuali benar-benar diperlukan.

## 2.3 Immutable Variables: `final` and `const`

Secara default, variabel Dart bisa diubah. Ada dua cara untuk membuat variabel yang **tidak bisa diubah** setelah assignment pertama: `final` dan `const`.

### 2.3.1 `final` — tetap, ditentukan saat runtime

`final` berarti nilai variabel hanya bisa ditetapkan **satu kali**, tapi nilainya boleh ditentukan ketika program berjalan (runtime).

```dart
void main() {
  final String nama = 'Purwa';
  print(nama);

  // nama = 'Budi'; // Error: Assignment to final variable
}
```

Output:

```
Purwa
```

Contoh `final` yang nilainya dihitung saat runtime:

```dart
void main() {
  // Nilai dihitung saat program berjalan, bukan ditulis langsung
  final jumlahItem = ['apel', 'jeruk', 'mangga'].length;
  final totalHarga = jumlahItem * 5000;

  print('Jumlah item   : $jumlahItem');
  print('Total harga   : $totalHarga');
}
```

Output:

```
Jumlah item   : 3
Total harga   : 15000
```

### 2.3.2 `const` — tetap, ditentukan saat compile time

`const` lebih ketat lagi. Nilainya harus sudah diketahui **saat program dikompilasi** (compile time), sehingga nilainya bisa dibagikan dan dioptimalkan oleh Dart.

```dart
void main() {
  const double pi = 3.14;
  const String namaKursus = 'Dart Fundamentals';

  print(pi);
  print(namaKursus);
}
```

Output:

```
3.14
Dart Fundamentals
```

### 2.3.3 Perbedaan `final` dan `const`

| Aspek                    | `final`                              | `const`                            |
| ------------------------ | ------------------------------------ | ---------------------------------- |
| Nilai ditetapkan         | Satu kali                            | Satu kali                          |
| Kapan nilainya diketahui | Saat runtime                         | Saat compile time                  |
| Boleh menghitung         | Ya                                   | Tidak                              |
| Boleh pakai fungsi       | Ya                                   | Tidak                              |
| Nilai bisa dibagikan     | Tidak                                | Ya (const object)                  |

Contoh error `const` dengan nilai runtime:

```dart
void main() {
  final waktuku = DateTime.now();

  // const waktuku = DateTime.now(); // Error: Const constructor can't be called with a runtime value
  print(waktuku);
}
```

Output:

```
2026-01-01 00:00:00.000
```

(Tanggal di atas hanya ilustrasi — nilai sebenarnya adalah waktu saat program dijalankan.)

### 2.3.4 `const` pada koleksi

`const` juga bisa dipakai pada `List`, `Set`, dan `Map` sehingga isinya tidak bisa diubah sama sekali.

```dart
void main() {
  const daftarNilai = [80, 90, 100];
  print(daftarNilai);

  // daftarNilai.add(70); // Error: List ini const, tidak bisa diubah
}
```

Output:

```
[80, 90, 100]
```

### Ringkasan

| Kebutuhan                                   | Pilihan                     |
| ------------------------------------------- | --------------------------- |
| Nilai boleh berubah                         | `var` / tipe eksplisit      |
| Nilai tidak boleh berubah, diketahui runtime | `final`                     |
| Nilai tidak boleh berubah, diketahui compile | `const`                     |

## 2.4 Data Types

Dart memiliki banyak tipe data. Pada bagian ini kita fokus pada tipe data yang paling sering dipakai.

### 2.4.1 Integers (`int`)

Tipe `int` menyimpan bilangan bulat, positif maupun negatif, tanpa bagian desimal.

```dart
void main() {
  int umur = 20;
  int suhu = -5;
  int tahunLahir = 2006;

  print(umur);
  print(suhu);
  print(tahunLahir);
}
```

Output:

```
20
-5
2006
```

Nilai `int` di Dart bisa mencapai rentang sekitar −2⁶³ sampai 2⁶³−1, jauh lebih besar dari Integer 32-bit.

### 2.4.2 Floating-point Numbers (`double`)

Tipe `double` menyimpan bilangan pecahan. Bentuk penulisan yang umum adalah dengan titik desimal.

```dart
void main() {
  double nilai = 85.5;
  double tinggiBadan = 1.75;
  double pi = 3.14159;

  print(nilai);
  print(tinggiBadan);
  print(pi);
}
```

Output:

```
85.5
1.75
3.14159
```

Catatan: `double` bisa ditulis dengan eksponen juga, misalnya `1e3` yang setara dengan 1000.0.

### 2.4.3 Strings (`String`)

Tipe `String` menyimpan teks. String di Dart bersifat **immutable**, artinya nilainya tidak bisa diubah setelah dibuat.

```dart
void main() {
  String nama = 'Purwa';
  String jurusan = "Informatika";
  String kosong = '';

  print(nama);
  print(jurusan);
  print('Panjang nama: ${nama.length}');
  print('Kosong: "$kosong"');
}
```

Output:

```
Purwa
Informatika
Panjang nama: 5
Kosong: ""
```

### 2.4.4 Booleans (`bool`)

Tipe `bool` hanya punya dua nilai: `true` dan `false`.

```dart
void main() {
  bool aktif = true;
  bool lulus = false;
  bool hasilPerbandingan = 10 > 5;

  print(aktif);
  print(lulus);
  print(hasilPerbandingan);
}
```

Output:

```
true
false
true
```

### 2.4.5 Lists, Sets, and Maps

#### List — kumpulan data berurutan

`List` menyimpan kumpulan nilai dengan urutan. Nilainya bisa duplikat.

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga', 'apel'];

  print(buah);
  print(buah[0]); // apel
  print(buah.length); // 4
}
```

Output:

```
[apel, jeruk, mangga, apel]
apel
4
```

List bisa dideklarasikan dengan `var` atau `final`, dan bisa dibuat kosong lalu diisi.

```dart
void main() {
  var nilai = <int>[];
  nilai.add(80);
  nilai.add(90);

  print(nilai);
}
```

Output:

```
[80, 90]
```

#### Set — kumpulan data unik tanpa urutan

`Set` menyimpan nilai tanpa duplikasi dan tanpa urutan pasti.

```dart
void main() {
  Set<String> buah = {'apel', 'jeruk', 'mangga', 'apel'};

  print(buah);
  print(buah.length); // 3, 'apel' hanya tersimpan sekali
}
```

Output:

```
{apel, jeruk, mangga}
3
```

#### Map — pasangan kunci dan nilai

`Map` menyimpan data dalam bentuk pasangan kunci dan nilai (key-value). Kunci harus unik.

```dart
void main() {
  Map<String, dynamic> dataMahasiswa = {
    'nama': 'Purwa',
    'umur': 20,
    'jurusan': 'Informatika',
  };

  print(dataMahasiswa['nama']);
  print(dataMahasiswa['jurusan']);
  print(dataMahasiswa['umur']);
}
```

Output:

```
Purwa
Informatika
20
```

### Ringkasan tipe data

| Tipe      | Contoh nilai              | Keterangan                              |
| --------- | ------------------------- | --------------------------------------- |
| `int`     | `20`, `-5`                | Bilangan bulat                          |
| `double`  | `85.5`, `3.14`            | Bilangan pecahan                        |
| `String`  | `'Purwa'`                 | Teks, immutable                         |
| `bool`    | `true`, `false`           | Nilai kebenaran                         |
| `List`    | `[1, 2, 3]`               | Kumpulan berurutan, boleh duplikat      |
| `Set`     | `{1, 2, 3}`               | Kumpulan unik, tanpa urutan             |
| `Map`     | `{'a': 1}`                | Pasangan kunci dan nilai                |

## 2.5 Type Inference

Type inference adalah kemampuan Dart menyimpulkan tipe variabel secara otomatis dari nilai yang diberikan, tanpa kamu menulis tipe datanya secara eksplisit.

```dart
void main() {
  var nama = 'Purwa'; // disimpulkan String
  var umur = 20; // disimpulkan int
  var nilai = 85.5; // disimpulkan double
  var lulus = true; // disimpulkan bool

  print(nama.runtimeType); // String
  print(umur.runtimeType); // int
  print(nilai.runtimeType); // double
  print(lulus.runtimeType); // bool
}
```

Output:

```
String
int
double
bool
```

Perhatikan apa yang **tidak** terjadi: `var nilai = 85.5;` tidak disimpulkan menjadi `num`. Dart menyimpulkan tipe paling spesifik yang sesuai, yaitu `double`.

Untuk koleksi, type inference juga bisa dipakai selama nilainya jelas dari literal:

```dart
void main() {
  var angka = [1, 2, 3]; // List<int>
  var huruf = ['a', 'b']; // List<String>

  print(angka.runtimeType); // List<int>
  print(huruf.runtimeType); // List<String>
}
```

Output:

```
List<int>
List<String>
```

## 2.6 Type Conversion

Kadang nilai yang kamu terima bentuknya belum sesuai dengan tipe yang dibutuhkan. Contohnya input dari terminal selalu berupa teks, padahal kamu butuh angka untuk perhitungan.

### 2.6.1 Mengubah String ke angka

Gunakan `int.parse()` untuk bilangan bulat dan `double.parse()` untuk bilangan pecahan.

```dart
void main() {
  String inputUmur = '20';
  String inputNilai = '85.5';

  int umur = int.parse(inputUmur);
  double nilai = double.parse(inputNilai);

  print(umur + 1);
  print(nilai + 0.5);
}
```

Output:

```
21
86.0
```

Kalau teksnya bukan angka, `parse()` akan membuat program berhenti dengan error. Untuk kondisi yang aman, gunakan `tryParse()` yang mengembalikan `null` jika gagal.

```dart
void main() {
  String input = 'bukan angka';

  int? hasil = int.tryParse(input);
  if (hasil == null) {
    print('Input tidak valid: $input');
  } else {
    print('Hasil: $hasil');
  }
}
```

Output:

```
Input tidak valid: bukan angka
```

### 2.6.2 Mengubah angka ke String

Gunakan `.toString()`.

```dart
void main() {
  int umur = 20;
  double nilai = 85.5;

  print('Umur saya $umur tahun');
  print('Nilai saya ${nilai.toString()}');
  print('Umur sebagai teks: ${umur.toStringAsFixed(0)}');
}
```

Output:

```
Umur saya 20 tahun
Nilai saya 85.5
Umur sebagai teks: 20
```

### 2.6.3 Mengubah angka pecahan ke bulat

Gunakan `.toInt()` (dibulatkan ke bawah) dan `.round()` (dibulatkan ke terdekat).

```dart
void main() {
  double nilai = 85.6;

  print(nilai.toInt()); // 85
  print(nilai.round()); // 86
  print(85.5.round()); // 86
}
```

Output:

```
85
86
86
```

### 2.6.4 Konversi antar tipe angka

```dart
void main() {
  int a = 10;
  double b = 3.0;

  print(a + b); // 13.0, hasil promoted ke double
  print(b.toInt()); // 3
  print((a / b).toStringAsFixed(2)); // 3.33
}
```

Output:

```
13.0
3
3.33
```

### Ringkasan konversi

| Keperluan                     | Cara                        |
| ----------------------------- | --------------------------- |
| String → int                  | `int.parse(str)`            |
| String → double               | `double.parse(str)`         |
| String → number (aman)        | `int.tryParse(str)`         |
| angka → String                | `nilai.toString()`          |
| double → int (bulat bawah)    | `nilai.toInt()`             |
| double → int (terdekat)       | `nilai.round()`             |
| double → String 2 desimal     | `nilai.toStringAsFixed(2)`  |

## 2.7 String Interpolation

String interpolation adalah cara menyisipkan nilai ke dalam string memakai simbol `$`.

### 2.7.1 Interpolation sederhana

```dart
void main() {
  String nama = 'Purwa';
  int umur = 20;

  print('Nama saya $nama');
  print('Umur saya $umur tahun');
}
```

Output:

```
Nama saya Purwa
Umur saya 20 tahun
```

### 2.7.2 Interpolation dengan ekspresi

Kalau nilai yang sisipkan berupa ekspresi atau method, bungkus dengan `${...}`.

```dart
void main() {
  String nama = 'Purwa';
  int umur = 20;

  print('Nama saya ${nama.toUpperCase()}');
  print('Umur saya ${umur + 1} tahun');
  print('Perimeter: ${2 * (3 + 4)}');
}
```

Output:

```
Nama saya PURWA
Umur saya 21 tahun
Perimeter: 14
```

### 2.7.3 Interpolation di dalam string

```dart
void main() {
  String nama = 'Purwa';
  int umur = 20;
  double nilai = 85.5;

  print('$nama ($umur tahun) memperoleh nilai $nilai');
}
```

Output:

```
Purwa (20 tahun) memperoleh nilai 85.5
```

### 2.7.4 Menggabungkan string

Selain interpolation, string bisa digabung dengan operator `+`. Cara ini kurang fleksibel dibanding interpolation karena tipe datanya harus sama.

```dart
void main() {
  String nama = 'Purwa';
  int umur = 20;

  print('Halo, ' + nama + '! Kamu berumur ' + umur.toString() + ' tahun.');
}
```

Output:

```
Halo, Purwa! Kamu berumur 20 tahun.
```

Rekomendasi: gunakan interpolation untuk penyisipan nilai, dan `+` hanya untuk menggabungkan string literal.

## 2.8 Operators

Operator adalah simbol yang menjalankan operasi pada nilai. Dart mengelompokkannya ke dalam beberapa kategori.

### 2.8.1 Arithmetic Operators

| Operator | Fungsi                | Contoh          | Hasil            |
| -------- | --------------------- | --------------- | ---------------- |
| `+`      | Penjumlahan           | `5 + 3`         | `8`              |
| `-`      | Pengurangan          | `5 - 3`         | `2`              |
| `*`      | Perkalian            | `5 * 3`         | `15`             |
| `/`      | Pembagian (double)   | `7 / 2`         | `3.5`            |
| `~/`     | Pembagian bulat      | `7 ~/ 2`        | `3`              |
| `%`      | Sisa pembagian        | `7 % 2`         | `1`              |
| `-` (unary) | Negasi            | `-5`            | `-5`             |

```dart
void main() {
  print(5 + 3);
  print(5 - 3);
  print(5 * 3);
  print(7 / 2);
  print(7 ~/ 2);
  print(7 % 2);
  print(-5);
}
```

Output:

```
8
2
15
3.5
3
1
-5
```

Perhatikan perbedaan penting: `/` selalu menghasilkan `double`, sedangkan `~/` menghasilkan `int`.

```dart
void main() {
  int a = 7;
  int b = 2;

  print(a / b); // 3.5
  print(a ~/ b); // 3
  print((a / b).toInt()); // 3
}
```

Output:

```
3.5
3
3
```

### 2.8.2 Assignment Operators

| Operator | Arti                    | Ekuivalen dengan   |
| -------- | ----------------------- | ------------------ |
| `=`       | Memberi nilai           | —                  |
| `+=`      | Tambah lalu assign      | `a = a + nilai`    |
| `-=`      | Kurang lalu assign      | `a = a - nilai`    |
| `*=`      | Kali lalu assign        | `a = a * nilai`    |
| `/=`      | Bagi lalu assign        | `a = a / nilai`    |
| `~/=`     | Bagi bulat lalu assign  | `a = a ~/ nilai`   |
| `%=`      | Modulo lalu assign      | `a = a % nilai`    |
| `??=`     | Assign jika null        | —                  |

```dart
void main() {
  int nilai = 10;

  nilai += 5;
  print(nilai); // 15

  nilai -= 3;
  print(nilai); // 12

  nilai *= 2;
  print(nilai); // 24

  nilai ~/= 4;
  print(nilai); // 6

  nilai %= 4;
  print(nilai); // 2
}
```

Output:

```
15
12
24
6
2
```

Perhatikan: operator `/=` menghasilkan nilai `double`, jadi variabelnya harus bertipe `double`.

```dart
void main() {
  double nilai = 10;

  nilai /= 4;
  print(nilai); // 2.5
}
```

Output:

```
2.5
```

### 2.8.3 Comparison Operators

| Operator | Arti                  | Contoh          |
| -------- | --------------------- | --------------- |
| `==`      | Sama dengan           | `5 == 5` → true |
| `!=`      | Tidak sama dengan     | `5 != 3` → true |
| `>`       | Lebih besar dari      | `5 > 3` → true  |
| `<`       | Lebih kecil dari      | `5 < 3` → false |
| `>=`      | Lebih besar atau sama | `5 >= 5` → true |
| `<=`      | Lebih kecil atau sama | `5 <= 3` → false |

```dart
void main() {
  print(5 == 5);
  print(5 != 3);
  print(5 > 3);
  print(5 < 3);
  print(5 >= 5);
  print(5 <= 3);
}
```

Output:

```
true
true
true
false
true
false
```

Untuk String, `==` membandingkan isi string, bukan referensi objeknya.

```dart
void main() {
  String a = 'Dart';
  String b = 'Dart';

  print(a == b); // true
  print(a == 'Dart'); // true
}
```

Output:

```
true
true
```

### 2.8.4 Logical Operators

| Operator | Arti                 | Contoh                      |
| -------- | -------------------- | --------------------------- |
| `&&`      | AND (dan)            | `true && false` → false     |
| `\|\|`    | OR (atau)            | `true \|\| false` → true    |
| `!`       | NOT (bukan)          | `!true` → false             |

```dart
void main() {
  int umur = 20;
  bool punyaKtp = true;

  print(umur >= 17 && punyaKtp);
  print(umur < 17 || punyaKtp);
  print(!punyaKtp);
}
```

Output:

```
true
true
false
```

### 2.8.5 Increment and Decrement Operators

Operator `++` menambah 1, operator `--` mengurangi 1. Keduanya punya dua bentuk: prefix (sebelum nama variabel) dan postfix (setelah nama variabel).

```dart
void main() {
  int angka = 5;

  angka++; // postfix: tambah setelah nilai dipakai
  print(angka); // 6

  ++angka; // prefix: tambah sebelum nilai dipakai
  print(angka); // 7

  angka--;
  print(angka); // 6

  --angka;
  print(angka); // 5
}
```

Output:

```
6
7
6
5
```

Perbedaan prefix dan postfix baru terlihat ketika nilai variabel langsung dipakai dalam ekspresi.

```dart
void main() {
  int a = 5;
  int b = a++; // postfix: b = 5, lalu a jadi 6

  int c = 5;
  int d = ++c; // prefix: c jadi 6, lalu d = 6

  print('a=$a, b=$b');
  print('c=$c, d=$d');
}
```

Output:

```
a=6, b=5
c=6, d=6
```

### 2.8.6 Ternary Operator

Ternary operator adalah cara ringkas untuk menulis percabangan sederhana: `kondisi ? nilaiJikaTrue : nilaiJikaFalse`.

```dart
void main() {
  int umur = 20;

  String status = umur >= 17 ? 'Boleh membuat KTP' : 'Belum boleh';

  print(status);
}
```

Output:

```
Boleh membuat KTP
```

Bentuknya sama dengan `if-else`, tapi hanya satu baris:

```dart
void main() {
  int nilai = 75;

  if (nilai >= 70) {
    print('Lulus');
  } else {
    print('Tidak lulus');
  }

  print(nilai >= 70 ? 'Lulus' : 'Tidak lulus');
}
```

Output:

```
Lulus
Lulus
```

### 2.8.7 Null-aware Operators

Karena Dart memakai null safety, ada operator-operator khusus untuk menangani nilai `null`.

#### `??` — nilai pengganti jika null

```dart
void main() {
  String? nama;

  print(nama ?? 'Tamu'); // Tamu
  print(nama?.length); // null
}
```

Output:

```
Tamu
null
```

#### `?.` — akses aman jika null

Operator ini menghentikan akses lebih lanjut kalau objeknya `null`, sehingga tidak terjadi error.

```dart
void main() {
  String? nama = null;
  int? panjang = nama?.length;

  print(panjang); // null, tidak error

  String namaLengkap = 'Purwa';
  print(namaLengkap?.length); // 5
}
```

Output:

```
null
5
```

#### `??=` — assign jika masih null

```dart
void main() {
  String? nama;

  nama ??= 'Purwa';
  print(nama); // Purwa

  nama ??= 'Budi';
  print(nama); // tetap Purwa, karena sudah ada nilainya
}
```

Output:

```
Purwa
Purwa
```

### Ringkasan operator

| Kategori          | Operator                                     |
| ----------------- | -------------------------------------------- |
| Aritmetika        | `+` `-` `*` `/` `~/` `%`                     |
| Assignment        | `=` `+=` `-=` `*=` `/=` `~/=` `%=` `??=`     |
| Perbandingan      | `==` `!=` `>` `<` `>=` `<=`                 |
| Logika            | `&&` `\|\|` `!`                              |
| Inkrement         | `++` `--`                                    |
| Ternary           | `? :`                                        |
| Null-aware        | `??` `?.` `??=`                              |

## 2.9 Praktik Terapan

Berikut contoh program yang menggabungkan variabel, tipe data, konversi, dan operator.

### Menghitung nilai rata-rata

```dart
void main() {
  int nilai1 = 80;
  int nilai2 = 90;
  int nilai3 = 70;

  double rataRata = (nilai1 + nilai2 + nilai3) / 3;

  print('Rata-rata: $rataRata');
  print('Rata-rata (2 desimal): ${rataRata.toStringAsFixed(2)}');
  print(rataRata >= 80 ? 'Predikat A' : 'Predikat B');
}
```

Output:

```
Rata-rata: 80.0
Rata-rata (2 desimal): 80.00
Predikat A
```

### Menghitung diskon

```dart
void main() {
  double hargaBarang = 250000;
  double diskon = 0.15;

  double hargaAkhir = hargaBarang - (hargaBarang * diskon);

  print('Harga awal: ${hargaBarang.toStringAsFixed(0)}');
  print('Harga akhir: ${hargaAkhir.toStringAsFixed(0)}');
}
```

Output:

```
Harga awal: 250000
Harga akhir: 212500
```

### Memproses data mahasiswa dengan Map

```dart
void main() {
  Map<String, dynamic> mahasiswa = {
    'nama': 'Purwa',
    'nim': '2023001',
    'nilai': 87.5,
  };

  double nilai = mahasiswa['nilai'] as double;
  String predikat = nilai >= 85
      ? 'A'
      : nilai >= 75
          ? 'B'
          : nilai >= 60
              ? 'C'
              : 'D';

  print('Nama: ${mahasiswa['nama']}');
  print('NIM: ${mahasiswa['nim']}');
  print('Nilai: $nilai');
  print('Predikat: $predikat');
}
```

Output:

```
Nama: Purwa
NIM: 2023001
Nilai: 87.5
Predikat: A
```

### Troubleshooting dasar

| Masalah                                | Solusi                                                             |
| -------------------------------------- | ------------------------------------------------------------------ |
| `The operator can't be unconditionally invoked` | Pemeriksaan tipe atau null safety kurang tepat              |
| `A value of type 'Null' can't be assigned`     | Pakai `?`, `??`, atau `!` dengan tepat                     |
| `The value of the local variable 'x' isn't used` | Variabel belum dipakai — hapus atau pakai                     |
| `Invalid literal`                     |-format angka dengan `toStringAsFixed()` atau `toInt()`             |
| `type 'String' is not a subtype of type 'int'`  | Konversi dulu dengan `int.parse()`                           |
| Pembagian hasil desimal tak terduga   | Gunakan `~/` untuk pembagian bulat                             |

## Ringkasan Pertemuan 2

- Dart memakai `var`, tipe eksplisit, atau `dynamic` untuk mendeklarasikan variabel.
- `final` nilainya satu kali dan diketahui saat runtime; `const` satu kali dan diketahui saat compile time.
- Tipe data utama: `int`, `double`, `String`, `bool`, `List`, `Set`, dan `Map`.
- Type inference membuat Dart menyimpulkan tipe dari nilai yang diberikan.
- Konversi tipe: `parse()`, `tryParse()`, `toString()`, `toInt()`, `round()`, `toStringAsFixed()`.
- String interpolation memakai `$nama` dan `${ekspresi}`.
- Operator penting: aritmetika, assignment, perbandingan, logika, `++`/`--`, ternary, dan null-aware.

---

## Praktik

Latihan untuk pertemuan ini ada di folder lab:

👉 [`../lab/02-variables/`](../lab/02-variables/README.md)

Folder lab berisi:

- `README.md` — brief latihan dan checklist progres.
- `exercises/` — latihan kecil per submateri (variabel, tipe data, konversi, operator, interpolasi).
- `kalkulator_nilai.dart` — Project 2 (Kalkulator Nilai Mahasiswa).
- `solusi/` — jawaban referensi (buka setelah mencoba).
