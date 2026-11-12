import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:lms_mobile/app/app.dart';
import 'package:lms_mobile/core/mock_database.dart';
import 'package:lms_mobile/core/repository.dart';

void main() {
  testWidgets('Halaman login menampilkan form', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: LmsApp()));
    await tester.pumpAndSettle();

    expect(find.text('LMS Platform'), findsOneWidget);
    expect(find.text('Masuk'), findsOneWidget);
  });

  test('MockRepository: login learner berhasil', () async {
    final repo = MockRepository(MockDatabase.instance);
    final user = await repo.login(
      email: MockDatabase.demoLearnerEmail,
      password: MockDatabase.demoLearnerPassword,
    );
    expect(user.name, isNotEmpty);
    expect(user.isAdmin, false);
  });

  test('MockRepository: login dengan password salah gagal', () async {
    final repo = MockRepository(MockDatabase.instance);
    expect(
      () => repo.login(email: 'user@lms.com', password: 'salah'),
      throwsA(isA<Exception>()),
    );
  });

  test('MockRepository: katalog hanya materi approved', () async {
    final repo = MockRepository(MockDatabase.instance);
    final list = await repo.getCatalog();
    expect(list.every((m) => m.status.name == 'approved'), true);
    expect(list, isNotEmpty);
  });
}
