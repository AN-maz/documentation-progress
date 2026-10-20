// Referensi jawaban — Project 2.
// Buka file ini SETELAH mencoba mengerjakan kalkulator_nilai.dart sendiri.

void main() {
  final String nama = 'Purwa';
  final String nim = '2023001';

  final double tugas = 85;
  final double uts = 90;
  final double uas = 88;

  final double rataRata = (tugas + uts + uas) / 3;

  final String predikat = rataRata >= 85
      ? 'A'
      : rataRata >= 75
          ? 'B'
          : rataRata >= 65
              ? 'C'
              : 'D';

  final String status = rataRata >= 65 ? 'LULUS' : 'TIDAK LULUS';

  print('=== KALKULATOR NILAI MAHASISWA ===');
  print('Nama     : $nama');
  print('NIM      : $nim');
  print('Tugas    : ${tugas.toStringAsFixed(2)}');
  print('UTS      : ${uts.toStringAsFixed(2)}');
  print('UAS      : ${uas.toStringAsFixed(2)}');
  print('-----------------');
  print('Rata-rata: ${rataRata.toStringAsFixed(2)}');
  print('Predikat : $predikat');
  print('Status   : $status');
}
