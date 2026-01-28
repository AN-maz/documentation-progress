<div class="flex min-h-screen bg-gray-50">
    <main class="flex-1 p-4 sm:p-8 md:ml-64 w-full transition-all duration-300">
        <div class="mb-8 pt-16 md:pt-0">
            <h1 class="text-3xl font-bold text-gray-900">Agenda Kegiatan</h1>
            <p class="text-gray-500 mt-1">Jadwal pertemuan dan materi pembelajaran umum.</p>
        </div>

        <div class="grid gap-6">
            <?php if (empty($data['agenda_list'])): ?>
                <div class="p-12 text-center text-gray-400 bg-white rounded-xl shadow-sm">
                    Belum ada agenda kegiatan saat ini.
                </div>
            <?php else: ?>
                <?php foreach ($data['agenda_list'] as $agenda): ?>
                    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">

                        <div class="flex-shrink-0 text-center bg-blue-50 text-ec-blue rounded-lg p-4 min-w-[80px] h-fit group-hover:bg-ec-blue group-hover:text-white transition-colors">
                            <span class="block text-2xl font-bold"><?= date('d', strtotime($agenda['tanggal'])); ?></span>
                            <span class="block text-xs uppercase font-bold"><?= date('M', strtotime($agenda['tanggal'])); ?></span>
                        </div>

                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <h3 class="text-xl font-bold text-gray-900"><?= htmlspecialchars($agenda['judul']); ?></h3>
                                <?php if ($agenda['status'] == 'buka'): ?>
                                    <span class="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">OPEN</span>
                                <?php else: ?>
                                    <span class="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full">CLOSED</span>
                                <?php endif; ?>
                            </div>

                            <p class="text-gray-600 text-sm mb-4 line-clamp-2"><?= htmlspecialchars($agenda['deskripsi']); ?></p>

                            <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span class="flex items-center gap-1">🕒 <?= date('H:i', strtotime($agenda['waktu_mulai'])); ?> WIB</span>
                                <span class="flex items-center gap-1">📍 <?= htmlspecialchars($agenda['lokasi']); ?></span>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <a href="<?= BASEURL; ?>/DashboardUsers/agendaDetail/<?= $agenda['id_agenda']; ?>"
                               class="w-full md:w-auto px-6 py-2 bg-white border border-ec-blue text-ec-blue font-semibold rounded-lg hover:bg-ec-blue hover:text-white transition-colors text-center shadow-sm">
                                Buka Agenda
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </main>
</div>