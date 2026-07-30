# React - Materi 1: React Router

## Daftar Isi

1. [Pendahuluan](#)
2. [Konsep Dasar React Router](#)
3. [BrowserRouter, Routes, dan Route](#)
4. [Navigasi dengan Link dan NavLink](#)
5. [Navigasi Programmatic dengan useNavigate](#)
6. [Membaca Parameter URL dengan useParams](#)
7. [Latihan](#)
8. [Tugas Mandiri](#)

---

## 🚀 Pendahuluan

Bayangkan aplikasi web-mu adalah sebuah mal besar. Tanpa React Router, setiap kali kamu ingin pindah dari toko A ke toko B, kamu harus keluar mal, masuk lagi dari pintu utama (reload halaman). Sangat tidak efisien!

React Router adalah **peta dan lorong instan** di dalam mal. Kamu bisa pindah dari toko mana pun ke toko lain dalam sekejap, tanpa harus keluar masuk. Inilah yang disebut **Single Page Application (SPA)** — satu halaman HTML yang pintar mengganti konten tanpa reload.

---

## 🧭 Konsep Dasar React Router

React Router bekerja dengan prinsip sederhana:

1. URL browser menentukan tampilan mana yang aktif.
2. Saat URL berubah, React Router langsung mengganti komponen yang dirender — tanpa reload.
3. Ada dua mode routing: `BrowserRouter` (menggunakan history API browser) dan `HashRouter` (menggunakan hash `#`).

Di project ini, kita menggunakan **BrowserRouter** yang menghasilkan URL normal seperti `/products`, bukan `/#/products`.

---

## 🏗️ BrowserRouter, Routes, dan Route

### BrowserRouter

Pertama, bungkus seluruh aplikasi dengan `BrowserRouter` agar React Router bisa memantau perubahan URL.

```jsx
// File: App.jsx
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
```

### Routes dan Route

`Routes` adalah wadah untuk mendefinisikan rute. Setiap `Route` menghubungkan sebuah **path** (URL) dengan **element** (komponen).

```jsx
// File: routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      <Route path="/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      <Route path="/products/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
```

> 💡 **Catatan:** Urutan `Route` di dalam `Routes` tidak penting — React Router otomatis mencocokkan path yang paling spesifik (pencocokan relatif, bukan sekuensial).

---

## 🔗 Navigasi dengan Link dan NavLink

`<Link>` adalah pengganti tag `<a>` yang tidak menyebabkan reload halaman. Gunakan untuk navigasi normal.

`<NavLink>` adalah versi spesial dari `Link` yang otomatis tahu apakah path-nya sedang aktif — sangat berguna untuk menu navigasi.

```jsx
// File: components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/products', label: 'Products', icon: '📦' },
]

// Di dalam JSX:
<nav>
  {links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-primary-light text-white' : 'text-white/80 hover:bg-primary-dark'
        }`
      }
    >
      <span>{link.icon}</span>
      <span>{link.label}</span>
    </NavLink>
  ))}
</nav>
```

Properti `end` pada `NavLink` `/` memastikan bahwa link Dashboard hanya aktif saat URL persis `/`, bukan saat di `/products`.

> ⚠️ **Awas Error!:** Jangan gunakan `<a href="/products">` untuk navigasi internal — itu akan me-reload seluruh halaman dan menghilangkan state React.

---

## 🎮 Navigasi Programmatic dengan useNavigate

Kadang kamu perlu memindahkan halaman secara otomatis, misalnya setelah form login berhasil atau setelah menyimpan data. Gunakan **useNavigate**.

```jsx
// File: pages/Login.jsx (potongan)
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, token } = useAuth()

  // Redirect otomatis jika sudah login
  if (token) {
    navigate('/', { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form.username, form.password)
      navigate('/', { replace: true }) // Arahkan ke dashboard
    } catch {
      setError('Login gagal')
    }
  }
  // ...
}
```

Parameter `{ replace: true }` membuat navigasi mengganti history, bukan menumpuknya. Jadi user tidak bisa klik "Back" ke halaman login setelah sukses login.

---

## 📋 Membaca Parameter URL dengan useParams

Saat membuat halaman detail atau edit, kamu perlu membaca ID dari URL. Gunakan **useParams**.

```jsx
// File: pages/products/ProductForm.jsx (potongan)
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductForm() {
  const { id } = useParams()  // id dari URL /products/edit/:id
  const navigate = useNavigate()
  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then((p) => setForm({ ... }))
    }
  }, [id])
  // ...
}
```

Rute `/products/edit/:id` akan cocok dengan URL seperti `/products/edit/5`. Nilai `:id` bisa dibaca dengan `useParams()`, menghasilkan `{ id: "5" }`.

---

## 💻 Latihan

### Latihan 1: Tambah Halaman About

Buat halaman About sederhana di `pages/About.jsx`. Daftarkan rutenya di `AppRoutes.jsx` dengan path `/about`. Tambahkan link ke halaman About di Sidebar.

### Latihan 2: Navigasi dari Dashboard

Di halaman Dashboard, tambahkan tombol "View All Products" yang menggunakan `useNavigate` untuk pergi ke `/products` saat diklik.

### Latihan 3: Dynamic Route Profile

Buat rute `/profile/:username` yang menampilkan teks "Halo, {username}!" — di mana `username` diambil dari `useParams`.

🌟 **Reward Selesai:** Gelar **Pathfinder** 🥉

---

## 🏆 Tugas Mandiri

### Challenge: Portal Berita dengan Routing

Buat sebuah aplikasi mini portal berita dengan routing berikut:

**Ketentuan:**
1. `/` — Halaman Beranda daftar berita.
2. `/berita/:slug` — Halaman detail berita, membaca slug dari URL.
3. `/tentang` — Halaman statis tentang portal.
4. `/admin` — Halaman admin (gunakan Navigate untuk redirect ke `/login` jika belum punya akses).

Fitur navigasi:
- Navbar menggunakan `NavLink` untuk halaman Beranda dan Tentang.
- Di daftar berita, setiap item menggunakan `Link` menuju `/berita/:slug`.

**Kriteria Penilaian:**
- [ ] Semua rute berfungsi tanpa reload.
- [ ] `NavLink` menampilkan gaya aktif dengan benar.
- [ ] `useParams` berhasil membaca slug di halaman detail.
- [ ] `useNavigate` digunakan untuk redirect.

🌟 **Reward Selesai:** Gelar **Route Master** 🥇

---

## 📚 Referensi

- [React Router Documentation](https://www.google.com/search?q=https://reactrouter.com/en/main)
- [React Router: useParams](https://www.google.com/search?q=https://reactrouter.com/en/main/hooks/use-params)
- [React Router: NavLink](https://www.google.com/search?q=https://reactrouter.com/en/main/components/nav-link)

---

**Kerja Bagus!** 🚀

Routing adalah fondasi dari aplikasi React modern. Tanpanya, tidak ada yang namanya halaman multi-view dalam satu aplikasi. Selanjutnya, kita akan belajar bagaimana data bisa dibagikan antar halaman menggunakan **Context API**.
