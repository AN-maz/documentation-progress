import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/date_symbol_data_local.dart';

import 'app/app.dart';
import 'core/formatters.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Data lokal id_ID untuk format tanggal Indonesia.
  await initializeDateFormatting('id_ID', null);
  Formatters.markIdReady();
  runApp(const ProviderScope(child: LmsApp()));
}
