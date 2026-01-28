<div class="flex min-h-screen pt-0">

    <main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full">

        <div class="flex items-center gap-4 mb-6">
            <a href="<?= BASEURL; ?>/sdm/Structure" class="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
            </a>
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Manage <?= $data['divisi']['nama_divisi']; ?></h1>
                <p class="text-gray-500 text-sm">Update informasi dan kelola anggota.</p>
            </div>
        </div>

        <div class="my-4">
            <?php Flasher::flash(); ?>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Divisi</h2>

                    <form action="<?= BASEURL; ?>/sdm/Structure/update_division" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="id_divisi" value="<?= $data['divisi']['id_divisi']; ?>">
                        <input type="hidden" name="folder_gambar" value="<?= $data['divisi']['folder_gambar']; ?>">

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Foto Grup</label>
                            <div class="relative rounded-lg overflow-hidden bg-gray-100 aspect-video mb-2 group">
                                <img src="<?= BASEURL; ?>/images/pengurus/<?= $data['divisi']['foto_grup']; ?>"
                                    id="preview_img"
                                    class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p class="text-white text-xs">Ganti Foto</p>
                                </div>
                            </div>
                            <input type="file" name="foto_grup" id="foto_input" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*">
                            <p class="text-xs text-gray-400 mt-1">Format: JPG/PNG. Max 2MB.</p>
                        </div>

                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea name="deskripsi" rows="5" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue text-sm" required><?= $data['divisi']['deskripsi']; ?></textarea>
                        </div>

                        <div class="mb-6">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Program Kerja</label>
                            <p class="text-xs text-gray-400 mb-2">Pisahkan dengan koma (,)</p>
                            <textarea name="proker" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue text-sm" placeholder="Contoh: Rapat Rutin, Gathering, Lomba"><?= $data['proker_text']; ?></textarea>
                        </div>

                        <button type="submit" class="w-full bg-ec-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                            Simpan Perubahan
                        </button>
                    </form>
                </div>
            </div>

            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div>
                            <h2 class="text-lg font-bold text-gray-800">Daftar Anggota</h2>
                            <span class="text-sm text-gray-500"><?= count($data['members']); ?> Orang</span>
                        </div>
                        <button onclick="openAddModal()" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Add Member
                        </button>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th class="px-6 py-4">Member</th>
                                    <th class="px-6 py-4">NIM / Jurusan</th>
                                    <th class="px-6 py-4">Jabatan</th>
                                    <th class="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <?php if (empty($data['members'])): ?>
                                    <tr>
                                        <td colspan="4" class="px-6 py-8 text-center text-gray-400 italic">Belum ada anggota di divisi ini.</td>
                                    </tr>
                                <?php else: ?>
                                    <?php foreach ($data['members'] as $m): ?>
                                        <tr class="hover:bg-gray-50 transition-colors">
                                            <td class="px-6 py-4">
                                                <div class="flex items-center">
                                                    <div class="h-10 w-10 flex-shrink-0">
                                                        <?php
                                                        // LOGIKA BARU PATH GAMBAR (Sama seperti halaman public)
                                                        $folderDivisi = $data['divisi']['folder_gambar'];
                                                        $imgSrc = BASEURL . '/images/pengurus/' . $folderDivisi . '/' . $m['foto_profile'];

                                                        // Cek sederhana kalau nama filenya default
                                                        if ($m['foto_profile'] == 'default_profile.jpg') {
                                                            $imgSrc = BASEURL . '/images/profile/default_profile.jpg';
                                                        }
                                                        ?>

                                                        <img class="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                            src="<?= $imgSrc; ?>"
                                                            onerror="this.src='https://ui-avatars.com/api/?name=<?= urlencode($m['nama']); ?>&background=random'"
                                                            alt="">
                                                    </div>
                                                    <div class="ml-4">
                                                        <div class="text-sm font-medium text-gray-900"><?= $m['nama']; ?></div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4">
                                                <div class="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded inline-block">
                                                    <?= $m['jurusan']; ?>
                                                </div>
                                            </td>

                                            <td class="px-6 py-4">
                                                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    <?= $m['jabatan']; ?>
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-right text-sm font-medium">
                                                <button onclick="openEditRoleModal('<?= $m['id_pengurus']; ?>', '<?= $m['jabatan']; ?>', '<?= $m['jurusan']; ?>', '<?= $imgSrc; ?>')"
                                                    class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>

                                                <a href="<?= BASEURL; ?>/sdm/Structure/delete_member/<?= $m['id_pengurus']; ?>/<?= $data['divisi']['id_divisi']; ?>"
                                                    onclick="return confirm('Yakin hapus member ini?')"
                                                    class="text-red-600 hover:text-red-900"
                                                    title="Hapus">
                                                    Hapus
                                                </a>
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

<div id="addMemberModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        <div class="p-6 border-b border-gray-100">
            <h3 class="text-lg font-bold text-gray-900">Tambah Anggota Baru</h3>
        </div>

        <form action="<?= BASEURL; ?>/sdm/Structure/add_member" method="POST" enctype="multipart/form-data" class="p-6">
            <input type="hidden" name="id_divisi" value="<?= $data['divisi']['id_divisi']; ?>">
            <input type="hidden" name="folder_gambar" value="<?= $data['divisi']['folder_gambar']; ?>"> <input type="hidden" name="id_user" id="selected_id_user" required>

            <div class="mb-4 relative">
                <label class="block text-sm font-medium text-gray-700 mb-1">Cari User</label>
                <input type="text" id="user_search" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Ketik nama/NIM..." autocomplete="off">
                <div id="search_results" class="hidden absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-xl max-h-48 overflow-y-auto"></div>
                <div id="selected_user_preview" class="hidden mt-2 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                    <span id="selected_user_name" class="text-sm font-semibold text-green-800"></span>
                    <button type="button" onclick="clearSelection()" class="text-red-500 hover:text-red-700 text-xs">Batal</button>
                </div>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                <input type="text" name="jabatan" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
            </div>

            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Upload Foto (Opsional)</label>
                <input type="file" name="foto_member" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                <p class="text-xs text-gray-400 mt-1">Akan mengganti foto profil user ini.</p>
            </div>

            <div class="flex justify-end gap-3">
                <button type="button" onclick="document.getElementById('addMemberModal').classList.add('hidden')" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Batal</button>
                <button type="submit" id="btn_submit_add" disabled class="px-4 py-2 bg-ec-blue text-white rounded-lg hover:bg-blue-900 disabled:opacity-50">Tambah</button>
            </div>
        </form>
    </div>
</div>

<div id="editRoleModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-sm w-full">
        <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Edit Data Member</h3>

            <form action="<?= BASEURL; ?>/sdm/Structure/update_member_role" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="id_divisi" value="<?= $data['divisi']['id_divisi']; ?>">
                <input type="hidden" name="folder_gambar" value="<?= $data['divisi']['folder_gambar']; ?>"> <input type="hidden" name="id_pengurus" id="edit_id_pengurus">

                <div class="flex justify-center mb-4">
                    <img id="edit_preview_img" src="" class="w-20 h-20 rounded-full object-cover border-2 border-gray-200">
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ganti Foto</label>
                    <input type="file" name="foto_member" class="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700">
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                    <input type="text" name="jabatan" id="edit_jabatan_input" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
                    <select name="jurusan" id="edit_jurusan_input" class="w-full px-3 py-2 border border-gray-300 rounded-lg" required>
                        <option value="Informatics Engineering">Informatics Engineering</option>
                        <option value="Industrial Engineering">Industrial Engineering</option>
                        <option value="Visual Communication Design">Visual Communication Design</option>
                        <option value="Digital Business">Digital Business</option>
                        <option value="Retail Management">Retail Management</option>
                    </select>
                </div>

                <div class="flex justify-end gap-3">
                    <button type="button" onclick="document.getElementById('editRoleModal').classList.add('hidden')" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Batal</button>
                    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    const BASEURL = '<?= BASEURL; ?>';

    const fotoInput = document.getElementById('foto_input');
    const previewImg = document.getElementById('preview_img');

    if (fotoInput) {
        fotoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function openAddModal() {
        document.getElementById('addMemberModal').classList.remove('hidden');
        clearSelection();
    }

    // MENCEGAH ENTER DI KOLOM SEARCH (PENTING)
    const searchInput = document.getElementById('user_search');
    const resultsBox = document.getElementById('search_results');
    let timeout = null;

    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                return false;
            }
        });

        // AJAX Search User
        searchInput.addEventListener('keyup', function() {
            clearTimeout(timeout);
            const keyword = this.value.trim();

            if (keyword.length < 2) {
                resultsBox.classList.add('hidden');
                resultsBox.innerHTML = '';
                return;
            }

            timeout = setTimeout(() => {
                const formData = new FormData();
                formData.append('keyword', keyword);

                fetch(BASEURL + '/sdm/Structure/search_user', {
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
                                item.className =
                                    'px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-50 last:border-0';

                                item.innerHTML = `
                                <div class="flex items-center">
                                    <div class="font-bold text-gray-800 text-sm">${user.nama}</div>
                                    <div class="ml-2 text-xs text-gray-500 bg-gray-100 px-2 rounded">
                                        ${user.nim}
                                    </div>
                                </div>
                                <div class="text-xs text-gray-400">${user.jurusan}</div>
                            `;

                                item.onclick = () => selectUser(user);
                                resultsBox.appendChild(item);
                            });
                        } else {
                            resultsBox.innerHTML = `
                            <div class="px-4 py-2 text-sm text-gray-500 italic">
                                User tidak ditemukan (Cek Approval)
                            </div>
                        `;
                        }
                    })
                    .catch(err => console.error(err));
            }, 300);
        });
    }

    function selectUser(user) {

        document.getElementById('selected_id_user').value = user.id_user;


        document.getElementById('selected_user_name').innerText =
            `${user.nama} (${user.nim})`;
        document.getElementById('selected_user_preview').classList.remove('hidden');

        document.getElementById('user_search').classList.add('hidden');
        document.getElementById('search_results').classList.add('hidden');

        const btn = document.getElementById('btn_submit_add');
        btn.disabled = false;
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
    }

    function clearSelection() {
        document.getElementById('selected_id_user').value = '';
        document.getElementById('user_search').value = '';
        document.getElementById('user_search').classList.remove('hidden');
        document.getElementById('selected_user_preview').classList.add('hidden');
        document.getElementById('search_results').classList.add('hidden');

        const btn = document.getElementById('btn_submit_add');
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    function openEditRoleModal(id, currentRole, currentJurusan, imgSrc) {
        document.getElementById('edit_id_pengurus').value = id;
        document.getElementById('edit_jabatan_input').value = currentRole;
        document.getElementById('edit_jurusan_input').value = currentJurusan;
        document.getElementById('edit_preview_img').src = imgSrc;

        document.getElementById('editRoleModal').classList.remove('hidden');
    }

    window.onclick = function(e) {
        const m1 = document.getElementById('addMemberModal');
        const m2 = document.getElementById('editRoleModal');

        if (e.target === m1) m1.classList.add('hidden');
        if (e.target === m2) m2.classList.add('hidden');
    };
</script>