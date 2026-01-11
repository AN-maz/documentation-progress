<?php
require_once '../app/views/templates/tempDashAdmin/headerDashAdmin.php';
require_once '../app/views/templates/tempDashAdmin/mobileNav.php';
?>

<body class="bg-gray-50">
    <div class="flex min-h-screen pt-0">

        <?php require_once '../app/views/templates/tempDashAdmin/sidebar.php'; ?>

        <main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full">
            <div class="max-w-4xl mx-auto">

                <div class="mb-6 pt-16 lg:pt-0"> <a href="<?= BASEURL; ?>/dashboard/news" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Kembali ke News Management
                    </a>
                    <h1 class="text-3xl font-bold text-gray-900">Edit News</h1>
                </div>

                <div class="my-4">
                    <?php Flasher::flash(); ?>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-10">
                    <form action="<?= BASEURL; ?>/dashboard/editNews/<?= $data['news']['id_post']; ?>" method="POST" enctype="multipart/form-data">
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
                                <input type="text" name="judul" value="<?= htmlspecialchars($data['news']['judul'] ?? $data['news']['title']); ?>" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ec-blue focus:border-ec-blue outline-none transition-all">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Konten</label>
                                <textarea name="konten" rows="10" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ec-blue focus:border-ec-blue outline-none transition-all"><?= htmlspecialchars($data['news']['konten'] ?? $data['news']['content']); ?></textarea>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Gambar Saat Ini</label>
                                <?php if (isset($data['news']['gambar']) && $data['news']['gambar']): ?>
                                    <div class="mb-4">
                                        <?php
                                        $newsPath = '../public/images/news/' . $data['news']['gambar'];
                                        $oldPath = '../public/images/' . $data['news']['gambar'];

                                        if (file_exists($newsPath)) {
                                            $imagePath = BASEURL . '/images/news/' . htmlspecialchars($data['news']['gambar']);
                                        } elseif (file_exists($oldPath)) {
                                            $imagePath = BASEURL . '/images/' . htmlspecialchars($data['news']['gambar']);
                                        } else {
                                            $imagePath = BASEURL . '/images/news/' . htmlspecialchars($data['news']['gambar']);
                                        }
                                        ?>
                                        <img src="<?= $imagePath; ?>" alt="Current image" class="max-w-xs rounded-lg border shadow-sm" onerror="this.src='<?= BASEURL; ?>/images/default.jpg'">
                                    </div>
                                <?php else: ?>
                                    <p class="text-gray-500 text-sm italic mb-4">Tidak ada gambar tersedia.</p>
                                <?php endif; ?>

                                <label class="block text-sm font-medium text-gray-700 mb-2">Ubah Gambar (Opsional)</label>
                                <input type="file" name="gambar" accept="image/*"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Waktu Publikasi</label>
                                <input type="datetime-local" name="created_at"
                                    value="<?= date('Y-m-d\TH:i', strtotime($data['news']['created_at'])); ?>"
                                    required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ec-blue focus:border-ec-blue outline-none">
                            </div>
                        </div>

                        <div class="flex gap-4 mt-8">
                            <button type="submit" class="flex-1 bg-ec-blue text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition-all shadow-md">
                                Update News
                            </button>
                            <a href="<?= BASEURL; ?>/dashboard/news" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all text-center">
                                Batal
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>

    <script>
        const BASEURL = '<?= BASEURL; ?>';
    </script>
    <link href="<?= BASEURL; ?>/css/output.css" rel="stylesheet">
    <script src="<?= BASEURL; ?>/js/navbar.js"></script>
    <script src="<?= BASEURL; ?>/js/admin-script.js"></script>
</body>

</html>