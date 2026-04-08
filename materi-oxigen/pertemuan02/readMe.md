# 1. Flexbox

## Apa itu Flexbox?
**Flexbox** adalah layout system di CSS yang digunakan untuk menyusun elemen dalam **satu arah**, yaitu:

- **baris (row)**
- **kolom (column)**

Flexbox sangat cocok digunakan untuk:
- navbar
- tombol
- card sejajar
- menu horizontal / vertikal
- layout sederhana

---

## Cara Mengaktifkan Flexbox
Flexbox diaktifkan pada elemen **parent/container** dengan:

```css
.parent {
  display: flex;
}

```
Artinya semua elemen di dalam .parent akan menjadi flex items.

## Contoh Dasar Flexbox

HTML

  <div class="parent">
    <div class="child">Item 1</div>
    <div class="child">Item 2</div>
    <div class="child">Item 3</div>
  </div>

CSS

  .parent {
    display: flex;
    gap: 20px;
  }

  .child {
    background-color: lightblue;
    padding: 20px;
  }

Hasil : Item akan tampil sejajar ke samping.

---

## Properti Penting pada Flexbox

1. justify-content

Mengatur posisi item secara horizontal.

  .parent {
    justify-content: center;
  }

Pilihan umum:

- flex-start → rata kiri
- center → di tengah
- flex-end → rata kanan
- space-between → jarak antar item merata
- space-around
- space-evenly

2. align-items

Mengatur posisi item secara vertikal.

  .parent {
    align-items: center;
  }

Pilihan umum:

- stretch
- center
- flex-start
- flex-end

3. flex-direction

Mengatur arah susunan item.

  .parent {
    flex-direction: row;
  }

Pilihan:

- row → horizontal
- column → vertikal

4. gap

Memberi jarak antar item.

  .parent {
    gap: 20px;
  }

5. flex: 1

Digunakan pada child untuk membuat item mengisi ruang yang tersedia.

  .child {
    flex: 1;
  }

Artinya semua child akan memiliki ukuran yang lebih seimbang.

Contoh Flexbox yang Sering Dipakai: Navbar

HTML

<header>
  <span>Logo</span>

  <nav>
    <ul>
      <li><a href="">Home</a></li>
      <li><a href="">About</a></li>
      <li><a href="">Contact</a></li>
    </ul>
  </nav>

  <button>Klik</button>
</header>

CSS

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    display: flex;
    gap: 20px;
    list-style: none;
  }

--- 

Penjelasan

Pada contoh ini:

header menggunakan Flexbox untuk menyusun logo, menu, dan tombol dalam satu baris
ul juga menggunakan Flexbox agar menu tampil sejajar
Kapan Menggunakan Flexbox?

Gunakan Flexbox jika ingin mengatur elemen dalam 1 arah.

Cocok untuk:
navbar
tombol sejajar
card horizontal
section hero
menu navigasi
2. CSS Grid
Apa itu Grid?

CSS Grid adalah layout system di CSS yang digunakan untuk menyusun elemen dalam dua arah, yaitu:

baris
kolom

Grid sangat cocok untuk:

layout halaman website
galeri
dashboard
susunan card
section project
Cara Mengaktifkan Grid

Grid diaktifkan pada elemen parent/container dengan:

.parent {
  display: grid;
}
Contoh Dasar Grid
HTML
<div class="grid-container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
  <div class="item">Item 4</div>
  <div class="item">Item 5</div>
  <div class="item">Item 6</div>
</div>
CSS
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.item {
  background-color: lightblue;
  padding: 30px;
  text-align: center;
}
Hasil

Item akan tersusun dalam 3 kolom.

Properti Penting pada Grid
1. grid-template-columns

Mengatur jumlah dan ukuran kolom.

grid-template-columns: repeat(3, 1fr);

Artinya:

buat 3 kolom
masing-masing memiliki ukuran 1 bagian ruang

Contoh lain:

grid-template-columns: 2fr 1fr 1fr;

Artinya kolom pertama lebih lebar.

2. grid-template-rows

Mengatur tinggi baris.

grid-template-rows: 100px 200px 100px;
3. gap

Memberi jarak antar item.

gap: 20px;
fr pada Grid

fr berarti fraction atau bagian ruang.

Contoh:

grid-template-columns: 1fr 1fr 1fr;

Artinya:

kolom 1 = 1 bagian
kolom 2 = 1 bagian
kolom 3 = 1 bagian

Semua sama besar.

Contoh Grid yang Sering Dipakai: Layout Website
HTML
<div class="container">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main Content</main>
  <footer class="footer">Footer</footer>
</div>
CSS
.container {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 100px 300px 100px;
}
Penjelasan

Grid sering dipakai untuk menyusun layout besar website, seperti:

header
sidebar
konten utama
footer
Kapan Menggunakan Grid?

Gunakan Grid jika ingin mengatur elemen dalam baris dan kolom sekaligus.

Cocok untuk:
layout website
dashboard
gallery
section project
susunan card
3. Grid Template Areas
Apa itu grid-template-areas?

grid-template-areas digunakan untuk membuat layout grid menggunakan nama area, sehingga lebih mudah dibaca.

Contoh layout:

HEADER  HEADER  HEADER
SIDEBAR MAIN    MAIN
FOOTER  FOOTER  FOOTER
Contoh Penggunaan
HTML
<div class="container">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main Content</main>
  <footer class="footer">Footer</footer>
</div>
CSS
.container {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 100px 300px 100px;

  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
Penjelasan
grid-template-areas

Digunakan untuk menggambar layout.

grid-template-areas:
  "header header header"
  "sidebar main main"
  "footer footer footer";

Artinya:

header memenuhi 3 kolom
sidebar di kiri
main di kanan
footer memenuhi 3 kolom
grid-area

Digunakan untuk menempatkan elemen ke area yang sudah diberi nama.

.header {
  grid-area: header;
}
Kenapa grid-template-areas Bagus?

Karena layout jadi:

lebih mudah dibaca
lebih visual
lebih gampang dijelaskan ke pemula
cocok untuk layout website
4. Responsive Web Design
Apa itu Responsive?

Responsive Web Design adalah teknik agar website bisa menyesuaikan tampilan berdasarkan ukuran layar.

Website yang responsive akan tetap nyaman dilihat di:

laptop
tablet
HP
Kenapa Responsive Penting?

Karena pengguna website tidak hanya membuka website di laptop, tetapi juga di perangkat mobile.

Jika website tidak responsive:

teks bisa terlalu kecil
layout bisa berantakan
elemen bisa keluar layar
website sulit digunakan
Viewport

Pada HTML, biasanya kita menambahkan:

<meta name="viewport" content="width=device-width, initial-scale=1.0">
Fungsi

Agar browser mengetahui bahwa lebar halaman harus mengikuti lebar layar perangkat.

Tanpa viewport, tampilan website di HP bisa menjadi tidak proporsional.

Ukuran yang Fleksibel

Dalam responsive design, sebaiknya tidak terlalu bergantung pada ukuran tetap seperti:

width: 1200px;

Lebih baik gunakan ukuran yang fleksibel seperti:

%
fr
rem
max-width
vw

Contoh:

.container {
  width: 100%;
  max-width: 1200px;
}

Artinya:

lebar mengikuti layar
maksimal 1200px
Media Query
Apa itu Media Query?

Media Query adalah aturan CSS yang dijalankan hanya pada ukuran layar tertentu.

Contoh:

@media (max-width: 768px) {
  body {
    background-color: lightyellow;
  }
}

Artinya:

Jika lebar layar 768px atau lebih kecil, maka CSS di dalamnya akan dijalankan.

Fungsi Media Query

Media Query sering digunakan untuk:

mengubah layout
mengubah jumlah kolom
mengubah ukuran font
mengubah padding / jarak
membuat website lebih nyaman di HP
Contoh Responsive Grid
CSS Desktop
.container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}
CSS Mobile
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
Penjelasan
Desktop → layout memiliki 2 kolom
Mobile → layout berubah menjadi 1 kolom
Contoh Responsive Flexbox
CSS Desktop
.hero {
  display: flex;
  flex-direction: row;
}
CSS Mobile
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }
}
Penjelasan
Desktop → elemen disusun ke samping
Mobile → elemen disusun ke bawah
Prinsip Responsive yang Penting

Saat layar mengecil:

layout biasanya ditumpuk ke bawah
grid biasanya berkurang kolomnya
font bisa diperkecil
padding bisa diperkecil
5. Perbedaan Flexbox dan Grid
Gunakan Flexbox jika:
layout 1 arah
elemen sejajar horizontal / vertikal
navbar
tombol
hero section
Gunakan Grid jika:
layout 2 arah
butuh baris dan kolom
gallery
dashboard
section card
layout halaman
Ringkasan Singkat
Flexbox	Grid
1 arah	2 arah
Cocok untuk susunan elemen sejajar	Cocok untuk layout besar
Sering dipakai untuk navbar, tombol, hero	Sering dipakai untuk gallery, dashboard, layout
6. Project Implementasi: Web Portfolio
Tujuan Project

Project ini dibuat untuk mengimplementasikan materi:

Flexbox
Grid
Responsive Web Design
Isi Website Portfolio

Struktur isi yang digunakan:

Navbar
Hero / About
Skills
Projects
Experience
Contact
Footer
Penerapan Materi di Project
Flexbox digunakan untuk:
navbar
hero section
tombol hero
Grid digunakan untuk:
skills section
projects section
experience section
Responsive digunakan untuk:
mengubah layout hero
mengubah jumlah kolom grid
membuat navbar lebih fleksibel di layar kecil
Contoh Struktur HTML Project
<header class="navbar">...</header>
<section class="hero">...</section>
<section class="skills">...</section>
<section class="projects">...</section>
<section class="experience">...</section>
<section class="contact">...</section>
<footer>...</footer>
Alur Pengerjaan Project

Agar tidak terlalu membingungkan, project bisa dibuat bertahap:

Tahap 1

Buat struktur HTML dulu.

Tahap 2

Tambahkan styling dasar.

Tahap 3

Terapkan Flexbox.

Tahap 4

Terapkan Grid.

Tahap 5

Tambahkan Responsive.
