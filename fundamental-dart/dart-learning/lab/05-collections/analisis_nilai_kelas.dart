// Project 5 — Analisis Data Nilai Kelas
//
// Ikuti ketentuan pada lab/05-collections/README.md.
//
// TODO:
// 1. Siapkan data List<Map<String, dynamic>> (nama, kelas, nilai).
// 2. Tampilkan ranking (urutkan nilai menurun, tanpa mengubah data asli).
// 3. Hitung statistik: rata-rata, nilai tertinggi, nilai terendah.
// 4. Hitung jumlah lulus (>= 65) dan belum lulus memakai where().
// 5. Buat rekap Map<String, int> untuk jumlah mahasiswa per predikat.
// 6. Buat Map<String, List<double>> berisi nilai per kelas, lalu hitung
//    rata-rata tiap kelas.
// 7. Gunakan Set untuk menampilkan daftar kelas unik.
//
// Petunjuk:
// - map() mengubah, where() menyaring, reduce() menjumlahkan.
// - List.from() dipakai supaya sort() tidak mengubah data asli.

void main() {
  final List<Map<String, dynamic>> mahasiswa = [
    {'nama': 'Purwa', 'kelas': 'A', 'nilai': 88},
    {'nama': 'Budi', 'kelas': 'A', 'nilai': 76},
    {'nama': 'Sinta', 'kelas': 'B', 'nilai': 92},
    {'nama': 'Rizky', 'kelas': 'B', 'nilai': 68},
    {'nama': 'Dewi', 'kelas': 'C', 'nilai': 81},
  ];

  print('=== ANALISIS DATA NILAI KELAS ===');
  print('Jumlah data     : ${mahasiswa.length}');

  // TODO: mulai di sini
}
