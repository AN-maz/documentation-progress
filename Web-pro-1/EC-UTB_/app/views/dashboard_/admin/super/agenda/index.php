<main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full">

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Agenda Management</h1>
            <p class="text-gray-500 mt-1">Kelola jadwal pertemuan, materi, dan token absensi.</p>
        </div>
        <button onclick="document.getElementById('addAgendaModal').classList.remove('hidden')"
            class="bg-ec-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors shadow-lg flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Buat Agenda
        </button>
    </div>

    <div class="my-4">
        <?php Flasher::flash(); ?>
    </div>

    <div class="grid grid-cols-1 gap-6">
        <?php if (empty($data['agenda_list'])): ?>
            <div class="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900">Belum ada agenda</h3>
                <p class="text-gray-500">Silakan buat agenda baru untuk memulai absensi.</p>
            </div>
        <?php else: ?>
            <?php foreach ($data['agenda_list'] as $agenda): ?>
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                    <div class="flex-shrink-0 text-center bg-blue-50 text-ec-blue rounded-lg p-4 min-w-[80px]">
                        <span class="block text-2xl font-bold"><?= date('d', strtotime($agenda['tanggal'])); ?></span>
                        <span class="block text-xs uppercase font-bold tracking-wider"><?= date('M', strtotime($agenda['tanggal'])); ?></span>
                    </div>

                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-1">
                            <h3 class="text-xl font-bold text-gray-900"><?= $agenda['judul']; ?></h3>
                            <?php if ($agenda['status'] == 'buka'): ?>
                                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">BUKA</span>
                            <?php else: ?>
                                <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">TUTUP</span>
                            <?php endif; ?>
                        </div>
                        <div class="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <?= date('H:i', strtotime($agenda['waktu_mulai'])); ?> WIB
                            </div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <?= $agenda['lokasi']; ?>
                            </div>
                            <?php if ($agenda['file_materi']): ?>
                                <div class="flex items-center gap-1 text-purple-600">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    Ada Materi
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 w-full md:w-auto">
                        <a href="<?= BASEURL; ?>/super/Agenda/detail/<?= $agenda['id_agenda']; ?>"
                            class="flex-1 md:flex-none text-center px-4 py-2 border border-ec-blue text-ec-blue rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Manage & Token
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>

</main>
</div>

<div id="addAgendaModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-900">Buat Agenda Baru</h3>
            <button onclick="document.getElementById('addAgendaModal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        <form action="<?= BASEURL; ?>/super/Agenda/add" method="POST" enctype="multipart/form-data" class="p-6 space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Judul Kegiatan</label>
                <input type="text" name="judul" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue" required placeholder="Contoh: Weekly Meeting #5">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <input type="date" name="tanggal" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Waktu Mulai</label>
                    <input type="time" name="waktu_mulai" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue" required>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input type="text" name="lokasi" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue" required placeholder="Contoh: Ruang 301 / Google Meet">
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea name="deskripsi" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue" placeholder="Agenda membahas tentang..."></textarea>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">File Materi (.md)</label>
                <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:bg-gray-50 hover:border-ec-blue rounded-lg cursor-pointer transition-colors">
                        <div class="flex flex-col items-center justify-center pt-7">
                            <svg class="w-8 h-8 text-gray-400 group-hover:text-ec-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Attach Markdown file (Optional)</p>
                        </div>
                        <input type="file" name="file_materi" class="opacity-0" accept=".md" />
                    </label>
                </div>
            </div>

            <div class="pt-4">
                <button type="submit" class="w-full bg-ec-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors">
                    Create Agenda & Generate Token
                </button>
            </div>
        </form>
    </div>
</div>