import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/providers.dart';
import '../../core/theme.dart';

/// Papan peringkat berdasarkan total EXP.
class LeaderboardPage extends ConsumerWidget {
  const LeaderboardPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final board = ref.watch(leaderboardProvider);
    final me = ref.watch(authProvider).user;

    return Scaffold(
      appBar: AppBar(title: const Text('Papan Peringkat')),
      body: board.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Gagal memuat: $e')),
        data: (list) => ListView.builder(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
          itemCount: list.length,
          itemBuilder: (context, i) {
            final e = list[i];
            final isMe = e.userId == me?.id;
            final (medal, color) = switch (e.rank) {
              1 => (Icons.emoji_events, AppColors.amber),
              2 => (Icons.emoji_events, AppColors.slate400),
              3 => (Icons.emoji_events, Color(0xFFB45309)),
              _ => (Icons.circle, Theme.of(context).textTheme.bodySmall?.color ?? AppColors.slate400),
            };
            return Card(
              margin: const EdgeInsets.only(bottom: 10),
              child: Container(
                decoration: isMe
                    ? BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.primary, width: 1.5),
                      )
                    : null,
                child: ListTile(
                  leading: e.rank <= 3
                      ? Icon(medal, color: color, size: 26)
                      : CircleAvatar(
                          backgroundColor: AppColors.primary.withValues(alpha: 0.1),
                          child: Text('${e.rank}',
                              style: const TextStyle(
                                  fontWeight: FontWeight.w800, color: AppColors.primary)),
                        ),
                  title: Text(e.name,
                      style: TextStyle(
                          fontWeight: FontWeight.w700, color: isMe ? AppColors.primary : null)),
                  subtitle: Text('Level ${e.level}'),
                  trailing: Text('${e.totalExp} EXP',
                      style: const TextStyle(
                          fontWeight: FontWeight.w800, color: AppColors.amber, fontSize: 13)),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
