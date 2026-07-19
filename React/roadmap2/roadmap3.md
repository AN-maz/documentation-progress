# React - Roadmap 3: Manajemen State Lanjut dan Reusabilitas

## Daftar Isi

1. [Pendahuluan](https://www.google.com/search?q=%23pendahuluan)
2. [Props Children (Komposisi)](https://www.google.com/search?q=%23props-children-komposisi)
3. [Menunjuk Elemen dengan useRef](https://www.google.com/search?q=%23menunjuk-elemen-dengan-useref)
4. [Membuat Custom Hooks](https://www.google.com/search?q=%23membuat-custom-hooks)
5. [Teleportasi Data dengan Context API](https://www.google.com/search?q=%23teleportasi-data-dengan-context-api)
6. [Latihan](https://www.google.com/search?q=%23latihan)
7. [Tugas Mandiri](https://www.google.com/search?q=%23tugas-mandiri)

---

## 🚀 Pendahuluan

Jika di pertemuan sebelumnya kita belajar cara membuat *component* yang interaktif, sekarang kita akan belajar bagaimana menyusun *component* agar lebih rapi (*Children*), memanipulasi elemen secara langsung (*useRef*), mendaur ulang logika (*Custom Hooks*), dan menghindari pengiriman data yang terlalu berbelit-belit (*Context API*).

Siapkan kopimu, mari kita mulai! ☕

---

## 🖼️ Props Children (Komposisi)

Pernahkah kamu memikirkan bagaimana cara membuat *component* yang berfungsi seperti "bungkusan" atau "wadah"? Misalnya membuat *Card* atau *Modal* yang isinya bisa beda-beda. Di sinilah `children` berperan.

*Analogi: Bayangkan `children` itu seperti sebuah bingkai foto. Bingkainya tetap sama (Component), tapi foto di dalamnya (`children`) bisa kamu ganti-ganti sesuka hati.*

### Menggunakan Props Children

```jsx
// 1. Membuat Component Pembungkus (Bingkai)
function KotakPeringatan({ children }) {
  return (
    <div style={{ border: '2px solid red', padding: '20px', borderRadius: '8px' }}>
      <h3>⚠️ Perhatian!</h3>
      {/* Di sinilah konten dinamis akan disisipkan */}
      {children} 
    </div>
  );
}

// 2. Cara Menggunakannya
function App() {
  return (
    <div>
      <KotakPeringatan>
        <p>Password yang kamu masukkan salah!</p>
        <button>Coba Lagi</button>
      </KotakPeringatan>
      
      <KotakPeringatan>
        <p>Koneksi internet terputus.</p>
      </KotakPeringatan>
    </div>
  );
}

```

> 💡 **Pro-Tip:** Gunakan `children` untuk membuat komponen *layout* (seperti Navbar, Sidebar, atau Container) agar kodemu tidak berulang-ulang!

---

## 🎯 Menunjuk Elemen dengan useRef

`useRef` punya dua kegunaan utama:

1. Mengakses elemen DOM secara langsung (seperti `document.getElementById`).
2. Menyimpan nilai yang **tidak memicu *re-render*** ketika diubah (berbeda dengan `useState`).

*Analogi: `useState` itu seperti toa pengumuman (tiap berubah, semua orang/komponen di-render ulang). Sedangkan `useRef` itu seperti buku catatan rahasia, nilainya bisa berubah, tapi komponen tidak sadar dan tidak memicu render ulang.*

### Contoh 1: Auto-Focus pada Input

Paling sering digunakan agar kursor langsung aktif di kolom input tertentu saat halaman dibuka.

```jsx
import { useRef } from 'react';

function FormFokus() {
  const inputRef = useRef(null); // 1. Buat referensi

  const fokusKeInput = () => {
    // 3. Panggil method bawaan DOM 'focus()'
    inputRef.current.focus(); 
  };

  return (
    <div>
      {/* 2. Sambungkan referensi ke elemen */}
      <input ref={inputRef} type="text" placeholder="Ketik di sini..." />
      <button onClick={fokusKeInput}>Fokuskan Kursor!</button>
    </div>
  );
}

```

> ⚠️ **Awas Error!:** Jangan gunakan `useRef` untuk hal yang seharusnya ditangani oleh `useState` (seperti menampilkan data ke layar). Ingat, perubahan pada `useRef` **tidak akan** mengubah tampilan layar secara otomatis!

---

## ♻️ Membuat Custom Hooks

Apakah kamu sering menulis logika `useState` atau `useEffect` yang bentuknya mirip di berbagai *component*? Kalau ya, saatnya membuat *Custom Hooks*! *Custom hook* sebenarnya hanyalah fungsi JavaScript biasa yang namanya diawali dengan kata `use`.

*Analogi: Seperti bumbu racik instan. Kamu meracik logikanya sekali, lalu bisa dipakai berulang kali di berbagai masakan (component) tanpa harus meracik dari awal.*

### Contoh: Membuat Hook `useToggle`

Daripada menulis `useState` untuk saklar (buka/tutup, on/off) berulang kali, kita bisa buat *hook*-nya sendiri:

```jsx
// 1. Buat Custom Hook-nya (biasanya dipisah di file tersendiri)
import { useState } from 'react';

function useToggle(nilaiAwal = false) {
  const [status, setStatus] = useState(nilaiAwal);

  const toggle = () => {
    setStatus(!status); // Balikkan nilai (true jadi false, false jadi true)
  };

  return [status, toggle]; // Kembalikan state dan fungsinya
}

// 2. Cara Pakainya di Component
function MenuDropdown() {
  // Panggil custom hook seperti hook bawaan React!
  const [isOpen, toggleOpen] = useToggle(false); 

  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? 'Tutup Menu ❌' : 'Buka Menu 🍔'}
      </button>
      
      {isOpen && (
        <ul>
          <li>Beranda</li>
          <li>Profil</li>
        </ul>
      )}
    </div>
  );
}

```

---

## 🔮 Teleportasi Data dengan Context API

**Masalah:** *Prop Drilling*. Bayangkan kamu punya data di Component A (Paling atas), tapi mau dipakai di Component Z (Paling bawah). Kamu harus mengoper props melewati Component B, C, D... padahal mereka tidak butuh data itu!

**Solusi:** *Context API*. Ini bertindak seperti "teleportasi" data. Data dibungkus di level atas, dan *component* manapun di bawahnya bisa langsung mengambil datanya tanpa perantara.

### Langkah-langkah Menggunakan Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Buat Context-nya (Wadah Teleportasi)
const TemaContext = createContext();

// 2. Buat Provider-nya (Pemancar Data)
function TemaProvider({ children }) {
  const [tema, setTema] = useState('terang');

  const gantiTema = () => {
    setTema(tema === 'terang' ? 'gelap' : 'terang');
  };

  return (
    <TemaContext.Provider value={{ tema, gantiTema }}>
      {children}
    </TemaContext.Provider>
  );
}

// 3. Pakai Datanya (Penerima Teleportasi)
function TombolTema() {
  const { tema, gantiTema } = useContext(TemaContext);

  return (
    <button 
      onClick={gantiTema}
      style={{
        background: tema === 'terang' ? '#fff' : '#333',
        color: tema === 'terang' ? '#000' : '#fff'
      }}
    >
      Ganti ke Tema {tema === 'terang' ? 'Gelap 🌙' : 'Terang ☀️'}
    </button>
  );
}

// 4. Bungkus Aplikasi dengan Provider
function App() {
  return (
    <TemaProvider>
      <div>
        <h1>Aplikasi Keren</h1>
        <TombolTema /> {/* Tombol ini bisa langsung akses Context! */}
      </div>
    </TemaProvider>
  );
}

```

---

## 💻 Latihan

### Latihan 1: Membuat Layout dengan Children

Buatlah component `Card` yang menerima props `title` dan `children`.

```jsx
// TODO: Buat function Card({ title, children })
// Tampilkan title di dalam tag <h2>
// Tampilkan children di dalam tag <div> di bawah title

// Gunakan Card di dalam App:
function App() {
  return (
    <Card title="Profil User">
      <img src="avatar.png" alt="Avatar" />
      <p>Nama: John Doe</p>
    </Card>
  );
}

```

🌟 **Reward Selesai:** Gelar **Layout Architect** 🥉

---

### Latihan 2: Custom Hook Sederhana

Buatlah custom hook bernama `useCounter` yang mengembalikan nilai `count`, fungsi `tambah`, dan fungsi `kurang`.

```jsx
// TODO: Buat function useCounter(nilaiAwal)
// Gunakan useState di dalamnya.
// Return array: [count, tambah, kurang]

// Gunakan di component:
function Penghitung() {
  const [angka, tambah, kurang] = useCounter(0);
  // Buat UI-nya di sini
}

```

🌟 **Reward Selesai:** Gelar **Hook Alchemist** 🥈

---

## 🏆 Tugas Mandiri

### Challenge: Aplikasi dengan Multi-Bahasa (Context API)

Buatlah sistem multibahasa (Indonesia / English) sederhana menggunakan Context API.

**Ketentuan:**

1. Buat `LanguageContext` dan `LanguageProvider`.
2. `LanguageProvider` harus menyimpan *state* bahasa saat ini (misal: 'id' atau 'en') dan fungsi untuk mengubahnya.
3. Buat component `Navbar` yang berisi tombol untuk mengganti bahasa (ID / EN).
4. Buat component `Content` yang menampilkan teks salam.
* Jika 'id' tampilkan: *"Selamat datang di aplikasi saya!"*
* Jika 'en' tampilkan: *"Welcome to my application!"*


5. `Navbar` dan `Content` tidak boleh menerima *props* bahasa secara langsung, melainkan harus mengambilnya menggunakan `useContext`.

**Kriteria Penilaian:**

* [ ] Context dan Provider dibuat dengan benar.
* [ ] Component dibungkus oleh Provider di level teratas (`App`).
* [ ] `useContext` dipanggil dengan tepat di dalam komponen yang membutuhkan.
* [ ] Perpindahan bahasa berfungsi dengan baik tanpa *error*.

🌟 **Reward Selesai:** Gelar **Context Wizard** 🥇

---

## 📚 Referensi

* [React Docs: Passing Props to a Component (Children)](https://www.google.com/search?q=https://react.dev/learn/passing-props-to-a-component)
* [React Docs: Referencing Values with Refs](https://www.google.com/search?q=https://react.dev/learn/referencing-values-with-refs)
* [React Docs: Reusing Logic with Custom Hooks](https://www.google.com/search?q=https://react.dev/learn/reusing-logic-with-custom-hooks)
* [React Docs: Passing Data Deeply with Context](https://www.google.com/search?q=https://react.dev/learn/passing-data-deeply-with-context)

---

**Selamat Menjelajah!** 🚀

Materi hari ini cukup padat, jadi pelan-pelan saja memahaminya. *Custom hooks* dan *Context* adalah senjata andalan *developer* React profesional. Tetap semangat mengoding!