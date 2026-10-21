// Referensi jawaban — Project 5 (Analisis Data Nilai Kelas).
// Jalankan:
//   dart run lab/05-collections/solusi/analisis_nilai_kelas.dart

String predikatDari(double nilai) {
  if (nilai >= 85) return 'A';
  if (nilai >= 75) return 'B';
  if (nilai >= 65) return 'C';
  return 'D';
}

void main() {
  // 1. Nested collection: data mahasiswa (List berisi Map)
  final List<Map<String, dynamic>> mahasiswa = [
    {'nama': 'Purwa', 'kelas': 'A', 'nilai': 88},
    {'nama': 'Budi', 'kelas': 'A', 'nilai': 76},
    {'nama': 'Sinta', 'kelas': 'B', 'nilai': 92},
    {'nama': 'Rizky', 'kelas': 'B', 'nilai': 68},
    {'nama': 'Dewi', 'kelas': 'C', 'nilai': 81},
  ];

  print('=== ANALISIS DATA NILAI KELAS ===');
  print('Jumlah data     : ${mahasiswa.length}');

  // 2. Ranking: sort by nilai (menurun) tanpa mengubah data asli
  final ranking = List<Map<String, dynamic>>.from(mahasiswa)
    ..sort((a, b) => (b['nilai'] as num).compareTo(a['nilai'] as num));

  print('');
  print('--- RANKING ---');
  for (int i = 0; i < ranking.length; i++) {
    final m = ranking[i];
    final double nilai = (m['nilai'] as num).toDouble();
    print(
      '${i + 1}. ${m['nama']} (${m['kelas']}) - ${nilai.toStringAsFixed(0)}',
    );
  }

  // 3. Statistik: rata-rata, tertinggi, terendah
  final List<double> semuaNilai =
      mahasiswa.map((m) => (m['nilai'] as num).toDouble()).toList();

  final double rataRata =
      semuaNilai.reduce((a, b) => a + b) / semuaNilai.length;
  final double tertinggi = semuaNilai.reduce((a, b) => a > b ? a : b);
  final double terendah = semuaNilai.reduce((a, b) => a < b ? a : b);

  print('');
  print('--- STATISTIK ---');
  print('Rata-rata       : ${rataRata.toStringAsFixed(2)}');
  print('Nilai tertinggi  : ${tertinggi.toStringAsFixed(0)}');
  print('Nilai terendah  : ${terendah.toStringAsFixed(0)}');

  // 4. Lulus / tidak lulus (where)
  final lulus = mahasiswa.where((m) => (m['nilai'] as num) >= 65).toList();
  final tidakLulus = mahasiswa.where((m) => (m['nilai'] as num) < 65).toList();

  print('Mahasiswa lulus  : ${lulus.length}');
  print('Belum lulus      : ${tidakLulus.length}');

  // 5. Rekap per predikat (Map<String, int>)
  final Map<String, int> rekapPredikat = {};
  for (final m in mahasiswa) {
    final double nilai = (m['nilai'] as num).toDouble();
    final String predikat = predikatDari(nilai);
    rekapPredikat[predikat] = (rekapPredikat[predikat] ?? 0) + 1;
  }

  print('');
  print('--- REKAP PER PREDIKAT ---');
  for (final entry in rekapPredikat.entries) {
    print('Predikat ${entry.key} : ${entry.value} mahasiswa');
  }

  // 6. Nested collection: nilai per kelas (Map<String, List<int>>)
  final Map<String, List<double>> nilaiPerKelas = {};
  for (final m in mahasiswa) {
    final String kelas = m['kelas'] as String;
    final double nilai = (m['nilai'] as num).toDouble();
    nilaiPerKelas.putIfAbsent(kelas, () => []).add(nilai);
  }

  print('');
  print('--- RATA-RATA PER KELAS ---');
  for (final entry in nilaiPerKelas.entries) {
    final double rataKelas =
        entry.value.reduce((a, b) => a + b) / entry.value.length;
    print('Kelas ${entry.key} : ${rataKelas.toStringAsFixed(2)}');
  }

  // 7. Set: kelas unik yang ada
  final Set<String> kelasUnik =
      mahasiswa.map((m) => m['kelas'] as String).toSet();

  print('');
  print('--- KELAS UNIK (Set) ---');
  print('Ada ${kelasUnik.length} kelas: ${kelasUnik.join(', ')}');
}
