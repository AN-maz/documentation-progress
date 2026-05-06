# SQL - Modul 7: Transaksi, Indexing, dan Keamanan Database

## Daftar Isi
1. Review Modul 6
2. Transaksi Database dan Konsep ACID
3. Optimasi dengan Indexing
4. Keamanan Database (DCL)
5. Latihan
6. Tugas Mandiri
7. Kriteria Penilaian
8. Referensi

---

# Review Modul 6

Pada modul sebelumnya, kita telah mempelajari teknik analitik tingkat lanjut:

- ✅ **CTE (`WITH`)**
  - Membuat tabel sementara di dalam query
  - Membantu query kompleks menjadi lebih rapi dan mudah dibaca

- ✅ **Window Functions (`OVER()`, `PARTITION BY`)**
  - Membuat ranking
  - Running total
  - Analisis data lanjutan tanpa menghilangkan detail data asli

- ✅ **Views**
  - Menyimpan query kompleks menjadi tabel virtual

Sekarang kita akan belajar:

- Menjaga konsistensi data
- Mempercepat query
- Mengamankan database

---

# Transaksi Database dan Konsep ACID

Bayangkan Anda sedang melakukan transfer uang sebesar:

```text
Rp 100.000
```

Di level database, biasanya terjadi dua proses:

1. Saldo pengirim dikurangi
2. Saldo penerima ditambah

---

## Masalah yang Bisa Terjadi

Bagaimana jika:

- proses pertama berhasil,
- tetapi server mati sebelum proses kedua selesai?

Akibatnya:

- uang pengirim hilang,
- penerima belum menerima uang.

Untuk mencegah masalah ini digunakan:

# TRANSACTION

---

# Konsep ACID

Transaksi database mengikuti prinsip:

| Konsep | Penjelasan |
|---|---|
| **Atomicity** | Semua proses berhasil atau semuanya dibatalkan |
| **Consistency** | Data tetap valid sebelum dan sesudah transaksi |
| **Isolation** | Transaksi yang berjalan bersamaan tidak saling mengganggu |
| **Durability** | Data tetap tersimpan walaupun server mati |

---

# TCL (Transaction Control Language)

Digunakan untuk mengontrol transaksi database.

---

## START TRANSACTION

Memulai transaksi.

```sql
START TRANSACTION;
```

> PostgreSQL biasanya menggunakan:
>
> ```sql
> BEGIN;
> ```

---

## COMMIT

Menyimpan perubahan secara permanen.

---

## ROLLBACK

Membatalkan seluruh perubahan jika terjadi error.

---

# Contoh Transaksi

```sql
-- Memulai transaksi
START TRANSACTION;

-- 1. Kurangi stok barang
UPDATE produk
SET stok = stok - 1
WHERE id = 5;

-- 2. Catat riwayat pembelian
INSERT INTO riwayat_pesanan (produk_id, user_id)
VALUES (5, 102);

-- Jika semua sukses
COMMIT;

-- Jika terjadi error
ROLLBACK;
```

---

## Implementasi di Backend

Biasanya di backend (`Node.js`, `Kotlin`, dll), transaksi dibungkus dalam:

```javascript
try {
   // query
   commit()
} catch (e) {
   rollback()
}
```

---

# Optimasi dengan Indexing

Ketika data sudah mencapai jutaan baris, query `SELECT` bisa menjadi lambat.

Secara default database melakukan:

```text
Full Table Scan
```

Artinya database membaca data satu per satu dari atas ke bawah.

---

# Apa Itu Index?

Index bekerja seperti:

> Daftar isi / indeks pada buku

Daripada membaca seluruh isi buku, kita langsung menuju halaman tertentu.

---

# Membuat Index

## Contoh 1 — Index pada Email

```sql
CREATE INDEX idx_user_email
ON users (email);
```

Sangat berguna untuk:

- login
- pencarian user
- validasi email

---

## Contoh 2 — Composite Index

```sql
CREATE INDEX idx_status_tanggal
ON pesanan (status_pesanan, tanggal_order);
```

Digunakan untuk query seperti:

```sql
WHERE status_pesanan = 'Selesai'
ORDER BY tanggal_order
```

---

# Kapan TIDAK Menggunakan Index?

Walaupun mempercepat `SELECT`, index memiliki kelemahan:

| Kelemahan | Penjelasan |
|---|---|
| Memakan storage tambahan | Karena database menyimpan struktur index |
| Memperlambat INSERT/UPDATE/DELETE | Karena index harus diperbarui |

---

## Best Practice

Gunakan index hanya pada kolom yang sering dipakai di:

- `WHERE`
- `JOIN`
- `ORDER BY`

---

# Keamanan Database (DCL)

Dalam backend modern:

> Jangan pernah menggunakan user `root` untuk aplikasi.

---

# Prinsip Least Privilege

Aplikasi hanya boleh diberi akses yang benar-benar diperlukan.

---

# DCL (Data Control Language)

Digunakan untuk mengatur hak akses user database.

---

# CREATE USER

```sql
CREATE USER 'app_backend'@'localhost'
IDENTIFIED BY 'PasswordKuat123!';
```

---

# GRANT

Memberikan izin tertentu.

```sql
GRANT SELECT, INSERT, UPDATE
ON lms_db.*
TO 'app_backend'@'localhost';
```

---

# REVOKE

Mencabut hak akses.

```sql
REVOKE DELETE
ON lms_db.*
FROM 'app_backend'@'localhost';
```

---

# FLUSH PRIVILEGES

Menerapkan perubahan hak akses.

```sql
FLUSH PRIVILEGES;
```

---

# Latihan

# Latihan: Transaksi Sederhana

Simulasi transfer dana antar rekening.

```sql
START TRANSACTION;

-- Kurangi saldo rekening A
UPDATE rekening
SET saldo = saldo - 500000
WHERE nomor_rekening = '1111';

-- Tambahkan saldo ke rekening B
UPDATE rekening
SET saldo = saldo + 500000
WHERE nomor_rekening = '2222';

-- Simpan perubahan
COMMIT;
```

---

## Catatan

Dalam backend nyata (`Node.js`, `Kotlin`, dll), biasanya dibungkus:

```javascript
try {
   commit()
} catch (e) {
   rollback()
}
```

---

# Tugas Mandiri

# Challenge: Transaksi Backend Aplikasi MB Go

Dalam pengembangan aplikasi:

```text
MB Go (Makan Bergizi Gratis)
```

Anda perlu memastikan proses klaim makanan:

- aman,
- konsisten,
- tidak gagal sebagian.

---

# Struktur Tabel

## Tabel `mitra_warung`

| Kolom | Tipe |
|---|---|
| `id` | INT |
| `nama_warung` | VARCHAR |
| `kuota_makanan_tersedia` | INT |

---

## Tabel `riwayat_klaim`

| Kolom | Tipe |
|---|---|
| `id` | INT |
| `nik_pengguna` | VARCHAR |
| `mitra_id` | INT |
| `waktu_klaim` | DATETIME |

---

# Instruksi

Simpan seluruh query pada file:

```text
07_tugas_mandiri.sql
```

---

# Soal

---

## 1. Transaksi TCL

Buat transaksi untuk proses klaim makanan:

### Langkah-langkah

1. Memulai transaksi
2. Mengurangi kuota makanan sebesar 1
3. Menambahkan data ke `riwayat_klaim`
4. Mengakhiri dengan `COMMIT`

### Ketentuan

Gunakan:

```sql
START TRANSACTION;
COMMIT;
```

---

## 2. Optimasi Index

Admin backend sering mencari data berdasarkan:

```text
nik_pengguna
```

Buat:

```sql
CREATE INDEX
```

pada kolom tersebut.

---

## 3. Keamanan DCL

Buat user database baru:

```text
mbgo_api
```

Kemudian berikan hak akses:

- `SELECT`
- `INSERT`
- `UPDATE`

pada database:

```text
mbgo_database
```

---

# Aturan Pengerjaan

- Simpan seluruh query dalam:

```text
07_tugas_mandiri.sql
```

- Berikan komentar pada query yang rawan error

---

# Kriteria Penilaian

- [ ] Mampu membuat transaksi menggunakan `START TRANSACTION` dan `COMMIT`
- [ ] Memahami sintaks `CREATE INDEX`
- [ ] Memahami prinsip Least Privilege pada database

---

# Referensi

- ACID Properties in DBMS - GeeksforGeeks
- PostgreSQL Transaction Tutorial
- MySQL CREATE INDEX Statement