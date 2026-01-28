<div class="flex min-h-screen pt-0">

    <main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full">

        <div class="flex items-center gap-4 mb-6">
            <a href="<?= BASEURL; ?>/super/Rapat" class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </a>
            <div>
                <h1 class="text-2xl font-bold text-gray-900"><?= $data['agenda']['judul']; ?></h1>
                <p class="text-gray-500 text-sm">Rapat Internal • <?= date('d F Y', strtotime($data['agenda']['tanggal'])); ?></p>
            </div>
        </div>

        <div class="my-4">
            <?php Flasher::flash(); ?>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div class="lg:col-span-2 space-y-6">

                <div class="bg-white rounded-xl shadow-md p-6 h-[550px] flex flex-col relative">

                    <div class="flex-shrink-0 flex items-center justify-between mb-4 border-b pb-2">
                        <h3 class="font-bold text-gray-800 text-lg">📝 Notulensi Rapat</h3>

                        <div class="flex items-center gap-3">
                            <?php if ($data['agenda']['file_materi']): ?>
                                <a href="<?= BASEURL; ?>/materi/<?= $data['agenda']['file_materi']; ?>" target="_blank" class="text-sm text-indigo-600 hover:underline flex items-center gap-1">
                                    📄 Download
                                </a>
                            <?php endif; ?>

                            <button onclick="document.getElementById('editNotulensiModal').classList.remove('hidden')"
                                class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1">
                                ✏️ Edit
                            </button>
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <?php if ($data['agenda']['notulensi']): ?>
                            <div class="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                                <?= $data['agenda']['notulensi']; ?>
                            </div>
                        <?php else: ?>
                            <div class="flex flex-col items-center justify-center h-full text-gray-400">
                                <p>Belum ada catatan notulensi.</p>
                                <button onclick="document.getElementById('editNotulensiModal').classList.remove('hidden')" class="text-indigo-600 font-bold hover:underline mt-2">Tambah Sekarang</button>
                            </div>
                        <?php endif; ?>
                    </div>

                </div>
            </div>

            <div class="lg:col-span-1">

                <div class="bg-white rounded-xl shadow-md p-6 h-[550px] flex flex-col relative">

                    <div class="flex-shrink-0 border-b border-gray-100 pb-4 mb-4">
                        <h3 class="font-bold text-gray-800 mb-2">Absen Anggota</h3>
                        <p class="text-xs text-gray-500 mb-3">Cari nama pengurus yang hadir.</p>

                        <div class="relative mb-2">
                            <input type="text" id="user_search" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="Ketik nama..." autocomplete="off">
                            <div id="search_results" class="hidden absolute z-20 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-xl max-h-40 overflow-y-auto"></div>
                        </div>

                        <form id="formAbsenManual" action="<?= BASEURL; ?>/super/Rapat/absen_manual" method="POST" class="hidden">
                            <input type="hidden" name="id_agenda" value="<?= $data['agenda']['id_agenda']; ?>">
                            <input type="hidden" name="id_user" id="selected_id_user">

                            <div class="bg-green-50 p-2 rounded-lg mb-2 flex justify-between items-center">
                                <span id="selected_name" class="font-bold text-green-800 text-xs"></span>
                                <button type="button" onclick="resetSearch()" class="text-red-500 text-xs hover:underline">Batal</button>
                            </div>

                            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 text-sm">
                                Hadirkan ✅
                            </button>
                        </form>
                    </div>

                    <div class="flex-1 overflow-y-auto custom-scrollbar pr-1">

                        <div class="flex items-center justify-between mb-3 sticky top-0 bg-white z-10 py-2 border-b border-gray-100">
                            <div class="flex items-center gap-2">
                                <h3 class="font-bold text-gray-800 text-sm">Daftar Hadir</h3>
                                <span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full"><?= count($data['kehadiran']); ?></span>
                            </div>

                            <?php if (!empty($data['kehadiran'])): ?>
                                <button onclick="exportAbsenRapat()" class="text-green-600 hover:text-green-800 hover:bg-green-50 p-1.5 rounded-lg transition-colors" title="Export Excel">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </button>
                            <?php endif; ?>
                        </div>

                        <?php if (empty($data['kehadiran'])): ?>
                            <div class="text-center text-gray-400 py-10 text-sm italic">
                                Belum ada yang hadir.
                            </div>
                        <?php else: ?>
                            <ul class="space-y-2">
                                <?php foreach ($data['kehadiran'] as $h): ?>
                                    <li class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group border border-transparent hover:border-gray-100 transition-colors">
                                        <div class="flex items-center gap-3 overflow-hidden">
                                            <div class="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                                                <?= substr($h['nama'], 0, 2); ?>
                                            </div>
                                            <div class="min-w-0">
                                                <div class="text-sm font-medium text-gray-900 truncate"><?= $h['nama']; ?></div>
                                                <div class="text-xs text-gray-500 truncate"><?= $h['jabatan'] ?? 'Anggota'; ?></div>
                                            </div>
                                        </div>

                                        <a href="<?= BASEURL; ?>/super/Rapat/delete_absensi/<?= $h['id_absensi']; ?>/<?= $data['agenda']['id_agenda']; ?>"
                                            onclick="return confirm('Hapus <?= $h['nama']; ?> dari daftar hadir?')"
                                            class="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1" title="Hapus">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </div>

                </div>
            </div>

        </div>

    </main>
</div>

<div id="editNotulensiModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-900">Edit Notulensi & Materi</h3>
            <button onclick="document.getElementById('editNotulensiModal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form action="<?= BASEURL; ?>/super/Rapat/update_rapat" method="POST" enctype="multipart/form-data" class="p-6 space-y-4">
            <input type="hidden" name="id_agenda" value="<?= $data['agenda']['id_agenda']; ?>">

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Catatan Notulensi</label>
                <textarea name="notulensi" rows="10" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"><?= $data['agenda']['notulensi']; ?></textarea>
                <p class="text-xs text-gray-500 mt-1">Bisa menggunakan format teks biasa.</p>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Update File Materi (Opsional)</label>
                <div class="flex items-center gap-4">
                    <input type="file" name="file_materi" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
                </div>
                <?php if ($data['agenda']['file_materi']): ?>
                    <p class="text-xs text-green-600 mt-1">File saat ini: <?= $data['agenda']['file_materi']; ?></p>
                <?php endif; ?>
            </div>

            <div class="pt-4 flex justify-end gap-3">
                <button type="button" onclick="document.getElementById('editNotulensiModal').classList.add('hidden')" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
                <button type="submit" class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</div>

<script>
    const searchInput = document.getElementById('user_search');
    const resultsBox = document.getElementById('search_results');
    const formAbsen = document.getElementById('formAbsenManual');
    let timeout = null;

    searchInput.addEventListener('keyup', function() {
        clearTimeout(timeout);
        const keyword = this.value;

        if (keyword.length < 2) {
            resultsBox.classList.add('hidden');
            return;
        }

        timeout = setTimeout(() => {
            const formData = new FormData();
            formData.append('keyword', keyword);

            fetch('<?= BASEURL; ?>/super/Structure/search_user', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    resultsBox.innerHTML = '';
                    resultsBox.classList.remove('hidden');

                    if (data.length > 0) {
                        data.forEach(user => {
                            const item = document.createElement('div');
                            item.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer border-b text-sm';
                            item.innerHTML = `<strong>${user.nama}</strong> <span class="text-gray-400 text-xs">(${user.status_keanggotaan})</span>`;

                            item.onclick = () => {
                                document.getElementById('selected_id_user').value = user.id_user;
                                document.getElementById('selected_name').innerText = user.nama;

                                formAbsen.classList.remove('hidden');
                                searchInput.classList.add('hidden');
                                resultsBox.classList.add('hidden');
                            };
                            resultsBox.appendChild(item);
                        });
                    } else {
                        resultsBox.innerHTML = '<div class="px-4 py-2 text-gray-500 italic text-sm">Tidak ditemukan</div>';
                    }
                });
        }, 300);
    });

    function resetSearch() {
        formAbsen.classList.add('hidden');
        searchInput.value = '';
        searchInput.classList.remove('hidden');
    }
</script>

<script>
    async function exportAbsenRapat() {
        try {
            // 1. Ambil Data dari PHP
            const kehadiran = <?= json_encode($data['kehadiran']); ?>;
            const detailAgenda = {
                judul: "<?= $data['agenda']['judul']; ?>",
                tanggal: "<?= date('d-m-Y', strtotime($data['agenda']['tanggal'])); ?>",
                lokasi: "<?= $data['agenda']['lokasi']; ?>"
            };

            if (kehadiran.length === 0) {
                alert("Tidak ada data kehadiran untuk diexport.");
                return;
            }

            // 2. Setup Workbook Excel
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Daftar Hadir');

            // 3. Header Info Rapat (Baris 1-4)
            sheet.mergeCells('A1:C1');
            sheet.getCell('A1').value = "DAFTAR HADIR RAPAT INTERNAL";
            sheet.getCell('A1').font = {
                bold: true,
                size: 14
            };
            sheet.getCell('A1').alignment = {
                horizontal: 'center'
            };

            sheet.getCell('A2').value = "Judul : " + detailAgenda.judul;
            sheet.getCell('A3').value = "Tanggal : " + detailAgenda.tanggal;
            sheet.getCell('A4').value = "Lokasi : " + detailAgenda.lokasi;

            // Spasi kosong
            sheet.addRow([]);

            // 4. Header Tabel (Baris 6)
            sheet.getRow(6).values = ['NO', 'NAMA PENGURUS', 'JABATAN'];
            sheet.columns = [{
                    key: 'no',
                    width: 5
                },
                {
                    key: 'nama',
                    width: 35
                },
                {
                    key: 'jabatan',
                    width: 25
                }
            ];

            // Styling Header Tabel
            const tableHeader = sheet.getRow(6);
            tableHeader.font = {
                bold: true,
                color: {
                    argb: 'FFFFFF'
                }
            };
            tableHeader.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: '4F46E5'
                }
            }; // Warna Indigo
            tableHeader.alignment = {
                horizontal: 'center'
            };

            // 5. Isi Data
            kehadiran.forEach((k, index) => {
                const row = sheet.addRow({
                    no: index + 1,
                    nama: k.nama,
                    jabatan: (k.jabatan ? k.jabatan : 'Anggota')
                });

                // Center kolom No
                row.getCell(1).alignment = {
                    horizontal: 'center'
                };

                // Border tipis tiap baris
                row.eachCell({
                    includeEmpty: true
                }, function(cell) {
                    cell.border = {
                        top: {
                            style: 'thin'
                        },
                        left: {
                            style: 'thin'
                        },
                        bottom: {
                            style: 'thin'
                        },
                        right: {
                            style: 'thin'
                        }
                    };
                });
            });

            // 6. Generate & Download
            const buffer = await workbook.xlsx.writeBuffer();
            const fileName = `Absensi_${detailAgenda.judul}_${detailAgenda.tanggal}.xlsx`;

            // Menggunakan FileSaver.js (atau Blob native)
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();

        } catch (error) {
            console.error("Export Error:", error);
            alert("Gagal mengexport data. Cek console untuk detail.");
        }
    }
</script>