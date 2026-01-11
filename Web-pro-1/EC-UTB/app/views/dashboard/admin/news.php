<body class="bg-gray-50">

    <!-- Include Modern Mobile Navbar -->
    <?php require_once '../app/views/templates/tempDashAdmin/mobileNav.php'; ?>

    <div class="flex min-h-screen pt-0">

        <?php require_once '../app/views/templates/tempDashAdmin/sidebar.php'; ?>


        <!-- Main Content -->
        <main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 min-h-screen w-full">

                <div class="flex justify-between items-center mb-6">
                        <h1 class="text-3xl font-bold text-gray-900">News Management</h1>
                        <button onclick="document.getElementById('addNewsModal').classList.remove('hidden')" class="bg-ec-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                            + Tambah News
                        </button>
                    </div>

                    <div class="my-4">
                        <?php Flasher::flash(); ?>
                    </div>

                    <div class="bg-white p-4 rounded-t-xl border-b border-gray-200 flex justify-end">
                        <div class="relative w-full sm:w-64">
                            <input type="text" id="searchInput"
                                class="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-ec-blue focus:border-ec-blue sm:text-sm transition duration-150 ease-in-out"
                                placeholder="Cari Berita...">
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-b-xl shadow-lg overflow-hidden">
                        <?php if (empty($data['news'])): ?>
                            <div class="p-8 text-center text-gray-500">
                                <p>Belum ada news. Tambah news pertama Anda!</p>
                            </div>
                        <?php else: ?>
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Judul</th>
                                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tanggal</th>
                                            <th class="px-6 py-4 text-right text-sm font-semibold text-gray-900">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200" id="tableBody">
                                        <?php foreach ($data['news'] as $news): ?>
                                            <tr class="table-row-item">
                                                <td class="px-6 py-4">
                                                    <div class="font-semibold text-gray-900"><?= htmlspecialchars($news['title']); ?></div>
                                                </td>
                                                <td class="px-6 py-4 text-gray-600"><?= htmlspecialchars($news['author_name'] ?? 'Unknown'); ?></td>
                                                <td class="px-6 py-4 text-gray-600"><?= date('d M Y', strtotime($news['created_at'])); ?></td>
                                                <td class="px-6 py-4 text-right">
                                                    <div class="flex justify-end gap-3">
                                                        <a href="<?= BASEURL; ?>/dashboard/editNews/<?= $news['id_post']; ?>"
                                                            class="text-blue-600 hover:text-blue-800 font-semibold">Edit</a>
                                                        <a href="<?= BASEURL; ?>/dashboard/deleteNews/<?= $news['id_post']; ?>"
                                                            onclick="return confirm('Yakin ingin menghapus news ini?')"
                                                            class="text-red-600 hover:text-red-800 font-semibold">Hapus</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                            <div class="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                                <span class="text-sm text-gray-500">
                                    Showing <span id="startRow">0</span> to <span id="endRow">0</span> of <span id="totalRows">0</span> entries
                                </span>
                                <div class="inline-flex mt-1 xs:mt-0" id="paginationBtnContainer">
                                </div>
                            </div>

                        <?php endif; ?>
                    </div>
        </main>    </div>

    <!-- Add News Modal -->
    <div id="addNewsModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900">Tambah News</h2>
            </div>
            <form action="<?= BASEURL; ?>/dashboard/addNews" method="POST" enctype="multipart/form-data" class="p-6">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                        <input type="text" name="judul" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Konten</label>
                        <textarea name="konten" rows="6" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue"></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Waktu Publikasi</label>
                        <input type="datetime-local" name="created_at"
                            value="<?= date('Y-m-d\TH:i'); ?>"
                            required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
                        <p class="text-xs text-gray-500 mt-1">Format: Tanggal dan Waktu berita ini diterbitkan.</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Gambar (opsional)</label>
                        <input type="file" name="gambar" accept="image/*" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
                        <p class="text-xs text-gray-500 mt-1">Format: JPEG, PNG, GIF, WebP (Max: 5MB)</p>
                    </div>
                </div>
                <div class="flex gap-4 mt-6">
                    <button type="submit" class="flex-1 bg-ec-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                        Simpan
                    </button>
                    <button type="button" onclick="document.getElementById('addNewsModal').classList.add('hidden')" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="<?= BASEURL; ?>/js/simple-pagination.js"></script>

</body>

</html>
