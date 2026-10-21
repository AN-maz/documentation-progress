// Referensi jawaban — Project 4 (Program Kasir Sederhana).
// Jalankan di terminal:
//   dart run lab/04-functions/solusi/kasir_sederhana.dart
//
// Contoh input: Kaos Polos / 85000 / 3 / 10

import 'dart:io';

String bacaTeks(String prompt) {
  stdout.write(prompt);
  return stdin.readLineSync() ?? '';
}

double bacaAngka(String prompt) {
  while (true) {
    stdout.write(prompt);
    final double? nilai = double.tryParse(stdin.readLineSync() ?? '');

    if (nilai != null) {
      return nilai;
    }
    print('Input tidak valid, coba lagi.');
  }
}

int bacaBulat(String prompt) {
  while (true) {
    stdout.write(prompt);
    final int? nilai = int.tryParse(stdin.readLineSync() ?? '');

    if (nilai != null) {
      return nilai;
    }
    print('Input tidak valid, coba lagi.');
  }
}

double hitungSubtotal(double harga, int jumlah) {
  return harga * jumlah;
}

double hitungDiskon(double subtotal, double persen) {
  return subtotal * persen / 100;
}

double hitungTotal(double subtotal, double diskon) {
  return subtotal - diskon;
}

void cetakStruk({
  required String nama,
  required double harga,
  required int jumlah,
  required double subtotal,
  required double diskon,
  required double total,
}) {
  print('==================== STRUK BELANJA ====================');
  print('Nama barang   : $nama');
  print('Harga satuan  : ${harga.toStringAsFixed(0)}');
  print('Jumlah        : $jumlah');
  print('Subtotal      : ${subtotal.toStringAsFixed(0)}');
  print('Diskon        : ${diskon.toStringAsFixed(0)}');
  print('Total         : ${total.toStringAsFixed(0)}');
  print('=======================================================');
}

void main() {
  final String nama = bacaTeks('Masukkan nama barang: ');

  double harga;
  while (true) {
    harga = bacaAngka('Masukkan harga satuan: ');
    if (harga > 0) break;
    print('Harga harus lebih dari 0.');
  }

  int jumlah;
  while (true) {
    jumlah = bacaBulat('Masukkan jumlah: ');
    if (jumlah > 0) break;
    print('Jumlah harus lebih dari 0.');
  }

  double persen;
  while (true) {
    persen = bacaAngka('Masukkan diskon (%): ');
    if (persen >= 0 && persen <= 100) break;
    print('Diskon harus antara 0 dan 100.');
  }

  final double subtotal = hitungSubtotal(harga, jumlah);
  final double diskon = hitungDiskon(subtotal, persen);
  final double total = hitungTotal(subtotal, diskon);

  cetakStruk(
    nama: nama,
    harga: harga,
    jumlah: jumlah,
    subtotal: subtotal,
    diskon: diskon,
    total: total,
  );
}
