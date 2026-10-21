# 📘 Pertemuan 5 — Collections

Dart Fundamentals · Beginner Level

## Tujuan Pembelajaran

Setelah selesai memenuhi pertemuan ini, kamu diharapkan mampu:

- Memahami konsep koleksi dan memilih tipe koleksi yang tepat.
- Membuat, mengakses, dan memodifikasi `List`.
- Menggunakan berbagai properti dan method pada `List`.
- Mengurutkan dan menyaring data dengan `sort()`, `where()`, `map()`, dan `forEach()`.
- Membuat dan memanipulasi `Set`, termasuk operasi himpunan.
- Membuat, mengakses, dan memproses `Map` (key-value).
- Memahami `Record` (Dart 3) untuk menyimpan beberapa nilai sekaligus.
- Membangun koleksi bersarang untuk merepresentasikan data yang lebih kompleks.

## 5.1 Introduction to Collections

### Apa itu koleksi?

Koleksi adalah struktur data yang menyimpan sekumpulan nilai. Dart menyediakan tiga koleksi utama:

| Tipe    | Kegunaan                                          | Duplikat | Urutan |
| ------- | ------------------------------------------------- | -------- | ------ |
| `List`  | Kumpulan nilai berurutan, bisa diakses via indeks | Boleh    | Ada    |
| `Set`   | Kumpulan nilai unik                              | Tidak    | Tidak  |
| `Map`   | Pasangan kunci dan nilai                         | Kunci unik | Ada |

### Analogi

- **`List`** seperti buku catatan: nomor halaman (indeks) menentukan posisi data, dan kamu boleh menulis data yang sama dua kali.
- **`Set`** seperti Tahoe di grup WhatsApp: setiap nomor hanya bisa satu anggota, dan urutannya tidak penting.
- **`Map`** seperti bukuContacts: nama (kunci) menunjuk ke nomor telepon (nilai).

### Mendeklarasikan koleksi

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga'];
  Set<String> warna = {'merah', 'biru'};
  Map<String, int> umur = {'Purwa': 20, 'Budi': 21};

  print(buah);
  print(warna);
  print(umur);
}
```

Output:

```
[apel, jeruk, mangga]
{merah, biru}
{Purwa: 20, Budi: 21}
```

### Tipe data di dalam koleksi

Dart strongly typed: `List<String>` tidak bisa berisi angka.

```dart
void main() {
  List<String> buah = ['apel'];
  // buah.add(20); // Error: tipe int tidak bisa masuk ke List<String>
}
```

Koleksi dengan tipe data berbeda ditulis sebagai `List<dynamic>` atau `List<Object>`.

## 5.2 Lists

### 5.2.1 Creating and Accessing Lists

#### Membuat List

```dart
void main() {
  List<String> kosong = [];
  List<int> angka = [1, 2, 3];
  List<String> berisi = ['apel', 'jeruk'];
  List<int> nol = List<int>.filled(3, 0);
  List<int> hasil = List<int>.generate(3, (i) => (i + 1) * 10);
  List<int> tetap = List<int>.empty();

  print(kosong);
  print(angka);
  print(berisi);
  print(nol);
  print(hasil);
  print(tetap);
}
```

Output:

```
[]
[1, 2, 3]
[apel, jeruk]
[0, 0, 0]
[10, 20, 30]
[]
```

#### Mengakses elemen

Elemen diakses berdasarkan indeks, dimulai dari **0**.

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga'];

  print(buah[0]);
  print(buah[1]);
  print(buah[2]);
}
```

Output:

```
apel
jeruk
mangga
```

Indeks di luar jangkauan akan menyebabkan error.

```dart
void main() {
  List<String> buah = ['apel'];
  // print(buah[5]); // Error: RangeError (index out of range)
}
```

#### Properti penting

| Properti      | Arti                                        | Contoh             |
| ------------- | ------------------------------------------- | ------------------ |
| `length`      | Jumlah elemen                               | `buah.length` → 3  |
| `first`       | Elemen pertama                              | `buah.first`       |
| `last`        | Elemen terakhir                             | `buah.last`        |
| `isEmpty`     | `true` kalau tidak ada elemen              | `buah.isEmpty`     |
| `isNotEmpty`  | `true` kalau ada elemen                    | `buah.isNotEmpty`  |
| `reversed`    | List baru dengan urutan terbalik            | `buah.reversed`    |

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga'];

  print('Jumlah  : ${buah.length}');
  print('Pertama : ${buah.first}');
  print('Terakhir: ${buah.last}');
  print('Kosong? : ${buah.isEmpty}');
  print('Terbalik: ${buah.reversed}');
}
```

Output:

```
Jumlah  : 3
Pertama : apel
Terakhir: mangga
Kosong? : false
Terbalik: (mangga, jeruk, apel)
```

### 5.2.2 Modifying List Elements

Elemen yang sudah ada bisa diganti dengan cara menugaskan nilai ke indeksnya.

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga'];

  buah[1] = 'anggur';

  print(buah);
}
```

Output:

```
[apel, anggur, mangga]
```

### 5.2.3 Adding and Removing Items

#### Menambah elemen

| Method                | Fungsi                                        |
| --------------------- | --------------------------------------------- |
| `add(item)`           | Menambah satu elemen di akhir                 |
| `addAll(daftar)`      | Menambah semua elemen dari Iterable lain      |
| `insert(indeks, item)`| Menambah elemen pada posisi tertentu          |

```dart
void main() {
  List<String> buah = ['apel'];

  buah.add('jeruk');
  buah.addAll(['mangga', 'anggur']);
  buah.insert(1, 'melon');

  print(buah);
}
```

Output:

```
[apel, melon, jeruk, mangga, anggur]
```

#### Menghapus elemen

| Method                  | Fungsi                                          |
| ----------------------- | ----------------------------------------------- |
| `remove(item)`          | Menghapus elemen pertama yang cocok, return `bool` |
| `removeAt(indeks)`      | Menghapus berdasarkan indeks, return elemennya  |
| `removeLast()`          | Menghapus elemen terakhir                       |
| `removeWhere(kondisi)`  | Menghapus semua elemen yang memenuhi kondisi   |
| `clear()`               | Menghapus semua elemen                          |

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga', 'anggur'];

  buah.remove('jeruk');
  buah.removeAt(0);
  buah.removeWhere((item) => item.startsWith('a'));

  print(buah);
}
```

Output:

```
[mangga]
```

### 5.2.4 List Properties and Methods

Method yang sering dipakai:

| Method                       | Fungsi                                          | Contoh hasil              |
| ---------------------------- | ----------------------------------------------- | ------------------------- |
| `contains(item)`             | Apakah item ada di dalam List                   | `true`                    |
| `indexOf(item)`              | Indeks pertama item, `-1` kalau tidak ada      | `1`                       |
| `sublist(start, [end])`      | Mengambil potongan List                         | `[2, 3]`                  |
| `join(separator)`            | Menggabungkan List jadi String                  | `'a, b, c'`               |
| `toSet()`                    | Mengubah List menjadi Set                       | `{1, 2}`                  |
| `toList()`                   | Mengubah Iterable menjadi List                  | `[1, 2]`                  |
| `shuffle()`                  | Mengacak urutan elemen                          | —                         |
| `join()`                     | Menggabungkan isi List ke String                | `'a-b'`                   |
| `reduce()`                   | Menggabungkan seluruh elemen jadi satu nilai    | `6`                       |
| `fold()`                     | Seperti `reduce` dengan nilai awal              | `16`                      |
| `any(kondisi)`               | Apakah ada elemen yang memenuhi kondisi        | `true`                    |
| `every(kondisi)`             | Apakah semua elemen memenuhi kondisi           | `false`                   |

```dart
void main() {
  List<int> angka = [1, 2, 3, 4, 5];

  print(angka.contains(3));
  print(angka.indexOf(4));
  print(angka.sublist(1, 4));
  print(angka.join(' - '));
  print(angka.toSet());
  print(angka.reduce((a, b) => a + b));
  print(angka.fold<int>(10, (akumulator, item) => akumulator + item));
  print(angka.any((e) => e > 4));
  print(angka.every((e) => e > 1));
}
```

Output:

```
true
3
[2, 3, 4]
1 - 2 - 3 - 4 - 5
{1, 2, 3, 4, 5}
15
25
true
false
```

### 5.2.5 Iterating over Lists

Ada beberapa cara mengiterasi List.

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga'];

  // 1. for-in (paling umum)
  for (final item in buah) {
    print(item);
  }

  print('---');

  // 2. for dengan indeks
  for (int i = 0; i < buah.length; i++) {
    print('$i: ${buah[i]}');
  }

  print('---');

  // 3. forEach
  buah.forEach((item) {
    print('-> $item');
  });
}
```

Output:

```
apel
jeruk
mangga
---
0: apel
1: jeruk
2: mangga
---
-> apel
-> jeruk
-> mangga
```

### 5.2.6 Sorting and Filtering Lists

#### Mengurutkan (`sort`)

`sort()` mengurutkan List **di tempat** (mengubah List aslinya). Untuk List angka, urutannya adalah menaik.

```dart
void main() {
  List<int> angka = [5, 3, 8, 1];

  angka.sort();

  print(angka);
}
```

Output:

```
[1, 3, 5, 8]
```

Untuk List<String>, pengurutannya berdasarkan urutan alfabetis.

```dart
void main() {
  List<String> buah = ['mangga', 'apel', 'jeruk'];

  buah.sort();

  print(buah);
}
```

Output:

```
[apel, jeruk, mangga]
```

#### Mengurutkan dengan fungsi perbandingan

Untuk mengurutkan berdasarkan nilai tertentu, gunakan `sort()` dengan fungsi pembanding. Fungsi ini mengembalikan nilai negatif (a lebih dulu), nol (sebanding), atau positif (b lebih dulu).

```dart
void main() {
  List<Map<String, dynamic>> mahasiswa = [
    {'nama': 'Purwa', 'nilai': 88},
    {'nama': 'Budi', 'nilai': 76},
    {'nama': 'Sinta', 'nilai': 92},
  ];

  mahasiswa.sort((a, b) => b['nilai'].compareTo(a['nilai']));

  for (final m in mahasiswa) {
    print('${m['nama']}: ${m['nilai']}');
  }
}
```

Output:

```
Sinta: 92
Purwa: 88
Budi: 76
```

`compareTo()` membandingkan dua nilai dan mengembalikan:
- nilai **negatif** → objek pertama lebih kecil (ditempatkan lebih dulu),
- **0** → sama,
- nilai **positif** → objek pertama lebih besar (ditempatkan setelah).

#### Menyaring (`where`)

`where()` mengembalikan **List baru** berisi elemen yang memenuhi kondisi.

```dart
void main() {
  List<int> angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  final genap = angka.where((n) => n % 2 == 0).toList();
  final lebihDariLima = angka.where((n) => n > 5).toList();

  print(genap);
  print(lebihDariLima);
  print('Asli tidak berubah: $angka');
}
```

Output:

```
[2, 4, 6, 8, 10]
[6, 7, 8, 9, 10]
Asli tidak berubah: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 5.2.7 `map()`, `where()`, and `forEach()`

Tiga method ini adalah tulang punggung pemrosesan data di Dart.

#### `map()` — mengubah setiap elemen

`map()` mengubah setiap elemen menjadi nilai baru. Hasilnya bertipe `Iterable`, jadi biasanya dikonversi dengan `.toList()`.

```dart
void main() {
  List<int> angka = [1, 2, 3, 4, 5];

  final kaliDua = angka.map((n) => n * 2).toList();
  final jadiTeks = angka.map((n) => 'Angka $n').toList();

  print(kaliDua);
  print(jadiTeks);
}
```

Output:

```
[2, 4, 6, 8, 10]
[Angka 1, Angka 2, Angka 3, Angka 4, Angka 5]
```

#### `where()` — menyaring elemen

```dart
void main() {
  List<int> angka = [1, 2, 3, 4, 5, 6];

  final genap = angka.where((n) => n % 2 == 0).toList();

  print(genap);
}
```

Output:

```
[2, 4, 6]
```

#### `forEach()` — menjalankan aksi untuk setiap elemen

`forEach()` tidak mengembalikan nilai baru, cocok untuk-print atau menyimpan ke variabel lain.

```dart
void main() {
  List<String> buah = ['apel', 'jeruk', 'mangga'];
  int totalHuruf = 0;

  buah.forEach((item) {
    print(item);
    totalHuruf += item.length;
  });

  print('Total huruf: $totalHuruf');
}
```

Output:

```
apel
jeruk
mangga
Total huruf: 15
```

#### Menggabungkan ketiganya

Karena `map()` dan `where()` mengembalikan `Iterable`, keduanya bisa dirangkai.

```dart
void main() {
  List<int> angka = [1, 2, 3, 4, 5, 6, 7, 8];

  final hasil = angka
      .where((n) => n % 2 == 0) // saring: genap saja
      .map((n) => n * n) // ubah: kuadrat
      .toList(); // konversi ke List

  print(hasil);
}
```

Output:

```
[4, 16, 36, 64]
```

## 5.3 Sets

### 5.3.1 Creating Sets

`Set` menyimpan nilai unik tanpa urutan pasti.

```dart
void main() {
  Set<String> buah = {'apel', 'jeruk', 'mangga', 'apel'};
  Set<int> angka = {1, 2, 3, 3, 2};
  Set<String> kosong = <String>{};
  Set<String> dariList = {'a', 'b', 'a'}.toSet();

  print(buah);
  print(angka);
  print(kosong);
  print(dariList);
  print(buah.length);
}
```

Output:

```
{apel, jeruk, mangga}
{1, 2, 3}
{}
{a, b}
3
```

Perhatikan: `{'a', 'b', 'a'}.toSet()` menghasilkan 2 elemen, karena duplikat dihapus otomatis.

### 5.3.2 Adding and Removing Items

```dart
void main() {
  Set<String> buah = {'apel', 'jeruk'};

  buah.add('mangga');
  buah.addAll(['anggur', 'melon']);
  print(buah);

  buah.remove('jeruk');
  print(buah);

  buah.removeWhere((item) => item.length > 5);
  print(buah);
}
```

Output:

```
{apel, jeruk, mangga, anggur, melon}
{apel, mangga, anggur, melon}
{apel, melon}
```

Method lain yang tersedia: `contains()`, `length`, `isEmpty`, `isNotEmpty`, `clear()`, `addAll()`, `first`, `last`.

### 5.3.3 Set Operations

`Set` punya operasi himpunan matematika yang sangat handy.

| Method               | Arti                                                  |
| -------------------- | ----------------------------------------------------- |
| `union(other)`       | Gabungan semua elemen dari keduanya                  |
| `intersection(other)`| Elemen yang ada di keduanya                           |
| `difference(other)`  | Elemen yang hanya ada di Set pertama                  |
| `containsAll(other)` | Apakah semua elemen `other` ada di Set ini           |
| `retainAll(other)`   | Menghapus elemen yang tidak ada di `other` (mengubah Set) |
| `removeAll(other)`   | Menghapus semua elemen yang ada di `other` (mengubah Set) |

```dart
void main() {
  Set<int> a = {1, 2, 3, 4};
  Set<int> b = {3, 4, 5, 6};

  print('Union       : ${a.union(b)}');
  print('Intersection: ${a.intersection(b)}');
  print('Difference  : ${a.difference(b)}');
  print('a contains all b? ${a.containsAll(b)}');
}
```

Output:

```
Union       : {1, 2, 3, 4, 5, 6}
Intersection: {3, 4}
Difference  : {1, 2}
a contains all b? false
```

Perhatikan `difference`: elemen yang ada di `a` tapi tidak ada di `b`.

## 5.4 Maps

### 5.4.1 Creating Maps

`Map` menyimpan pasangan kunci dan nilai. Kunci harus unik, dan nilainya bisa bertipe apa saja.

```dart
void main() {
  Map<String, dynamic> mahasiswa = {
    'nama': 'Purwa',
    'umur': 20,
    'jurusan': 'Informatika',
  };

  Map<String, int> stok = {'apel': 10, 'jeruk': 20};
  Map<String, int> kosong = {};
  Map<String, int> dariList = <String, int>{};

  print(mahasiswa);
  print(stok);
  print(kosong);
}
```

Output:

```
{nama: Purwa, umur: 20, jurusan: Informatika}
{apel: 10, jeruk: 20}
{}
```

### 5.4.2 Accessing Key-value Pairs

Nilai diakses dengan `map[kunci]`.

```dart
void main() {
  Map<String, dynamic> mahasiswa = {
    'nama': 'Purwa',
    'umur': 20,
    'jurusan': 'Informatika',
  };

  print(mahasiswa['nama']);
  print(mahasiswa['nim']); // null, kunci tidak ada
}
```

Output:

```
Purwa
null
```

Karena bisa `null`, sering perlu dicek sebelum dipakai.

```dart
void main() {
  Map<String, dynamic> mahasiswa = {'nama': 'Purwa'};

  final nim = mahasiswa['nim'];
  print(nim ?? 'NIM belum diisi');
}
```

Output:

```
NIM belum diisi
```

Method terkait:

| Method                  | Fungsi                                       |
| ----------------------- | -------------------------------------------- |
| `containsKey(kunci)`    | Apakah kunci ada                             |
| `containsValue(nilai)`  | Apakah nilai ada                             |
| `keys`                  | Iterable berisi semua kunci                  |
| `values`                | Iterable berisi semua nilai                  |
| `entries`               | Iterable berisi pasangan kunci-nilai         |
| `length`                | Jumlah pasangan                              |
| `isEmpty` / `isNotEmpty`| Status kosong                                |

```dart
void main() {
  Map<String, int> stok = {'apel': 10, 'jeruk': 20};

  print(stok.containsKey('apel'));
  print(stok.containsValue(20));
  print(stok.keys);
  print(stok.values);
  print(stok.length);
}
```

Output:

```
true
true
(apel, jeruk)
(10, 20)
2
```

### 5.4.3 Adding, Updating, and Removing Items

```dart
void main() {
  Map<String, int> stok = {'apel': 10};

  // Menambah atau memperbarui
  stok['jeruk'] = 20;
  stok['apel'] = 15; // nilai lama diganti

  print(stok);

  // Menambah banyak sekaligus
  stok.addAll({'mangga': 30, 'anggur': 25});
  print(stok);

  // Menghapus
  stok.remove('jeruk');
  print(stok);

  // Menghapus tapi menyimpan nilainya
  final mangga = stok.remove('mangga');
  print('Mangga dihapus, nilainya: $mangga');
  print(stok);
}
```

Output:

```
{apel: 15, jeruk: 20}
{apel: 15, jeruk: 20, mangga: 30, anggur: 25}
{apel: 15, mangga: 30, anggur: 25}
Mangga dihapus, nilainya: 30
{apel: 15, anggur: 25}
```

Method lain: `putIfAbsent()` (menambahkan hanya kalau kuncinya belum ada) dan `update()` (memperbarui berdasarkan kondisi).

```dart
void main() {
  Map<String, int> stok = {'apel': 10};

  stok.putIfAbsent('jeruk', () => 20);
  stok.putIfAbsent('apel', () => 99); // tidak dipakai, kunci sudah ada

  print(stok);

  stok.update('apel', (nilai) => nilai + 5, ifAbsent: () => 0);
  print(stok);
}
```

Output:

```
{apel: 10, jeruk: 20}
{apel: 15, jeruk: 20}
```

### 5.4.4 Iterating over Maps

#### Mengiterasi kunci dan nilai

```dart
void main() {
  Map<String, int> stok = {'apel': 10, 'jeruk': 20};

  for (final kunci in stok.keys) {
    print('$kunci: ${stok[kunci]}');
  }

  print('---');

  for (final nilai in stok.values) {
    print(nilai);
  }
}
```

Output:

```
apel: 10
jeruk: 20
---
10
20
```

#### Mengiterasi `entries`

Cara paling lengkap — mendapat kunci dan nilai sekaligus.

```dart
void main() {
  Map<String, int> stok = {'apel': 10, 'jeruk': 20};

  for (final entry in stok.entries) {
    print('${entry.key} -> ${entry.value}');
  }
}
```

Output:

```
apel -> 10
jeruk -> 20
```

#### `forEach`

```dart
void main() {
  Map<String, int> stok = {'apel': 10, 'jeruk': 20};

  stok.forEach((kunci, nilai) {
    print('$kunci: $nilai');
  });
}
```

Output:

```
apel: 10
jeruk: 20
```

#### Mengubah Map menjadi List

Karena `keys`, `values`, dan `entries` bertipe `Iterable`, bisa dikonversi ke List lalu diolah seperti biasa.

```dart
void main() {
  Map<String, int> stok = {'apel': 10, 'jeruk': 20, 'mangga': 30};

  final daftar = stok.entries.toList();
  daftar.sort((a, b) => b.value.compareTo(a.value));

  for (final entry in daftar) {
    print('${entry.key}: ${entry.value}');
  }
}
```

Output:

```
mangga: 30
jeruk: 20
apel: 10
```

### 5.4.5 Map Properties and Methods

| Method / Properti        | Fungsi                                          |
| ------------------------ | ----------------------------------------------- |
| `length`                 | Jumlah pasangan                                 |
| `isEmpty` / `isNotEmpty` | Status kosong                                   |
| `keys`                   | Semua kunci                                     |
| `values`                 | Semua nilai                                     |
| `entries`                | Semua pasangan kunci-nilai                      |
| `forEach()`              | Iterasi dengan callback                         |
| `map()`                  | Mengubah nilai menjadi List baru                |
| `where()`                | Menyaring pasangan                              |
| `remove(key)`            | Menghapus kunci, mengembalikan nilainya          |
| `clear()`                | Menghapus semua pasangan                        |
| `addAll()`               | Menambah banyak pasangan                        |
| `putIfAbsent()`          | Menambahkan hanya kalau kunci belum ada         |
| `update()`               | Memperbarui nilai dengan kondisi                |
| `containsKey()`          | Mengecek keberadaan kunci                        |

```dart
void main() {
  Map<String, int> stok = {'apel': 10, 'jeruk': 20, 'mangga': 30};

  final total = stok.values.reduce((a, b) => a + b);
  print('Total stok: $total');

  final mahal = stok.entries.where((e) => e.value > 15).toList();
  print('Stok > 15: $mahal');

  final daftar = stok.entries.map((e) => '${e.key}=${e.value}').toList();
  print(daftar);
}
```

Output:

```
Total stok: 60
Stok > 15: [MapEntry(jeruk: 20), MapEntry(mangga: 30)]
[apel=10, jeruk=20, mangga=30]
```

## 5.5 Records

`Record` (fitur Dart 3) adalah cara menyimpan **beberapa nilai sekaligus** dalam satu variabel, tanpa harus membuat class.

### Record posisi

```dart
void main() {
  (int, String) data = (20, 'Purwa');

  print(data);
  print(data.$1);
  print(data.$2);
}
```

Output:

```
(20, Purwa)
20
Purwa
```

Field-nya diakses dengan `.$1`, `.$2`, dan seterusnya.

### Record dengan nama field

```dart
void main() {
  ({String nama, int umur}) mahasiswa = (nama: 'Purwa', umur: 20);

  print(mahasiswa);
  print(mahasiswa.nama);
  print(mahasiswa.umur);
}
```

Output:

```
(nama: Purwa, umur: 20)
Purwa
20
```

### Destructuring

Record bisa diuraikan ke variabel biasa dengan satu baris.

```dart
void main() {
  (int, String) data = (20, 'Purwa');

  final (umur, nama) = data;
  print('Nama: $nama, Umur: $umur');
}
```

Output:

```
Nama: Purwa, Umur: 20
```

Destructuring dengan nama field:

```dart
void main() {
  ({String nama, int umur}) mahasiswa = (nama: 'Purwa', umur: 20);

  final (:nama, :umur) = mahasiswa;
  print('$nama berumur $umur tahun');
}
```

Output:

```
Purwa berumur 20 tahun
```

### Kapan pakai Record?

Record cocok ketika:

- Fungsi perlu mengembalikan lebih dari satu nilai tanpa membuat class.
- Data berupa pasangan atau tripel yang jelas (koordinat, warna RGB, hasil hitung).
- Ingin menghindari boilerplate class sederhana.

```dart
void main() {
  (double, double) hitungLuasKeliling(double sisi) {
    final luas = sisi * sisi;
    final keliling = 4 * sisi;
    return (luas, keliling);
  }

  final (luas, keliling) = hitungLuasKeliling(5);

  print('Luas     : $luas');
  print('Keliling : $keliling');
}
```

Output:

```
Luas     : 25.0
Keliling : 20.0
```

## 5.6 Nested Collections

Koleksi bisa berisi koleksi lain. Ini dipakai untuk merepresentasikan data yang lebih kompleks, seperti daftar nilai per mahasiswa atau daftar mahasiswa per kelas.

### List di dalam List

```dart
void main() {
  List<List<int>> matriks = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  print(matriks);
  print(matriks[0]);
  print(matriks[1][2]);
}
```

Output:

```
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
[1, 2, 3]
6
```

### Map di dalam List

Pola yang paling sering dipakai untuk data yang punya banyak atribut.

```dart
void main() {
  List<Map<String, dynamic>> mahasiswa = [
    {'nama': 'Purwa', 'nilai': 88, 'jurusan': 'Informatika'},
    {'nama': 'Budi', 'nilai': 76, 'jurusan': 'Sistem Informasi'},
  ];

  print(mahasiswa);
  print(mahasiswa[0]['nama']);
  print(mahasiswa[1]['nilai']);
}
```

Output:

```
[{nama: Purwa, nilai: 88, jurusan: Informatika}, {nama: Budi, nilai: 76, jurusan: Sistem Informasi}]
Purwa
76
```

### Map dengan nilai berupa List

```dart
void main() {
  Map<String, List<int>> nilaiMahasiswa = {
    'Purwa': [80, 90, 88],
    'Budi': [70, 75, 80],
  };

  print(nilaiMahasiswa);
  print(nilaiMahasiswa['Purwa']);
  print(nilaiMahasiswa['Purwa']?[1]);
}
```

Output:

```
{Purwa: [80, 90, 88], Budi: [70, 75, 80]}
[80, 90, 88]
90
```

### Menghitung data di nested collection

```dart
void main() {
  Map<String, List<int>> nilaiMahasiswa = {
    'Purwa': [80, 90, 88],
    'Budi': [70, 75, 80],
  };

  for (final entry in nilaiMahasiswa.entries) {
    final total = entry.value.reduce((a, b) => a + b);
    final rataRata = total / entry.value.length;

    print('${entry.key}: rata-rata ${rataRata.toStringAsFixed(2)}');
  }
}
```

Output:

```
Purwa: rata-rata 86.00
Budi: rata-rata 75.00
```

## 5.7 Praktik Terapan

### Mengurutkan daftar kata berdasarkan panjang

```dart
void main() {
  List<String> kata = ['dart', 'flutter', 'api', 'sdk', 'bahasa'];

  kata.sort((a, b) => a.length.compareTo(b.length));

  print(kata);
}
```

Output:

```
[api, sdk, dart, bahasa, flutter]
```

### Mencari modus dari sekumpulan angka

```dart
void main() {
  List<int> angka = [1, 2, 2, 3, 3, 3, 4];

  Map<int, int> frekuensi = {};

  for (final n in angka) {
    frekuensi[n] = (frekuensi[n] ?? 0) + 1;
  }

  int modus = angka.first;
  int tertinggi = 0;

  frekuensi.forEach((nilai, jumlah) {
    if (jumlah > tertinggi) {
      tertinggi = jumlah;
      modus = nilai;
    }
  });

  print('Modus: $modus (muncul $tertinggi kali)');
}
```

Output:

```
Modus: 3 (muncul 3 kali)
```

### Memfilter dan mengurutkan data mahasiswa

```dart
void main() {
  List<Map<String, dynamic>> mahasiswa = [
    {'nama': 'Purwa', 'nilai': 88},
    {'nama': 'Budi', 'nilai': 54},
    {'nama': 'Sinta', 'nilai': 76},
    {'nama': 'Rizky', 'nilai': 91},
  ];

  final lulus = mahasiswa
      .where((m) => m['nilai'] >= 70)
      .toList()
      ..sort((a, b) => b['nilai'].compareTo(a['nilai']));

  print('Mahasiswa lulus: ${lulus.length}');
  for (final m in lulus) {
    print('${m['nama']} - ${m['nilai']}');
  }
}
```

Output:

```
Mahasiswa lulus: 3
Rizky - 91
Purwa - 88
Sinta - 76
```

### Troubleshooting dasar

| Masalah                                        | Solusi                                                       |
| ---------------------------------------------- | ------------------------------------------------------------ |
| `RangeError (index): Invalid value`            | Indeks di luar jangkauan List                               |
| `NoSuchMethodError: The method 'add' was called on null` | Koleksi belum diinisialisasi sebelum dipakai        |
| `Unsupported operation: Cannot modify an unmodifiable list` | List dibuat dengan `const` atau `List.unmodifiable` |
| `Bad state: No element`                        | Mengakses `first`/`last` pada List kosong                    |
| `type 'Null' is not a subtype of type 'String'` | Kunci Map tidak ada — gunakan `??` atau cek `containsKey`   |
| Perubahan `sort()` tidak terlihat              | `sort()` mengubah List aslinya — salin dulu dengan `.toList()` |

## Ringkasan Pertemuan 5

- `List` = berurutan & boleh duplikat, diakses lewat indeks.
- `Set` = unik tanpa urutan, punya operasi himpunan (`union`, `intersection`, `difference`).
- `Map` = pasangan kunci-nilai, kunci unik, diakses lewat `map[kunci]`.
- `map()` mengubah, `where()` menyaring, `forEach()` mengiterasi — ketiganya bisa dirangkai.
- `sort()` mengubah List aslinya; pakai `compareTo()` untuk pengurutan kustom.
- `Record` (Dart 3) menyimpan beberapa nilai dalam satu variabel, mendukung destructuring.
- Nested collection seperti `List<Map<String, dynamic>>` dipakai untuk data yang punya banyak atribut.

---

## Praktik

Latihan untuk pertemuan ini ada di folder lab:

👉 [`../lab/05-collections/`](../lab/05-collections/README.md)

Folder lab berisi:

- `README.md` — brief latihan dan checklist progres.
- `exercises/` — latihan kecil per submateri (list, set, map, record, nested collection).
- `analisis_nilai_kelas.dart` — Project 5 (Analisis Data Nilai Kelas).
- `solusi/` — jawaban referensi (buka setelah mencoba).
