# React - Pertemuan 5: Arsitektur Project, Axios, dan Operasi CRUD

## Daftar Isi

1. [Pendahuluan](https://www.google.com/search?q=%23pendahuluan)
2. [Struktur Project Vite Skala Besar](https://www.google.com/search?q=%23struktur-project-vite-skala-besar)
3. [Berkenalan dengan Axios](https://www.google.com/search?q=%23berkenalan-dengan-axios)
4. [Operasi CRUD (Create, Read, Update, Delete)](https://www.google.com/search?q=%23operasi-crud-create-read-update-delete)
5. [Latihan](https://www.google.com/search?q=%23latihan)
6. [Tugas Mandiri](https://www.google.com/search?q=%23tugas-mandiri)

---

## 🚀 Pendahuluan

Membuat aplikasi yang kompleks membutuhkan fondasi yang kuat. Jika semua kode diletakkan di `App.jsx`, aplikasimu akan menjadi seperti benang kusut saat fitur bertambah.

Di modul ini, kita akan merapikan "rumah" (project Vite) kita, lalu belajar cara melakukan komunikasi dua arah dengan server menggunakan standar industri: **Axios**.

---

## 🏗️ Struktur Project Vite Skala Besar

Saat aplikasi mulai membesar, struktur *folder* bawaan Vite tidak lagi cukup. Kita perlu memisahkan komponen, halaman, dan logika *API*.

Berikut adalah standar struktur *folder* (berada di dalam folder `src/`) yang sangat disarankan:

```text
src/
├── assets/        # Gambar, logo, file statis
├── components/    # Komponen yang bisa dipakai ulang (Button, Navbar, Card)
├── pages/         # Komponen yang merepresentasikan halaman utuh (Home, Login, DaftarMateri)
├── hooks/         # Custom Hooks buatanmu (useFetch, useToggle)
├── services/      # Konfigurasi API dan file untuk melakukan HTTP Request (api.js)
├── utils/         # Fungsi-fungsi bantuan (formatTanggal, formatRupiah)
├── App.jsx        # Pengaturan Routing utama
└── main.jsx       # Entry point React

```

*Analogi: Anggap project-mu adalah sebuah restoran. `components` adalah piring dan gelas, `pages` adalah menu makanannya, `services` adalah pelayan yang berinteraksi dengan dapur (backend), dan `utils` adalah alat masak tambahan.*

---

## 🦅 Berkenalan dengan Axios

Di pertemuan sebelumnya kita menggunakan `fetch`. `fetch` itu bagus, tapi sedikit "cerewet" karena kita harus mem-parsing JSON secara manual (`res.json()`) dan *error handling*-nya kurang sensitif.

**Axios** hadir sebagai solusi yang lebih praktis.

### 1. Instalasi

Buka terminal dan jalankan:

```bash
npm install axios

```

### 2. Membuat Instance Axios (Di folder `services/api.js`)

Agar kita tidak perlu menulis URL *backend* berulang-ulang, kita bisa membuat *instance* khusus.

```javascript
// File: src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Base URL dari RESTful web service kamu
  baseURL: 'https://api.domainkamu.com/v1', 
  timeout: 5000, // Request akan batal jika lebih dari 5 detik
});

export default api;

```

> 💡 **Pro-Tip Arsitektur Backend:** Saat membangun RESTful web service (misalnya dengan Node.js/Express) untuk dihubungkan ke React ini, mengeksekusi *query* langsung secara *native* ke database alih-alih menggunakan ORM seringkali memberikan kontrol yang lebih presisi dan performa yang lebih optimal pada sistemmu!

---

## 🔄 Operasi CRUD (Create, Read, Update, Delete)

CRUD adalah singkatan dari empat operasi dasar pada database. Mari kita petakan operasi ini menggunakan Axios!

### 1. READ (Mengambil Data - `GET`)

Digunakan untuk menampilkan daftar data (misal: daftar materi di LMS).

```jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

function ListMateri() {
  const [materi, setMateri] = useState([]);

  useEffect(() => {
    const fetchMateri = async () => {
      try {
        // Otomatis menjadi JSON, tidak perlu .json() lagi!
        const response = await api.get('/materi'); 
        setMateri(response.data);
      } catch (error) {
        console.error('Gagal mengambil data', error);
      }
    };
    fetchMateri();
  }, []);

  return (
    <ul>
      {materi.map(item => <li key={item.id}>{item.judul}</li>)}
    </ul>
  );
}

```

### 2. CREATE (Menambah Data - `POST`)

Digunakan untuk mengirim data baru lewat form.

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function FormTambahMateri() {
  const [judul, setJudul] = useState('');
  const navigate = useNavigate();

  const handleSimpan = async (e) => {
    e.preventDefault();
    try {
      // Endpoint, lalu Datanya
      await api.post('/materi', { judul: judul });
      alert('Materi berhasil ditambahkan!');
      
      // Navigasi: Langsung arahkan kembali ke Home!
      navigate('/'); 
    } catch (error) {
      console.error('Gagal menyimpan data', error);
    }
  };

  return (
    <form onSubmit={handleSimpan}>
      <input value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul Materi" />
      <button type="submit">Simpan</button>
    </form>
  );
}

```

> ⚠️ **Awas Navigasi!:** Setelah melakukan operasi yang krusial seperti menambah atau menghapus data, pastikan *path* navigasi diset secara eksplisit (seperti `navigate('/')`). Menghindari navigasi relatif seperti "kembali ke halaman sebelumnya" akan mengurangi *bug* tampilan yang tidak *up-to-date*.

### 3. UPDATE (Mengubah Data - `PUT` / `PATCH`)

Digunakan saat mengedit data yang sudah ada, membutuhkan ID dari data tersebut.

```jsx
// Contoh fungsi update di dalam sebuah component
const handleUpdate = async (idMateri, dataBaru) => {
  try {
    await api.put(`/materi/${idMateri}`, dataBaru);
    alert('Materi diperbarui!');
  } catch (error) {
    console.error('Gagal update', error);
  }
};

```

### 4. DELETE (Menghapus Data - `DELETE`)

```jsx
const handleHapus = async (idMateri) => {
  // Konfirmasi sebelum menghapus
  if (window.confirm('Yakin ingin menghapus materi ini?')) {
    try {
      await api.delete(`/materi/${idMateri}`);
      alert('Materi terhapus!');
      // TODO: Filter state materi lokal agar item hilang dari layar
    } catch (error) {
      console.error('Gagal menghapus', error);
    }
  }
};

```

---

## 💻 Latihan

### Latihan 1: Re-strukturisasi Folder

1. Buat folder baru di dalam `src` bernama `pages`, `components`, dan `services`.
2. Pindahkan komponen utamamu ke dalam `pages`, lalu ubah *import path* di `App.jsx` agar rutenya tetap berfungsi.

🌟 **Reward Selesai:** Gelar **Project Architect** 🥉

---

### Latihan 2: Axios GET Request

Buat file `services/api.js` yang mengarah ke `[https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)`. Di halaman terpisah, gunakan Axios untuk melakukan *GET request* ke `/todos` dan tampilkan 5 data pertama di layar.

🌟 **Reward Selesai:** Gelar **Data Fetcher** 🥈

---

## 🏆 Tugas Mandiri

### Challenge: Dashboard Admin Data Sederhana

Buatlah sistem manajerial mini (menggunakan integrasi React + API via Axios) dengan ketentuan berikut:

1. **Persiapan API Palsu:**
* Gunakan endpoint: `[https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)`


2. **Halaman Home (`/`)**
* Menampilkan daftar Post (gunakan operasi GET).
* Setiap baris memiliki tombol "Hapus". Jika diklik, jalankan fungsi DELETE ke API, lalu sembunyikan item tersebut dari layar.


3. **Halaman Tambah Data (`/tambah`)**
* Buat form dengan input `title` dan `body`.
* Jika disubmit, jalankan operasi POST ke API.
* **Aturan Wajib:** Setelah data sukses disubmit, *user* harus langsung diarahkan ke halaman Home (`/`) tanpa terkecuali.



**Kriteria Penilaian:**

* [ ] Folder project mengikuti standar struktur skala besar.
* [ ] Axios Instance dibuat di dalam folder `services`.
* [ ] `try-catch` digunakan untuk mengantisipasi *error* dari *network*.
* [ ] Berhasil menerapkan React Router dan langsung berpindah rute setelah submit form.

🌟 **Reward Selesai:** Gelar **CRUD Master** 🥇

---

## 📚 Referensi

* [Axios Documentation](https://www.google.com/search?q=https://axios-http.com/docs/intro)
* [React Hook Form (Opsional untuk Form kompleks)](https://www.google.com/search?q=https://react-hook-form.com/)
* [REST API Best Practices](https://www.google.com/search?q=https://restfulapi.net/)

---

Bagaimana, siap untuk mengamankan data dan rute ini di pertemuan selanjutnya lewat materi **Authentication & Protected Route**? Beritahu aku kalau kamu siap lanjut, atau jika ada bagian yang ingin dipraktikkan/dibahas lebih dalam!