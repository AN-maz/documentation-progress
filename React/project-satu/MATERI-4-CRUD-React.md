# React - Materi 4: CRUD React

## Daftar Isi

1. [Pendahuluan](#)
2. [Apa Itu CRUD?](#)
3. [Struktur Halaman CRUD](#)
4. [READ — Menampilkan Data Produk](#)
5. [CREATE — Form Tambah Produk](#)
6. [UPDATE — Form Edit Produk](#)
7. [DELETE — Hapus dengan Konfirmasi](#)
8. [Loading, Error, dan Empty State](#)
9. [Latihan](#)
10. [Tugas Mandiri](#)

---

## 🚀 Pendahuluan

Bayangkan kamu adalah petugas perpustakaan. Setiap hari kamu harus:
- Melihat daftar buku yang tersedia (READ)
- Mendaftarkan buku baru yang datang (CREATE)
- Memperbaiki data buku yang salah (UPDATE)
- Menyingkirkan buku yang sudah rusak (DELETE)

Ini adalah siklus CRUD — **Create, Read, Update, Delete** — operasi dasar yang ada di hampir setiap aplikasi: e-commerce, CMS, dashboard, POS, dll.

Di project ini, kita akan melihat implementasi CRUD lengkap pada halaman **Products** menggunakan React + Axios + React Router.

---

## 🧱 Struktur Halaman CRUD

Project ini memiliki struktur halaman CRUD sebagai berikut:

```
src/
├── pages/
│   └── products/ 
│       ├── ProductList.jsx     → READ + DELETE (daftar produk)
│       └── ProductForm.jsx     → CREATE + UPDATE (form tambah/edit)
├── services/
│   └── productService.js       → Fungsi API untuk CRUD
├── components/
│   └── ui/
│       ├── Table.jsx           → Komponen tabel reusable
│       ├── Modal.jsx           → Komponen konfirmasi hapus
│       ├── Button.jsx          → Tombol reusable
│       └── Input.jsx           → Input field reusable
└── routes/
    └── AppRoutes.jsx           → Routing halaman
```

Setiap operasi CRUD terdiri dari 3 lapisan:

| Lapisan | Tugas | File |
|---|---|---|
| **Service Layer** | Komunikasi dengan API | `productService.js` |
| **Page Component** | Logic UI + state | `ProductList.jsx`, `ProductForm.jsx` |
| **UI Components** | Elemen visual reusable | `Table.jsx`, `Modal.jsx`, dll |

---

## 📖 READ — Menampilkan Data Produk

`ProductList.jsx` adalah halaman yang menampilkan semua produk dalam bentuk tabel.

```jsx
// File: pages/products/ProductList.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../../services/productService'
import Button from '../../components/ui/Button'
import Table from '../../components/ui/Table'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    setLoading(true)
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1>Products</h1>
        <Link to="/products/new">
          <Button variant="accent">+ Add Product</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-secondary">Loading...</p>
      ) : (
        <Table headers={['Image', 'Title', 'Price', 'Stock', 'Actions']}>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td><img src={product.thumbnail} className="w-12 h-12 object-cover rounded" /></td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td className="flex gap-2">
                <Link to={`/products/edit/${product.id}`}>
                  <Button variant="secondary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => setDeleteId(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </>
  )
}
```

### Yang Terjadi:
1. `useEffect` memanggil `getProducts()` saat komponen dimuat.
2. Data disimpan ke state `products` dan ditampilkan sebagai tabel.
3. Setiap baris memiliki tombol Edit (link ke `/products/edit/:id`) dan Delete (buka modal).
4. Pagination membagi data menjadi beberapa halaman (6 item per halaman).

> 💡 **Pola Penting:** Fungsi `fetchProducts` dipisahkan agar bisa dipanggil ulang setelah operasi CREATE/UPDATE/DELETE tanpa reload halaman.

---

## ✨ CREATE — Form Tambah Produk

`ProductForm.jsx` digunakan untuk CREATE (tambah baru) dan UPDATE (edit). Mode ditentukan dari ada/tidaknya `id` di URL.

```jsx
// File: pages/products/ProductForm.jsx (potongan — mode CREATE)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../services/productService'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id  // false → mode CREATE
  const [form, setForm] = useState({ title: '', price: '', description: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form, price: Number(form.price) }

      if (isEdit) {
        await updateProduct(id, payload)  // UPDATE
      } else {
        await createProduct(payload)      // CREATE
      }

      navigate('/products')  // Kembali ke daftar setelah sukses
    } catch {
      alert('Gagal menyimpan produk')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Product</h1>
      <Input label="Title" value={form.title} onChange={...} />
      <Input label="Price" type="number" value={form.price} onChange={...} />
      <textarea value={form.description} onChange={...} />
      <Button type="submit">Create Product</Button>
      <Button type="button" onClick={() => navigate('/products')}>Cancel</Button>
    </form>
  )
}
```

### Alur CREATE:
1. Pengguna klik tombol "+ Add Product" → navigasi ke `/products/new`.
2. Form muncul dengan field kosong.
3. Pengguna isi data dan submit → `createProduct` dipanggil.
4. Jika sukses, redirect ke `/products`.
5. Jika gagal, muncul alert error.

> ⚠️ **Awas Error!:** Jangan lupa konversi tipe data. `price` dari input adalah string (`"19.99"`), tapi API menerima number. Gunakan `Number()` sebelum dikirim.

---

## ✏️ UPDATE — Form Edit Produk

Mode UPDATE aktif saat ada `id` di URL (rute `/products/edit/:id`).

```jsx
// File: pages/products/ProductForm.jsx (potongan — mode UPDATE)
export default function ProductForm() {
  const { id } = useParams()
  const isEdit = !!id
  const [fetchLoading, setFetchLoading] = useState(isEdit)

  useEffect(() => {
    if (isEdit) {
      // Ambil data produk yang akan diedit
      getProduct(id)
        .then((p) => setForm({
          title: p.title,
          price: String(p.price),
          description: p.description
        }))
        .catch(() => alert('Gagal memuat produk'))
        .finally(() => setFetchLoading(false))
    }
  }, [id])
}
```

### Alur UPDATE:
1. Pengguna klik "Edit" → navigasi ke `/products/edit/5`.
2. `useEffect` membaca `id`, memanggil `getProduct(id)`.
3. Data produk diisi ke form via `setForm`.
4. Pengguna ubah data dan submit → `updateProduct(id, payload)` dipanggil.
5. Redirect ke `/products` setelah sukses.

### Perbedaan CREATE vs UPDATE:

| Aspek | CREATE | UPDATE |
|---|---|---|
| URL | `/products/new` | `/products/edit/:id` |
| `useParams()` | `{}` (no id) | `{ id: "5" }` |
| Judul | "Add Product" | "Edit Product" |
| Tombol | "Create Product" | "Update Product" |
| API call | `createProduct()` | `updateProduct(id)` |
| Data awal | Form kosong | Form terisi dari API |

---

## 🗑️ DELETE — Hapus dengan Konfirmasi

DELETE dilakukan dengan modal konfirmasi agar pengguna tidak tidak sengaja menghapus data.

```jsx
// File: pages/products/ProductList.jsx (potongan)
import Modal from '../../components/ui/Modal'

export default function ProductList() {
  const [deleteId, setDeleteId] = useState(null)

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteProduct(deleteId)
      setProducts((prev) => prev.filter((p) => p.id !== deleteId))
    } catch {
      alert('Gagal menghapus produk')
    }
    setDeleteId(null) // Tutup modal
  }

  return (
    <>
      {/* ...tabel produk... */}
      <Button variant="danger" onClick={() => setDeleteId(product.id)}>Delete</Button>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
        <p>Yakin ingin menghapus produk ini?</p>
        <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal>
    </>
  )
}
```

### Alur DELETE:
1. Klik "Delete" → `setDeleteId(product.id)` → modal terbuka.
2. Jika klik "Cancel" → `setDeleteId(null)` → modal tertutup.
3. Jika klik "Delete" → `deleteProduct(id)` dipanggil → produk dihapus dari state lokal (`filter`) → modal tertutup.

> 💡 **Optimistic Update:** Perhatikan bahwa produk langsung dihapus dari state (`filter`) tanpa menunggu konfirmasi server. Ini disebut optimistic update — UI terasa lebih cepat. Jika API gagal, kita tampilkan error dan user bisa refresh data.

---

## ⏳ Loading, Error, dan Empty State

Aplikasi CRUD yang baik harus menangani 3 kondisi ini:

### 1. Loading State

Tampilkan indikator loading saat data sedang diambil:

```jsx
// ProductList.jsx
const [loading, setLoading] = useState(true)

if (loading) {
  return <p>Loading...</p>
}
```

```jsx
// ProductForm.jsx (saat mode edit, ambil data dulu)
if (fetchLoading) {
  return <p>Loading...</p>
}
```

### 2. Error State

Tangkap error dari API dan tampilkan pesan yang jelas:

```jsx
// Login.jsx
const [error, setError] = useState('')

catch {
  setError('Login gagal. Periksa username dan password.')
}

// Di JSX
{error && <p className="text-red-500">{error}</p>}
```

### 3. Empty State

Jika data kosong, tampilkan pesan yang informatif:

```jsx
{products.length === 0 && !loading && (
  <p className="text-secondary">Belum ada produk. Tambahkan produk pertama!</p>
)}
```

---

## 💻 Latihan

### Latihan 1: Tambah Kolom Category

API DummyJSON mengembalikan field `category` di setiap produk. Tambahkan kolom "Category" di tabel `ProductList` setelah kolom Title.

### Latihan 2: Fitur Search

Tambah input search di atas tabel `ProductList`. Filter produk berdasarkan title menggunakan `Array.filter()`:

```javascript
const filtered = products.filter((p) =>
  p.title.toLowerCase().includes(searchQuery.toLowerCase())
)
```

🌟 **Reward Selesai:** Gelar **CRUD Developer** 🥉

---

## 🏆 Tugas Mandiri

### Challenge: Manajemen Kategori Produk

Buat halaman CRUD untuk mengelola kategori produk.

**Ketentuan:**
1. Buat halaman `/categories` (daftar kategori) dan `/categories/new` dan `/categories/edit/:id` (form kategori).
2. Buat `services/categoryService.js` dengan fungsi CRUD menggunakan API `https://dummyjson.com/products/categories` (GET) dan endpoint palsu (POST/PUT/DELETE bisa gunakan `/products/add` sebagai simulasi).
3. Tabel kategori menampilkan: Nama Kategori, Slug, Jumlah Produk.
4. Terapkan loading state, error state, dan empty state.
5. Gunakan modal konfirmasi untuk DELETE.
6. Implementasikan pagination.

**Kriteria Penilaian:**
- [ ] Semua operasi CRUD berfungsi (Create, Read, Update, Delete).
- [ ] Service layer terpisah dari komponen.
- [ ] Loading state tampil saat fetch data.
- [ ] Modal konfirmasi muncul sebelum delete.
- [ ] Redirect setelah Create/Update berhasil.
- [ ] Error handling dengan try-catch.

🌟 **Reward Selesai:** Gelar **Fullstack CRUD Master** 🥇

---

## 📚 Referensi

- [React: useState](https://www.google.com/search?q=https://react.dev/reference/react/useState)
- [React: useEffect](https://www.google.com/search?q=https://react.dev/reference/react/useEffect)
- [React: Forms](https://www.google.com/search?q=https://react.dev/reference/react-dom/components/input)

---

**Kerja Bagus!** 🚀

CRUD adalah fondasi dari hampir semua aplikasi bisnis. Dengan menguasai pola CRUD di React — mulai dari service layer, form handling, routing, hingga state management — kamu sudah siap membangun aplikasi nyata seperti dashboard admin, POS, CMS, atau sistem inventaris.
