import 'package:intl/intl.dart';

/// Helper format tanggal bergaya Indonesia, dipakai lintas layar.
///
/// Dibuat "tahan banting": jika locale `id_ID` belum ter-initialize
/// (mis. lupa memanggil `initializeDateFormatting`, atau platform tertentu),
/// otomatis fallback ke format default tanpa melempar exception.
class Formatters {
  static bool _idReady = false;

  /// Dipanggil sekali setelah `initializeDateFormatting('id_ID')` berhasil.
  static void markIdReady() => _idReady = true;

  static DateFormat _long() => _idReady
      ? DateFormat('d MMMM yyyy', 'id_ID')
      : DateFormat('d MMMM yyyy');

  static DateFormat _short() =>
      _idReady ? DateFormat('d MMM yyyy', 'id_ID') : DateFormat('d MMM yyyy');

  static String long(DateTime date) => _long().format(date);
  static String short(DateTime date) => _short().format(date);

  static String relative(DateTime date) {
    final diff = DateTime.now().difference(date);
    if (diff.inDays > 30) return short(date);
    if (diff.inDays > 0) return '${diff.inDays} hari lalu';
    if (diff.inHours > 0) return '${diff.inHours} jam lalu';
    if (diff.inMinutes > 0) return '${diff.inMinutes} menit lalu';
    return 'baru saja';
  }
}
