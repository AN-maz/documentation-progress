# SQL - Modul 1: Pengenalan dan Dasar-Dasar DDL (Data Definition Language)

## Daftar Isi
1. Pendahuluan
2. Konsep Dasar Database
3. Tipe Data Utama di SQL
4. Data Definition Language (DDL)
5. Latihan
6. Tugas Mandiri
7. Referensi

---

# Pendahuluan

## Apa itu SQL?
SQL (**Structured Query Language**) adalah bahasa standar yang digunakan untuk mengelola, menyimpan, memanipulasi, dan mengambil data di dalam database relasional (RDBMS).

## Mengapa Belajar SQL?

- **Bahasa Universal Data**  
  Digunakan oleh hampir semua perusahaan besar untuk mengelola data.

- **Dibutuhkan Banyak Peran**  
  Mulai dari Backend Developer, Data Analyst, hingga Data Scientist.

- **Efisien**  
  Mampu menangani dan mencari jutaan baris data dalam hitungan detik (jauh lebih baik dari Excel).

- **Fondasi Backend**  
  Langkah wajib sebelum menguasai ORM (*Object-Relational Mapping*) seperti Prisma atau Sequelize.

---

# Tools yang Dibutuhkan

Untuk mempraktikkan SQL, Anda membutuhkan Database Management System (DBMS). Anda bisa menggunakan salah satu dari berikut ini:

## RDBMS Engine
- MySQL
- PostgreSQL
- SQLite

## Database GUI (Client)
- DBeaver
- TablePlus
- phpMyAdmin
- Ekstensi SQL di VS Code

## Alternatif Online
- [DB Fiddle](https://db-fiddle.com)
- SQL Fiddle

---

# Konsep Dasar Database

## RDBMS vs NoSQL

Sebelum masuk ke sintaks, penting untuk memahami dua jenis database utama:

| Aspek | RDBMS (SQL) | NoSQL |
|---|---|---|
| Struktur | Tabel berelasi (Baris & Kolom) | Dokumen, Key-Value, Graph |
| Skema | Kaku / Ditetapkan di awal | Dinamis / Fleksibel |
| Contoh | MySQL, PostgreSQL, Oracle | MongoDB, Redis, Cassandra |
| Kecocokan | Data transaksi yang terstruktur dan butuh integritas tinggi | Data dalam jumlah masif yang tidak terstruktur |

Dalam modul ini dan seterusnya, kita akan berfokus penuh pada **RDBMS (SQL)**.

---

# Tipe Data Utama di SQL

Setiap kolom dalam tabel database wajib memiliki tipe data. Berikut adalah tipe data yang paling sering digunakan (mengacu pada standar MySQL/PostgreSQL):

---

## 1. Numeric (Angka)

### `INT`
Angka bulat.

Contoh:
```sql
1
100
-50
```

### `DECIMAL(m, d)`
Angka desimal presisi tinggi.

- `m` = total digit
- `d` = digit di belakang koma

Contoh:
```sql
DECIMAL(5,2)
```

Nilai maksimal:
```sql
999.99
```

Cocok digunakan untuk:
- uang
- harga
- transaksi finansial

### `FLOAT / DOUBLE`
Angka desimal dengan presisi lebih rendah dibandingkan `DECIMAL`.

---

## 2. String (Teks)

### `VARCHAR(n)`
Teks dengan panjang maksimal `n` karakter.

Contoh penggunaan:
- nama
- email
- username

### `TEXT`
Teks panjang tanpa batas karakter tertentu.

Contoh penggunaan:
- artikel
- deskripsi produk

### `CHAR(n)`
Teks dengan panjang tetap.

Contoh:
```sql
'M'
'F'
```

Cocok untuk:
- gender
- kode negara
- kode pos

---

## 3. Date & Time (Waktu)

### `DATE`
Format:
```sql
YYYY-MM-DD
```

### `TIME`
Format:
```sql
HH:MM:SS
```

### `DATETIME / TIMESTAMP`
Format:
```sql
YYYY-MM-DD HH:MM:SS
```

---

## 4. Boolean

### `BOOLEAN / BOOL`
Menyimpan nilai:
- `TRUE` (1)
- `FALSE` (0)

---

# Data Definition Language (DDL)

DDL adalah sekumpulan perintah SQL yang digunakan untuk mendefinisikan struktur atau kerangka dari database dan tabel (bukan isinya).

---

# 1. Mengelola Database

```sql
-- Membuat database baru
CREATE DATABASE nama_database;

-- Memilih database yang akan digunakan
USE nama_database;

-- Menghapus database (HATI-HATI!)
DROP DATABASE nama_database;
```

---

# 2. Membuat Tabel (`CREATE TABLE`)

Sintaks dasar untuk membuat tabel adalah mendefinisikan:
- nama tabel
- nama kolom
- tipe data
- constraints (aturan batasan)

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Penjelasan Constraints

| Constraint | Fungsi |
|---|---|
| PRIMARY KEY | Penanda unik untuk setiap baris data |
| AUTO_INCREMENT | Nilai ID bertambah otomatis |
| NOT NULL | Kolom tidak boleh kosong |
| UNIQUE | Nilai tidak boleh duplikat |
| DEFAULT | Memberikan nilai awal otomatis |

---

# 3. Mengubah Struktur Tabel (`ALTER TABLE`)

Jika tabel sudah dibuat namun kita ingin menambah, mengubah, atau menghapus kolom.

```sql
-- Menambah kolom baru
ALTER TABLE users ADD COLUMN phone_number VARCHAR(15);

-- Mengubah tipe data kolom
ALTER TABLE users MODIFY COLUMN phone_number VARCHAR(20);

-- Mengganti nama kolom
ALTER TABLE users RENAME COLUMN phone_number TO phone;

-- Menghapus kolom
ALTER TABLE users DROP COLUMN phone;
```

---

# 4. Menghapus Tabel (`DROP` & `TRUNCATE`)

```sql
-- Menghapus tabel beserta seluruh datanya secara permanen
DROP TABLE users;

-- Mengosongkan isi tabel, namun struktur tabelnya tetap ada
TRUNCATE TABLE users;
```

---

# Latihan

# Latihan 1: Membuat Database dan Tabel Biodata

Buatlah sebuah database untuk sekolah, lalu buat tabel untuk menyimpan data siswa.

```sql
-- TODO 1: Buat database bernama 'sekolah_db'
CREATE DATABASE sekolah_db;

-- TODO 2: Gunakan database tersebut
USE sekolah_db;

-- TODO 3: Buat tabel 'siswa' dengan spesifikasi:
-- - id (Integer, Primary Key, Auto Increment)
-- - nis (Varchar 10, Unik, Tidak boleh kosong)
-- - nama_lengkap (Varchar 100, Tidak boleh kosong)
-- - tanggal_lahir (Date)
-- - alamat (Text)
```

---

# Latihan 2: Memodifikasi Tabel (`ALTER`)

Ternyata pada tabel siswa di atas, kita melupakan kolom untuk menyimpan jenis kelamin dan kita ingin membatasi panjang alamat.

```sql
-- TODO 1: Tambahkan kolom 'jenis_kelamin'
-- Gunakan CHAR(1) untuk 'L' atau 'P'

-- TODO 2: Ubah tipe data 'alamat'
-- dari TEXT menjadi VARCHAR(255)

-- TODO 3: Hapus kolom 'tanggal_lahir'
```

---

# Tugas Mandiri

# Challenge: Merancang Skema Database E-Commerce Sederhana

Anda ditugaskan sebagai Database Administrator untuk membuat struktur database awal bagi sebuah toko online (E-Commerce).

Anda harus menggunakan perintah:
- `CREATE DATABASE`
- `CREATE TABLE`
- `ALTER TABLE`

untuk membangun kerangka aplikasinya.

---

# Langkah-Langkah

## 1. Buat Database

Nama database:
```sql
ecommerce_db
```

---

## 2. Buat Tabel `products`

| Kolom | Deskripsi |
|---|---|
| id | Integer, Primary Key, Auto Increment |
| sku | VARCHAR(20), UNIQUE, NOT NULL |
| nama_produk | VARCHAR(150), NOT NULL |
| deskripsi | TEXT |
| harga | DECIMAL, NOT NULL |
| stok | INT, DEFAULT 0 |

---

## 3. Buat Tabel `customers`

| Kolom | Deskripsi |
|---|---|
| id | Integer, Primary Key, Auto Increment |
| email | VARCHAR(100), UNIQUE, NOT NULL |
| nama_lengkap | VARCHAR(100), NOT NULL |
| tanggal_daftar | TIMESTAMP otomatis |

---

## 4. Modifikasi Tabel

### Tabel `customers`
Tambahkan kolom:
```sql
nomor_telepon VARCHAR(...)
```

### Tabel `products`
Ubah kolom:
```sql
deskripsi
```

menjadi:
```sql
VARCHAR(500)
```

---

# Aturan Pengerjaan

- Simpan seluruh query dalam file:
```sql
01_tugas_mandiri.sql
```

- Berikan komentar (`-- komentar`) di setiap tahapan query.

---

# Kriteria Penilaian

- [ ] Berhasil membuat database dan memilih database
- [ ] Tipe data efisien dan sesuai
- [ ] Constraints digunakan dengan tepat
- [ ] Berhasil menggunakan `ALTER TABLE`
- [ ] Sintaks SQL valid dan tidak error

---

# Bonus

- [ ] Gunakan tipe data `DECIMAL` yang tepat untuk nominal harga barang di Indonesia

---

# Referensi

- [Roadmap.sh - SQL](https://roadmap.sh/sql)
- [MySQL Data Types - W3Schools](https://www.w3schools.com/mysql/mysql_datatypes.asp)
- [PostgreSQL Documentation - DDL](https://www.postgresql.org/docs/current/ddl.html)