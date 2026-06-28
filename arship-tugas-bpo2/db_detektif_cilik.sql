-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2026 at 03:40 PM
-- Server version: 10.4.32-MariaDB-log
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_detektif_cilik`
--

-- --------------------------------------------------------

--
-- Table structure for table `hak_akses`
--

CREATE TABLE `hak_akses` (
  `id_pengguna` varchar(10) NOT NULL,
  `nama` varchar(20) DEFAULT NULL,
  `level` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hak_akses`
--

INSERT INTO `hak_akses` (`id_pengguna`, `nama`, `level`) VALUES
('U001', 'Conan', 1),
('U002', 'Mitsuhiko', 1),
('U003', 'Ayumi', 2),
('U004', 'Genta', 2);

-- --------------------------------------------------------

--
-- Table structure for table `operator_kuis`
--

CREATE TABLE `operator_kuis` (
  `nama_operator` varchar(5) NOT NULL,
  `sedang_dipakai` int(1) DEFAULT 0,
  `pengguna` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `operator_kuis`
--

INSERT INTO `operator_kuis` (`nama_operator`, `sedang_dipakai`, `pengguna`) VALUES
('*', 0, NULL),
('+', 0, NULL),
('-', 0, NULL),
('/', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pengerjaan_soal`
--

CREATE TABLE `pengerjaan_soal` (
  `id_pengerjaan` int(11) NOT NULL,
  `pengguna` varchar(20) DEFAULT NULL,
  `skor` int(11) DEFAULT NULL,
  `tanggal_pengerjaan` date DEFAULT NULL,
  `jam_pengerjaan` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengerjaan_soal`
--

INSERT INTO `pengerjaan_soal` (`id_pengerjaan`, `pengguna`, `skor`, `tanggal_pengerjaan`, `jam_pengerjaan`) VALUES
(4, 'Genta', 0, '2026-06-28', '20:22:57'),
(5, 'Ayumi', 0, '2026-06-28', '20:32:02'),
(6, 'Genta', 0, '2026-06-28', '20:32:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hak_akses`
--
ALTER TABLE `hak_akses`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indexes for table `operator_kuis`
--
ALTER TABLE `operator_kuis`
  ADD PRIMARY KEY (`nama_operator`);

--
-- Indexes for table `pengerjaan_soal`
--
ALTER TABLE `pengerjaan_soal`
  ADD PRIMARY KEY (`id_pengerjaan`),
  ADD KEY `pengguna` (`pengguna`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pengerjaan_soal`
--
ALTER TABLE `pengerjaan_soal`
  MODIFY `id_pengerjaan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pengerjaan_soal`
--
ALTER TABLE `pengerjaan_soal`
  ADD CONSTRAINT `pengerjaan_soal_ibfk_1` FOREIGN KEY (`pengguna`) REFERENCES `hak_akses` (`nama`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
