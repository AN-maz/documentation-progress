# Pengenalan dan Dasar-Dasar JavaScript

## Daftar Isi

- [Pendahuluan](#pendahuluan)
- [Variabel dan Tipe Data](#variabel-dan-tipe-data)
- [Operator dan Logika](#operator-dan-logika)
- [Perulangan (Loops)](#perulangan-loops)
- [Fungsi (Functions)](#fungsi-functions)
- [Struktur Data: Array dan Object](#struktur-data-array-dan-object)
- [Latihan (Practical Exercise)](#latihan-practical-exercise)
- [Tugas Mandiri](#tugas-mandiri)

---

## Pendahuluan

### Apa itu JavaScript?

JavaScript (JS) adalah bahasa pemrograman web yang membuat halaman website menjadi interaktif dan dinamis. Jika HTML adalah kerangka dan CSS adalah desain visual, maka JavaScript adalah "otak" atau "otot" yang memberikan fungsionalitas (seperti klik tombol, pop-up, kalkulasi, dll).

### Embed JS into HTML

Ada dua cara utama untuk memasukkan JavaScript ke dalam HTML:

1. Inline / Internal Script (Di dalam file HTML yang sama)

   ```js
   <body>
     <h1>Belajar JS</h1>
     <script>console.log("Halo, ini JavaScript!");</script>
   </body>
   ```

2. External Script (File terpisah, lebih direkomendasikan)

   ```js
   <body>
     <script src="script.js"></script>
   </body>
   ```

[⬆ Kembali ke Daftar Isi](#daftar-isi)

---

## Variabel dan Tipe Data

Variabel adalah tempat untuk menyimpan data. Di JavaScript modern, kita menggunakan `let` dan `const`. Hindari menggunakan `var`.

Contoh:

```js
let nama = "Budi"; // let: nilainya bisa diubah nanti
nama = "Andi"; // Valid

const umur = 20; // const: nilainya tetap (konstan)
// umur = 21;           // ERROR! const tidak bisa diubah
```

## Data Types

JavaScript memiliki beberapa tipe data dasar:

| Tipe Data | Contoh             | Keterangan                        |
| --------- | ------------------ | --------------------------------- |
| String    | `"Teks"`, `'Halo'` | Teks atau karakter (diapit kutip) |
| Number    | `10`, `3.14`       | Angka (bulat maupun desimal)      |
| Boolean   | `true`, `false`    | Nilai kebenaran (benar/salah)     |
| Null      | `null`             | Nilai kosong yang disengaja       |
| Undefined | `undefined`        | Variabel yang belum diisi nilai   |

[⬆ Kembali ke Daftar Isi](#daftar-isi)

## Operator dan Logika

Digunakan untuk melakukan operasi pada variabel atau nilai.

Contoh:

```js
// Operator Aritmatika
let tambah = 5 + 2; // 7
let kurang = 5 - 2; // 3
let kali = 5 * 2; // 10
let bagi = 10 / 2; // 5

// Operator Penugasan (Assignment)
let skor = 10;
skor += 5; // Sama dengan: skor = skor + 5 (Hasil: 15)
```

## Logical Operators

Digunakan untuk menggabungkan atau membalikkan kondisi logika.

```js
let a = true;
let b = false;

console.log(a && b); // AND (&&): true JIKA KEDUANYA true. Hasil: false
console.log(a || b); // OR (||): true JIKA SALAH SATU true. Hasil: true
console.log(!a); // NOT (!): Membalikkan nilai. Hasil: false
```

## If Statements

Digunakan untuk menjalankan blok kode tertentu berdasarkan kondisi.

```js
let nilai = 80;

if (nilai >= 90) {
  console.log("Nilai Anda A");
} else if (nilai >= 75) {
  console.log("Nilai Anda B");
} else {
  console.log("Anda harus remedial");
}
```

[⬆ Kembali ke Daftar Isi](#daftar-isi)

---

## Perulangan (Loops)

Perulangan digunakan untuk menjalankan blok kode secara berulang-ulang tanpa harus menulisnya berkali-kali.

### while loop

Mengeksekusi kode selama kondisinya bernilai `true`.

Contoh:

```js
let i = 1;

while (i <= 3) {
  console.log("Perulangan ke-" + i);
  i++; // Penting: agar loop tidak berjalan tanpa henti (infinite loop)
}
```

### for loop

Lebih ringkas karena inisialisasi, kondisi, dan penambahan dilakukan di satu baris.

contoh:

```js
// for (inisialisasi; kondisi; iterasi)
for (let j = 1; j <= 3; j++) {
  console.log("Ini for loop ke-" + j);
}
```

[⬆ Kembali ke Daftar Isi](#daftar-isi)

---

## Fungsi (Functions)

Fungsi adalah blok kode yang dirancang untuk melakukan tugas tertentu dan dapat dipanggil berkali-kali.

### Basic Function & Parameters

Parameter adalah variabel penampung di dalam definisi fungsi. Argumen adalah nilai nyata yang dikirim saat fungsi dipanggil.

Contoh:

```js
// 'nama' adalah Parameter
function sapaPengguna(nama) {
  console.log("Halo, selamat datang " + nama + "!");
}

// "Purwa" adalah Argumen
sapaPengguna("Purwa");
```

### Function Returns

Gunakan keyword `return` untuk mengembalikan nilai dari sebuah fungsi, sehingga nilainya bisa disimpan ke dalam variabel lain.

```js
function hitungLuasPersegi(sisi) {
  let luas = sisi * sisi;
  return luas; // Mengembalikan nilai luas
}

let hasilLuas = hitungLuasPersegi(5);
console.log("Luasnya adalah: " + hasilLuas); // Output: 25
```

[⬆ Kembali ke Daftar Isi](#daftar-isi)

---

## Struktur Data: Array dan Object

### Array

Array adalah variabel khusus yang dapat menampung lebih dari satu nilai sekaligus. Urutan dimulai dari indeks ke-0.

```js
let buah = ["Apel", "Jeruk", "Mangga"];
console.log(buah[0]); // Output: Apel
console.log(buah.length); // Output: 3 (jumlah item)
```

### Iterate over Arrays (for loop & forEach)

Untuk mengakses semua elemen di dalam Array, kita bisa melakukan iterasi.

Menggunakan for loop biasa:

```js
let mobil = ["Toyota", "Honda", "Suzuki"];
for (let i = 0; i < mobil.length; i++) {
  console.log(mobil[i]);
}
```

Menggunakan metode forEach() (Lebih modern dan sering digunakan):

```js
let hewan = ["Kucing", "Anjing", "Burung"];
hewan.forEach(function (item) {
  console.log("Hewan: " + item);
});
```

### Object

Jika Array menggunakan angka (indeks) untuk mengakses data, Object menggunakan key (properti).

```js
let siswa = {
  nama: "Budi Santoso",
  umur: 20,
  lulus: true,
};

console.log(siswa.nama); // Cara akses menggunakan titik (dot notation)
console.log(siswa["umur"]); // Cara akses menggunakan bracket
```

[⬆ Kembali ke Daftar Isi](#daftar-isi)

---

## Pengenalan DOM

DOM digunakan untuk memanipulasi elemen HTML menggunakan JavaScript.

Contoh:

```js
document.getElementById("judul").innerHTML = "Hello";
```

[⬆ Kembali ke Daftar Isi](#daftar-isi)

---

## Latihan (Practical Exercise)


### Latihan 1: Logika dan Perulangan Dasar

Buka konsol browser Anda, lalu buatlah sebuah for loop yang mencetak angka 1 sampai 10. Jika angkanya genap, cetak "[Angka] adalah Genap", jika ganjil cetak "[Angka] adalah Ganjil".

```js

// TODO: Buat for loop dari let i = 1 sampai i <= 10

// TODO: Gunakan if statement dan operator modulus (%) untuk mengecek genap/ganjil
// Hint: i % 2 === 0 berarti angka genap

// TODO: Console.log hasilnya

```

### Latihan 2: Array dan foreach
Diberikan sebuah Array nama-nama warna. Gunakan metode forEach untuk mencetak setiap warna ke console dalam huruf kapital.

```js

let daftarWarna = ["merah", "kuning", "hijau", "biru"];

// TODO: Panggil method forEach pada daftarWarna
// TODO: Di dalam fungsi forEach, gunakan metode .toUpperCase() untuk mengubah teks menjadi kapital
// TODO: console.log hasilnya

```

[⬆ Kembali ke Daftar Isi](#daftar-isi)

## Tugas Mandiri

Challenge: Interaktif "Daftar Belanja" (Shopping List)

Buatlah sebuah aplikasi web sederhana dengan satu file `index.html` yang menggabungkan HTML dasar dan JavaScript.

Spesifikasi UI (HTML):
- Sebuah `<h1>` dengan judul "Daftar Belanja".
- Sebuah tag `<ul>` dengan ID list-belanja (awalnya kosong).
- Sebuah tombol dengan teks "Tampilkan Daftar Belanja".

### Spesifikasi Fungsionalitas (JavaScript):

1. Buat sebuah Array berisi minimal 4 string item belanjaan (misal: "Beras", "Telur", "Susu", "Minyak Goreng").
2. Buat sebuah Function bernama renderBelanjaan().
3. Di dalam fungsi tersebut, gunakan document.getElementById untuk mengambil elemen `<ul>`.
4. Kosongkan isi `<ul>` terlebih dahulu (gunakan .innerHTML = "").
5. Lakukan iterasi pada Array menggunakan forEach().
6. Di setiap iterasi, buat string tag `<li>` (misal: `<li>Beras</li>`) dan tambahkan ke dalam innerHTML milik `<ul>`.
7. Hubungkan Function tersebut ke tombol menggunakan atribut onclick di HTML.

[⬆ Kembali ke Daftar Isi](#daftar-isi)

`
