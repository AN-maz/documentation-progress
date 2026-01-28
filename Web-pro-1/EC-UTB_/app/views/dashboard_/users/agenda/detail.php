<div class="flex min-h-screen bg-gray-50">
    <main class="flex-1 p-4 sm:p-8 md:ml-64 w-full transition-all duration-300">
        
        <div class="flex items-center gap-4 mb-6 pt-16 md:pt-0">
            <a href="<?= BASEURL; ?>/dashboard/agenda" class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 text-gray-600 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            </a>
            <div>
                <h1 class="text-2xl font-bold text-gray-900"><?= htmlspecialchars($data['agenda']['judul']); ?></h1>
                <p class="text-gray-500 text-sm">Agenda Kegiatan</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white rounded-xl shadow-md p-6 border-t-4 <?= $data['sudah_absen'] ? 'border-green-500' : ($data['agenda']['status'] == 'tutup' ? 'border-red-500' : 'border-ec-blue'); ?>">

                    <h3 class="font-bold text-gray-900 text-lg mb-4">Status Kehadiran</h3>

                    <div class="mb-4">
                        <?php Flasher::flash(); ?>
                    </div>

                    <?php if ($data['sudah_absen']): ?>
                        <div class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                            <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">✓</div>
                            <h4 class="font-bold text-green-800 text-lg">Kamu Sudah Hadir!</h4>
                            <p class="text-sm text-green-600 mt-1">Dicatat pada: <br> <span class="font-mono font-semibold"><?= date('d M Y, H:i', strtotime($data['sudah_absen']['waktu_absen'])); ?></span></p>
                        </div>

                    <?php elseif ($data['agenda']['status'] == 'tutup'): ?>
                        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">✕</div>
                            <h4 class="font-bold text-red-800 text-lg">Absensi Ditutup</h4>
                            <p class="text-sm text-red-600 mt-1">Kamu melewatkan sesi absensi ini.</p>
                        </div>

                    <?php else: ?>
                        <p class="text-sm text-gray-600 mb-4">Masukkan token yang diberikan pengurus untuk mencatat kehadiran.</p>

                        <form action="<?= BASEURL; ?>/dashboard/submit_absen" method="POST">
                            <input type="hidden" name="id_agenda" value="<?= $data['agenda']['id_agenda']; ?>">

                            <div class="mb-4">
                                <input type="text" name="token"
                                    class="w-full px-4 py-3 text-center text-2xl font-mono font-bold border-2 border-gray-300 rounded-lg focus:border-ec-blue focus:ring-ec-blue uppercase tracking-widest placeholder-gray-300 transition-colors"
                                    placeholder="TOKEN" required autocomplete="off">
                            </div>

                            <button type="submit" class="w-full bg-ec-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-lg flex justify-center items-center gap-2">
                                <span>Submit Kehadiran</span>
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                            </button>
                        </form>
                    <?php endif; ?>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-6">
                    <h4 class="font-bold text-gray-900 mb-4 border-b pb-2">Detail Info</h4>
                    <div class="space-y-4 text-sm">
                        <div>
                            <span class="block text-gray-500 text-xs uppercase font-bold">Waktu</span>
                            <span class="font-medium text-gray-800"><?= date('l, d F Y', strtotime($data['agenda']['tanggal'])); ?></span>
                            <span class="block text-gray-600 text-xs mt-0.5">Pukul <?= date('H:i', strtotime($data['agenda']['waktu_mulai'])); ?> WIB</span>
                        </div>
                        <div>
                            <span class="block text-gray-500 text-xs uppercase font-bold">Lokasi</span>
                            <span class="font-medium text-gray-800"><?= htmlspecialchars($data['agenda']['lokasi']); ?></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-md min-h-[500px] flex flex-col">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                        <h2 class="text-xl font-bold text-gray-800">📖 Materi & Notulensi</h2>
                        <?php if ($data['agenda']['file_materi']): ?>
                            <a href="<?= BASEURL; ?>/materi/<?= $data['agenda']['file_materi']; ?>" target="_blank" class="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Download File
                            </a>
                        <?php endif; ?>
                    </div>

                    <div class="p-8 h-[70vh] overflow-y-auto custom-scrollbar">
                        <?php if ($data['materi_content']): ?>
                            <div class="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                                <?= $data['materi_content']; ?>
                            </div>
                        <?php else: ?>
                            <div class="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                <p class="text-lg font-medium">Belum ada materi tertulis.</p>
                                <p class="text-sm">Silakan ikuti kegiatan secara langsung.</p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

        </div>
    </main>
</div>