<div class="flex min-h-screen pt-0">

    <main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full">

        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Structure Management</h1>
                <p class="text-gray-500 mt-1">Kelola divisi, deskripsi, dan anggota pengurus.</p>
            </div>
        </div>

        <div class="my-4">
            <?php Flasher::flash(); ?>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($data['divisi'] as $d) : ?>
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">

                    <div class="p-6 pb-0 flex items-start justify-between">
                        <div class="w-12 h-12 bg-blue-50 text-2xl flex items-center justify-center rounded-lg">
                            <?= $d['icon']; ?>
                        </div>
                        <span class="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                            <?= $d['member_count']; ?> Members
                        </span>
                    </div>

                    <div class="p-6 flex-1">
                        <h3 class="text-xl font-bold text-gray-800 mb-2"><?= $d['nama_divisi']; ?></h3>
                        <p class="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                            <?= $d['deskripsi']; ?>
                        </p>
                    </div>

                    <div class="p-4 bg-gray-50 border-t border-gray-100">
                        <a href="<?= BASEURL; ?>/super/Structure/detail/<?= $d['id_divisi']; ?>"
                            class="block w-full text-center py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-ec-blue hover:text-white hover:border-ec-blue transition-all duration-300">
                            Manage Detail
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

    </main>
</div>