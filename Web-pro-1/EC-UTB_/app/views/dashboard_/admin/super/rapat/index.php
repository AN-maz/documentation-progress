<div class="flex min-h-screen bg-gray-50">

    <main class="flex-1 p-4 sm:p-6 lg:p-8 md:ml-20 lg:ml-64 transition-all duration-300 w-full">

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-16 md:pt-0">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Rapat Internal</h1>
                <p class="text-gray-500 mt-1">Khusus Pengurus: Kelola rapat, notulensi, dan absensi manual.</p>
            </div>
            <button onclick="document.getElementById('addRapatModal').classList.remove('hidden')"
                class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors shadow-lg flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Buat Rapat
            </button>
        </div>

        <div class="my-4">
            <?php Flasher::flash(); ?>
        </div>

        <div class="grid grid-cols-1 gap-6">
            <?php if (empty($data['agenda_list'])): ?>
                <div class="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
                    <p class="text-gray-500 italic">Belum ada jadwal rapat internal.</p>
                </div>
            <?php else: ?>
                <?php foreach ($data['agenda_list'] as $agenda): ?>
                    <div class="bg-white rounded-xl p-6 shadow-sm border border-l-4 border-indigo-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">

                        <div class="flex-shrink-0 text-center bg-indigo-50 text-indigo-700 rounded-lg p-4 min-w-[80px]">
                            <span class="block text-2xl font-bold"><?= date('d', strtotime($agenda['tanggal'])); ?></span>
                            <span class="block text-xs uppercase font-bold"><?= date('M', strtotime($agenda['tanggal'])); ?></span>
                        </div>

                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-gray-900 mb-1"><?= htmlspecialchars($agenda['judul']); ?></h3>
                            <p class="text-gray-500 text-sm mb-2"><?= htmlspecialchars($agenda['deskripsi']); ?></p>
                            <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                                <span class="flex items-center gap-1">🕒 <?= date('H:i', strtotime($agenda['waktu_mulai'])); ?> WIB</span>
                                <span class="flex items-center gap-1">📍 <?= htmlspecialchars($agenda['lokasi']); ?></span>
                                <?php if ($agenda['notulensi'] || $agenda['file_materi']): ?>
                                    <span class="flex items-center gap-1 text-green-600 font-semibold">✓ Ada Notulensi</span>
                                <?php endif; ?>
                            </div>
                        </div>

                        <a href="<?= BASEURL; ?>/super/rapat/detail/<?= $agenda['id_agenda']; ?>"
                            class="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50">
                            Kelola
                        </a>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

    </main>
</div>

<div id="addRapatModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-900">Jadwalkan Rapat Internal</h3>
            <button onclick="document.getElementById('addRapatModal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form action="<?= BASEURL; ?>/super/rapat/add" method="POST" enctype="multipart/form-data" class="p-6 space-y-4">
            <input type="hidden" name="kategori" value="rapat_internal">

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Topik Rapat</label>
                <input type="text" name="judul" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required placeholder="Contoh: Rapat Evaluasi Bulanan">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <input type="date" name="tanggal" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                    <input type="time" name="waktu_mulai" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input type="text" name="lokasi" class="w-full px-4 py-2 border border-gray-300 rounded-lg" required>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea name="deskripsi" rows="2" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 class="font-bold text-gray-700 mb-2">Notulensi / Catatan Awal (Opsional)</h4>

                <div class="mb-3">
                    <label class="text-xs text-gray-500 uppercase">Tulis Langsung</label>
                    <textarea name="notulensi" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Poin-poin pembahasan..."></textarea>
                </div>

                <div>
                    <label class="text-xs text-gray-500 uppercase">Atau Upload File (.pdf/.md)</label>
                    <input type="file" name="file_materi" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                </div>
            </div>

            <div class="pt-4 flex justify-end gap-3">
                <button type="button" onclick="document.getElementById('addRapatModal').classList.add('hidden')" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Batal</button>
                <button type="submit" class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-800">
                    Buat Jadwal
                </button>
            </div>
        </form>
    </div>
</div>