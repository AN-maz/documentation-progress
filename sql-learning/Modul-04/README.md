# SQL - Modul 4: Penggabungan Tabel (JOIN) dan Subqueries

## Daftar Isi
1. Review Modul 3
2. Mengapa Kita Butuh JOIN?
3. Jenis-Jenis JOIN
4. Mengenal Subqueries
5. Latihan
6. Tugas Mandiri
7. Kriteria Penilaian
8. Referensi

---

# Review Modul 3

Pada modul sebelumnya, kita telah menguasai cara membaca dan menganalisis data dari satu tabel:

- ✅ **DQL Dasar**: `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`
- ✅ **Operator**: `>`, `<`, `=`, `LIKE`, `IN`, `BETWEEN`
- ✅ **Agregasi & Pengelompokan**: `SUM`, `COUNT`, `AVG` beserta klausa `GROUP BY` dan `HAVING`

Namun, dalam dunia nyata, arsitektur database relasional memecah data ke dalam banyak tabel untuk menghindari duplikasi (*Normalisasi*). Di sinilah `JOIN` berperan penting.

---

# Mengapa Kita Butuh JOIN?

Bayangkan Anda memiliki tabel:

- `mahasiswa` → berisi NIM dan Nama
- `program_studi` → berisi ID dan Nama Jurusan

Di tabel `mahasiswa`, Anda hanya menyimpan `prodi_id` sebagai **Foreign Key**.

Jika menjalankan:

```sql
SELECT * FROM mahasiswa;
```

Hasilnya hanya menampilkan ID jurusan (misal: `1`), bukan nama jurusannya (`"Teknik Informatika"`).

Untuk menampilkan **Nama Mahasiswa** bersandingan dengan **Nama Jurusannya**, kita harus menggabungkan (`JOIN`) kedua tabel tersebut dalam satu query.

---

# Jenis-Jenis JOIN

SQL menggunakan logika himpunan (*diagram Venn*) untuk menggabungkan tabel. Kondisi penggabungan biasanya ditulis menggunakan klausa `ON`.

---

## 1. INNER JOIN

Menampilkan hanya data yang memiliki kecocokan di kedua tabel.

Jika ada mahasiswa yang belum punya jurusan, atau jurusan yang belum punya mahasiswa, data tersebut **tidak akan ditampilkan**.

```sql
SELECT 
    mahasiswa.nim, 
    mahasiswa.nama, 
    program_studi.nama_jurusan
FROM mahasiswa
INNER JOIN program_studi 
    ON mahasiswa.prodi_id = program_studi.id;
```

> **Catatan:**  
> Kata kunci `INNER` bersifat opsional.  
> Jika hanya menulis `JOIN`, SQL akan membacanya sebagai `INNER JOIN`.

---

## 2. LEFT JOIN (LEFT OUTER JOIN)

Menampilkan seluruh data dari tabel kiri (`FROM`), dan data yang cocok dari tabel kanan.

Jika tidak ada kecocokan di tabel kanan, nilainya akan menjadi `NULL`.

```sql
-- Menampilkan semua mahasiswa,
-- termasuk yang belum di-assign ke jurusan
SELECT 
    m.nama AS nama_mahasiswa, 
    p.nama_jurusan
FROM mahasiswa m
LEFT JOIN program_studi p 
    ON m.prodi_id = p.id;
```

### Tips Alias

Gunakan alias seperti:

- `m` → mahasiswa
- `p` → program_studi

Agar query lebih singkat dan mudah dibaca.

---

## 3. RIGHT JOIN (RIGHT OUTER JOIN)

Kebalikan dari `LEFT JOIN`.

Menampilkan seluruh data dari tabel kanan, dan data yang cocok dari tabel kiri.

```sql
-- Menampilkan semua jurusan,
-- termasuk jurusan yang belum punya mahasiswa
SELECT 
    m.nama, 
    p.nama_jurusan
FROM mahasiswa m
RIGHT JOIN program_studi p 
    ON m.prodi_id = p.id;
```

---

## 4. FULL OUTER JOIN

Menampilkan semua data dari kedua tabel, baik yang memiliki kecocokan maupun yang tidak.

```sql
-- Sintaks PostgreSQL / SQL Server
SELECT 
    m.nama, 
    p.nama_jurusan
FROM mahasiswa m
FULL OUTER JOIN program_studi p 
    ON m.prodi_id = p.id;
```

> **Catatan MySQL:**  
> MySQL tidak mendukung `FULL OUTER JOIN` secara langsung.  
> Biasanya diganti menggunakan kombinasi:
>
> ```sql
> LEFT JOIN + UNION + RIGHT JOIN
> ```

---

# Mengenal Subqueries

Subquery (*Nested Query*) adalah query yang diletakkan di dalam query lain.

Subquery sangat berguna ketika kita perlu memfilter data berdasarkan hasil perhitungan query lainnya.

---

## 1. Subquery di dalam WHERE

### Studi Kasus
Cari produk yang harganya di atas rata-rata semua produk.

```sql
SELECT nama_produk, harga 
FROM produk 
WHERE harga > (
    SELECT AVG(harga) 
    FROM produk
);
```

Subquery:

```sql
SELECT AVG(harga) FROM produk
```

akan dijalankan terlebih dahulu.

---

## 2. Subquery di dalam SELECT

Digunakan untuk membuat kolom tambahan tanpa menggunakan `JOIN`.

```sql
SELECT 
    nama_jurusan,
    (
        SELECT COUNT(nim)
        FROM mahasiswa
        WHERE prodi_id = program_studi.id
    ) AS jumlah_mahasiswa
FROM program_studi;
```

---

## 3. Subquery di dalam FROM (Derived Table)

Digunakan ketika kita ingin melakukan query terhadap hasil query lain.

```sql
SELECT rata_rata_tertinggi 
FROM (
    SELECT 
        AVG(nilai) AS rata_rata_tertinggi,
        kelas
    FROM ujian
    GROUP BY kelas
) AS tabel_nilai
WHERE rata_rata_tertinggi > 80;
```

Subquery tersebut dianggap sebagai tabel sementara (*Derived Table*).

---

# Latihan

---

## Latihan 1: JOIN Dasar dengan Alias

Kita memiliki tabel:

- `karyawan (id, nama, dept_id)`
- `departemen (id, nama_dept)`

### Soal

Tampilkan:

- Nama Karyawan
- Nama Departemen tempat dia bekerja

Gunakan:

- `INNER JOIN`
- Alias `k` untuk `karyawan`
- Alias `d` untuk `departemen`

```sql
SELECT 
    k.nama AS nama_karyawan,
    d.nama_dept AS departemen
FROM karyawan k
JOIN departemen d 
    ON k.dept_id = d.id;
```

---

## Latihan 2: LEFT JOIN untuk Mencari Data "Kosong"

### Soal

Tampilkan semua Departemen dan nama karyawannya jika ada.

Jika ada departemen yang belum memiliki karyawan, nama departemennya tetap harus tampil.

```sql
SELECT 
    d.nama_dept,
    k.nama AS nama_karyawan
FROM departemen d
LEFT JOIN karyawan k 
    ON d.id = k.dept_id;
```

---

# Tugas Mandiri

# Challenge: Laporan Kompleks E-Commerce (Multi-Table JOIN)

Database terdiri dari 3 tabel utama:

| Tabel | Kolom |
|---|---|
| `users` | `id`, `nama_lengkap`, `email` |
| `products` | `id`, `nama_produk`, `harga` |
| `orders` | `id`, `user_id`, `product_id`, `tanggal_order`, `jumlah_beli` |

---

## Instruksi

Tuliskan query SQL untuk menghasilkan laporan berikut.

Simpan jawaban Anda dalam file:

```text
04_tugas_mandiri.sql
```

---

## Soal

### 1. INNER JOIN 2 Tabel

Tampilkan:

- Nama Pelanggan (`nama_lengkap`)
- Tanggal Order (`tanggal_order`)

---

### 2. INNER JOIN 3 Tabel

Tampilkan Nota Transaksi lengkap berisi:

- Nama Pelanggan
- Nama Produk
- Harga Satuan
- Jumlah Beli

> Membutuhkan 2 kali `JOIN` dalam 1 query.

---

### 3. LEFT JOIN

Pihak marketing ingin mengetahui siapa saja pengguna yang belum pernah berbelanja.

Tampilkan:

- Nama pengguna

Gunakan:

- `LEFT JOIN`
- Filter `WHERE id_order IS NULL`

---

### 4. JOIN + Agregasi

Tampilkan laporan:

- Nama Pelanggan
- Total Belanja

Rumus:

```text
harga * jumlah_beli
```

Urutkan dari pembeli paling boros.

---

### 5. Subquery

Cari data pelanggan:

- `nama_lengkap`
- `email`

Yang pernah melakukan order dengan:

```text
jumlah_beli > 5
```

Gunakan pendekatan:

- `Subquery`
- Operator `IN`
- Klausa `WHERE`

---

# Kriteria Penilaian

- [ ] Memahami cara menggabungkan 2 tabel atau lebih menggunakan JOIN berantai
- [ ] Tepat memilih antara `INNER JOIN` dan `LEFT JOIN`
- [ ] Mampu menggabungkan `JOIN` dengan `GROUP BY`
- [ ] Mampu menulis dan memahami logika `Subquery`

---

# Referensi

- SQL Joins - W3Schools
- PostgreSQL Tutorial - Joins
- SQL Subqueries - W3Schools