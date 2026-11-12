import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:lms_mobile/app/app.dart';
import 'package:lms_mobile/core/formatters.dart';
import 'package:lms_mobile/core/mock_database.dart';
import 'package:lms_mobile/core/repository.dart';

/// Helper: login lewat UI supaya state auth ter-set.
Future<void> _login(WidgetTester tester, {bool admin = false}) async {
  await tester.pumpWidget(const ProviderScope(child: LmsApp()));
  await tester.pumpAndSettle();

  await tester.tap(find.text(admin ? 'Admin' : 'Learner'));
  await tester.pumpAndSettle();
  await tester.tap(find.text('Masuk'));
  await tester.pumpAndSettle(const Duration(seconds: 2));
}

void main() {
  setUpAll(() async {
    await initializeDateFormatting('id_ID', null);
    Formatters.markIdReady();
  });

  testWidgets('Alur learner: login -> dashboard -> katalog', (tester) async {
    await _login(tester);

    // Setelah login, dashboard learner tampil.
    expect(find.textContaining('Selamat datang'), findsOneWidget);

    // Buka tab Eksplorasi (katalog).
    await tester.tap(find.text('Eksplorasi'));
    await tester.pumpAndSettle(const Duration(seconds: 2));
    expect(find.textContaining('Cari materi'), findsOneWidget);
  });

  testWidgets('Alur learner: buka detail materi dari katalog', (tester) async {
    await _login(tester);
    await tester.tap(find.text('Eksplorasi'));
    await tester.pumpAndSettle(const Duration(seconds: 2));

    final firstCard = find.text('Bahasa Inggris untuk Pemula');
    expect(firstCard, findsWidgets);
    await tester.tap(firstCard.first);
    await tester.pumpAndSettle(const Duration(seconds: 2));

    expect(find.text('Detail Materi'), findsOneWidget);
    expect(find.textContaining('Klaim EXP'), findsOneWidget);
  });

  testWidgets('Alur admin: login -> dashboard -> moderasi', (tester) async {
    await _login(tester, admin: true);

    // Admin landing di dashboard admin.
    expect(find.textContaining('Admin Console'), findsWidgets);

    await tester.tap(find.text('Moderasi'));
    await tester.pumpAndSettle(const Duration(seconds: 2));
    expect(find.textContaining('Cari judul'), findsOneWidget);
  });

  testWidgets('Alur admin: buka review materi', (tester) async {
    await _login(tester, admin: true);
    await tester.tap(find.text('Moderasi'));
    await tester.pumpAndSettle(const Duration(seconds: 2));

    await tester.tap(find.text('Docker untuk Developer').first);
    await tester.pumpAndSettle(const Duration(seconds: 2));

    expect(find.text('Review Materi'), findsOneWidget);
  });

  testWidgets('Alur admin: kelola kategori', (tester) async {
    await _login(tester, admin: true);
    await tester.tap(find.text('Kategori'));
    await tester.pumpAndSettle(const Duration(seconds: 2));

    expect(find.text('Kelola Kategori'), findsWidgets);
    expect(find.text('Teknologi & Pemrograman'), findsWidgets);
  });

  testWidgets('Alur learner: leaderboard', (tester) async {
    await _login(tester);
    await tester.tap(find.text('Peringkat'));
    await tester.pumpAndSettle(const Duration(seconds: 2));

    expect(find.text('Papan Peringkat'), findsOneWidget);
    expect(find.text('Sinta Dewi'), findsOneWidget);
  });

  testWidgets('Alur learner: buat materi', (tester) async {
    await _login(tester);
    // Tombol "Buat" ada di dashboard learner.
    await tester.tap(find.text('Buat'));
    await tester.pumpAndSettle(const Duration(seconds: 2));

    expect(find.text('Buat Materi Baru'), findsOneWidget);
  });

  test('Integritas mock data', () {
    final db = MockDatabase.instance;
    expect(db.categories.length, 3);
    expect(db.materials.every((m) => m.author.name.isNotEmpty), true);
    expect(
      db.materials.where((m) => m.status.name == 'approved').length,
      greaterThan(0),
    );
  });
}
