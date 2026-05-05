# SQL - Modul 5: Fungsi Bawaan (Built-in Functions) dan Logika Kondisional

## Daftar Isi
1. Review Modul 4
2. Fungsi Teks (String Functions)
3. Fungsi Angka (Numeric Functions)
4. Fungsi Tanggal & Waktu (Date Functions)
5. Logika Kondisional (CASE WHEN & COALESCE)
6. Latihan
7. Tugas Mandiri
8. Kriteria Penilaian
9. Referensi

---

# Review Modul 4

Pada modul sebelumnya kita telah mempelajari teknik tingkat menengah untuk menggabungkan data:

- ✅ `JOIN` → Menggabungkan data dari beberapa tabel yang berelasi (`INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`)
- ✅ Klausa `ON` → Menentukan aturan/kolom kunci yang menghubungkan antar tabel
- ✅ `Subquery` → Membuat query bersarang di dalam `WHERE`, `SELECT`, atau `FROM`

Sekarang, kita akan belajar membuat output query menjadi lebih rapi dan "cerdas" menggunakan fungsi-fungsi SQL.

> **Catatan:**  
> Sebagian fungsi di bawah ini mungkin memiliki sintaks yang sedikit berbeda tergantung DBMS yang digunakan seperti:
>
> - MySQL
> - PostgreSQL
> - SQL Server
>
> Modul ini menggunakan sintaks yang umum didukung.

---

# Fungsi Teks (String Functions)

Fungsi teks digunakan untuk memanipulasi data bertipe:

- `VARCHAR`
- `TEXT`

---

## 1. CONCAT()

Menggabungkan dua atau lebih string menjadi satu.

```sql
-- Menggabungkan nama depan dan nama belakang
SELECT 
    CONCAT(nama_depan, ' ', nama_belakang) AS nama_lengkap
FROM pelanggan;
```

---

## 2. UPPER() dan LOWER()

Digunakan untuk mengubah teks:

- `UPPER()` → huruf kapital semua
- `LOWER()` → huruf kecil semua

```sql
SELECT 
    UPPER(nama_produk) AS produk_kapital,
    LOWER(email) AS email_kecil
FROM users;
```

---

## 3. SUBSTRING() / SUBSTR()

Mengambil sebagian karakter dari sebuah teks.

### Sintaks

```sql
SUBSTRING(teks, posisi_awal, jumlah_karakter)
```

### Contoh

```sql
-- Mengambil 4 huruf pertama nama bulan
SELECT 
    SUBSTRING(nama_bulan, 1, 4) AS singkatan_bulan;
```

Contoh hasil:

```text
Januari → Janu
```

---

## 4. LENGTH()

Menghitung jumlah karakter dalam sebuah teks.

```sql
-- Cari pelanggan dengan nama lebih dari 20 karakter
SELECT nama_lengkap
FROM pelanggan
WHERE LENGTH(nama_lengkap) > 20;
```

---

# Fungsi Angka (Numeric Functions)

Digunakan untuk memanipulasi data numerik:

- `INT`
- `DECIMAL`
- `FLOAT`

---

## 1. ROUND(), CEIL(), FLOOR()

### ROUND()

Membulatkan angka ke nilai terdekat.

### CEIL()

Membulatkan angka selalu ke atas.

### FLOOR()

Membulatkan angka selalu ke bawah.

```sql
SELECT 
    harga,
    ROUND(harga, 0) AS harga_bulat,
    CEIL(harga) AS pembulatan_naik,
    FLOOR(harga) AS pembulatan_turun
FROM produk;
```

---

## 2. ABS()

Mengembalikan nilai absolut (selalu positif).

```sql
SELECT ABS(-15000) AS nilai_positif;
```

Hasil:

```text
15000
```

---

# Fungsi Tanggal & Waktu (Date Functions)

Fungsi ini digunakan untuk:

- Mengambil bagian tertentu dari tanggal
- Menghitung selisih waktu
- Mendapatkan waktu saat ini

---

## 1. Mendapatkan Waktu Saat Ini

```sql
-- MySQL / PostgreSQL
SELECT 
    CURRENT_DATE AS hari_ini,
    NOW() AS waktu_sekarang;
```

---

## 2. EXTRACT(), YEAR(), MONTH(), DAY()

Mengambil komponen tertentu dari tanggal.

### PostgreSQL / SQL Standard

```sql
SELECT 
    EXTRACT(YEAR FROM tanggal_order) AS tahun_order
FROM orders;
```

### MySQL

```sql
SELECT 
    YEAR(tanggal_order),
    MONTH(tanggal_order)
FROM orders;
```

---

## 3. DATEDIFF()

Menghitung selisih hari antar tanggal.

```sql
-- MySQL
SELECT 
    DATEDIFF(tanggal_kirim, tanggal_order) AS lama_pengiriman_hari
FROM orders;
```

---

# Logika Kondisional (CASE WHEN & COALESCE)

SQL juga memiliki logika seperti `if-else` pada bahasa pemrograman.

---

## 1. CASE WHEN ... THEN ... ELSE ... END

Digunakan untuk evaluasi kondisi secara berurutan.

```sql
SELECT 
    nama_produk,
    stok,
    CASE
        WHEN stok > 50 THEN 'Stok Aman'
        WHEN stok > 0 AND stok <= 50 THEN 'Stok Menipis'
        ELSE 'Habis'
    END AS status_stok
FROM produk;
```

---

## 2. COALESCE()

Digunakan untuk menangani nilai `NULL`.

`COALESCE()` akan mengambil nilai pertama yang **tidak NULL**.

```sql
-- Jika nomor_telepon NULL,
-- tampilkan "Belum Ada Nomor"
SELECT 
    nama_lengkap,
    COALESCE(nomor_telepon, 'Belum Ada Nomor') AS kontak
FROM pelanggan;
```

---

## 3. NULLIF(nilai1, nilai2)

Mengembalikan:

- `NULL` jika `nilai1 = nilai2`
- `nilai1` jika berbeda

Sering digunakan untuk mencegah error pembagian dengan nol.

```sql
-- Mencegah division by zero
SELECT 
    total_harga / NULLIF(jumlah_barang, 0) AS harga_satuan
FROM pesanan;
```

---

# Latihan

## Latihan: Modifikasi Tampilan Laporan

Pelajari bagaimana beberapa fungsi dapat digunakan bersamaan.

```sql
SELECT 
    CONCAT('#TKT-', EXTRACT(YEAR FROM tanggal_beli), '-', id) AS nomor_tiket_unik,
    UPPER(nama_event) AS nama_acara,
    harga,
    CASE
        WHEN harga > 1000000 THEN 'VIP'
        WHEN harga > 500000 THEN 'Reguler'
        ELSE 'Ekonomi'
    END AS kategori_tiket
FROM tiket;
```

---

# Tugas Mandiri

# Challenge: Membersihkan dan Memformat Data E-Commerce

Anda adalah seorang **Data Analyst**.

Database toko online sering menerima data yang tidak rapi dari pengguna.

Tugas Anda adalah membuat laporan dengan format yang sudah distandarisasi menggunakan fungsi-fungsi SQL.

Gunakan tabel:

- `pelanggan`
- `transaksi_order`

Diasumsikan kedua tabel saling berelasi.

---

## Instruksi

Buatlah satu query atau beberapa query jika diperlukan.

Simpan jawaban dalam file:

```text
05_tugas_mandiri.sql
```

---

# Soal

---

## 1. String Function & COALESCE

Tampilkan:

- `nama_lengkap` pelanggan dalam huruf kapital semua
- Jika `alamat_pengiriman` bernilai `NULL`, ganti tampilannya menjadi:

```text
Ambil di Toko
```

---

## 2. Date Function

Buat dua kolom baru:

- `Bulan_Transaksi`
- `Tahun_Transaksi`

Gunakan:

- `MONTH()` / `YEAR()`
- atau `EXTRACT()`

---

## 3. Conditional Logic (Tiering Membership)

Buat kolom baru bernama:

```text
Status_Member
```

Dengan aturan:

| Kondisi | Status |
|---|---|
| `total_belanja > 5.000.000` | Platinum |
| `1.000.000 - 5.000.000` | Gold |
| Di bawah itu | Silver |

Gunakan:

```sql
CASE WHEN
```

---

## 4. Penggabungan Semua Konsep

Gabungkan logika nomor:

- 1
- 2
- 3

Lalu hubungkan dengan tabel `transaksi_order` menggunakan `JOIN`.

Hasil laporan harus menampilkan:

- Nama Pelanggan
- Status Member
- Bulan Transaksi
- Tahun Transaksi
- Alamat Pengiriman

---

# Kriteria Penilaian

- [ ] Berhasil menggunakan fungsi teks (`UPPER`, `LOWER`, `CONCAT`)
- [ ] Berhasil mengekstrak bagian spesifik dari tanggal
- [ ] Sintaks `CASE WHEN ... THEN ... ELSE ... END` benar
- [ ] Berhasil menggunakan `COALESCE` untuk membersihkan data kosong

---

# Referensi

- MySQL String Functions - W3Schools
- PostgreSQL Date/Time Functions
- SQL CASE Statement - W3Schools