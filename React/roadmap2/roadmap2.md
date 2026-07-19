# React - roadmap 2: Interaktivitas dan Siklus Hidup Komponen

## Daftar Isi

1. [Pendahuluan](https://www.google.com/search?q=%23pendahuluan)
2. [Event dan Forms](https://www.google.com/search?q=%23event-dan-forms)
3. [Conditional Rendering](https://www.google.com/search?q=%23conditional-rendering)
4. [List Rendering](https://www.google.com/search?q=%23list-rendering)
5. [Effect Hook (useEffect)](https://www.google.com/search?q=%23effect-hook-useeffect)
6. [Latihan](https://www.google.com/search?q=%23latihan)
7. [Tugas Mandiri](https://www.google.com/search?q=%23tugas-mandiri)

---

## 🚀 Pendahuluan

Di Pertemuan 1, kita sudah belajar cara membuat tampilan statis menggunakan Component dan Props, serta sedikit mengubah data dengan State. Tapi aplikasi web yang bagus harus bisa merespon tindakan user (seperti klik dan ketik) serta mengelola data yang banyak.

Di modul ini, kita akan belajar bagaimana membuat React lebih "hidup" dan interaktif!

---

## 🖱️ Event dan Forms

Dalam React, menangani interaksi (*event*) seperti klik tombol atau mengetik di form sangat mirip dengan HTML biasa, tapi dengan sedikit gaya JavaScript.

### Event Handling

Penulisan *event* di React menggunakan **camelCase** (contoh: `onClick`, `onChange`, `onSubmit`), bukan *lowercase* seperti di HTML.

```jsx
function TombolAjaib() {
  const handleClick = () => {
    alert('Tombol berhasil ditekan! 🎉');
  };

  return (
    // Gunakan onClick, bukan onclick
    <button onClick={handleClick}>
      Klik Saya!
    </button>
  );
}

```

### Menangani Forms (Controlled Components)

Di React, kita sering menghubungkan *input form* dengan `useState`. Ini disebut *Controlled Components*, di mana React memegang kendali penuh atas data yang diketik.

```jsx
import { useState } from 'react';

function FormPencarian() {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman reload saat form di-submit
    alert(`Mencari: ${keyword}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)} 
        placeholder="Cari sesuatu..."
      />
      <button type="submit">Cari</button>
      <p>Sedang mengetik: {keyword}</p>
    </form>
  );
}

```

> 💡 **Pro-Tip:** Selalu gunakan `e.preventDefault()` di dalam fungsi `onSubmit`. Jika tidak, browsermu akan *refresh* dan semua data *state* kamu akan hilang ter-reset!

---

## 🎭 Conditional Rendering

*Conditional Rendering* adalah cara kita menampilkan *component* atau elemen yang berbeda berdasarkan kondisi tertentu (misal: sudah login vs belum login).

*Analogi: Seperti penjaga pintu bioskop yang mengecek tiketmu. Jika punya tiket (kondisi TRUE), boleh masuk (tampil). Jika tidak (kondisi FALSE), dilarang masuk (disembunyikan).*

### 1. Menggunakan Ternary Operator (`kondisi ? true : false`)

Cara paling sering digunakan di dalam JSX.

```jsx
function PesanLogin({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Selamat Datang Kembali, Bos! 😎</h1>
      ) : (
        <button>Silakan Login Dulu</button>
      )}
    </div>
  );
}

```

### 2. Menggunakan Logical AND (`&&`)

Sangat berguna jika kamu **hanya** ingin menampilkan sesuatu ketika kondisinya `true`, dan tidak melakukan apa-apa jika `false`.

```jsx
function KotakMasuk({ pesanBaru }) {
  return (
    <div>
      <h2>Pesan Kamu</h2>
      {pesanBaru > 0 && <p>Kamu punya {pesanBaru} pesan yang belum dibaca! 📩</p>}
    </div>
  );
}

```

---

## 📋 List Rendering

Punya banyak data dalam bentuk *Array* dan ingin menampilkannya satu per satu? Kita tidak perlu menulis kode berulang kali. Di React, kita menggunakan fungsi `map()` dari JavaScript.

```jsx
function DaftarBuah() {
  const buahBuahan = ['Apel', 'Mangga', 'Jeruk', 'Pisang'];

  return (
    <ul>
      {buahBuahan.map((buah, index) => (
        <li key={index}>{buah}</li>
      ))}
    </ul>
  );
}

```

> ⚠️ **Awas Error!:** Selalu berikan atribut `key` yang unik saat menggunakan `.map()`. `key` membantu React mengenali item mana yang berubah, ditambah, atau dihapus. Tanpa `key`, React akan mengeluh (muncul pesan peringatan warna merah) di Console-mu!

---

## 🔄 Effect Hook (useEffect)

`useEffect` memungkinkan kita menjalankan efek samping (*side effects*) di dalam *component*.
Contoh efek samping:

* Mengambil data dari API luar (Fetch data)
* Mengubah judul tab browser secara manual
* Mengatur *timer* atau *interval*

*Analogi: `useEffect` itu seperti instruksi tambahan yang kamu berikan ke component. "Hei component, kalau kamu sudah selesai nampil di layar, tolong lari ke server bentar ya buat ambil data."*

### Cara Menggunakan useEffect

```jsx
import { useState, useEffect } from 'react';

function ProfilPengguna() {
  const [nama, setNama] = useState('Budi');

  // useEffect ini akan jalan setiap kali 'nama' berubah
  useEffect(() => {
    document.title = `Profil - ${nama}`;
    console.log('Judul tab berhasil diubah!');
  }, [nama]); // <--- Ini namanya Dependency Array

  return (
    <div>
      <h1>Nama: {nama}</h1>
      <input value={nama} onChange={(e) => setNama(e.target.value)} />
    </div>
  );
}

```

### Aturan Dependency Array (`[]`)

Array di akhir `useEffect` sangat penting untuk menentukan **kapan** efek tersebut dijalankan:

1. `useEffect(() => {...})` ➡️ Dijalankan **setiap kali** ada render (hati-hati, bisa bikin *infinite loop* / lag!).
2. `useEffect(() => {...}, [])` ➡️ Hanya dijalankan **SATU KALI** saat component pertama kali muncul (cocok untuk Fetch API awal).
3. `useEffect(() => {...}, [data])` ➡️ Dijalankan saat awal, dan dijalankan ulang **HANYA JIKA** `data` berubah.

---

## 💻 Latihan

### Latihan 1: Toggle Button (Conditional Rendering)

Buat component `Lampu` yang memiliki tombol untuk menyalakan/mematikan lampu.

```jsx
// File: Lampu.jsx
import { useState } from 'react';

function Lampu() {
  // TODO: Buat state 'menyala' dengan default false
  
  return (
    <div>
      {/* TODO: Gunakan ternary operator: 
          Jika menyala -> Tampilkan teks "💡 Lampu Menyala"
          Jika mati -> Tampilkan teks "⬛ Lampu Mati" */}
          
      {/* TODO: Buat button yang ketika diklik akan membalikkan nilai state 'menyala' */}
    </div>
  );
}
export default Lampu;

```

🌟 **Reward Selesai:** Gelar **Toggle Master** 🥉

---

### Latihan 2: Render List Framework (List Rendering)

Tampilkan daftar nama framework di bawah ini menggunakan `.map()`.

```jsx
// File: ListFramework.jsx
function ListFramework() {
  const frameworks = [
    { id: 1, nama: 'React', jenis: 'Library' },
    { id: 2, nama: 'Vue', jenis: 'Framework' },
    { id: 3, nama: 'Angular', jenis: 'Framework' }
  ];

  return (
    <div>
      <h2>Daftar Framework & Library</h2>
      <ul>
        {/* TODO: Lakukan mapping pada array frameworks.
            Jangan lupa gunakan property 'id' sebagai key! 
            Format tampilan: "React - Library" */}
      </ul>
    </div>
  );
}
export default ListFramework;

```

🌟 **Reward Selesai:** Gelar **List Mapper** 🥈

---

## 🏆 Tugas Mandiri

### Challenge: Aplikasi Catatan Belanja (Shopping List)

Mari kita gabungkan semua yang sudah dipelajari! Buat sebuah aplikasi catatan belanja sederhana dengan ketentuan berikut:

1. **Fitur Form & Event:**
* Memiliki input teks untuk nama barang.
* Memiliki tombol "Tambah" yang jika diklik (atau disubmit form-nya) akan memasukkan barang ke daftar.
* Setelah ditambah, input teks harus kembali kosong.


2. **Fitur List Rendering:**
* Tampilkan semua barang belanjaan menggunakan tag `<ul>` dan `<li>`.


3. **Fitur Conditional Rendering:**
* Jika belum ada barang di daftar (array kosong), tampilkan teks: *"Yeay! Belanjaan kosong, uang aman! 💸"*
* Jika daftar sudah terisi, hilangkan teks tersebut dan tampilkan daftarnya.


4. **Fitur useEffect (Bonus):**
* Gunakan `useEffect` untuk memunculkan pesan `console.log("Daftar belanja berubah!")` setiap kali ada barang yang ditambah atau dihapus.



**Contoh Struktur State:**

```javascript
// Kamu bisa pakai array of string sederhana
const [barang, setBarang] = useState([]);
const [inputBaru, setInputBaru] = useState('');

```

**Kriteria Penilaian:**

* [ ] State form dan state list dikelola dengan benar.
* [ ] Mencegah input kosong masuk ke dalam daftar (validasi sederhana).
* [ ] Pesan kondisional muncul dengan tepat saat list kosong.
* [ ] List ter-render tanpa pesan peringatan "missing key" di console.

🌟 **Reward Selesai:** Gelar **React Ninja** 🥇

---

## 📚 Referensi

* [React Docs: Responding to Events](https://www.google.com/search?q=https://react.dev/learn/responding-to-events)
* [React Docs: Conditional Rendering](https://www.google.com/search?q=https://react.dev/learn/conditional-rendering)
* [React Docs: Rendering Lists](https://www.google.com/search?q=https://react.dev/learn/rendering-lists)
* [React Docs: Synchronizing with Effects](https://www.google.com/search?q=https://react.dev/learn/synchronizing-with-effects)

---

**Selamat Berlatih!** 🚀

Jangan takut *error*, karena *error* adalah cara React mengajakmu berbicara. Jika mentok, istirahat sejenak, minum air, dan mari diskusikan kembali!