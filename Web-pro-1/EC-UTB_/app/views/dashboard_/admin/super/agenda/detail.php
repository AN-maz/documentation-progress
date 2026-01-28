<main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full">

    <div class="flex items-center gap-4 mb-6">
        <a href="<?= BASEURL; ?>/super/Agenda" class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
        </a>
        <div>
            <h1 class="text-2xl font-bold text-gray-900"><?= $data['agenda']['judul']; ?></h1>
            <p class="text-gray-500 text-sm"><?= date('l, d F Y', strtotime($data['agenda']['tanggal'])); ?> • <?= $data['agenda']['lokasi']; ?></p>
        </div>
    </div>

    <div class="my-4">
        <?php Flasher::flash(); ?>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="lg:col-span-1 space-y-6">

            <div class="bg-white rounded-xl shadow-md p-6 text-center border-t-4 <?= ($data['agenda']['status'] == 'buka') ? 'border-green-500' : 'border-red-500'; ?>">
                <h3 class="text-gray-500 font-medium mb-2 uppercase tracking-wide text-xs">Token Absensi</h3>

                <?php if ($data['agenda']['status'] == 'buka'): ?>
                    <div class="text-5xl font-mono font-bold text-gray-800 tracking-widest my-4 select-all bg-gray-50 py-4 rounded-lg border border-dashed border-gray-300">
                        <?= $data['agenda']['token_absen']; ?>
                    </div>
                    <p class="text-green-600 text-sm font-semibold flex items-center justify-center gap-1 animate-pulse">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        Absensi Sedang Dibuka
                    </p>
                <?php else: ?>
                    <div class="text-4xl font-mono font-bold text-gray-400 tracking-widest my-4">
                        CLOSED
                    </div>
                    <p class="text-red-500 text-sm font-semibold">Absensi Ditutup</p>
                <?php endif; ?>
            </div>

            <?php if ($data['agenda']['file_materi']): ?>
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h3 class="font-bold text-gray-800 mb-2">Materi Pembelajaran</h3>
                    <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-blue-700">
                        <div class="flex items-center gap-2 overflow-hidden">
                            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span class="text-sm truncate"><?= $data['agenda']['file_materi']; ?></span>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

            <div class="bg-white rounded-xl shadow-md p-6 space-y-3">
                <h3 class="font-bold text-gray-800">Actions</h3>

                <a href="<?= BASEURL; ?>/super/Agenda/toggle_status/<?= $data['agenda']['id_agenda']; ?>/<?= $data['agenda']['status']; ?>"
                    class="block w-full py-2 px-4 rounded-lg text-center font-semibold transition-colors <?= ($data['agenda']['status'] == 'buka') ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'; ?>">
                    <?= ($data['agenda']['status'] == 'buka') ? 'Tutup Absensi' : 'Buka Kembali Absensi'; ?>
                </a>

                <a href="<?= BASEURL; ?>/super/Agenda/delete/<?= $data['agenda']['id_agenda']; ?>"
                    onclick="return confirm('Yakin hapus agenda ini? Data absensi juga akan terhapus.')"
                    class="block w-full py-2 px-4 rounded-lg text-center font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Hapus Agenda
                </a>
            </div>
        </div>

        <div class="lg:col-span-2">
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
                <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 class="text-lg font-bold text-gray-800">Daftar Kehadiran</h2>
                        <span class="text-sm text-gray-500"><?= count($data['kehadiran']); ?> Orang Hadir</span>
                    </div>
                    <button id="btnExport" class="text-ec-blue hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Export Excel
                    </button>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th class="px-6 py-4">Waktu</th>
                                <th class="px-6 py-4">Nama</th>
                                <th class="px-6 py-4">Info</th>
                                <th class="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <?php if (empty($data['kehadiran'])): ?>
                                <tr>
                                    <td colspan="4" class="px-6 py-8 text-center text-gray-400 italic">Belum ada data absensi.</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($data['kehadiran'] as $h): ?>
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-6 py-4 text-sm text-gray-500 font-mono">
                                            <?= date('H:i', strtotime($h['waktu_absen'])); ?>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="font-medium text-gray-900"><?= $h['nama']; ?></div>
                                            <div class="text-xs text-gray-500"><?= $h['nim']; ?></div>
                                        </td>
                                        <td class="px-6 py-4 text-sm text-gray-500">
                                            <?= $h['jurusan']; ?>
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                                                <?= ucfirst($h['status_kehadiran']); ?>
                                            </span>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

</main>
</div>

<script src="<?= BASEURL; ?>/js/vendor/xlsx.full.min.js"></script>

<script>
    document.getElementById('btnExport').addEventListener('click', function() {

        // 2. Ambil Data dari PHP (Kita convert jadi JSON object)
        const rawData = <?= json_encode($data['kehadiran']); ?>;
        const agendaTitle = "<?= $data['agenda']['judul']; ?>";
        const agendaDate = "<?= date('d-m-Y', strtotime($data['agenda']['tanggal'])); ?>";

        if (rawData.length === 0) {
            alert("Belum ada data absensi untuk diexport!");
            return;
        }


        const excelData = rawData.map((item, index) => ({
            "No": index + 1,
            "Nama Lengkap": item.nama,
            "NIM": item.nim,
            "Jurusan": item.jurusan,
            "Waktu Absen": item.waktu_absen, // Bisa diformat lagi kalau mau jam-nya aja
            "Status": item.status_kehadiran.toUpperCase() // Biar huruf besar (HADIR)
        }));

        // 4. Buat Worksheet (Lembar Kerja)
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // (Opsional) Auto-width kolom biar gak sempit
        const wscols = [{
                wch: 5
            }, // No
            {
                wch: 30
            }, // Nama
            {
                wch: 15
            }, // NIM
            {
                wch: 25
            }, // Jurusan
            {
                wch: 20
            }, // Waktu
            {
                wch: 10
            } // Status
        ];
        worksheet['!cols'] = wscols;

        // 5. Buat Workbook (Buku Excel)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Absensi");

        // 6. Download File
        // Nama file: Absensi - Judul Agenda - Tanggal.xlsx
        const fileName = `Absensi - ${agendaTitle} - ${agendaDate}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    });
</script>