// Referensi jawaban — Project 3.
// Buka file ini SETELAH mencoba mengerjakan sistem_penilaian_kelas.dart sendiri.

String predikatDari(double nilai) {
  if (nilai >= 85) return 'A';
  if (nilai >= 75) return 'B';
  if (nilai >= 65) return 'C';
  return 'D';
}

void main() {
  final List<Map<String, dynamic>> mahasiswa = [
    {'nama': 'Purwa', 'nilai': 88},
    {'nama': 'Budi', 'nilai': 76},
    {'nama': 'Sinta', 'nilai': 92},
    {'nama': 'Rizky', 'nilai': 68},
  ];

  print('=== SISTEM PENILAIAN KELAS ===');
  print('Jumlah mahasiswa : ${mahasiswa.length}');

  // 1. Predikat tiap mahasiswa
  double total = 0;
  double tertinggi = 0;
  double terendah = 100;
  int jumlahLulus = 0;

  for (final m in mahasiswa) {
    final String nama = m['nama'] as String;
    final double nilai = (m['nilai'] as num).toDouble();

    total += nilai;
    if (nilai > tertinggi) tertinggi = nilai;
    if (nilai < terendah) terendah = nilai;
    if (nilai >= 65) jumlahLulus++;

    print('$nama -> ${predikatDari(nilai)}');
  }

  // 2. Ringkasan kelas
  final double rataRata = total / mahasiswa.length;
  final String predikatKelas = predikatDari(rataRata);

  print('Rata-rata kelas  : ${rataRata.toStringAsFixed(2)}');
  print('Predikat kelas   : $predikatKelas');
  print('Nilai tertinggi  : ${tertinggi.toStringAsFixed(0)}');
  print('Nilai terendah  : ${terendah.toStringAsFixed(0)}');
  print('Mahasiswa lulus  : $jumlahLulus');

  // 3. Tabel ringkasan (nested loop)
  print('');
  print('--- TABEL RINGKASAN ---');

  for (final m in mahasiswa) {
    final String nama = m['nama'] as String;
    final double nilai = (m['nilai'] as num).toDouble();

    // Loop dalam: isi setiap kolom baris ini
    final List<String> isiKolom = [
      'Nilai: ${nilai.toStringAsFixed(0)}',
      'Predikat: ${predikatDari(nilai)}',
      'Status: ${nilai >= 65 ? 'Lulus' : 'Tidak Lulus'}',
    ];

    String baris = '${nama.padRight(6)} |';
    for (final isi in isiKolom) {
      baris += ' $isi |';
    }
    print(baris);
  }
}
