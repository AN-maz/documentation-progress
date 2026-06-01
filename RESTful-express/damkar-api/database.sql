-- ============================================================
--  SISTEM INFORMASI DINAS PEMADAM KEBAKARAN
--  Kota Bandung - Database Setup
-- ============================================================

CREATE DATABASE IF NOT EXISTS damkar_db;
USE damkar_db;

-- ----------------------------------------------------------
-- Tabel 1: pos_pemadam
-- Menyimpan data pos / markas pemadam kebakaran
-- ----------------------------------------------------------
CREATE TABLE pos_pemadam (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nama_pos   VARCHAR(100) NOT NULL,
  wilayah    VARCHAR(100) NOT NULL,
  alamat     TEXT NOT NULL,
  no_telp    VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------
-- Tabel 2: laporan_kebakaran
-- Menyimpan data laporan kejadian kebakaran
-- ----------------------------------------------------------
CREATE TABLE laporan_kebakaran (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  no_laporan      VARCHAR(20) UNIQUE NOT NULL,
  tanggal_kejadian DATE NOT NULL,
  alamat_kejadian  TEXT NOT NULL,
  kelurahan        VARCHAR(100),
  tingkat_bahaya   ENUM('rendah', 'sedang', 'tinggi') DEFAULT 'sedang',
  status           ENUM('proses', 'selesai', 'batal') DEFAULT 'proses',
  keterangan       TEXT,
  pos_id           INT NOT NULL,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pos_id) REFERENCES pos_pemadam(id)
);

-- ----------------------------------------------------------
-- Data Dummy: Pos Pemadam
-- ----------------------------------------------------------
INSERT INTO pos_pemadam (nama_pos, wilayah, alamat, no_telp) VALUES
('Pos Utama Bandung Tengah', 'Bandung Tengah', 'Jl. Merdeka No. 1, Bandung', '022-4201113'),
('Pos Bandung Barat',        'Bandung Barat',  'Jl. Pasteur No. 45, Bandung', '022-6120211'),
('Pos Bandung Timur',        'Bandung Timur',  'Jl. AH. Nasution No. 12, Bandung', '022-7800123'),
('Pos Bandung Selatan',      'Bandung Selatan','Jl. Soekarno Hatta No. 78, Bandung', '022-5201456');

-- ----------------------------------------------------------
-- Data Dummy: Laporan Kebakaran
-- ----------------------------------------------------------
INSERT INTO laporan_kebakaran (no_laporan, tanggal_kejadian, alamat_kejadian, kelurahan, tingkat_bahaya, status, keterangan, pos_id) VALUES
('LAP-2024-001', '2024-01-15', 'Jl. Braga No. 23, Bandung',         'Braga',       'tinggi',  'selesai', 'Kebakaran ruko 2 lantai, berhasil dipadamkan dalam 2 jam', 1),
('LAP-2024-002', '2024-02-03', 'Jl. Cihampelas No. 88, Bandung',    'Cipaganti',   'sedang',  'selesai', 'Kebakaran dapur akibat kompor meledak', 2),
('LAP-2024-003', '2024-03-20', 'Jl. Gedebage No. 5, Bandung',       'Gedebage',    'tinggi',  'selesai', 'Kebakaran gudang pabrik', 3),
('LAP-2024-004', '2024-04-10', 'Jl. Buah Batu No. 101, Bandung',    'Buah Batu',   'rendah',  'selesai', 'Kebakaran semak belukar', 4),
('LAP-2024-005', '2024-05-18', 'Jl. Dago No. 56, Bandung',          'Dago',        'sedang',  'selesai', 'Korsleting listrik pada rumah warga', 1),
('LAP-2024-006', '2024-06-22', 'Jl. Pasteur No. 12, Bandung',       'Pasteur',     'tinggi',  'selesai', 'Kebakaran SPBU, 3 unit dikerahkan', 2),
('LAP-2024-007', '2024-07-30', 'Jl. Soekarno Hatta No. 200',        'Batununggal', 'sedang',  'selesai', 'Kebakaran konveksi', 4),
('LAP-2024-008', '2024-11-05', 'Jl. Antapani No. 34, Bandung',      'Antapani',    'rendah',  'proses',  'Kebakaran lahan kosong, masih dalam penanganan', 3),
('LAP-2024-009', '2024-11-18', 'Jl. Riau No. 9, Bandung',           'Citarum',     'tinggi',  'proses',  'Kebakaran gedung perkantoran', 1),
('LAP-2024-010', '2024-12-01', 'Jl. Kebon Jati No. 77, Bandung',    'Kebon Jeruk', 'sedang',  'proses',  'Kebakaran warung makan', 2);
