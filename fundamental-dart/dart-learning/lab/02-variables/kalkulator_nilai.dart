// Project 2 — Kalkulator Nilai Mahasiswa
//
// Ikuti ketentuan pada lab/02-variables/README.md.
//
// TODO:
// 1. Ganti data di bawah dengan data latihanmu sendiri.
// 2. Hitung rata-rata dari tiga nilai (tugas, uts, uas).
// 3. Tentukan predikat (A/B/C/D) dengan operator ternary.
// 4. Tentukan status lulus dengan batas minimal 65.
// 5. Tampilkan semuanya memakai string interpolation.
//    Rata-rata ditampilkan dengan 2 desimal (toStringAsFixed(2)).

void main() {
  String nama = 'Purwa';
  String nim = '2023001';

  double tugas = 85;
  double uts = 90;
  double uas = 88;

  // TODO: hitung rata-rata, predikat, dan status di bawah

  print('=== KALKULATOR NILAI MAHASISWA ===');
  print('Nama     : $nama');
  print('NIM      : $nim');
  print('Tugas    : ${tugas.toStringAsFixed(2)}');
  print('UTS      : ${uts.toStringAsFixed(2)}');
  print('UAS      : ${uas.toStringAsFixed(2)}');
  print('-----------------');
  // TODO: cetak rata-rata, predikat, dan status
}
