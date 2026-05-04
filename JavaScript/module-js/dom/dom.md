# Pengenalan Document Object Model (DOM) JavaScript

## Daftar Isi

- [Pendahuluan: Apa itu DOM](#pendahuluan)
- [Struktur DOM](#variabel-dan-tipe-data)
- [Memilih Elemen (DOM Selection)](#operator-dan-logika)
- [Memanipulasi Elemen (DOM Manipulation)](#perulangan-loops)
- [Memanipulasi CSS Class](#fungsi-functions)
- [Membuat dan Menghapus Elemen](#struktur-data-array-dan-object)
- [DOM Events & Event Listeners](#latihan-practical-exercise)
- [Event Object](#tugas-mandiri)

---

## Pendahuluan: Apa itu DOM?

### Konsep DOM 
DOM (Document Object Model) adalah representasi objek dari halaman HTML yang dibuat oleh browser.
Saat browser membaca file HTML, browser akan mengubahnya menjadi struktur objek yang bisa diakses oleh JavaScript.

Artinya JavaScript dapat:
- Mengubah isi teks
- Mengubah atribut
- Mengubah style
- Menambah elemen baru
- Menghapus elemen
- Merespon interaksi user

### Contoh Sederhana

### HTML

```html
<h1 id="judul">Hello World</h1>
```

### JavaScript

```js
const judul = document.getElementById("judul");

judul.textContent = "Belajar DOM JavaScript";
```

---

## Struktur DOM
Browser membaca HTML menjadi struktur pohon (Tree Structure).

### Contoh:

```html

<body>
  <h1>Judul</h1>
  <p>Paragraf</p>
</body>

```

### Strukturnya:

    document
    └── html
        └── body
            ├── h1
            └── p

### Object penting DOM

| Objek      | Fungsi                   |
| ---------- | ------------------------ |
| `document` | Pintu masuk utama DOM    |
| `element`  | Representasi elemen HTML |
| `node`     | Semua item dalam DOM     |


---

## 3. Memilih Elemen (DOM Selection)
Sebelum memanipulasi elemen, kita harus memilihnya dahulu

### A. getElementById()
Digunakan untuk memilih elemen berdasarkan `id`

### HTML
```html
<h1 id="title">Hello</h1>
```
### JavaScript
```js
const title = document.getElementById("title");

console.log(title);
```

### B. querySelector()
Menggunakan selector CSS.

### HTML
```html
<p class="text">Paragraf</p>
```

### java Script
```js
const text = document.querySelector(".text");

console.log(text);
```

### C. querySelectorAll()
Mengambil banyak elemen sekaligus.

HTML
```html
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
```

javaScript
```js
const items = document.querySelectorAll("li");

console.log(items);
```

### getElementsByClassName()

HTML
```html
<p class="info">A</p>
<p class="info">B</p>
```
JavaScript
```js
const infos = document.getElementsByClassName("info");

console.log(infos);
```

### Perbedaan querySelector vs querySelectorAll
| Method               | Hasil            |
| -------------------- | ---------------- |
| `querySelector()`    | 1 elemen pertama |
| `querySelectorAll()` | Semua elemen     |

## 4. Memanipulasi Elemen (DOM Manipulation)

### A. Mengubah Text
textContent, Hanya membaca teks.

HTML
```html
<p id="demo">Halo</p>
```

javaScript
```js
const demo = document.getElementById("demo");

demo.textContent = "Belajar JavaScript";
```

### B. InnerHTML
Bisa membaca HTML.

javaScript
```js
demo.innerHTML = "<strong>Belajar DOM</strong>";
```

Hasil 
```html
<strong>Belajar DOM</strong>
```

### Perbedaan textContent dan innerHTML

| Property      | Bisa membaca HTML? |
| ------------- | ------------------ |
| `textContent` | Tidak              |
| `innerHTML`   | Ya                 |

### C. Mengubah Attribute
HTML
```HTML
<img id="gambar">
```

JavaScript
```js
const gambar = document.getElementById("gambar");

gambar.setAttribute("src", "kucing.jpg");
gambar.setAttribute("width", "200");
```

### D. Mengambil Attribute 
```js
const src = gambar.getAttribute("src");

console.log(src);
```


### Mengubah Style

HTML
```HTML
<p id="text">Halo Dunia</p>
```

JavaScript
```js
const text = document.getElementById("text");

text.style.color = "red";
text.style.fontSize = "30px";
text.style.backgroundColor = "yellow";
```

### Kenapa background-color jadi backgroundColor?
Karena JavaScript menggunakan format camelCase.

| CSS              | JavaScript      |
| ---------------- | --------------- |
| background-color | backgroundColor |
| font-size        | fontSize        |


## 5. Manipulasi CSS Class
Lebih baik menggunakan class daripada mengubah style satu-satu.

HTML
```HTML
<p id="teks">Hello</p>
```

CSS
```css
.active {
  color: white;
  background: black;
}
```

JavaScript
```js
const teks = document.getElementById("teks");

teks.classList.add("active");
```

### Method classList
| Method        | Fungsi                      |
| ------------- | --------------------------- |
| `.add()`      | Menambah class              |
| `.remove()`   | Menghapus class             |
| `.toggle()`   | Menambah/menghapus otomatis |
| `.contains()` | Mengecek class              |

### Contoh TOggle
```js
teks.classList.toggle("active");
```

---
## 6. Membuat dan Menghapus Elemen

### A. createElement()

JavaScript
```js
const li = document.createElement("li");

li.textContent = "Belajar DOM";
B. appendChild()
```

### Menambahkan elemen ke akhir parent.

HTML
```html
<ul id="list"></ul>
```

JavaScript

```js
const list = document.getElementById("list");

list.appendChild(li);
C. prepend()
```

### Menambahkan elemen ke awal.

```js
list.prepend(li);
D. remove()
```

### Menghapus elemen.

```js
li.remove();
```

### Contoh Lengkap

HTML
```html
<ul id="buah"></ul>
```
JavaScript
```js
const buah = document.getElementById("buah");

const item = document.createElement("li");

item.textContent = "Apel";

buah.appendChild(item);
```
## 7. DOM Events (Event Listeners)
Event adalah aksi yang terjadi pada halaman web.

### Contoh:
- klik
- hover
- mengetik
- submit form


### addEventListener()
Format:
```js
element.addEventListener("event", function);
```
### Contoh Click Event

HTML
```html
<button id="btn">Klik Saya</button>
```

JavaScript
```js
const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  alert("Tombol diklik!");
});
```

### Menggunakan Arrow Function

```js
btn.addEventListener("click", () => {
  console.log("Klik");
});
```

### Jenis Event Umum
| Event      | Fungsi            |
| ---------- | ----------------- |
| click      | Saat diklik       |
| mouseenter | Mouse masuk       |
| mouseleave | Mouse keluar      |
| keydown    | Keyboard ditekan  |
| input      | Isi input berubah |
| submit     | Form dikirim      |

### Contoh Event Input

HTML
```html
<input type="text" id="nama">
```
JavaScript
```js
const nama = document.getElementById("nama");

nama.addEventListener("input", () => {
  console.log(nama.value);
});
```
## 8. Event Object
Setiap event otomatis mengirim object event.
Biasanya ditulis:

```js
e
```

atau


```js
event
```

### Contoh
```js
btn.addEventListener("click", function (e) {
  console.log(e);
});
```
### Properti Event Penting
| Property   | Fungsi             |
| ---------- | ------------------ |
| `e.target` | Elemen yang diklik |
| `e.type`   | Jenis event        |
| `e.key`    | Tombol keyboard    |

Contoh Keyboard Event
```js
document.addEventListener("keydown", function (e) {
  console.log("Tombol:", e.key);
});
```

### preventDefault()
Digunakan untuk mencegah perilaku default browser.

### Contoh Form

HTML
```html
<form id="form">
  <button type="submit">Kirim</button>
</form>
```

JavaScript
```js
const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("Form berhasil dicegah reload");
});
```

## 9. Studi Kasus Mini


### A. Toggle Dark Mode

HTML
```html
<button id="dark-btn">Dark Mode</button>
```
CSS
```css
.dark {
  background: black;
  color: white;
}
```

JavaScript
```js
const btn = document.getElementById("dark-btn");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
```

### B. Counter Sederhana

HTML
```html
<h1 id="angka">0</h1>

<button id="plus">+</button>
<button id="minus">-</button>
```
JavaScript
```js
let count = 0;

const angka = document.getElementById("angka");

document.getElementById("plus").addEventListener("click", () => {
  count++;
  angka.textContent = count;
});

document.getElementById("minus").addEventListener("click", () => {
  count--;
  angka.textContent = count;
});
```

### C. Live Character Counter

HTML
```html
<textarea id="pesan"></textarea>

<p>Total karakter: <span id="jumlah">0</span></p>
```

JavaScript
```js
const pesan = document.getElementById("pesan");
const jumlah = document.getElementById("jumlah");

pesan.addEventListener("input", () => {
  jumlah.textContent = pesan.value.length;
});
```

### 10. Latihan

### Latihan 1 — Ubah Warna
Buat tombol yang dapat mengubah warna background halaman.

### Latihan 2 — Show/Hide Password

Hint:
- Gunakan input type password
- Ubah attribute type menjadi text

### Latihan 3 — Stopwatch Sederhana

Fitur:
- Start
- Stop
- Reset

### Latihan 4 — Generate List

Input:
```html
<input>
<button>Tambah</button>
```

Output:
```html
<ul></ul>
```
## 11. Tugas Mandiri
Challenge: To-Do List Interaktif

Struktur HTML
```html
<input type="text" id="input-tugas" placeholder="Ketik tugas di sini...">

<button id="btn-tambah">
  Tambah Tugas
</button>

<ul id="daftar-tugas"></ul>
```
JavaScript Lengkap
```js
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const daftarTugas = document.getElementById("daftar-tugas");

btnTambah.addEventListener("click", function () {

  const tugas = inputTugas.value;

  // Validasi
  if (tugas === "") {
    alert("Tugas tidak boleh kosong!");
    return;
  }

  // Membuat elemen li
  const li = document.createElement("li");

  li.textContent = tugas;

  // Membuat tombol hapus
  const btnHapus = document.createElement("button");

  btnHapus.textContent = "Hapus";

  // Memasukkan tombol ke li
  li.appendChild(btnHapus);

  // Memasukkan li ke ul
  daftarTugas.appendChild(li);

  // Event hapus
  btnHapus.addEventListener("click", function () {
    li.remove();
  });

  // Kosongkan input
  inputTugas.value = "";
});
```

### 12. Best Practice DOM JavaScript
Gunakan const jika variabel tidak berubah
```js
const button = document.getElementById("btn");
```
Pisahkan HTML, CSS, dan JavaScript

Jangan gunakan:
```html
<button onclick="klik()">Klik</button>
```
Gunakan:
```js
button.addEventListener("click", klik);
```

Gunakan Nama Variabel yang Jelas
Kurang bagus:
```js
const x = document.getElementById("a");
```
Lebih baik:
```js
const tombolLogin = document.getElementById("btn-login");
```

Hindari innerHTML untuk Input User
Karena bisa terkena:
- XSS (Cross Site Scripting)

Lebih aman:
- textContent

### Kesimpulan

Pada pertemuan ini kita belajar:
-Apa itu DOM
-Cara memilih elemen HTML
-Mengubah isi dan style elemen
-Menambah dan menghapus elemen
-Menggunakan Event Listener
-Membuat interaksi web menggunakan JavaScript

DOM adalah fondasi utama JavaScript Front-End modern. Hampir semua framework seperti React, Vue, dan Angular pada dasarnya bekerja dengan konsep manipulasi UI seperti DOM.
