// Project 3 — Sistem Penilaian Kelas
//
// Ikuti ketentuan pada lab/03-conditions-loops/README.md.
//
// TODO:
// 1. Ganti data mahasiswa di bawah dengan data latihanmu sendiri.
// 2. Loop dengan for-in: cetak predikat tiap mahasiswa.
// 3. Hitung rata-rata kelas, predikat kelas, nilai tertinggi/terendah,
//    dan jumlah mahasiswa yang lulus.
// 4. Tampilkan tabel ringkasan dengan nested loop.
//
// Petunjuk:
// - Predikat: A (>= 85), B (>= 75), C (>= 65), D (< 65).
// - Rata-rata kelas ditampilkan dengan toStringAsFixed(2).

void main() {
  final List<Map<String, dynamic>> mahasiswa = [
    {'nama': 'Purwa', 'nilai': 88},
    {'nama': 'Budi', 'nilai': 76},
    {'nama': 'Sinta', 'nilai': 92},
    {'nama': 'Rizky', 'nilai': 68},
  ];

  print('=== SISTEM PENILAIAN KELAS ===');
  print('Jumlah mahasiswa : ${mahasiswa.length}');

  // TODO: 1. cetak predikat tiap mahasiswa (for-in)

  // TODO: 2. hitung rata-rata, predikat kelas, tertinggi, terendah, jumlah lulus

  print('--- TABEL RINGKASAN ---');

  // TODO: 3. tabel ringkasan dengan nested loop
}
