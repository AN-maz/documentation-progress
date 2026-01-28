    <main class="flex-1 overflow-y-auto 
    p-4 sm:p-6 lg:p-10 
    md:pl-32 lg:pl-80 pt-0 md:pt-24">

        <div class=" flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pt-4 md:pt-0">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">News Management</h1>
                <p class="text-gray-500 mt-1">Kelola berita dan artikel organisasi.</p>
            </div>

            <button onclick="document.getElementById('addNewsModal').classList.remove('hidden')"
                class="bg-ec-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-900 transition shadow flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Tambah News
            </button>
        </div>

        <div class="mb-4">
            <?php Flasher::flash(); ?>
        </div>

        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

            <?php if (empty($data['news'])): ?>
                <div class="p-12 text-center text-gray-500">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900">Belum ada berita</h3>
                    <p class="mt-1">Mulai publikasikan berita kegiatan organisasi.</p>
                </div>
            <?php else: ?>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left" id="newsTable">
                        <thead class="bg-gray-50 border-b text-xs uppercase text-gray-700">
                            <tr>
                                <th class="px-6 py-4 font-bold text-gray-900">Judul</th>
                                <th class="px-6 py-4 font-bold text-gray-900">Author</th>
                                <th class="px-6 py-4 font-bold text-gray-900">Tanggal</th>
                                <th class="px-6 py-4 font-bold text-gray-900 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100" id="tableBody">
                            <?php foreach ($data['news'] as $news): ?>
                                <tr class="hover:bg-gray-50 transition table-row-item">
                                    <td class="px-6 py-4 font-semibold text-gray-900">
                                        <?= htmlspecialchars($news['title']); ?>
                                    </td>
                                    <td class="px-6 py-4 text-gray-600">
                                        <?= htmlspecialchars($news['author_name'] ?? 'Unknown'); ?>
                                    </td>
                                    <td class="px-6 py-4 text-gray-600 font-mono">
                                        <?= date('d M Y', strtotime($news['created_at'])); ?>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <div class="flex justify-end gap-3">
                                            <a href="<?= BASEURL; ?>/super/news/edit/<?= $news['id_post']; ?>"
                                                class="text-blue-600 hover:underline font-medium">Edit</a>
                                            <a href="<?= BASEURL; ?>/super/news/delete/<?= $news['id_post']; ?>"
                                                onclick="return confirm('Yakin ingin menghapus news ini?')"
                                                class="text-red-600 hover:underline font-medium">Hapus</a>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

                <div class="px-6 py-3 border-t bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span class="text-xs text-gray-500">
                        Showing <span id="startRow">0</span> to <span id="endRow">0</span> of <span id="totalRows">0</span> entries
                    </span>
                    <div id="paginationBtnContainer" class="inline-flex gap-1"></div>
                </div>
            <?php endif; ?>
        </div>

    </main>

    <div id="addNewsModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100">

            <div class="p-6 border-b flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-900">Tambah Berita Baru</h2>
                <button onclick="document.getElementById('addNewsModal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form action="<?= BASEURL; ?>/super/news/add" method="POST" enctype="multipart/form-data" class="p-6 space-y-5">
                <div>
                    <label class="block text-sm font-medium mb-1">Judul</label>
                    <input type="text" name="judul" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ec-blue outline-none transition-all">
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">Konten</label>
                    <textarea name="konten" rows="6" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ec-blue outline-none transition-all"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Waktu Publikasi</label>
                        <input type="datetime-local" name="created_at" value="<?= date('Y-m-d\TH:i'); ?>" required class="w-full px-4 py-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Gambar</label>
                        <input type="file" name="gambar" accept="image/*" class="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                    </div>
                </div>

                <div class="pt-4 flex gap-3 justify-end border-t">
                    <button type="button" onclick="document.getElementById('addNewsModal').classList.add('hidden')" class="px-5 py-2 border rounded-lg hover:bg-gray-50 transition-colors">Batal</button>
                    <button type="submit" class="px-5 py-2 bg-ec-blue text-white rounded-lg hover:bg-blue-900 transition-colors">Simpan</button>
                </div>
            </form>
        </div>
    </div>

    <script src="<?= BASEURL; ?>/js/simple-pagination.js"></script>