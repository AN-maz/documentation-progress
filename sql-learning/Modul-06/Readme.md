# SQL - Modul 6: SQL Analitik (Window Functions, CTE, dan Views)

## Daftar Isi
1. Review Modul 5
2. Common Table Expressions (CTE)
3. Window Functions
4. Database Views (Tabel Virtual)
5. Latihan
6. Tugas Mandiri
7. Kriteria Penilaian
8. Referensi

---

# Review Modul 5

Pada modul sebelumnya kita telah mempelajari:

- Fungsi String & Angka:
  - `CONCAT`
  - `UPPER`
  - `SUBSTRING`
  - `ROUND`

- Fungsi Tanggal:
  - `EXTRACT`
  - `MONTH`
  - `DATEDIFF`

- Logika Kondisional:
  - `CASE WHEN`
  - `COALESCE`

Sekarang, kita akan masuk ke wilayah **Advanced SQL**.

Fitur-fitur ini sering menjadi syarat wajib dalam tes teknis untuk posisi:

- Backend Developer
- Data Analyst
- Data Engineer

---

# Common Table Expressions (CTE)

Jika pada Modul 4 Anda merasa Subquery bersarang (*query di dalam query*) membuat kode sulit dibaca, maka **CTE** adalah solusinya.

CTE memungkinkan kita membuat hasil query sementara yang diberi nama dan digunakan seperti tabel biasa.

CTE dibuat menggunakan klausa:

```sql
WITH
```

---

## Mengapa Menggunakan CTE?

### Keuntungan CTE

- Meningkatkan keterbacaan kode
- Memecah query kompleks menjadi langkah-langkah kecil
- Mirip konsep variabel pada JavaScript / React

---

## Sintaks Dasar CTE

```sql
-- Membuat CTE bernama PenjualanBulanan
WITH PenjualanBulanan AS (
    SELECT 
        bulan,
        SUM(total) AS total_pendapatan
    FROM transaksi
    GROUP BY bulan
)

-- Menggunakan CTE
SELECT 
    bulan,
    total_pendapatan
FROM PenjualanBulanan
WHERE total_pendapatan > 5000000;
```

---

## Multiple CTE

Kita juga bisa membuat lebih dari satu CTE sekaligus.

```sql
WITH CTE_Satu AS (...),
     CTE_Dua AS (...)
SELECT *
FROM CTE_Satu
JOIN CTE_Dua ON ...;
```

---

# Window Functions

Window Function adalah salah satu fitur paling powerful dalam SQL.

Window Function mirip fungsi agregasi (`SUM`, `AVG`, dll), tetapi:

> Data asli tetap dipertahankan  
> dan tidak digabung menjadi satu baris.

---

## Kapan Menggunakan Window Function?

Window Function sangat berguna untuk:

- Membuat leaderboard / ranking
- Running total
- Membandingkan data sebelumnya / berikutnya
- Analisis statistik

---

# Sintaks Dasar OVER()

Kunci utama Window Function adalah:

```sql
OVER()
```

Di dalam `OVER()` biasanya terdapat:

- `PARTITION BY`
- `ORDER BY`

---

# 1. Ranking Functions

## ROW_NUMBER(), RANK(), DENSE_RANK()

Digunakan untuk memberikan nomor urut atau peringkat.

```sql
SELECT 
    nama_karyawan,
    departemen,
    gaji,

    RANK() OVER(
        PARTITION BY departemen
        ORDER BY gaji DESC
    ) AS peringkat_gaji

FROM karyawan;
```

---

## Perbedaan Ranking Functions

| Function | Contoh Hasil |
|---|---|
| `ROW_NUMBER()` | 1, 2, 3, 4 |
| `RANK()` | 1, 2, 2, 4 |
| `DENSE_RANK()` | 1, 2, 2, 3 |

### Penjelasan

- `ROW_NUMBER()`  
  Selalu unik dan berurutan.

- `RANK()`  
  Jika ada nilai sama, ranking berikutnya dilewati.

- `DENSE_RANK()`  
  Jika ada nilai sama, ranking berikutnya tidak dilewati.

---

# 2. LEAD() dan LAG()

Digunakan untuk mengambil data dari:

- Baris sebelumnya (`LAG`)
- Baris sesudahnya (`LEAD`)

Sangat berguna untuk membandingkan data antar periode.

```sql
SELECT 
    bulan,
    pendapatan_saat_ini,

    LAG(pendapatan_saat_ini)
    OVER(ORDER BY bulan) AS pendapatan_bulan_lalu

FROM rekap_pendapatan;
```

---

# Database Views (Tabel Virtual)

VIEW adalah tabel virtual yang berasal dari hasil query.

Daripada menulis query JOIN panjang berulang kali, kita bisa menyimpannya sebagai `VIEW`.

---

# Membuat dan Menggunakan VIEW

```sql
-- Membuat VIEW
CREATE VIEW Laporan_Penjualan_Aktif AS

SELECT 
    p.nama_produk,
    k.nama_kategori,
    p.harga

FROM produk p

JOIN kategori k 
    ON p.kategori_id = k.id

WHERE p.status = 'Aktif';
```

---

## Menggunakan VIEW

```sql
SELECT *
FROM Laporan_Penjualan_Aktif
WHERE harga > 100000;
```

VIEW digunakan sama seperti tabel biasa.

---

# Keuntungan VIEW

## 1. Keamanan

Pengguna hanya dapat melihat data tertentu tanpa akses langsung ke tabel asli.

---

## 2. Reusability

Tidak perlu menulis ulang query panjang.

---

# Latihan

# Latihan: Menggabungkan CTE dan Window Function

Kita ingin mencari:

> 3 karyawan dengan gaji tertinggi di setiap departemen

Dengan SQL biasa, query ini cukup rumit.

Dengan CTE + Window Function menjadi jauh lebih mudah.

```sql
-- 1. Buat CTE untuk memberi ranking
WITH PeringkatKaryawan AS (

    SELECT 
        nama,
        departemen,
        gaji,

        DENSE_RANK() OVER(
            PARTITION BY departemen
            ORDER BY gaji DESC
        ) AS ranking

    FROM karyawan
)

-- 2. Ambil hanya ranking 1 sampai 3
SELECT *
FROM PeringkatKaryawan
WHERE ranking <= 3;
```

---

# Tugas Mandiri

# Challenge: Analitik Sistem Manajemen Pembelajaran (LMS) UKM OXIGEN

Sebagai bagian dari pengembangan LMS untuk UKM OXIGEN, Divisi Software membutuhkan laporan analitik aktivitas anggota.

Database terdiri dari tabel:

| Tabel | Kolom |
|---|---|
| `users` | `id`, `nama_lengkap`, `divisi` |
| `modul_materi` | `id`, `judul_materi`, `kategori` |
| `riwayat_belajar` | `id`, `user_id`, `modul_id`, `tanggal_selesai`, `skor` |

---

# Instruksi

Tuliskan query SQL untuk menyelesaikan skenario berikut.

Simpan jawaban dalam file:

```text
06_tugas_mandiri.sql
```

---

# Soal

---

## 1. VIEW

Buat sebuah VIEW bernama:

```sql
Rekap_Nilai_Anggota
```

VIEW harus melakukan JOIN pada ketiga tabel untuk menampilkan:

- `nama_lengkap`
- `divisi`
- `judul_materi`
- `skor`

---

## 2. CTE & Agregasi

Gunakan:

```sql
WITH
```

untuk menghitung rata-rata skor per divisi.

Nama CTE:

```sql
RataRataDivisi
```

Kemudian tampilkan hanya divisi dengan rata-rata skor di atas `80`.

---

## 3. Window Function - Leaderboard

Buat sistem leaderboard bulanan.

Tampilkan:

- Nama lengkap anggota
- Total skor
- Ranking (`RANK()`)

Urutkan dari skor tertinggi ke terendah.

---

## 4. Tantangan Sulit - PARTITION BY

Buat laporan yang menampilkan:

> Skor terbaik (`MAX`) yang pernah dicapai setiap anggota

Tetapi:

- Wajib menggunakan:
  
```sql
OVER(PARTITION BY user_id)
```

- Tidak boleh menggunakan:
  
```sql
GROUP BY
```

---

# Kriteria Penilaian

- [ ] Mampu menulis dan memanggil CTE
- [ ] Memahami penggunaan `OVER()` dan `PARTITION BY`
- [ ] Memahami perbedaan Agregasi biasa vs Window Function
- [ ] Mampu membuat dan menggunakan VIEW

---

# Referensi

- PostgreSQL Window Functions
- MySQL CTEs (Common Table Expressions)
- W3Schools SQL CREATE VIEW Statement