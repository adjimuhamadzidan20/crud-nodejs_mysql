-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Mar 2023 pada 04.43
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kampus_cuyuniverst`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `dosen`
--

CREATE TABLE `dosen` (
  `id` int(20) NOT NULL,
  `npd` int(20) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `email` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `dosen`
--

INSERT INTO `dosen` (`id`, `npd`, `nama_lengkap`, `alamat`, `email`) VALUES
(1, 1001, 'Rahmatika M.Kom', 'Jakarta', 'rahmatika@email.com'),
(2, 1002, 'Lukman M.Kom', 'Bogor', 'lukman@email.com'),
(4, 1003, 'Dwi Dani Apriyani M.Kom', 'Jakarta', 'dwi@email.com');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(20) NOT NULL,
  `npm` int(20) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `kelas` varchar(25) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `npm`, `nama_lengkap`, `kelas`, `alamat`) VALUES
(1, 1901, 'Adji', 'R8X', 'Bekasi'),
(2, 1902, 'Husen', 'R8X', 'Bogor'),
(23, 1905, 'Yadi', 'R5U', 'Bekasi'),
(24, 1906, 'Ari', 'R81', 'Jakarta'),
(25, 1907, 'Rehan', 'R6T', 'Bekasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `matkul`
--

CREATE TABLE `matkul` (
  `id` int(20) NOT NULL,
  `matakuliah` varchar(100) NOT NULL,
  `prodi` varchar(50) NOT NULL,
  `sks` int(25) NOT NULL,
  `semester` int(25) NOT NULL,
  `dosen_pengajar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `matkul`
--

INSERT INTO `matkul` (`id`, `matakuliah`, `prodi`, `sks`, `semester`, `dosen_pengajar`) VALUES
(1, 'Pemrograman Web', 'Informatika', 3, 5, 'Rahmatika M.Kom'),
(3, 'Sistem Informasi', 'Informatika', 4, 3, 'Dwi Dani Apriyani M.Kom'),
(4, 'Rekayasa Perangkat Lunak', 'Informatika', 3, 7, 'Millati Izzatilah M.Kom'),
(6, 'Keamanan Komputer', 'Informatika', 3, 7, 'Han Sulaiman M.Kom');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `npd` (`npd`);

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `npm` (`npm`);

--
-- Indeks untuk tabel `matkul`
--
ALTER TABLE `matkul`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `dosen`
--
ALTER TABLE `dosen`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `matkul`
--
ALTER TABLE `matkul`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
