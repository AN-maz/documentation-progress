# React - Materi 3: Axios

## Daftar Isi

1. [Pendahuluan](#)
2. [Apa Itu Axios?](#)
3. [Instalasi dan Setup](#)
4. [Membuat Instance Axios](#)
5. [Interceptor: Menyisipkan Token Otomatis](#)
6. [Membuat Service Layer](#)
7. [CRUD dengan Axios](#)
8. [Penanganan Error](#)
9. [Latihan](#)
10. [Tugas Mandiri](#)

---

## 🚀 Pendahuluan

Bayangkan kamu ingin memesan pizza. Tanpa Axios, kamu harus telepon langsung ke restoran, menyebutkan pesanan, alamat, dan berharap tidak ada gangguan sinyal.

Axios adalah seperti **aplikasi delivery terpadu**. Kamu cukup buka aplikasi, pilih menu yang kamu mau, masukkan alamat, klik "Pesan" — aplikasi mengurus komunikasi dengan restoran, menunggu konfirmasi, dan memberitahu kamu hasilnya. Jika ada error (restoran tutup), kamu langsung dapat notifikasi.

Di React, **Axios** adalah pustaka HTTP client yang digunakan untuk berkomunikasi dengan API backend. Mulai dari mengambil data (GET), mengirim data (POST), memperbarui (PUT), hingga menghapus (DELETE).

---

## 📦 Apa Itu Axios?

Axios adalah promise-based HTTP client untuk browser dan Node.js. Beberapa keunggulan:

| Fitur | Axios | fetch() bawaan |
|---|---|---|
| JSON otomatis | ✅ Otomatis parse | ❌ Perlu `.json()` manual |
| Interceptors | ✅ Ada | ❌ Tidak ada |
| Timeout | ✅ Mudah diatur | ❌ Ribet |
| Base URL | ✅ Bisa diset global | ❌ Harus tulis ulang |
| Error handling | ✅ Lebih detail | ❌ Hanya error jaringan |
| Upload progress | ✅ Ada | ❌ Ribet |

---

## ⚙️ Instalasi dan Setup

Di project ini, Axios sudah terinstal. Jika ingin instal dari awal:

```bash
npm install axios
```

Cek di `package.json`:
```json
"dependencies": {
  "axios": "^1.18.1",
  // ...
}
```

---

## 🏗️ Membuat Instance Axios

Daripada menulis `axios.get('https://dummyjson.com/products')` berulang-ulang, kita buat satu instance dengan konfigurasi dasar. Semua request akan otomatis menggunakan base URL ini.

```javascript
// File: services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

export default api
```

Sekarang, daripada:
```javascript
axios.get('https://dummyjson.com/products')
axios.post('https://dummyjson.com/auth/login', data)
```

Cukup:
```javascript
api.get('/products')
api.post('/auth/login', data)
```

> 💡 **Pro-Tip:** Simpan base URL di environment variable (`.env`) agar mudah diganti antara development dan production.

---

## 🔗 Interceptor: Menyisipkan Token Otomatis

Interceptor adalah "satpam" yang menyisipkan sesuatu ke setiap request yang keluar, atau memproses response yang masuk.

```javascript
// File: services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

// Request interceptor — otomatis tambah header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
```

Dengan interceptor ini, setiap request API yang membutuhkan autentikasi **tidak perlu manual** menambahkan header `Authorization`. Cukup simpan token di localStorage, dan Axios akan mengurus sisanya.

> ⚠️ **Awas Error!:** Interceptor request harus selalu mengembalikan `config`. Jika lupa `return config`, request akan stuck (tidak pernah terkirim).

---

## 📂 Membuat Service Layer

Service layer adalah folder yang berisi fungsi-fungsi yang membungkus panggilan API. Ini membuat kode di komponen tetap bersih dan fokus ke UI.

### Auth Service

```javascript
// File: services/authService.js
import api from './api'

export const loginUser = async (username, password) => {
  const { data } = await api.post('/auth/login', { username, password })
  return data
  // data berisi: { id, username, email, accessToken, ... }
}
```

### Product Service

```javascript
// File: services/productService.js
import api from './api'

// READ ALL
export const getProducts = async () => {
  const { data } = await api.get('/products?limit=30')
  return data.products
}

// READ ONE
export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return data
}

// CREATE
export const createProduct = async (product) => {
  const { data } = await api.post('/products/add', product)
  return data
}

// UPDATE
export const updateProduct = async (id, product) => {
  const { data } = await api.put(`/products/${id}`, product)
  return data
}

// DELETE
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`)
  return data
}
```

> 💡 **Kenapa dipisah?** Dengan service layer, jika API endpoint berubah, kamu cukup edit satu file — bukan puluhan komponen yang memanggilnya.

---

## 🔄 CRUD dengan Axios di Komponen

### READ — Mengambil Data (useEffect + useState)

```jsx
// File: pages/Dashboard.jsx (potongan)
import { useEffect, useState } from 'react'
import { getProducts } from '../services/productService'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getProducts().then((products) => {
      const total = products.length
      const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
      setStats({ total, totalStock })
    }).catch(() => {})
  }, [])

  return (
    <div>
      <p>Total Produk: {stats?.total ?? '-'}</p>
    </div>
  )
}
```

### CREATE — Mengirim Data Baru

```jsx
// File: pages/products/ProductForm.jsx (potongan)
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await createProduct({ title, price, description })
    navigate('/products')
  } catch {
    alert('Gagal menyimpan produk')
  }
}
```

### UPDATE — Memperbarui Data

```jsx
// File: pages/products/ProductForm.jsx (potongan)
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    if (isEdit) {
      await updateProduct(id, { title, price, description })
    }
    navigate('/products')
  } catch {
    alert('Gagal menyimpan produk')
  }
}
```

### DELETE — Menghapus Data

```jsx
// File: pages/products/ProductList.jsx (potongan)
const handleDelete = async () => {
  try {
    await deleteProduct(deleteId)
    setProducts((prev) => prev.filter((p) => p.id !== deleteId))
  } catch {
    alert('Gagal menghapus produk')
  }
}
```

---

## ⚠️ Penanganan Error

Selalu bungkus panggilan API dengan try-catch untuk menangani error:

```javascript
try {
  const data = await api.get('/products')
  // sukses
} catch (error) {
  if (error.response) {
    // Server merespon dengan status error (4xx, 5xx)
    console.log(error.response.status)    // 401, 404, 500
    console.log(error.response.data)      // Pesan error dari server
  } else if (error.request) {
    // Request terkirim tapi tidak ada response (jaringan mati)
    console.log('Tidak ada response dari server')
  } else {
    // Error lain (salah konfigurasi)
    console.log('Error:', error.message)
  }
}
```

---

## 💻 Latihan

### Latihan 1: Ambil Data User

Gunakan Axios untuk mengambil data dari `https://dummyjson.com/users/1`. Tampilkan nama, email, dan foto profil di halaman Dashboard.

### Latihan 2: Service Baru — Categories

Buat `services/categoryService.js` dengan fungsi `getCategories()` yang memanggil `https://dummyjson.com/products/categories`. Panggil di komponen baru dan tampilkan sebagai daftar.

🌟 **Reward Selesai:** Gelar **API Explorer** 🥉

---

## 🏆 Tugas Mandiri

### Challenge: Aplikasi Todo dengan Axios

Gunakan API publik `https://jsonplaceholder.typicode.com/todos` untuk membuat aplikasi Todo sederhana.

**Ketentuan:**
1. Buat service `todoService.js` dengan fungsi:
   - `getTodos()` — GET semua todo.
   - `createTodo(todo)` — POST todo baru.
   - `updateTodo(id, todo)` — PUT todo (mark completed).
   - `deleteTodo(id)` — DELETE todo.
2. Tampilkan daftar todo di halaman `/todos`.
3. Setiap todo bisa dihapus dan ditandai selesai.
4. Tangani error — jika API gagal, tampilkan pesan error.
5. Gunakan interceptor untuk logging: setiap request, cetak `[${method}] ${url}` ke console.

**Kriteria Penilaian:**
- [ ] Service layer terpisah dari komponen.
- [ ] Axios instance dengan base URL digunakan.
- [ ] Error handling berfungsi (catch block).
- [ ] Interceptor logging berjalan.
- [ ] Loading state ditampilkan saat fetch data.

🌟 **Reward Selesai:** Gelar **HTTP Master** 🥇

---

## 📚 Referensi

- [Axios Documentation](https://www.google.com/search?q=https://axios-http.com/docs/intro)
- [Axios Interceptors](https://www.google.com/search?q=https://axios-http.com/docs/interceptors)
- [DummyJSON API](https://www.google.com/search?q=https://dummyjson.com)

---

**Kerja Bagus!** 🚀

Axios adalah tulang punggung komunikasi data di aplikasi React modern. Dengan memahami instance, interceptor, dan service layer, kamu sudah siap membangun aplikasi yang terhubung dengan API apa pun.
