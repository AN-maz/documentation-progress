# 🚒 API Dinas Pemadam Kebakaran Kota Bandung

> Project workshop pelatihan backend — Express.js + MySQL

---

## Struktur Project

```
damkar-api/
├── config/
│   └── database.js              # Koneksi MySQL
├── controllers/
│   ├── posController.js         # CRUD Pos Pemadam
│   └── laporanController.js     # CRUD Laporan Kebakaran (+ JOIN)
├── routes/
│   ├── posRoutes.js             # Endpoint /api/pos
│   └── laporanRoutes.js         # Endpoint /api/laporan
├── middleware/
│   └── errorHandler.js          # Error handling terpusat
├── database.sql                 # Script buat tabel + data dummy
├── .env.example                 # Template konfigurasi
├── package.json
└── index.js                     # Entry point
```

---

## Cara Menjalankan

### 1. Install dependencies
```bash
npm install
```

### 2. Buat file `.env`
```bash
cp .env.example .env
# Edit .env sesuai konfigurasi MySQL kamu
```

### 3. Setup database
```bash
# Jalankan di MySQL / phpMyAdmin
source database.sql
```

### 4. Jalankan server
```bash
npm run dev     # development (auto-restart)
npm start       # production
```

---

## Endpoints

### Pos Pemadam — `/api/pos`

| Method | Endpoint      | Deskripsi               |
|--------|---------------|-------------------------|
| GET    | /api/pos      | Semua pos pemadam        |
| GET    | /api/pos/:id  | Detail pos by ID         |
| POST   | /api/pos      | Tambah pos baru          |
| PUT    | /api/pos/:id  | Update data pos          |
| DELETE | /api/pos/:id  | Hapus pos                |

### Laporan Kebakaran — `/api/laporan`

| Method | Endpoint                      | Deskripsi                        |
|--------|-------------------------------|----------------------------------|
| GET    | /api/laporan                  | Semua laporan **(pakai JOIN)**   |
| GET    | /api/laporan/:id              | Detail laporan **(pakai JOIN)**  |
| GET    | /api/laporan/status/:status   | Filter by status                 |
| POST   | /api/laporan                  | Buat laporan baru                |
| PUT    | /api/laporan/:id              | Update status laporan            |
| DELETE | /api/laporan/:id              | Hapus laporan                    |

---

## Contoh Request

### POST /api/laporan
```json
{
  "no_laporan": "LAP-2024-011",
  "tanggal_kejadian": "2024-12-10",
  "alamat_kejadian": "Jl. Sudirman No. 5, Bandung",
  "kelurahan": "Sumurbandung",
  "tingkat_bahaya": "tinggi",
  "keterangan": "Kebakaran gedung 4 lantai",
  "pos_id": 1
}
```

### PUT /api/laporan/:id (update status)
```json
{
  "status": "selesai",
  "keterangan": "Berhasil dipadamkan pukul 14.30 WIB"
}
```

---

## Konsep JOIN yang Digunakan

Query `INNER JOIN` dipakai pada endpoint laporan untuk menggabungkan data:

```sql
SELECT l.*, p.nama_pos, p.wilayah, p.no_telp
FROM laporan_kebakaran l
INNER JOIN pos_pemadam p ON l.pos_id = p.id
```

> **INNER JOIN** = hanya menampilkan data yang **ada pasangannya** di kedua tabel.
> Artinya: laporan yang `pos_id`-nya tidak ada di tabel `pos_pemadam` **tidak akan muncul**.
