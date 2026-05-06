# 🗄️ Panduan Komprehensif SQL: Dari Dasar hingga Mahir

Selamat datang di repositori **SQL Learning Modules**. Repositori ini berisi panduan terstruktur, latihan terbimbing, dan studi kasus praktis yang dirancang untuk membangun pemahaman database relasional (RDBMS) yang sangat kuat. 

Penguasaan SQL murni adalah fondasi krusial sebelum melangkah ke pengembangan sistem yang lebih kompleks. Baik itu saat membangun *backend* menggunakan Node.js dan mengelola *database* melalui ORM seperti Prisma, maupun saat mendesain arsitektur API yang nantinya dikonsumsi oleh aplikasi Android menggunakan Retrofit. Repositori ini memastikan Anda memahami apa yang terjadi di "balik layar" pemrosesan data.

---

## Tujuan Pembelajaran

Repositori ini disusun ke dalam **7 Modul Utama** dengan tingkat kesulitan yang meningkat secara bertahap. Melalui repositori ini, Anda akan mampu:
- Merancang skema database yang efisien dan ternormalisasi.
- Menjaga integritas data melalui implementasi *Constraints* dan *Foreign Keys*.
- Menulis *query* pengambilan data dari tingkat dasar hingga analitik kompleks.
- Mengelola keamanan operasi database melalui sistem *Transaction* (ACID) dan *Indexing*.

---

## 📚 Daftar Modul

Berikut adalah ringkasan dari setiap modul yang ada di dalam repositori ini:

### [Modul 1: Pengenalan & Data Definition Language (DDL)](./Modul-01-Dasar-dan-DDL/)
Membahas konsep dasar RDBMS, tipe data, dan perintah untuk membangun kerangka database.
- **Materi Fokus:** `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.
- **Studi Kasus:** Merancang skema tabel awal untuk sistem E-Commerce.

### [Modul 2: Data Manipulation Language (DML) & Constraints](./Modul-02-DML-dan-Constraints/)
Fokus pada pengisian data, relasi antar tabel, dan penerapan aturan ketat untuk menghindari anomali data.
- **Materi Fokus:** `INSERT`, `UPDATE`, `DELETE`, `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`.
- **Studi Kasus:** Melakukan *seeding* data awal dan simulasi operasional untuk aplikasi distribusi.

### [Modul 3: Pengambilan Data Dasar & Agregasi (DQL)](./Modul-03-Pengambilan-Data-dan-Agregasi/)
Belajar bagaimana menarik, menyaring, dan merangkum data menjadi sebuah laporan informasi.
- **Materi Fokus:** `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `SUM()`, `COUNT()`, `GROUP BY`, `HAVING`.
- **Studi Kasus:** Menganalisis laporan penjualan E-Commerce berdasarkan filter spesifik dan rentang tanggal.

### [Modul 4: Penggabungan Tabel (JOIN) & Subqueries](./Modul-04-JOIN-dan-Subqueries/)
Materi esensial untuk menarik data yang terpecah di banyak tabel relasional tanpa mengorbankan performa.
- **Materi Fokus:** `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, dan *Nested Queries* (Subquery).
- **Studi Kasus:** Membuat laporan multi-tabel untuk mencetak nota transaksi pelanggan secara lengkap.

### [Modul 5: Fungsi Bawaan & Logika Kondisional](./Modul-05-Fungsi-dan-Kondisional/)
Memanipulasi dan memformat *output* data secara langsung di tingkat database.
- **Materi Fokus:** String Functions (`CONCAT`, `UPPER`), Date Functions, `CASE WHEN`, dan `COALESCE`.
- **Studi Kasus:** Membersihkan data *null* dan membuat sistem *tiering/membership* otomatis.

### [Modul 6: SQL Analitik Lanjut](./Modul-06-SQL-Analitik/)
Teknik *Advanced SQL* untuk kebutuhan pembuatan laporan analitik tingkat lanjut dan penyederhanaan *query* yang panjang.
- **Materi Fokus:** Common Table Expressions (CTE), Window Functions (`RANK()`, `OVER()`, `PARTITION BY`), dan Database `VIEW`.
- **Studi Kasus:** Membangun *leaderboard* skor dan merekapitulasi riwayat evaluasi pengguna pada sebuah Learning Management System (LMS).

### [Modul 7: Transaksi, Indexing, & Keamanan](./Modul-07-Transaksi-dan-Keamanan/)
Praktik standar industri untuk membuat aplikasi yang *production-ready*, cepat, dan aman dari kegagalan proses.
- **Materi Fokus:** Konsep ACID, `START TRANSACTION`, `COMMIT`, `ROLLBACK`, `CREATE INDEX`, dan DCL (`GRANT`/`REVOKE`).
- **Studi Kasus:** Mengamankan transaksi klaim secara *real-time* dan membatasi *privileges* akses pengguna database.

---

## 📂 Struktur Direktori Repositori

Setiap modul di dalam repositori ini diorganisasikan dengan struktur file yang konsisten agar mudah dipelajari:
```text
sql-learning-roadmap/
│
├── README.md                 # Dokumentasi utama repositori ini
│
├── Modul-01/
│   ├── README.md             # Materi pembelajaran dan penjelasan konsep Modul 1
│   ├── 01_latihan.sql        # Skrip query untuk latihan terbimbing
│   └── 02_tugas_mandiri.sql  # Solusi dan jawaban dari studi kasus mandiri
│
├── Modul-02/
│   ├── README.md
│   ├── 01_latihan.sql
│   └── 02_tugas_mandiri.sql
│
├── Modul-03/
│   └── ... (dan seterusnya)