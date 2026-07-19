# React - Pertemuan 6: Autentikasi dan Protected Route

## Daftar Isi

1. [Pendahuluan](https://www.google.com/search?q=%23pendahuluan)
2. [Konsep Autentikasi (JWT)](https://www.google.com/search?q=%23konsep-autentikasi-jwt)
3. [Menyimpan Token Akses](https://www.google.com/search?q=%23menyimpan-token-akses)
4. [Membuat Protected Route](https://www.google.com/search?q=%23membuat-protected-route)
5. [Latihan](https://www.google.com/search?q=%23latihan)
6. [Tugas Mandiri](https://www.google.com/search?q=%23tugas-mandiri)

---

## 🚀 Pendahuluan

Bayangkan aplikasi web-mu adalah sebuah gedung perkantoran. Halaman Beranda (Home) adalah lobi yang bisa dimasuki siapa saja. Tapi, Ruang Rapat (Dashboard) hanya bisa dimasuki oleh karyawan yang memiliki ID Card (Token).

Di sinilah peran **Autentikasi** (membuat ID Card) dan **Protected Route** (satpam yang mengecek ID Card di depan pintu Ruang Rapat).

---

## 🔐 Konsep Autentikasi (JWT)

Cara paling umum untuk melakukan autentikasi di aplikasi modern adalah menggunakan **JSON Web Token (JWT)**. Alurnya seperti ini:

1. User memasukkan *Email* dan *Password* di form Login.
2. React mengirim data tersebut ke API *backend*.
3. Jika cocok, *backend* akan merespon dengan sebuah string acak yang panjang (Token JWT).
4. React menyimpan Token tersebut.
5. Saat React ingin mengambil data rahasia dari API, React akan melampirkan Token tersebut sebagai bukti bahwa user sudah *login*.

---

## 💾 Menyimpan Token Akses

Di mana kita harus menyimpan Token (ID Card) ini di dalam React? Pilihan paling umum untuk pemula adalah **LocalStorage**.

Data di LocalStorage tidak akan hilang meskipun browser di-*refresh* atau ditutup.

### Cara Menyimpan, Mengambil, dan Menghapus Token

```javascript
// Menyimpan Token (Biasanya dilakukan setelah API Login sukses)
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5c...');

// Mengambil Token (Untuk mengecek apakah user sudah login)
const myToken = localStorage.getItem('token');

// Menghapus Token (Biasanya dilakukan saat Logout)
localStorage.removeItem('token');

```

> 💡 **Pro-Tip:** Untuk keamanan tingkat lanjut di skala *enterprise*, token biasanya disimpan di *HttpOnly Cookies* karena LocalStorage rentan terhadap serangan XSS (Cross-Site Scripting). Tapi untuk tahap belajar ini, LocalStorage sudah lebih dari cukup!

---

## 🛡️ Membuat Protected Route

Sekarang, bagaimana cara kita mencegah pengunjung tak diundang masuk ke halaman rahasia kita? Kita akan membuat sebuah komponen *wrapper* (pembungkus) menggunakan ilmu **Props Children** (dari Pertemuan 3) dan **React Router** (dari Pertemuan 4).

### 1. Komponen ProtectedRoute

Buatlah sebuah komponen yang tugasnya hanya satu: Mengecek apakah token ada. Jika ada, silakan masuk. Jika tidak, tendang kembali ke halaman Login!

```jsx
// File: components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Cek apakah token ada di LocalStorage
  const token = localStorage.getItem('token');

  // Jika tidak ada token, arahkan (redirect) ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika token ada, render children (halaman yang dituju)
  return children;
}

export default ProtectedRoute;

```

### 2. Membungkus Route di App.jsx

Sekarang, gunakan komponen tersebut untuk melindungi rute tertentu di file utama pengaturan *router*-mu.

```jsx
// File: App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik (Bebas diakses) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Rute Rahasia (Dilindungi) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

```

> ⚠️ **Awas Error!:** Perhatikan penggunaan `<Navigate/>` di dalam `ProtectedRoute`. Ini berbeda dengan `useNavigate()`. `<Navigate/>` adalah sebuah *component* yang digunakan untuk me-*redirect* secara deklaratif (di dalam JSX), sedangkan `useNavigate()` adalah fungsi yang digunakan di dalam fungsi biasa (seperti pada aksi `onClick`).

---

## 💻 Latihan

### Latihan 1: Simulasi Fitur Login & Logout

Buatlah file `Login.jsx`. Di dalamnya, buat form sederhana dan fungsi `handleLogin`.
Alih-alih memanggil API asli, simulasikan saja: jika tombol diklik, simpan teks `"token-palsu-123"` ke `localStorage`, lalu arahkan *user* langsung ke `/dashboard` menggunakan `useNavigate('/')` atau rute berandanya.

Di halaman Dashboard, buat tombol "Logout" yang akan menjalankan `localStorage.removeItem('token')` lalu menendang user kembali ke `/login`.

🌟 **Reward Selesai:** Gelar **Gatekeeper** 🥉

---

## 🏆 Tugas Mandiri

### Challenge: Mengamankan Portal Learning Management System (LMS)

Sebuah aplikasi *Learning Management System* (LMS) harus memiliki alur autentikasi yang jelas agar hanya siswa dan admin terdaftar yang bisa mengakses materi pembelajaran.

**Ketentuan:**

1. **Rute Publik:**
* `/` (Halaman Landing Page LMS).
* `/login` (Halaman Form Login).


2. **Rute Terlindungi (Protected):**
* `/materi` (Halaman Daftar Materi Belajar).
* `/admin` (Halaman Kelola Data).


3. **Alur:**
* Halaman `/materi` dan `/admin` WAJIB dibungkus dengan `ProtectedRoute`.
* Jika *user* mencoba mengakses `/materi` tanpa *login*, ia harus terpental kembali ke `/login`.
* Coba aplikasikan operasi *Axios GET* sederhana di dalam rute `/materi` (ambil data palsu dari JSONPlaceholder) untuk membuktikan bahwa halaman tersebut bisa menampilkan data API hanya ketika sudah sukses masuk.



**Kriteria Penilaian:**

* [ ] Logika `ProtectedRoute` berjalan sempurna.
* [ ] Penggunaan `localStorage` dilakukan dengan tepat.
* [ ] Berhasil menggabungkan materi Axios + Router + Authentication.

🌟 **Reward Selesai:** Gelar **Security Ninja** 🥇

---

## 📚 Referensi

* [React Router: Navigating](https://www.google.com/search?q=https://reactrouter.com/en/main/components/navigate)
* [MDN Web Docs: Window.localStorage](https://www.google.com/search?q=https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

**Kerja Bagus!** 🚀

Dengan menguasai Auth dan Protected Route, aplikasi React-mu sudah berada di standar produksi. Sistem keamanan antarmuka sudah siap mengawal aplikasimu.

Bagaimana? Mau istirahat dan mempraktikkan ini dulu, atau langsung lanjut ke *Big Boss* di daftar materi: **Next.js, TanStack Query, Zustand, dan Redux Toolkit**?