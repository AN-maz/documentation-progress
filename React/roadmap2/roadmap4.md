# React - Pertemuan 4: Routing dan Komunikasi dengan API

## Daftar Isi

1. [Pendahuluan](https://www.google.com/search?q=%23pendahuluan)
2. [React Router (Navigasi Antar Halaman)](https://www.google.com/search?q=%23react-router-navigasi-antar-halaman)
3. [Fetch API Lebih Dalam](https://www.google.com/search?q=%23fetch-api-lebih-dalam)
4. [Studi Kasus: Custom Hook `useFetch](https://www.google.com/search?q=%23studi-kasus-custom-hook-usefetch)`
5. [Latihan](https://www.google.com/search?q=%23latihan)
6. [Tugas Mandiri](https://www.google.com/search?q=%23tugas-mandiri)

---

## 🚀 Pendahuluan

Sampai titik ini, aplikasi kita hanya hidup di satu halaman. Bagaimana jika kita ingin membuat halaman "Beranda", "Daftar Kelas", dan "Profil"? Di sinilah **React Router** masuk.

Selain itu, aplikasi dunia nyata butuh data yang hidup dari *database* atau *backend*. Kita akan mendalami **Fetch API** untuk menarik data tersebut dan menampilkannya ke layar, lalu membungkusnya dalam **Custom Hook** agar kodenya rapi dan *reusable*!

---

## 🗺️ React Router (Navigasi Antar Halaman)

React pada dasarnya adalah *Single Page Application* (SPA). Artinya, halamannya tidak pernah benar-benar memuat ulang (*reload*) saat kita pindah menu. React Router memanipulasi URL agar seolah-olah kita pindah halaman, padahal cuma *component*-nya saja yang diganti.

### 1. Instalasi

Buka terminal di folder project-mu dan jalankan:

```bash
npm install react-router-dom

```

### 2. Setup Dasar Router

Bungkus aplikasi utama di `main.jsx` atau `App.jsx` dengan `BrowserRouter`.

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Component Halaman
const Beranda = () => <h1>Halaman Beranda 🏠</h1>;
const DaftarKelas = () => <h1>Materi Belajar 📚</h1>;
const Profil = () => <h1>Profil Pengguna 👤</h1>;

function App() {
  return (
    <BrowserRouter>
      {/* Navbar untuk Navigasi */}
      <nav>
        {/* Gunakan <Link> BUKAN <a> agar halaman tidak reload! */}
        <Link to="/">Beranda</Link> | 
        <Link to="/kelas">Daftar Kelas</Link> | 
        <Link to="/profil">Profil</Link>
      </nav>

      {/* Area Konten yang berubah-ubah */}
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/kelas" element={<DaftarKelas />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}

```

> ⚠️ **Awas Error!:** Jangan pernah gunakan tag `<a href="...">` untuk navigasi internal di React Router. Itu akan memicu *refresh* halaman dan mereset semua *state* kamu! Selalu gunakan `<Link to="...">`.

### 3. Navigasi Terprogram (useNavigate)

Terkadang kita ingin pindah halaman setelah sebuah aksi, misalnya setelah tombol "Simpan" ditekan.

```jsx
import { useNavigate } from 'react-router-dom';

function FormPendaftaran() {
  const navigate = useNavigate();

  const handleSimpan = () => {
    // Logika simpan data ke API...
    alert('Data tersimpan!');
    
    // Pindah otomatis ke halaman Beranda
    navigate('/');
  };

  return <button onClick={handleSimpan}>Simpan & Kembali ke Home</button>;
}

```

---

## 📡 Fetch API Lebih Dalam

Di pertemuan sebelumnya kita sudah menyinggung `useEffect` untuk memanggil API. Sekarang kita bahas cara menangani **Loading** dan **Error** saat menarik data dari *RESTful API*.

```jsx
import { useState, useEffect } from 'react';

function ListMateri() {
  const [materi, setMateri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi Async di dalam useEffect
    const ambilData = async () => {
      try {
        setLoading(true);
        // Memanggil API publik (contoh)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) throw new Error('Gagal mengambil data dari server');
        
        const data = await response.json();
        setMateri(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Matikan loading, baik sukses maupun gagal
      }
    };

    ambilData();
  }, []); // Array kosong = hanya dipanggil sekali saat halaman dibuka

  // Tampilan berdasarkan state
  if (loading) return <h3>Memuat data kelas... ⏳</h3>;
  if (error) return <h3>Terjadi kesalahan: {error} ❌</h3>;

  return (
    <ul>
      {materi.slice(0, 5).map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

```

---

## 🪝 Studi Kasus: Custom Hook `useFetch`

Kode Fetch API di atas lumayan panjang, kan? Bayangkan jika kamu harus menulis ulang `loading`, `error`, dan `try-catch` di setiap halaman LMS-mu.

Mari kita manfaatkan ilmu **Custom Hook** dari Pertemuan 3 untuk menyihir kode panjang tadi menjadi satu baris saja!

```jsx
// File: hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Fetch ulang jika URL berubah

  return { data, loading, error };
}
export default useFetch;

```

**Cara Pakainya (Sangat Bersih & Rapi!):**

```jsx
// File: DaftarMateri.jsx
import useFetch from './hooks/useFetch';

function DaftarMateri() {
  // Hanya 1 baris untuk panggil API! ✨
  const { data: materi, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {materi.slice(0, 3).map(m => <p key={m.id}>{m.title}</p>)}
    </div>
  );
}

```

---

## 💻 Latihan

### Latihan 1: Membuat Routing Sederhana

Buatlah tiga halaman menggunakan React Router:

1. `Home` (Menampilkan ucapan selamat datang)
2. `Tentang` (Menampilkan deskripsi singkat)
3. Komponen `Navbar` yang berisi `<Link>` ke kedua halaman tersebut.

🌟 **Reward Selesai:** Gelar **Router Navigator** 🥉

---

### Latihan 2: Implementasi `useFetch`

Gunakan custom hook `useFetch` yang telah kita buat di atas untuk mengambil data *users* dari API `[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)`. Tampilkan nama-nama user tersebut ke dalam sebuah list `<ul>`.

🌟 **Reward Selesai:** Gelar **API Tamer** 🥈

---

## 🏆 Tugas Mandiri

### Challenge: Mini Portal Belajar

Gabungkan kekuatan React Router dan Fetch API!
Buatlah sebuah aplikasi React sederhana dengan ketentuan:

1. **Halaman Beranda (`/`)**
* Menampilkan judul "Selamat Datang di Portal Belajar".
* Terdapat tombol/link "Lihat Daftar Pengguna" yang mengarah ke `/users`.


2. **Halaman Daftar Pengguna (`/users`)**
* Gunakan `useFetch` untuk mengambil data dari `[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)`.
* Wajib memiliki indikator `Loading...` saat data sedang ditarik.
* Tampilkan data dalam bentuk *Card* (memuat Nama dan Email).
* Sediakan tombol "Kembali ke Beranda" yang menggunakan `useNavigate`.



**Kriteria Penilaian:**

* [ ] Berpindah halaman tidak menyebabkan *reload* browser.
* [ ] *State* Loading dan Error ditangani dengan baik.
* [ ] Custom Hook digunakan untuk efisiensi kode.

🌟 **Reward Selesai:** Gelar **Integration Ninja** 🥇

---

## 📚 Referensi

* [React Router Documentation](https://www.google.com/search?q=https://reactrouter.com/en/main)
* [MDN Web Docs: Fetch API](https://www.google.com/search?q=https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [React Docs: Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

**Selamat Berpetualang!** 🚀

Kemampuan menghubungkan rute (*Router*) dan mengambil data (*API*) adalah jantung dari aplikasi web modern. Kalau sudah menguasai materi ini, kamu sudah sangat siap untuk melangkah ke tahap selanjutnya seperti Axios dan CRUD!

---

Gimana, siap bereksperimen dengan materi ini dulu sebelum kita masuk ke area *Vite Project Structure, Axios, dan CRUD*?