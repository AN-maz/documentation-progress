# SQL - Modul 2: Data Manipulation Language (DML) dan Constraints

## Daftar Isi
1. Review Modul 1
2. Data Constraints (Integritas Data)
3. Foreign Key & Relasi Antar Tabel
4. Data Manipulation Language (DML)
5. Latihan
6. Tugas Mandiri
7. Referensi

---

# Review Modul 1

Pada pertemuan sebelumnya kita sudah belajar:

- ✅ RDBMS vs NoSQL
- ✅ Tipe Data (`INT`, `VARCHAR`, `DATE`, dll)
- ✅ DDL (*Data Definition Language*)
  - `CREATE`
  - `ALTER`
  - `DROP`
  - `TRUNCATE`

Sekarang kerangka database dan tabel kita sudah siap.

Langkah selanjutnya adalah mempelajari:
- cara menetapkan aturan ketat pada data (**Constraints**)
- cara memanipulasi isi data (**DML**)

---

# Data Constraints (Integritas Data)

Constraints adalah aturan yang diterapkan pada kolom tabel untuk membatasi jenis data yang dapat dimasukkan.

Tujuannya:
- menjaga keakuratan data
- menjaga konsistensi data
- mencegah data tidak valid masuk ke database

---

# Jenis-Jenis Constraint Utama

| Constraint | Deskripsi |
|---|---|
| `NOT NULL` | Memastikan kolom wajib diisi |
| `UNIQUE` | Memastikan semua nilai berbeda |
| `PRIMARY KEY` | Kombinasi `NOT NULL` dan `UNIQUE` |
| `CHECK` | Memastikan nilai memenuhi kondisi tertentu |
| `DEFAULT` | Memberikan nilai bawaan otomatis |

---

# Contoh Penggunaan Constraints dalam DDL

```sql
CREATE TABLE pengguna (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    umur INT CHECK (umur >= 13),
    status_aktif BOOLEAN DEFAULT TRUE
);
```

## Penjelasan

| Kolom | Penjelasan |
|---|---|
| `id` | Primary key dengan auto increment |
| `username` | Harus unik dan tidak boleh kosong |
| `umur` | Tidak boleh di bawah 13 tahun |
| `status_aktif` | Default bernilai TRUE |

---

# Foreign Key & Relasi Antar Tabel

RDBMS disebut **Relational Database** karena tabel-tabelnya dapat saling terhubung.

Hubungan antar tabel dibuat menggunakan:
```sql
FOREIGN KEY
```

Foreign Key adalah kolom pada suatu tabel yang merujuk ke:
```sql
PRIMARY KEY
```
di tabel lain.

---

# Mengapa Butuh Foreign Key?

Foreign Key membantu:
- menjaga integritas relasi data
- mencegah data yatim piatu (*orphan records*)
- memastikan referensi data valid

Contoh:
- Tidak boleh membuat pesanan untuk customer yang tidak ada.

---

# Cara Membuat Relasi

```sql
-- Tabel Induk (Parent)
CREATE TABLE program_studi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_jurusan VARCHAR(100) NOT NULL
);

-- Tabel Anak (Child)
CREATE TABLE mahasiswa (
    nim VARCHAR(15) PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    prodi_id INT,

    FOREIGN KEY (prodi_id)
    REFERENCES program_studi(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
```

---

# Penjelasan ON DELETE / ON UPDATE

| Opsi | Fungsi |
|---|---|
| `CASCADE` | Data anak ikut berubah/hapus otomatis |
| `RESTRICT` | Mencegah penghapusan data induk |
| `SET NULL` | Foreign key menjadi NULL |

---

# Data Manipulation Language (DML)

Jika DDL mengurus struktur database,
maka DML mengurus isi datanya.

Tiga perintah utama DML:

| Perintah | Fungsi |
|---|---|
| `INSERT` | Menambahkan data |
| `UPDATE` | Mengubah data |
| `DELETE` | Menghapus data |

---

# 1. Memasukkan Data (`INSERT`)

## Insert 1 Data

```sql
INSERT INTO program_studi (nama_jurusan)
VALUES ('Teknik Informatika');
```

---

## Bulk Insert (Banyak Data Sekaligus)

```sql
INSERT INTO mahasiswa (nim, nama, prodi_id)
VALUES
('24A001', 'Budi Santoso', 1),
('24A002', 'Ani Wijaya', 1),
('24A003', 'Citra Lestari', 1);
```

---

# 2. Mengubah Data (`UPDATE`)

> ⚠️ **PERINGATAN KERAS**  
> Jangan pernah menjalankan `UPDATE` tanpa `WHERE`.
>
> Jika lupa menggunakan `WHERE`,
> maka seluruh data pada tabel akan ikut berubah.

---

## Contoh UPDATE

```sql
UPDATE mahasiswa
SET nama = 'Budi Santoso S.Kom'
WHERE nim = '24A001';
```

---

## Mengubah Banyak Kolom

```sql
UPDATE mahasiswa
SET nama = 'Ani', prodi_id = 2
WHERE nim = '24A002';
```

---

# 3. Menghapus Data (`DELETE`)

> ⚠️ **PERINGATAN KERAS**  
> Sama seperti `UPDATE`,
> gunakan `WHERE`
> agar tidak menghapus seluruh isi tabel.

---

## Contoh DELETE

```sql
DELETE FROM mahasiswa
WHERE nim = '24A003';
```

---

## Menghapus Semua Data (Berbahaya)

```sql
-- DELETE FROM mahasiswa;
```

---

# Latihan

# Latihan: Sistem Manajemen Pembelajaran (LMS) Dasar

Kita akan mensimulasikan sistem LMS sederhana dengan membuat relasi antara tabel:
- `mahasiswa`
- `mata_kuliah`

---

## 1. Membuat Tabel `mata_kuliah`

```sql
CREATE TABLE mata_kuliah (
    kode_mk VARCHAR(10) PRIMARY KEY,
    nama_mk VARCHAR(100) NOT NULL,
    sks INT CHECK (sks > 0 AND sks <= 6)
);
```

---

## 2. Membuat Tabel `krs`

Tabel `krs` digunakan sebagai tabel relasi (*Many-to-Many*).

```sql
CREATE TABLE krs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim_mahasiswa VARCHAR(15),
    kode_mk VARCHAR(10),
    tanggal_ambil DATE DEFAULT (CURRENT_DATE),

    FOREIGN KEY (nim_mahasiswa)
    REFERENCES mahasiswa(nim),

    FOREIGN KEY (kode_mk)
    REFERENCES mata_kuliah(kode_mk)
);
```

---

## 3. Memasukkan Data Mata Kuliah

```sql
INSERT INTO mata_kuliah (kode_mk, nama_mk, sks)
VALUES
('TIF101', 'Algoritma Pemrograman', 3),
('TIF102', 'Basis Data Terapan', 3);
```

---

## 4. Simulasi Pengambilan Mata Kuliah

### TODO
Buat query `INSERT`
agar mahasiswa:
```sql
'24A001'
```

mengambil mata kuliah:
```sql
'TIF102'
```

---

# Tugas Mandiri

# Challenge: Seeding Data Aplikasi Makan Bergizi Gratis (MB Go)

Anda sedang mengembangkan backend untuk aplikasi distribusi makanan bernama:
```text
MB Go
```

Skema database sudah disiapkan,
namun Anda perlu:
- melakukan seeding data
- mengelola beberapa skenario operasional

---

# Jalankan DDL Berikut

```sql
CREATE TABLE penerima_manfaat (
    nik VARCHAR(16) PRIMARY KEY,
    nama_lengkap VARCHAR(100) NOT NULL,
    alamat TEXT,
    status_verifikasi BOOLEAN DEFAULT FALSE
);

CREATE TABLE distribusi_makanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nik_penerima VARCHAR(16),
    tanggal_distribusi DATE NOT NULL,
    menu VARCHAR(100) NOT NULL,
    status_pengiriman VARCHAR(20) DEFAULT 'Diproses',

    FOREIGN KEY (nik_penerima)
    REFERENCES penerima_manfaat(nik)
);
```

---

# Soal 1 — INSERT

Masukkan:
- 3 data dummy
ke tabel:
```sql
penerima_manfaat
```

---

# Soal 2 — INSERT

Masukkan:
- 2 data transaksi pembagian makanan
ke tabel:
```sql
distribusi_makanan
```

Gunakan:
- tanggal hari ini
- menu:
  - `Ayam Teriyaki`
  - `Ikan Bakar`

---

# Soal 3 — UPDATE

Salah satu penerima manfaat telah diverifikasi admin.

Buat query:
```sql
UPDATE
```

untuk mengubah:
```sql
status_verifikasi = TRUE
```

---

# Soal 4 — UPDATE

Salah satu distribusi makanan telah berhasil dikirim.

Ubah:
```sql
status_pengiriman = 'Terkirim'
```

---

# Soal 5 — DELETE

Hapus satu data dari:
```sql
penerima_manfaat
```

> ⚠️ Catatan:
>
> Pastikan penerima tersebut belum memiliki histori distribusi,
> atau akan muncul:
```text
Foreign Key Constraint Error
```

---

# Aturan Pengerjaan

- Simpan query dalam file:
```sql
02_tugas_mandiri.sql
```

- Berikan komentar:
```sql
-- komentar
```

di atas tiap query.

---

# Referensi

- [PostgreSQL Documentation - DML](https://www.postgresql.org/docs/current/dml.html)
- [W3Schools SQL INSERT INTO Statement](https://www.w3schools.com/sql/sql_insert.asp)