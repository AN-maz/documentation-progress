# Pertemuan 05: Konsep Backend & Pembuatan API Sederhana

> **Studi Kasus:** Sistem Informasi Dinas Pemadam Kebakaran Kota Bandung  
> **Stack:** Node.js · Express.js · MySQL

---

## Daftar Isi

1. [Konsep Sebuah Aplikasi Berinteraksi](#1-konsep-sebuah-aplikasi-berinteraksi)
2. [Apa itu RESTful API?](#2-apa-itu-restful-api)
3. [HTTP Method](#3-http-method)
4. [JSON — Bahasa Komunikasi Client & Server](#4-json--bahasa-komunikasi-client--server)
5. [Pengenalan Node.js & Package Manager (NPM)](#5-pengenalan-nodejs--package-manager-npm)
6. [Tools untuk Testing API](#6-tools-untuk-testing-api)
7. [Setup Awal Express](#7-setup-awal-express)
8. [Anatomi Request & Response — Routing Dasar](#8-anatomi-request--response--routing-dasar)
9. [Middleware Dasar](#9-middleware-dasar)
10. [Koneksi Database & Async/Await](#10-koneksi-database--asyncawait)

---

## 1. Konsep Sebuah Aplikasi Berinteraksi

### Teori

Bayangkan kamu menelepon call center Dinas Damkar. Kamu adalah **Client**, operator yang menerima teleponmu adalah **API**, dan sistem internal damkar yang mencatat laporan adalah **Server**.

```
CLIENT  ──── request ────▶  API  ──── proses ────▶  SERVER / DATABASE
        ◀─── response ────       ◀─── hasil  ────
```

Dalam dunia web, alurnya persis sama:

| Analogi Damkar | Dunia Web |
|---|---|
| Warga yang menelepon | Browser / Aplikasi (Client) |
| Operator call center | API (perantara) |
| Sistem pencatatan internal | Server + Database |
| Laporan yang diterima operator | Request |
| Jawaban operator ke warga | Response |

**Kenapa harus ada API di tengah?**

- **Keamanan** — Database tidak boleh diakses langsung dari luar
- **Fleksibilitas** — Satu API bisa dipakai oleh web, mobile, dan aplikasi lain sekaligus
- **Pemisahan tanggung jawab** — Frontend fokus tampilan, Backend fokus data

### Gambaran Project Damkar Kita

```
Postman / Browser                   Express Server              MySQL
(Client)          ──── request ───▶  (API)          ──── query ───▶  (Database)
                  ◀─── JSON ───────                 ◀─── data  ────
```

Saat kita akses `GET /api/laporan`, yang terjadi adalah:
1. Client mengirim request ke Express
2. Express menjalankan query `SELECT ... JOIN ...` ke MySQL
3. MySQL mengembalikan data
4. Express mengemas data ke format JSON
5. JSON dikirim balik ke Client

---

## 2. Apa itu RESTful API?

### Teori

**API** *(Application Programming Interface)* adalah jembatan yang memungkinkan dua aplikasi saling berkomunikasi.

**REST** *(Representational State Transfer)* adalah **aturan main** atau gaya arsitektur dalam membangun API. API yang mengikuti aturan ini disebut **RESTful API**.

Aturan utama REST yang perlu kamu tahu:

| Aturan | Penjelasan | Contoh di Project Damkar |
|---|---|---|
| **Gunakan URL sebagai alamat resource** | Setiap data punya "alamat" yang jelas | `/api/laporan`, `/api/pos` |
| **Gunakan HTTP Method sesuai aksi** | GET untuk ambil, POST untuk buat, dst. | `GET /api/laporan` |
| **Response dalam format standar** | Biasanya JSON | `{ "success": true, "data": [...] }` |
| **Stateless** | Setiap request berdiri sendiri | Server tidak "ingat" request sebelumnya |

### Struktur URL RESTful yang Baik

```
https://api.damkar-bandung.go.id/api/laporan
│                                │   │
│                                │   └── Resource (data apa yang diminta)
│                                └────── Prefix API
└─────────────────────────────────────── Domain server
```

---

## 3. HTTP Method

### Teori

HTTP Method adalah "kata kerja" yang menentukan **apa yang ingin kita lakukan** terhadap sebuah data. Hubungkannya dengan operasi database yang sudah kamu pelajari:

| HTTP Method | Operasi Database | Kegunaan | Contoh di Damkar |
|---|---|---|---|
| `GET` | `SELECT` | Mengambil data | Lihat daftar laporan kebakaran |
| `POST` | `INSERT` | Membuat data baru | Buat laporan kebakaran baru |
| `PUT` | `UPDATE` | Mengubah data | Update status laporan jadi "selesai" |
| `DELETE` | `DELETE` | Menghapus data | Hapus laporan yang salah input |

### Desain Endpoint Project Damkar

```
Laporan Kebakaran (/api/laporan)
├── GET    /api/laporan              → Ambil SEMUA laporan
├── GET    /api/laporan/:id          → Ambil laporan tertentu
├── GET    /api/laporan/status/proses→ Filter laporan by status
├── POST   /api/laporan              → Buat laporan baru
├── PUT    /api/laporan/:id          → Update status laporan
└── DELETE /api/laporan/:id          → Hapus laporan

Pos Pemadam (/api/pos)
├── GET    /api/pos                  → Ambil SEMUA pos
├── GET    /api/pos/:id              → Ambil pos tertentu
├── POST   /api/pos                  → Tambah pos baru
├── PUT    /api/pos/:id              → Update data pos
└── DELETE /api/pos/:id              → Hapus pos
```

> **Catatan `:id`** — Tanda titik dua berarti parameter dinamis. `/api/laporan/5` artinya ambil laporan dengan ID 5.

---

## 4. JSON — Bahasa Komunikasi Client & Server

### Teori

**JSON** *(JavaScript Object Notation)* adalah format teks ringan yang digunakan sebagai bahasa komunikasi antara Client dan Server.

```json
{
  "key": "value"
}
```

### Tipe Data dalam JSON

```json
{
  "id": 1,
  "no_laporan": "LAP-2024-001",
  "tanggal_kejadian": "2024-01-15",
  "tingkat_bahaya": "tinggi",
  "selesai": true,
  "koordinat": null,
  "pos": {
    "nama": "Pos Utama Bandung Tengah",
    "wilayah": "Bandung Tengah"
  },
  "unit_yang_dikirim": ["Mobil Tangki 01", "Mobil Tangki 03"]
}
```

| Key | Value | Tipe Data |
|---|---|---|
| `id` | `1` | Number |
| `no_laporan` | `"LAP-2024-001"` | String |
| `selesai` | `true` | Boolean |
| `koordinat` | `null` | Null |
| `pos` | `{ ... }` | Object |
| `unit_yang_dikirim` | `[ ... ]` | Array |

### Contoh Response API Damkar

Ketika kita akses `GET /api/laporan/1`, server akan mengembalikan JSON seperti ini:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "no_laporan": "LAP-2024-001",
    "tanggal_kejadian": "2024-01-15",
    "alamat_kejadian": "Jl. Braga No. 23, Bandung",
    "tingkat_bahaya": "tinggi",
    "status": "selesai",
    "nama_pos_penanganan": "Pos Utama Bandung Tengah",
    "wilayah_pos": "Bandung Tengah",
    "telp_pos": "022-4201113"
  }
}
```

---

## 5. Pengenalan Node.js & Package Manager (NPM)

### Teori

**JavaScript** awalnya hanya bisa berjalan di browser. Kita tidak bisa pakai JS untuk membuat server.

**Node.js** mengubah itu semua. Node.js adalah **runtime environment** yang memungkinkan JavaScript berjalan di luar browser — termasuk di server.

```
Sebelum Node.js:          Sesudah Node.js:
─────────────────         ─────────────────────────
JS → hanya browser        JS → browser + server + tools
PHP/Python → server       Node.js menjalankan JS di server
```

### NPM — Node Package Manager

NPM adalah **pengelola paket** (library/modul) untuk Node.js. Analoginya seperti App Store, tapi untuk kode.

| Perintah | Fungsi |
|---|---|
| `npm init -y` | Membuat file `package.json` (identitas project) |
| `npm install express` | Mengunduh & install library Express |
| `npm install` | Install semua library dari `package.json` |
| `npm run dev` | Menjalankan script "dev" dari `package.json` |

### File `package.json` Project Damkar

```json
{
  "name": "damkar-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mysql2": "^3.6.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**Penjelasan library yang kita pakai:**

| Library | Fungsi |
|---|---|
| `express` | Framework untuk membangun server & API |
| `mysql2` | Untuk koneksi dan query ke database MySQL |
| `dotenv` | Membaca konfigurasi dari file `.env` |
| `nodemon` | Auto-restart server saat ada perubahan kode (khusus development) |

### 💻 Praktik: Setup Project

```bash
# 1. Buat folder project
mkdir damkar-api
cd damkar-api

# 2. Inisialisasi project
npm init -y

# 3. Install semua library yang dibutuhkan
npm install express mysql2 dotenv
npm install -D nodemon

# 4. Lihat apa yang terbentuk
ls
```

Setelah dijalankan, akan muncul:
- `package.json` — identitas & daftar library project
- `node_modules/` — folder berisi semua library yang diunduh
- `package-lock.json` — catatan versi library yang tepat

> **Penting:** Folder `node_modules` jangan di-share atau di-upload ke GitHub. Ukurannya bisa ratusan MB! Cukup share `package.json`-nya, lalu orang lain tinggal jalankan `npm install`.

---

## 6. Tools untuk Testing API

### Teori

Saat membangun API, kita perlu alat untuk **mencoba/menguji** endpoint yang kita buat — tanpa harus membuat tampilan frontend dulu.

Ada dua pilihan populer:

| Tools | Kelebihan | Cara Install |
|---|---|---|
| **Postman** | Fitur lengkap, bisa simpan koleksi request | Download di [postman.com](https://postman.com) |
| **Thunder Client** | Ringan, langsung di dalam VS Code | Extensions VS Code → cari "Thunder Client" |

### Cara Membaca Tampilan Thunder Client / Postman

```
┌─────────────────────────────────────────────────┐
│  [GET ▼]  [http://localhost:3000/api/laporan]  [Send] │
├─────────────────────────────────────────────────┤
│  Params │ Headers │ Body │                      │
├─────────────────────────────────────────────────┤
│  Response                                        │
│  Status: 200 OK    Time: 23ms                   │
│                                                  │
│  {                                               │
│    "success": true,                              │
│    "data": [...]                                 │
│  }                                               │
└─────────────────────────────────────────────────┘
```

### HTTP Status Code yang Perlu Diketahui

| Kode | Artinya | Kapan Muncul di Project Damkar |
|---|---|---|
| `200 OK` | Berhasil | GET laporan berhasil |
| `201 Created` | Data baru berhasil dibuat | POST laporan baru berhasil |
| `400 Bad Request` | Request salah / data tidak lengkap | POST tanpa `no_laporan` |
| `404 Not Found` | Data tidak ditemukan | GET `/api/laporan/999` (tidak ada) |
| `500 Internal Server Error` | Error di server | Query database gagal |

---

## 7. Setup Awal Express

### Teori

**Express.js** adalah framework minimalis di atas Node.js untuk membangun server dan API. Tanpa Express, membuat server di Node.js murni memerlukan banyak kode boilerplate.

```javascript
// Tanpa Express (Node.js murni — lebih ribet)
const http = require('http')
const server = http.createServer((req, res) => {
  if (req.url === '/api/laporan' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ data: [] }))
  }
})

// Dengan Express (jauh lebih bersih)
const express = require('express')
const app = express()
app.get('/api/laporan', (req, res) => {
  res.json({ data: [] })
})
```

### 💻 Praktik: Lihat `index.js` Project Damkar

Buka file `index.js`. Ini adalah **pintu masuk** seluruh aplikasi kita:

```javascript
// index.js

require("dotenv").config();           // [1] Muat variabel dari file .env

const express = require("express");   // [2] Import library Express
const app = express();                // [3] Buat instance aplikasi Express
const PORT = process.env.PORT || 3000;// [4] Tentukan port server

app.use(express.json());              // [5] Middleware: agar bisa baca JSON dari request

app.use("/api/pos", posRoutes);       // [6] Daftarkan semua route pos
app.use("/api/laporan", laporanRoutes);// [7] Daftarkan semua route laporan

app.listen(PORT, () => {              // [8] Nyalakan server
  console.log(`Server berjalan di http://localhost:${PORT}`)
})
```

**Alur eksekusi saat server dinyalakan:**

```
node index.js
     │
     ├─ [1] Baca .env → DB_HOST, DB_USER, dst. tersedia
     ├─ [2-3] Express siap
     ├─ [4] Port ditentukan (3000)
     ├─ [5] Middleware JSON aktif
     ├─ [6-7] Semua route terdaftar
     └─ [8] Server menyala, siap menerima request
```

### 💻 Praktik: Jalankan Server

```bash
# Pastikan sudah ada file .env
cp .env.example .env

# Jalankan server
npm run dev
```

Output yang seharusnya muncul:
```
🚒 Server berjalan di http://localhost:3000
📋 Dokumentasi API: http://localhost:3000/
✅ Berhasil terhubung ke database MySQL
```

Buka browser ke `http://localhost:3000/` — kamu akan melihat daftar endpoint dalam format JSON.

---

## 8. Anatomi Request & Response — Routing Dasar

### Teori

**Route** adalah aturan yang menentukan: *"Kalau ada request dengan method X ke URL Y, jalankan fungsi Z."*

```javascript
app.METHOD(PATH, HANDLER)
//  │       │     │
//  │       │     └── Fungsi yang dijalankan
//  │       └──────── URL endpoint
//  └──────────────── HTTP Method (get, post, put, delete)
```

### Anatomi Handler Function

Setiap route memiliki fungsi dengan dua parameter penting:

```javascript
app.get('/api/laporan', (req, res) => {
//                       │    │
//                       │    └── response: untuk mengirim jawaban ke Client
//                       └─────── request: berisi semua info dari Client
  
  // Ambil sesuatu dari request:
  console.log(req.params)  // parameter URL  → /api/laporan/:id → { id: "5" }
  console.log(req.query)   // query string   → /api/laporan?status=proses
  console.log(req.body)    // body request   → data JSON yang dikirim Client

  // Kirim response:
  res.json({ success: true })       // kirim JSON
  res.status(404).json({ ... })     // kirim JSON dengan status code tertentu
})
```

### 💻 Praktik: Lihat Struktur Route Damkar

Buka file `routes/laporan.routes.js`:

```javascript
const router = express.Router()

// Perhatikan urutan route — ini PENTING!
router.get('/',               getAllLaporan)      // GET /api/laporan
router.get('/status/:status', getLaporanByStatus) // GET /api/laporan/status/proses
router.get('/:id',            getLaporanById)     // GET /api/laporan/5
router.post('/',              createLaporan)
router.put('/:id',            updateStatusLaporan)
router.delete('/:id',         deleteLaporan)
```

> **⚠️ Kenapa `/status/:status` harus di atas `/:id`?**  
> Express membaca route dari atas ke bawah. Jika `/:id` duluan, maka `/status/proses` akan dianggap sebagai `id = "status"`, bukan route filter. Selalu taruh route yang **lebih spesifik di atas** route yang lebih umum.

### 💻 Praktik: Coba di Postman / Thunder Client

```
1. GET  http://localhost:3000/api/laporan
   → Harus dapat daftar semua laporan

2. GET  http://localhost:3000/api/laporan/1
   → Harus dapat detail laporan ID 1

3. GET  http://localhost:3000/api/laporan/status/proses
   → Harus dapat laporan yang masih "proses"

4. GET  http://localhost:3000/api/laporan/999
   → Harus dapat response 404
```

---

## 9. Middleware Dasar

### Teori

**Middleware** adalah fungsi yang berjalan **di antara** request masuk dan response keluar. Ibarat pos pemeriksaan sebelum laporan kebakaran diproses oleh petugas.

```
Request  ──▶  [Middleware 1]  ──▶  [Middleware 2]  ──▶  [Route Handler]  ──▶  Response
              express.json()        (bisa custom)         getAllLaporan()
```

Middleware bisa digunakan untuk:
- **Parsing** — mengubah raw request menjadi data yang bisa dibaca
- **Autentikasi** — cek apakah user punya akses
- **Logging** — catat setiap request yang masuk
- **Error Handling** — tangkap dan format error

### 💻 Praktik: Buktikan Pentingnya `express.json()`

**Langkah 1:** Sementara komen dulu middleware di `index.js`:

```javascript
// app.use(express.json())  ← di-komen dulu
```

**Langkah 2:** Coba POST request di Postman:
```
POST http://localhost:3000/api/laporan
Body (JSON):
{
  "no_laporan": "LAP-2024-011",
  "tanggal_kejadian": "2024-12-10",
  "alamat_kejadian": "Jl. Sudirman No. 5",
  "pos_id": 1
}
```

**Hasil:** Error — `req.body` akan bernilai `undefined`, validasi gagal.

**Langkah 3:** Aktifkan kembali middleware:
```javascript
app.use(express.json())  // ← aktifkan lagi
```

**Langkah 4:** Coba POST yang sama → sekarang berhasil!

### 💻 Praktik: Lihat `errorHandler.js`

```javascript
// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
//                    │              │
//                    │              └── next: lanjut ke middleware berikutnya
//                    └─────────────── err: object error yang ditangkap

  console.error('Error:', err.message)

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada server'
  })
}
```

Error handler **selalu punya 4 parameter** `(err, req, res, next)` — ini yang membedakannya dari middleware biasa. Di `index.js`, error handler didaftarkan **paling terakhir**:

```javascript
// index.js
app.use('/api/pos', posRoutes)
app.use('/api/laporan', laporanRoutes)
app.use((req, res) => { /* 404 handler */ })
app.use(errorHandler)  // ← selalu paling bawah
```

---

## 10. Koneksi Database & Async/Await

### Teori

#### Koneksi MySQL

Sebelum bisa query, kita harus terhubung ke database. Lihat `config/database.js`:

```javascript
const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
  host:     process.env.DB_HOST,     // dari file .env
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.error('❌ Gagal koneksi:', err.message)
    process.exit(1)  // hentikan server jika DB tidak bisa dihubungi
  }
  console.log('✅ Berhasil terhubung ke database MySQL')
})

module.exports = db  // ekspor agar bisa dipakai file lain
```

File `.env` yang menyimpan konfigurasi:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=damkar_db
PORT=3000
```

> **Kenapa pakai `.env`?** Agar password database tidak ikut ter-upload ke GitHub. File `.env` selalu masuk ke `.gitignore`.

#### Asynchronous — Masalah yang Harus Dipahami

Query ke database **membutuhkan waktu**. JavaScript tidak boleh "diam menunggu" karena itu akan membekukan seluruh server.

```javascript
// ❌ CARA SALAH — seolah-olah JavaScript bisa menunggu
const hasil = db.query('SELECT * FROM laporan_kebakaran')
console.log(hasil) // ini jalan SEBELUM query selesai → undefined!

// ✅ CARA BENAR — beritahu JavaScript untuk menunggu dengan async/await
const getAllLaporan = async () => {
  const hasil = await db.promise().query('SELECT * FROM laporan_kebakaran')
  console.log(hasil) // ini jalan SETELAH query selesai ✓
}
```

**Analogi:** Kamu memesan makanan di restoran. Kamu tidak berdiri diam di depan kasir menunggu makanannya jadi — kamu duduk, sambil ngobrol. Saat makanan siap, pelayan datang. `await` adalah cara JavaScript "duduk sambil ngobrol" sambil menunggu database.

### 💻 Praktik: Pahami Arsitektur Controller → Service

Project damkar menggunakan pola **Controller → Service**. Ini memisahkan dua tanggung jawab:

```
Request ──▶ Route ──▶ Controller ──▶ Service ──▶ Database
                       │               │
                       │               └── "Gimana caranya ambil data?"
                       │                   (logika query SQL ada di sini)
                       │
                       └── "Apa yang harus direspons ke Client?"
                           (validasi input, format response ada di sini)
```

**Lihat `controllers/laporan.controller.js`:**

```javascript
const getAllLaporan = async (req, res) => {
  try {
    // Controller memanggil Service — tidak tahu detail query-nya
    const results = await laporanService.getAllLaporan()

    // Controller yang bertanggung jawab atas format response
    res.json({
      success: true,
      total: results.length,
      data: results
    })
  } catch (err) {
    // Jika ada error, kembalikan pesan error
    res.status(500).json({ success: false, message: err.message })
  }
}
```

**Lihat `services/laporan.service.js`** *(yang perlu kamu buat)*:

```javascript
const db = require('../config/database')

// Service hanya tahu satu hal: query ke database
const getAllLaporan = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        l.id,
        l.no_laporan,
        l.tanggal_kejadian,
        l.alamat_kejadian,
        l.tingkat_bahaya,
        l.status,
        l.keterangan,
        p.nama_pos   AS nama_pos_penanganan,
        p.wilayah    AS wilayah_pos,
        p.no_telp    AS telp_pos
      FROM laporan_kebakaran l
      INNER JOIN pos_pemadam p ON l.pos_id = p.id
      ORDER BY l.tanggal_kejadian DESC
    `

    db.query(query, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

module.exports = { getAllLaporan }
```

### 💻 Praktik: Perhatikan Query JOIN-nya

```sql
FROM laporan_kebakaran l          -- tabel utama, alias "l"
INNER JOIN pos_pemadam p          -- tabel yang digabung, alias "p"
  ON l.pos_id = p.id              -- kondisi: kolom pos_id di laporan harus sama dengan id di pos
```

**INNER JOIN** = hanya tampilkan data yang **punya pasangan di kedua tabel**.

```
laporan_kebakaran          pos_pemadam
┌────┬─────────┬───────┐   ┌────┬──────────────────────┐
│ id │ no_lap  │pos_id │   │ id │ nama_pos             │
├────┼─────────┼───────┤   ├────┼──────────────────────┤
│  1 │LAP-001  │  1    │──▶│  1 │ Pos Utama Bdg Tengah │ ← TAMPIL
│  2 │LAP-002  │  2    │──▶│  2 │ Pos Bandung Barat    │ ← TAMPIL
│  3 │LAP-003  │  99   │──▶│ 99 │ (tidak ada!)         │ ← TIDAK TAMPIL
└────┴─────────┴───────┘   └────┴──────────────────────┘
```

### 💻 Praktik: Uji Coba Lengkap di Postman

**1. Ambil semua laporan (pakai JOIN)**
```
GET http://localhost:3000/api/laporan
```

**2. Buat laporan baru**
```
POST http://localhost:3000/api/laporan
Content-Type: application/json

{
  "no_laporan": "LAP-2024-011",
  "tanggal_kejadian": "2024-12-10",
  "alamat_kejadian": "Jl. Sudirman No. 5, Bandung",
  "kelurahan": "Sumurbandung",
  "tingkat_bahaya": "tinggi",
  "keterangan": "Kebakaran gedung perkantoran",
  "pos_id": 1
}
```

**3. Update status laporan**
```
PUT http://localhost:3000/api/laporan/11
Content-Type: application/json

{
  "status": "selesai",
  "keterangan": "Berhasil dipadamkan pukul 15.30 WIB"
}
```

**4. Hapus laporan**
```
DELETE http://localhost:3000/api/laporan/11
```

---

## Rangkuman

| Konsep | Penjelasan Singkat | Tempat di Project Damkar |
|---|---|---|
| Client-Server | Pemisahan antara yang minta data dan yang sediakan data | Postman ↔ Express ↔ MySQL |
| RESTful API | Aturan standar membangun API | Semua endpoint `/api/...` |
| HTTP Method | Kata kerja aksi (GET/POST/PUT/DELETE) | `router.get()`, `router.post()`, dst |
| JSON | Format data komunikasi Client-Server | Semua `res.json({ ... })` |
| Node.js | Runtime JS di server | Menjalankan seluruh project |
| NPM | Pengelola library/package | `package.json`, `node_modules` |
| Express | Framework server di atas Node.js | `index.js` |
| Routing | Aturan: method + URL → fungsi | `routes/laporan.routes.js` |
| Middleware | Fungsi perantara request-response | `express.json()`, `errorHandler.js` |
| Async/Await | Menangani operasi yang butuh waktu | `laporanService.getAllLaporan()` |
| JOIN | Menggabungkan 2 tabel dalam 1 query | Query di `laporan.service.js` |

---

## Tugas Mandiri

Setelah workshop selesai, coba kerjakan sendiri:

1. **Tambahkan endpoint baru** `GET /api/laporan/bahaya/:tingkat` yang memfilter laporan berdasarkan `tingkat_bahaya` (rendah / sedang / tinggi)

2. **Buat service dan controller** untuk endpoint tersebut mengikuti pola yang sudah ada

3. **Uji di Postman** — pastikan response-nya konsisten dengan endpoint lain (ada `success`, `total`, `data`)

> **Hint:** Polanya hampir sama persis dengan `getLaporanByStatus`. Cukup ganti kolom yang difilter dari `status` menjadi `tingkat_bahaya`.
