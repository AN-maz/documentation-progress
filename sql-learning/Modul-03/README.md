# SQL - Modul 3: Pengambilan Data Dasar & Agregasi (DQL)

## Daftar Isi
1. Review Modul 2
2. Dasar Pengambilan Data (SELECT)
3. Menyaring Data (WHERE & Operator)
4. Mengurutkan dan Membatasi Data
5. Fungsi Agregasi
6. Pengelompokan Data (GROUP BY & HAVING)
7. Latihan
8. Tugas Mandiri
9. Kriteria Penilaian
10. Referensi
11. Cheat Sheet

---

# Review Modul 2

Pada modul sebelumnya kita telah mempelajari:

- **Constraints**: Aturan ketat untuk menjaga integritas data (`NOT NULL`, `UNIQUE`, dll).
- **Relasi Tabel**: Menggunakan `FOREIGN KEY` untuk menghubungkan tabel.
- **DML**: Memasukkan (`INSERT`), mengubah (`UPDATE`), dan menghapus (`DELETE`) data.

Sekarang, kita akan berfokus pada **DQL (Data Query Language)**, yang intinya adalah perintah `SELECT`. Ini adalah perintah SQL yang paling sering digunakan sehari-hari.

---

# Dasar Pengambilan Data (SELECT)

Perintah `SELECT` digunakan untuk mengambil data dari tabel. Kita bisa mengambil seluruh kolom atau hanya kolom tertentu yang kita butuhkan.

```sql
-- Mengambil SEMUA kolom dari tabel pelanggan
SELECT * FROM pelanggan;

-- Mengambil kolom tertentu (lebih efisien untuk performa)
SELECT nama_lengkap, email FROM pelanggan;
```

## Menggunakan Alias (AS)

Terkadang nama kolom di database kurang enak dibaca. Kita bisa mengubah judul kolom pada hasil query (tanpa mengubah nama kolom asli di database) menggunakan `AS`.

```sql
SELECT 
    nama_lengkap AS "Nama Pelanggan", 
    email AS "Alamat Surel" 
FROM pelanggan;
```

---

# Menyaring Data (WHERE & Operator)

Jika kita hanya menggunakan `SELECT *`, database akan menampilkan semua data yang ada. Untuk mengambil data yang spesifik, kita gunakan klausa `WHERE` yang dikombinasikan dengan berbagai operator.

## 1. Operator Perbandingan

`=`, `>`, `<`, `>=`, `<=`, `<>` (atau `!=` untuk tidak sama dengan).

```sql
-- Mengambil produk yang harganya di atas Rp 50.000
SELECT * FROM produk WHERE harga > 50000;

-- Mengambil pelanggan dengan ID spesifik
SELECT nama_lengkap FROM pelanggan WHERE id = 5;
```

## 2. Operator Logika (AND, OR, NOT)

```sql
-- Menggunakan AND (Kedua kondisi harus benar)
SELECT * FROM produk 
WHERE kategori = 'Elektronik' AND stok > 10;

-- Menggunakan OR (Salah satu kondisi benar)
SELECT * FROM produk 
WHERE kategori = 'Elektronik' OR kategori = 'Fashion';
```

## 3. Operator Tambahan (IN, BETWEEN, LIKE, IS NULL)

| Operator | Fungsi | Contoh Penggunaan |
|---|---|---|
| `IN` | Mencocokkan dengan beberapa nilai sekaligus (pengganti `OR` yang panjang). | `WHERE kategori IN ('Elektronik', 'Fashion', 'Makanan')` |
| `BETWEEN` | Mencari data di antara rentang nilai tertentu (inklusif). | `WHERE harga BETWEEN 10000 AND 50000` |
| `LIKE` | Pencarian teks berpola menggunakan `%` (wildcard). | `WHERE nama_lengkap LIKE 'Budi%'` *(Nama berawalan Budi)* |
| `IS NULL` | Mencari baris yang datanya kosong (`NULL`). | `WHERE nomor_telepon IS NULL` |

### Tips LIKE

- `%Purwa%` → mencari teks yang mengandung `"Purwa"` di mana saja.
- `_wa` → underscore (`_`) mewakili tepat satu karakter  
  *(contoh: "Purwa", "Nazwa")*.

---

# Mengurutkan dan Membatasi Data

## ORDER BY (Mengurutkan)

Gunakan `ORDER BY` untuk mengurutkan hasil query.

- `ASC` (*Ascending*) → dari kecil ke besar / A ke Z *(default)*.
- `DESC` (*Descending*) → dari besar ke kecil / Z ke A.

```sql
-- Mengurutkan produk dari harga termahal ke termurah
SELECT nama_produk, harga 
FROM produk 
ORDER BY harga DESC;

-- Mengurutkan berdasarkan kategori (A-Z), lalu harga (murah-mahal)
SELECT * FROM produk 
ORDER BY kategori ASC, harga ASC;
```

## LIMIT & OFFSET (Membatasi)

Sangat berguna untuk fitur **Pagination** (Pindah Halaman) pada website.

- `LIMIT` → jumlah maksimal baris yang ingin diambil.
- `OFFSET` → jumlah baris yang ingin dilewati (*skip*).

```sql
-- Mengambil Top 5 produk termurah
SELECT * FROM produk 
ORDER BY harga ASC 
LIMIT 5;

-- Pagination Halaman 2:
-- Ambil 5 data, tapi lewati 5 data pertama
SELECT * FROM produk 
LIMIT 5 OFFSET 5;
```

---

# Fungsi Agregasi

Fungsi agregasi melakukan perhitungan pada sekumpulan nilai dan mengembalikan satu nilai tunggal.

| Fungsi | Kegunaan |
|---|---|
| `COUNT()` | Menghitung jumlah baris / jumlah data |
| `SUM()` | Menjumlahkan total nilai numerik |
| `AVG()` | Menghitung nilai rata-rata (*Average*) |
| `MIN()` | Mencari nilai terkecil / terendah |
| `MAX()` | Mencari nilai terbesar / tertinggi |

```sql
-- Berapa jumlah total pelanggan kita?
SELECT COUNT(id) AS total_pelanggan 
FROM pelanggan;

-- Berapa total nilai aset (stok * harga) produk kita?
SELECT SUM(harga * stok) AS total_aset 
FROM produk;

-- Berapa harga produk paling mahal?
SELECT MAX(harga) AS harga_tertinggi 
FROM produk;
```

---

# Pengelompokan Data (GROUP BY & HAVING)

Bagaimana jika kita ingin tahu:

> "Berapa jumlah produk untuk masing-masing kategori?"

Di sinilah kita menggunakan `GROUP BY`.

`GROUP BY` akan mengelompokkan baris yang memiliki nilai yang sama ke dalam baris ringkasan.

## 1. GROUP BY

Selalu dipasangkan dengan fungsi agregasi.

```sql
-- Menghitung rata-rata harga produk PER kategori
SELECT kategori, AVG(harga) AS rata_rata_harga
FROM produk
GROUP BY kategori;
```

## 2. HAVING

`HAVING` sama persis fungsinya seperti `WHERE` (untuk menyaring data), namun `HAVING` khusus digunakan untuk menyaring hasil dari fungsi agregasi / hasil `GROUP BY`.

### Aturan Penting

- `WHERE` digunakan **sebelum** data dikelompokkan.
- `HAVING` digunakan **setelah** data dikelompokkan.

```sql
-- Tampilkan kategori yang memiliki lebih dari 10 jenis produk
SELECT kategori, COUNT(id) AS jumlah_produk
FROM produk
GROUP BY kategori
HAVING COUNT(id) > 10;
```

---

# Latihan

## Latihan: Analisis Data Karyawan

Ketik dan jalankan query berikut berdasarkan asumsi kita memiliki tabel `karyawan` dengan kolom:

- `id`
- `nama`
- `departemen`
- `gaji`
- `tanggal_masuk`

```sql
-- 1. Mengambil semua data karyawan IT yang gajinya di atas 10 Juta
SELECT * FROM karyawan 
WHERE departemen = 'IT' AND gaji > 10000000;

-- 2. Mengambil 3 karyawan dengan gaji tertinggi
SELECT nama, gaji 
FROM karyawan 
ORDER BY gaji DESC 
LIMIT 3;

-- 3. Menghitung total biaya gaji per departemen
SELECT departemen, SUM(gaji) AS total_beban_gaji
FROM karyawan
GROUP BY departemen;
```

---

# Tugas Mandiri

## Challenge: Analisis Penjualan E-Commerce

Anda diberikan akses ke tabel `pesanan` dengan struktur kolom sebagai berikut:

| Kolom | Tipe Data |
|---|---|
| `id_pesanan` | `INT` |
| `nama_pembeli` | `VARCHAR` |
| `kota_tujuan` | `VARCHAR` |
| `total_belanja` | `DECIMAL` |
| `status_pesanan` | `VARCHAR` |
| `tanggal_pesanan` | `DATE` |

### Nilai `status_pesanan`

- `'Menunggu Pembayaran'`
- `'Diproses'`
- `'Dikirim'`
- `'Selesai'`
- `'Dibatalkan'`

### Instruksi

Tuliskan query SQL untuk menyelesaikan skenario berikut.  
Simpan jawaban Anda di dalam file:

```text
03_tugas_mandiri.sql
```

### Soal

#### 1. Basic SELECT & WHERE
Tampilkan `nama_pembeli` dan `total_belanja` untuk pesanan yang tujuannya ke kota `"Bandung"` dan statusnya `"Selesai"`.

#### 2. LIKE
Tampilkan semua data pesanan dari pembeli yang namanya berawalan huruf `"A"`.

#### 3. Sorting & Limiting
Pihak marketing ingin memberikan hadiah kepada 10 pembeli dengan `total_belanja` tertinggi di bulan ini.

Tampilkan 10 pesanan dengan total belanja terbesar, urutkan dari yang terbesar.

#### 4. Agregasi
Hitung berapa total pendapatan (jumlah dari `total_belanja`) untuk semua pesanan yang berstatus `"Selesai"`.

#### 5. GROUP BY & HAVING
Tampilkan daftar kota tujuan beserta jumlah pesanan yang masuk (`COUNT(id_pesanan)`) untuk masing-masing kota tersebut.

Saring datanya agar hanya menampilkan kota yang memiliki lebih dari 5 pesanan.

---

# Kriteria Penilaian

- [ ] Mampu menggunakan `WHERE` dengan kombinasi `AND` / `OR`
- [ ] Memahami cara kerja karakter wildcard `%` pada `LIKE`
- [ ] Mampu menggunakan `ORDER BY` bersamaan dengan `LIMIT`
- [ ] Tepat dalam memilih fungsi agregasi (`COUNT`, `SUM`, dll)
- [ ] Memahami perbedaan penggunaan `WHERE` dan `HAVING`

---

# Referensi

- PostgreSQL Documentation - Queries
- W3Schools SQL SELECT Statement
- SQL GROUP BY Statement

---

