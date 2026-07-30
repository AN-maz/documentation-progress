# React - Materi 2: Context API

## Daftar Isi

1. [Pendahuluan](#)
2. [Masalah Prop Drilling](#)
3. [Konsep Context API](#)
4. [Membuat Context dengan createContext](#)
5. [Menyediakan Data dengan Provider](#)
6. [Mengakses Data dengan useContext](#)
7. [Studi Kasus: AuthContext di Project](#)
8. [Latihan](#)
9. [Tugas Mandiri](#)

---

## 🚀 Pendahuluan

Bayangkan kamu tinggal di sebuah kost. Ada paket makanan datang untukmu di pos satpam depan. Tanpa Context API, satpam harus memanggil satu per satu penghuni kost: "Hei, ini paket untuk si Anu... tolong sampaikan ke kamar 3B...".

Ini namanya **prop drilling** — mengoper data dari komponen kakek ke komponen cucu, melewati banyak komponen perantara yang sebenarnya tidak membutuhkan data tersebut.

Context API adalah seperti **papan pengumuman di lobi**. Satpam cukup tempel informasi di papan, dan siapa pun yang butuh tinggal datang membaca. Semua kamar bisa langsung tahu.

---

## 🔄 Masalah Prop Drilling

Sebelum Context API, untuk mengirim data dari komponen paling atas ke komponen paling dalam, kamu harus menulis kode seperti ini:

```jsx
// ❌ Tanpa Context — Prop Drilling
function App() {
  const [user, setUser] = useState(null)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  return (
    <div>
      <Sidebar user={user} />
      <Main user={user} setUser={setUser} />
    </div>
  )
}

function Main({ user, setUser }) {
  return <Dashboard user={user} setUser={setUser} />
}
```

Perhatikan bahwa komponen `Layout` dan `Main` tidak peduli dengan `user`, tapi terpaksa menerimanya hanya untuk dioper lagi ke anaknya. Bayangkan jika ada 10 level kedalaman — sangat tidak efisien dan sulit dirawat.

---

## 🎯 Konsep Context API

Context API adalah fitur React yang memungkinkan data tersedia secara global di dalam pohon komponen tanpa harus dioper secara manual melalui props.

Ada 3 langkah utama:
1. **createContext** — buat "papan pengumuman" (context object).
2. **Provider** — tempel informasi di papan (menyediakan data).
3. **useContext** — baca informasi dari papan (mengonsumsi data).

---

## 🏗️ Membuat Context dengan createContext

```jsx
// File: context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

// 1. Buat context object dengan nilai default null
const AuthContext = createContext(null)
```

Fungsi `createContext(defaultValue)` mengembalikan object context yang memiliki dua komponen: `Provider` dan `Consumer`. Nilai default hanya dipakai jika komponen tidak dibungkus oleh Provider.

---

## 📤 Menyediakan Data dengan Provider

Provider membungkus komponen-komponen yang perlu mengakses data. Semua komponen di dalamnya bisa membaca nilai `value` yang diberikan.

```jsx
// File: context/AuthContext.jsx — lanjutan
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  const login = async (username, password) => {
    const data = await loginUser(username, password)
    setToken(data.accessToken)
    setUser({ id: data.id, username: data.username })
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

Agar Provider tersedia di seluruh aplikasi, bungkus di komponen paling atas:

```jsx
// File: App.jsx
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

Setiap komponen di dalam `<AuthProvider>` (termasuk semua halaman di `AppRoutes`) bisa mengakses `user`, `token`, `login`, dan `logout`.

> 💡 **Pro-Tip:** Kamu bisa membuat Provider bertumpuk (nested providers) — misalnya satu untuk Auth, satu untuk Theme, satu untuk Cart.

---

## 📥 Mengakses Data dengan useContext

Komponen anak bisa membaca nilai dari context menggunakan hook `useContext`:

```jsx
// File: context/AuthContext.jsx — lanjutan
export const useAuth = () => useContext(AuthContext)
```

Dengan membuat custom hook `useAuth`, komponen lain bisa mengakses context dengan kode yang bersih:

```jsx
// File: components/layout/Sidebar.jsx
import { useAuth } from '../../context/AuthContext'

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside>
      {/* ... */}
      <p>Hi, {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </aside>
  )
}
```

```jsx
// File: routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

```jsx
// File: pages/Login.jsx (potongan)
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, token } = useAuth()
  // token → cek apakah sudah login
  // login → fungsi untuk login
}
```

> ⚠️ **Awas Error!:** Pastikan komponen yang menggunakan `useContext` berada **di dalam** Provider. Jika tidak, `useContext` akan mengembalikan nilai default (null) yang bisa menyebabkan error `Cannot read properties of null`.

---

## 📚 Studi Kasus: AuthContext di Project

Di project ini, `AuthContext` mengelola tiga hal:

| Data | Fungsi | Digunakan di |
|---|---|---|
| `user` | Menyimpan data user (id, username) | Sidebar (tampilkan nama), Navbar (inisial avatar) |
| `token` | Menyimpan JWT token | ProtectedRoute (cek login), api.js (interceptor) |
| `login()` | Login via API, set token & user | Login page |
| `logout()` | Hapus token & user dari state | Sidebar |

Alur data:
1. User login → `AuthContext.login()` dipanggil → token & user tersimpan di state & localStorage.
2. ProtectedRoute membaca `token` dari context → jika ada, render children; jika tidak, redirect ke `/login`.
3. Sidebar membaca `user` untuk menampilkan nama dan tombol logout.
4. Axios interceptor membaca `token` dari localStorage (bukan context) untuk disertakan di header request.

---

## 💻 Latihan

### Latihan 1: ThemeContext

Buat `ThemeContext` dengan nilai default `"light"`. Provider menyediakan `theme` dan `toggleTheme`. Buat tombol di Navbar yang mengganti tema antara `"light"` dan `"dark"`.

### Latihan 2: CartContext

Buat `CartContext` yang menyimpan array item keranjang dengan fungsi `addItem`, `removeItem`, dan `clearCart`. Akses dari halaman manapun.

🌟 **Reward Selesai:** Gelar **Context Hero** 🥉

---

## 🏆 Tugas Mandiri

### Challenge: Notification Center dengan Context API

Buat sistem notifikasi global menggunakan Context API.

**Ketentuan:**
1. Buat `NotificationContext` dengan state array notifikasi.
2. Provider menyediakan:
   - `notifications` — daftar notifikasi.
   - `addNotification(message, type)` — tambah notifikasi (tipe: success, error, info).
   - `removeNotification(id)` — hapus notifikasi berdasarkan ID.
3. Buat komponen `NotificationStack` yang menampilkan semua notifikasi di pojok kanan atas layar.
4. Notifikasi otomatis hilang setelah 3 detik (gunakan `setTimeout` di `addNotification`).
5. Panggil `addNotification` dari halaman manapun — misalnya "Data berhasil disimpan!" saat sukses create produk.

**Kriteria Penilaian:**
- [ ] Context berfungsi tanpa prop drilling.
- [ ] Notifikasi bisa dipanggil dari komponen manapun.
- [ ] Notifikasi otomatis hilang setelah 3 detik.
- [ ] Setiap notifikasi memiliki warna berbeda sesuai tipe.

🌟 **Reward Selesai:** Gelar **State Wizard** 🥇

---

## 📚 Referensi

- [React Docs: useContext](https://www.google.com/search?q=https://react.dev/reference/react/useContext)
- [React Docs: createContext](https://www.google.com/search?q=https://react.dev/reference/react/createContext)
- [React Docs: Scaling Up with Context](https://www.google.com/search?q=https://react.dev/learn/passing-data-deeply-with-context)

---

**Kerja Bagus!** 🚀

Context API adalah solusi sederhana untuk berbagi data global di React. Tapi ingat — Context bukan pengganti state management untuk aplikasi besar dengan update data yang kompleks. Untuk itu ada Zustand, Redux, atau TanStack Query.
