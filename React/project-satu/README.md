# Product Requirements Document (PRD)

## 1. Informasi Umum

* **Nama Project:** E-Commerce Admin Dashboard
* **Deskripsi:** Aplikasi *single-page* berbasis *web* untuk mengelola data katalog produk toko *online*.
* **Tujuan:** Mengimplementasikan manajemen *state* (Context API), proteksi rute (React Router), dan operasi CRUD melalui REST API publik.

## 2. Pengguna (User Persona)

* **Admin Toko:** Membutuhkan antarmuka yang cepat untuk memperbarui data produk tanpa harus me-*(reload)* halaman, serta sistem yang aman (memerlukan *login*).

## 3. Ruang Lingkup Fitur (Feature Scope)

**A. Autentikasi & Otorisasi**

* Pengguna dapat melakukan *login* menggunakan kredensial *dummy*.
* Sistem menyimpan token sesi (*JWT*) agar pengguna tetap *login* setelah memuat ulang halaman.
* Sistem memblokir akses ke halaman *Dashboard* jika pengguna tidak memiliki token yang valid (*Protected Route*).

**B. Dashboard Utama**

* Menampilkan ringkasan data statistik sederhana (misalnya, total produk yang ditarik dari API).

**C. Manajemen Produk (CRUD)**

* **Read:** Menampilkan daftar produk dalam bentuk tabel yang memuat gambar, nama, harga, dan stok. Data diambil dari *endpoint* `GET /products`.
* **Create:** Menyediakan form input (Nama, Harga, Deskripsi) untuk menambah produk baru via *endpoint* `POST /products/add`.
* **Update:** Menyediakan form untuk mengedit data produk yang sudah ada via *endpoint* `PUT /products/:id`.
* **Delete:** Menampilkan konfirmasi sebelum menghapus produk via *endpoint* `DELETE /products/:id`.

## 4. Spesifikasi Teknis

* **Frontend Library:** React (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router v6+
* **State Management:** React Context API & `useState`
* **HTTP Client:** Axios
* **Data Source:** DummyJSON API (`[https://dummyjson.com](https://dummyjson.com)`)

--

## Struktur Project

```
src/
│
├── assets/             # Untuk menyimpan gambar statis atau logo
│
├── components/         # Komponen UI yang bisa dipakai berulang (Reusable)
│   ├── layout/         # Komponen kerangka (Sidebar, Navbar, Footer)
│   └── ui/             # Komponen kecil (Button, Input, Modal, Table)
│
├── context/            # Tempat menyimpan Global State (Context API)
│   └── AuthContext.jsx # Mengatur state login user dan token
│
├── pages/              # Komponen utama untuk setiap rute halaman
│   ├── Login.jsx       # Halaman login
│   ├── Dashboard.jsx   # Halaman utama (berisi ringkasan/statistik)
│   └── products/
│       ├── ProductList.jsx   # Halaman tabel daftar produk
│       └── ProductForm.jsx   # Halaman form tambah/edit produk
│
├── routes/             # Konfigurasi React Router
│   ├── AppRoutes.jsx       # Kumpulan semua Route
│   └── ProtectedRoute.jsx  # Pengecekan token, melempar user jika belum login
│
├── services/           # Konfigurasi Axios dan endpoint API
│   ├── api.js          # Konfigurasi base URL DummyJSON & interceptor
│   ├── authService.js  # Fungsi khusus fetch API login
│   └── productService.js # Fungsi khusus fetch API CRUD produk
│
├── utils/              # Fungsi-fungsi bantuan (Helper)
│   └── formatters.js   # Misalnya fungsi format angka ke Rupiah / Dollar
│
├── App.jsx             # Root component
└── main.jsx            # Entry point React

```