# 📘 Pertemuan 1 — Introduction to Dart

Dart Fundamentals · Beginner Level

## Tujuan Pembelajaran

Setelah menyelesaikan pertemuan ini, kamu diharapkan mampu:

- Memahami apa itu Dart dan kegunaannya.
- Menginstal Dart SDK dan menyiapkan Visual Studio Code.
- Menjalankan kode Dart melalui DartPad maupun terminal.
- Memahami aturan dasar penulisan sintaks Dart.
- Menjelaskan fungsi `main()` dan penggunaan `print()`.
- Menulis komentar untuk mendokumentasikan kode.

## 1.1 Introduction to Dart Programming

### Apa itu Dart?

Dart adalah bahasa pemrograman yang dikembangkan oleh Google. Dart merupakan bahasa yang mendukung pemrograman berorientasi objek (Object-Oriented Programming atau OOP) dan memiliki sistem tipe yang membantu mendeteksi kesalahan kode.

Dart paling dikenal sebagai bahasa pemrograman yang digunakan bersama Flutter untuk membangun aplikasi lintas platform, seperti Android, iOS, web, desktop, dan perangkat lainnya yang didukung Flutter.

> 📺 Referensi video: *Intro to Dart: Crash Course Version* — Khalif Cooper (Medium).

### Mengapa perlu belajar Dart?

Beberapa alasan mempelajari Dart:

1. Mendukung pengembangan aplikasi lintas platform. Dengan Flutter, satu basis kode dapat digunakan untuk beberapa platform.
2. Sintaks relatif mudah dipelajari. Sintaksnya memiliki kemiripan dengan bahasa seperti Java, JavaScript, dan C#.
3. Mendukung OOP. Kamu dapat membuat class, object, inheritance, dan konsep OOP lainnya.
4. Memiliki null safety. Sistem tipe Dart membantu mengurangi kesalahan akibat nilai `null`.
5. Mendukung pengembangan yang cepat. Dart menyediakan fitur seperti hot reload melalui lingkungan pengembangan Flutter.

### Dart vs. Flutter

Keduanya berbeda, tetapi saling berkaitan.

| Dart                                 | Flutter                                 |
| ------------------------------------ | --------------------------------------- |
| Bahasa pemrograman                   | Framework UI                            |
| Menentukan logika program            | Membantu membangun antarmuka aplikasi   |
| Mengelola variabel, fungsi, dan data | Menyediakan widget untuk tampilan       |
| Dapat dipelajari tanpa Flutter       | Menggunakan Dart untuk menulis aplikasi |

Analogi sederhana: Dart adalah bahasa yang kamu gunakan untuk memberikan instruksi, sedangkan Flutter adalah perangkat kerja yang membantumu menyusun instruksi tersebut menjadi aplikasi dengan tampilan visual.

### Contoh program Dart

```
void main() {
  print('Hello, Dart!');
}
```

Output:

```
Hello, Dart!
```

Program ini merupakan contoh sederhana yang akan kita pelajari lebih lanjut pada submateri berikutnya.

## 1.2 Installing Dart SDK

### Apa itu Dart SDK?

Dart SDK (Software Development Kit) adalah kumpulan alat yang dibutuhkan untuk menulis, menjalankan, memeriksa, dan mengembangkan program Dart.

Dart SDK menyediakan beberapa komponen penting:

- Dart CLI: menjalankan perintah Dart melalui terminal.
- Dart runtime: menjalankan program Dart pada lingkungan yang sesuai.
- Dart compiler: menerjemahkan kode Dart ke bentuk yang dapat dijalankan pada target tertentu.
- Dart core libraries: menyediakan fungsi dan fitur dasar, seperti manipulasi teks dan koleksi data.
- Dart analyzer dan formatter: membantu menemukan masalah kode dan merapikan format penulisan.

### Langkah 1 — Unduh Dart SDK

Buka halaman instalasi resmi Dart:

🔗 [Download and Install Dart SDK](https://dart.dev/get-dart)

Pilih metode instalasi sesuai sistem operasi yang digunakan.

| Sistem operasi | Metode                                              |
| -------------- | --------------------------------------------------- |
| Windows        | Installer atau metode instalasi resmi yang tersedia |
| Linux          | Package manager atau arsip SDK                      |
| macOS          | Package manager atau arsip SDK                      |

Catatan penting untuk pengguna Flutter: Flutter SDK sudah menyertakan Dart SDK. Jika tujuan akhirnya adalah mengembangkan aplikasi Flutter, kamu biasanya tidak perlu menginstal Dart SDK secara terpisah.

### Langkah 2 — Periksa instalasi

Buka terminal, lalu jalankan:

```
dart --version
```

Jika instalasi berhasil, terminal akan menampilkan informasi versi Dart yang terpasang.

Contoh bentuk output:

```
Dart SDK version: 3.x.x
```

Angka versi di atas hanya contoh; versi aktual dapat berbeda.

### Langkah 3 — Periksa lokasi executable

Kamu juga dapat memeriksa apakah perintah `dart` tersedia melalui `PATH`.

Pada Linux atau macOS:

```
which dart
```

Pada Windows Command Prompt:

```
where dart
```

Jika perintah tidak ditemukan, kemungkinan SDK belum terpasang dengan benar atau direktori `bin` belum masuk ke `PATH`.

## 1.3 Setting Up Visual Studio Code

### Apa itu Visual Studio Code?

Visual Studio Code (VS Code) adalah editor kode yang menyediakan fitur seperti syntax highlighting, autocomplete, debugging, dan integrasi terminal.

Untuk belajar Dart, VS Code dapat digunakan bersama ekstensi Dart resmi.

### Langkah 1 — Instal VS Code

Unduh VS Code melalui situs resminya:

🔗 [Download Visual Studio Code](https://code.visualstudio.com/)

Pilih installer yang sesuai dengan sistem operasi kamu.

### Langkah 2 — Instal ekstensi Dart

1. Buka VS Code.
2. Tekan `Ctrl + Shift + X` untuk membuka Extensions.
3. Cari `Dart`.
4. Pilih ekstensi Dart yang diterbitkan oleh Dart Code.
5. Klik Install.

Ekstensi ini menyediakan fitur seperti syntax highlighting, autocomplete, analisis kode, dan pemformatan.

### Langkah 3 — Buka folder proyek

Buat folder untuk menyimpan latihan Dart, misalnya:

```
dart-learning/
├── README.md
├── materi/
│   └── 01-introduction.md
└── lab/
    ├── 01-introduction/
    │   └── hello.dart
    ├── 02-variables/
    └── projects/
```

Folder `materi/` berisi teori, folder `lab/` berisi kode latihan yang kamu tulis sendiri.

Kemudian buka folder `dart-learning` melalui menu File → Open Folder.

### Langkah 4 — Periksa terminal VS Code

Buka terminal terintegrasi dengan:

```
Ctrl + `
```

Lalu jalankan:

```
dart --version
```

Jika versi Dart tampil, terminal VS Code sudah dapat mengakses perintah Dart.

Jika kamu sudah menginstal Flutter, kamu juga dapat menjalankan:

```
flutter --version
dart --version
```

Kedua perintah tersebut membantu memeriksa ketersediaan Flutter dan Dart.

## 1.4 Introduction to DartPad

### Apa itu DartPad?

DartPad adalah editor Dart berbasis web yang memungkinkan kamu menulis dan menjalankan kode tanpa perlu memasang SDK terlebih dahulu. DartPad cocok untuk mencoba contoh sederhana dan mempelajari sintaks bahasa Dart.

### Mengenal antarmuka DartPad

> 📄 Referensi bacaan: *Dart Basics* — Kodeco.

[kodeco.com](https://www.kodeco.com/22685966-dart-basics)

Secara umum, kamu akan menggunakan beberapa bagian berikut:

- Code Editor: tempat menulis kode Dart.
- Run: menjalankan kode yang ditulis.
- Output atau Console: menampilkan hasil program dan pesan tertentu.
- Format: merapikan indentasi dan format kode.
- Autocomplete: membantu menyarankan kode ketika kamu mengetik.

Tampilan dapat berubah mengikuti versi DartPad yang digunakan.

### Praktik pertama di DartPad

Salin kode berikut ke editor DartPad:

```
void main() {
  print('Halo, dunia!');
  print('Saya sedang belajar Dart.');
  print('Ini adalah program pertama saya.');
}
```

Klik Run, lalu perhatikan hasilnya.

Output:

```
Halo, dunia!
Saya sedang belajar Dart.
Ini adalah program pertama saya.
```

### Kapan menggunakan DartPad dan VS Code?

| DartPad                            | VS Code                                                 |
| ---------------------------------- | ------------------------------------------------------- |
| Tidak perlu instalasi lokal        | Memerlukan SDK atau lingkungan Dart/Flutter yang sesuai |
| Cocok untuk eksperimen singkat     | Cocok untuk proyek yang lebih besar                     |
| Praktis untuk mengikuti tutorial   | Mendukung pengelolaan file dan folder proyek            |
| Memiliki batasan library dan paket | Lebih fleksibel untuk pengembangan lokal                |

DartPad mendukung bahasa Dart dan contoh Flutter tertentu, tetapi tidak mendukung semua paket atau kemampuan proyek lokal.

Rekomendasi belajar: gunakan DartPad untuk mencoba contoh dengan cepat, kemudian gunakan VS Code untuk menyimpan latihan dan membangun proyek yang berkelanjutan.

## 1.5 Dart Syntax Rules

### Apa itu sintaks?

Sintaks adalah aturan penulisan yang harus diikuti agar kode dapat dipahami dan diproses oleh bahasa pemrograman.

Seperti bahasa manusia yang memiliki aturan tata bahasa, Dart juga memiliki aturan dalam penulisan instruksi.

### 1.5.1 Statements dan semicolon

Sebagian besar pernyataan (statement) dalam Dart diakhiri dengan titik koma (`;`).

```
void main() {
  print('Hello');
  print('Welcome to Dart');
}
```

Setiap pemanggilan `print()` di atas diakhiri dengan `;`.

### 1.5.2 Case sensitivity

Dart membedakan huruf besar dan huruf kecil (case-sensitive).

```
void main() {
  String nama = 'Purwa';

  print(nama);
  // print(Nama); // Error: Nama berbeda dari nama
}
```

`nama`, `Nama`, dan `NAMA` dianggap sebagai identifier yang berbeda.

### 1.5.3 Curly braces

Kurung kurawal `{}` digunakan untuk membatasi blok kode, misalnya blok fungsi dan kondisi.

```
void main() {
  print('Baris pertama');

  if (true) {
    print('Baris kedua');
  }
}
```

### 1.5.4 Strings dan quotation marks

String merupakan data berbentuk teks. Dart mendukung tanda petik tunggal (`'`) maupun ganda (`"`).

```
void main() {
  print('Belajar Dart');
  print("Belajar Flutter");
}
```

Keduanya valid untuk membuat string biasa.

### 1.5.5 Penamaan identifier

Identifier adalah nama yang digunakan untuk variabel, fungsi, class, dan elemen program lainnya.

Contoh:

```
void main() {
  String namaMahasiswa = 'Purwa';
  int umur = 20;

  print(namaMahasiswa);
  print(umur);
}
```

Dart umumnya menggunakan gaya penamaan berikut:

- Variabel dan fungsi: `lowerCamelCase`, misalnya `namaMahasiswa`.
- Class: `UpperCamelCase`, misalnya `Mahasiswa`.
- Konstanta dengan `const`: nama biasanya menggunakan `lowerCamelCase`, misalnya `maksimumNilai`.

### 1.5.6 Indentation dan code formatting

Indentasi membantu membuat struktur kode lebih mudah dibaca.

Contoh yang rapi:

```
void main() {
  if (true) {
    print('Kode mudah dibaca');
  }
}
```

Contoh yang sulit dibaca:

```
void main(){
if(true){
print('Kode sulit dibaca');
}
}
```

Keduanya dapat valid secara sintaks, tetapi contoh pertama lebih mudah dipahami. Kamu dapat menggunakan formatter Dart di VS Code untuk merapikan kode secara otomatis.

### Ringkasan aturan sintaks

| Aturan               | Penjelasan                                       |
| -------------------- | ------------------------------------------------ |
| `;`                  | Mengakhiri sebagian besar statement              |
| `{}`                 | Membatasi blok kode                              |
| `()`                 | Digunakan dalam deklarasi dan pemanggilan fungsi |
| `'...'` atau `"..."` | Membuat string                                   |
| Case-sensitive       | Huruf besar dan kecil dibedakan                  |
| Indentation          | Membantu keterbacaan kode                        |

## 1.6 Creating and Running a Dart File

Sekarang kita mulai menjalankan Dart secara lokal melalui VS Code dan terminal.

### Langkah 1 — Buat folder latihan

Buat folder bernama `dart-learning`, kemudian buka folder tersebut di VS Code.

### Langkah 2 — Buat file Dart

Buat file baru dengan nama:

```
hello.dart
```

Ekstensi `.dart` menunjukkan bahwa file tersebut berisi kode Dart.

Struktur proyek:

```
dart-learning/
└── lab/
    └── 01-introduction/
        └── hello.dart
```

### Langkah 3 — Tulis program

Masukkan kode berikut:

```
void main() {
  print('Hello, Dart!');
  print('Saya mulai belajar pemrograman.');
}
```

Simpan file menggunakan `Ctrl + S`.

### Langkah 4 — Jalankan program

Buka terminal VS Code, pastikan terminal berada di folder `dart-learning`, lalu jalankan:

```
dart run lab/01-introduction/hello.dart
```

Output:

```
Hello, Dart!
Saya mulai belajar pemrograman.
```

Kamu juga dapat menjalankan file dengan:

```
dart lab/01-introduction/hello.dart
```

Untuk latihan awal, gunakan `dart run lab/01-introduction/hello.dart` agar terbiasa dengan perintah menjalankan program Dart.

### Memahami proses menjalankan program

```
hello.dart  →  perintah `dart run`  →  Dart memproses program  →  output di terminal
   (kode sumber)                          (menjalankan & memproses)      (hasil program)
```

### Troubleshooting dasar

| Masalah                            | Solusi                                                              |
| ---------------------------------- | ------------------------------------------------------------------- |
| `dart: command not found`          | Periksa instalasi SDK atau konfigurasi `PATH`.                      |
| `No such file or directory`        | Pastikan terminal berada di folder yang benar dan nama file sesuai. |
| `Expected ';'`                     | Periksa titik koma yang hilang.                                     |
| File belum berubah saat dijalankan | Simpan file sebelum menjalankan kembali.                            |

## 1.7 The `main()` Function

### Apa itu `main()`?

`main()` adalah fungsi utama yang menjadi titik awal eksekusi program Dart biasa, seperti program command-line yang sedang kita pelajari.

Contoh:

```
void main() {
  print('Program dimulai di sini.');
}
```

Ketika program dijalankan, Dart akan memulai eksekusi dari fungsi `main()`.

### Memahami bagian-bagian `main()`

#### `void`

Menunjukkan bahwa fungsi tidak mengembalikan nilai kepada pemanggilnya.

#### `main`

Nama fungsi utama yang dikenali sebagai titik awal program.

#### `()`

Tempat deklarasi parameter fungsi. Pada contoh ini tidak ada parameter.

#### `{}`

Menandai awal dan akhir blok kode fungsi.

### Contoh penggunaan

```
void main() {
  print('Langkah 1');
  print('Langkah 2');
  print('Langkah 3');
}
```

Output:

```
Langkah 1
Langkah 2
Langkah 3
```

Instruksi dijalankan secara berurutan dari atas ke bawah.

Hal yang perlu diingat: pada materi dasar ini, biasakan menempatkan kode yang ingin dijalankan di dalam `main()`. Kita akan mempelajari fungsi lain dan cara memanggilnya pada Pertemuan 4.

## 1.8 Printing Output with `print()`

### Apa itu `print()`?

`print()` adalah fungsi bawaan Dart yang digunakan untuk menampilkan informasi ke output program, biasanya terminal atau console.

Fungsi ini berguna untuk menampilkan teks, angka, hasil perhitungan, dan nilai variabel.

### 1.8.1 Menampilkan teks

```
void main() {
  print('Halo, dunia!');
  print('Saya sedang belajar Dart.');
}
```

Output:

```
Halo, dunia!
Saya sedang belajar Dart.
```

Setiap pemanggilan `print()` menghasilkan satu baris output.

### 1.8.2 Menampilkan angka

```
void main() {
  print(100);
  print(3.14);
  print(10 + 5);
}
```

Output:

```
100
3.14
15
```

Dart mengevaluasi ekspresi `10 + 5` terlebih dahulu, kemudian menampilkan hasilnya.

### 1.8.3 Menampilkan nilai variabel

Variabel adalah tempat untuk menyimpan nilai. Kita akan mempelajarinya secara mendalam pada Pertemuan 2.

```
void main() {
  String nama = 'Purwa';
  int umur = 20;

  print(nama);
  print(umur);
}
```

Output:

```
Purwa
20
```

### 1.8.4 Menggabungkan teks dan nilai

Kamu dapat menggunakan operator `+` untuk menggabungkan string.

```
void main() {
  String nama = 'Purwa';

  print('Halo, ' + nama);
}
```

Output:

```
Halo, Purwa
```

Cara yang lebih praktis adalah menggunakan string interpolation dengan simbol `$`.

```
void main() {
  String nama = 'Purwa';
  int umur = 20;

  print('Nama saya $nama dan umur saya $umur tahun.');
}
```

Output:

```
Nama saya Purwa dan umur saya 20 tahun.
```

String interpolation akan dibahas lebih lanjut pada Pertemuan 2.

### 1.8.5 Perbedaan `print()` dan `debugPrint()`

Dalam Dart biasa, gunakan `print()` untuk menampilkan output. Pada pengembangan Flutter, kamu mungkin juga menjumpai `debugPrint()` untuk keperluan debugging.

Untuk saat ini, cukup kuasai `print()` terlebih dahulu.

## 1.9 Comments in Dart

### Apa itu komentar?

Komentar adalah teks di dalam kode sumber yang digunakan untuk memberikan penjelasan kepada programmer. Komentar biasa tidak dieksekusi sebagai instruksi program.

Komentar berguna untuk:

- Menjelaskan tujuan kode.
- Memberikan catatan kepada diri sendiri atau anggota tim.
- Menandai bagian yang perlu diperbaiki.
- Mendokumentasikan fungsi atau class.

Dart mendukung tiga bentuk komentar utama.

### 1.9.1 Single-line comment

Komentar satu baris diawali dengan `//`.

```
void main() {
  // Menampilkan pesan ke terminal
  print('Hello, Dart!');
}
```

Semua teks setelah `//` pada baris tersebut dianggap komentar.

### 1.9.2 Multi-line comment

Komentar beberapa baris ditulis di antara `/*` dan `*/`.

```
void main() {
  /*
    Program ini digunakan untuk
    menampilkan informasi mahasiswa.
  */

  print('Data Mahasiswa');
}
```

Komentar jenis ini cocok untuk catatan yang memerlukan beberapa baris.

### 1.9.3 Documentation comment

Komentar dokumentasi diawali dengan `///`. Bentuk ini berguna untuk mendokumentasikan fungsi, class, dan API.

```
/// Menampilkan salam kepada pengguna.
void sapaPengguna() {
  print('Halo, pengguna!');
}

void main() {
  sapaPengguna();
}
```

Komentar dokumentasi dapat dimanfaatkan oleh editor untuk menampilkan informasi saat programmer menggunakan fungsi tersebut.

### Contoh penerapan komentar

```
void main() {
  // Informasi mahasiswa
  String nama = 'Purwa';
  int semester = 3;

  // Menampilkan informasi
  print('Nama: $nama');
  print('Semester: $semester');
}
```

Output:

```
Nama: Purwa
Semester: 3
```

### Praktik yang baik dalam menulis komentar

- Jelaskan alasan atau tujuan kode jika memang diperlukan.
- Gunakan komentar yang singkat dan jelas.
- Hindari menjelaskan sesuatu yang sudah sangat jelas dari kode.
- Perbarui komentar ketika perilaku kode berubah.
- Gunakan `///` untuk dokumentasi API yang ditujukan bagi pengguna kode.

---

## Praktik

Latihan untuk pertemuan ini ada di folder lab:

👉 [`../lab/01-introduction/`](../lab/01-introduction/README.md)

Folder lab berisi:

- `README.md` — brief latihan dan checklist progres.
- `exercises/` — latihan kecil per submateri (`print()`, komentar, string).
- `student_intro.dart` — Project 1 (Student Introduction Program).
- `solusi/` — jawaban referensi (buka setelah mencoba).
