<body class="bg-gray-50">

    <!-- Include Modern Mobile Navbar -->
    <?php require_once '../app/views/templates/tempDashAdmin/mobileNav.php'; ?>

    <div class="flex min-h-screen pt-0">

        <?php require_once '../app/views/templates/tempDashAdmin/sidebar.php'; ?>

        <main class="flex-1 p-4 sm:p-6 lg:p-8 md:pl-32 lg:pl-80 transition-all min-h-screen w-full">

            <h1 class="text-3xl font-bold text-gray-900 mb-6">Account Management</h1>

            <div class="my-4">
                <?php Flasher::flash(); ?>
            </div>

            <div class="py-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 class="text-lg font-semibold text-gray-800">Daftar User</h2>
                <div class="relative w-full sm:w-64">
                    <input type="text" id="searchInput"
                        class="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-ec-blue focus:border-ec-blue sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Cari Nama atau NIM...">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg overflow-hidden mt-4">
                <?php if (empty($data['users'])): ?>
                    <div class="p-8 text-center text-gray-500">
                        <p>Belum ada user yang terdaftar.</p>
                    </div>
                <?php else: ?>
                    <div class="overflow-x-auto">
                        <table class="w-full" id="userTable">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nama</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">NIM</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Approval</th>
                                    <th class="px-6 py-4 text-right text-sm font-semibold text-gray-900">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200" id="tableBody">
                                <?php foreach ($data['users'] as $user): ?>
                                    <tr class="table-row-item">
                                        <td class="px-6 py-4">
                                            <div class="font-semibold text-gray-900"><?= htmlspecialchars($user['nama']); ?></div>
                                            <div class="text-sm text-gray-500"><?= htmlspecialchars($user['jurusan']); ?></div>
                                        </td>
                                        <td class="px-6 py-4 text-gray-600"><?= htmlspecialchars($user['nim']); ?></td>
                                        <td class="px-6 py-4 text-gray-600"><?= htmlspecialchars($user['email']); ?></td>
                                        <td class="px-6 py-4">
                                            <?php
                                            if (isset($user['is_approved']) && $user['is_approved'] == 0) {
                                                $statusText = 'Pending';
                                                $badgeColor = 'bg-gray-100 text-gray-800';
                                            } else {
                                                $status = $user['status_keanggotaan'];
                                                $statusText = '';
                                                $badgeColor = '';
                                                switch ($status) {
                                                    case 'pengurus':
                                                        $statusText = 'Pengurus';
                                                        $badgeColor = 'bg-purple-100 text-purple-800';
                                                        break;
                                                    case 'anggota_aktif':
                                                        $statusText = 'Anggota Aktif';
                                                        $badgeColor = 'bg-green-100 text-green-800';
                                                        break;
                                                    case 'anggota_pasif':
                                                        $statusText = 'Anggota Pasif';
                                                        $badgeColor = 'bg-yellow-100 text-yellow-800';
                                                        break;
                                                    case 'pending':
                                                        $statusText = 'Pending';
                                                        $badgeColor = 'bg-gray-100 text-gray-800';
                                                        break;
                                                }
                                            }
                                            ?>
                                            <span class="px-2 py-1 rounded text-xs font-semibold <?= $badgeColor; ?>">
                                                <?= $statusText; ?>
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <?php if ($user['is_approved'] == 0): ?>
                                                <span class="text-red-600 font-semibold">Belum Disetujui</span>
                                            <?php else: ?>
                                                <span class="text-green-600 font-semibold">Disetujui</span>
                                            <?php endif; ?>
                                        </td>
                                        <td class="px-6 py-4 text-right">
                                            <div class="flex justify-end gap-2">
                                                <?php if ($user['is_approved'] == 0): ?>
                                                    <button disabled class="text-gray-400 cursor-not-allowed font-semibold text-sm">Edit</button>
                                                    <button onclick='openApproveModal(<?= json_encode($user['id_user']); ?>, <?= json_encode($user['nama']); ?>)'
                                                        class="text-green-600 hover:text-green-800 font-semibold text-sm">
                                                        Setujui
                                                    </button>
                                                <?php else: ?>
                                                    <button onclick='openEditModal(<?= json_encode($user['id_user']); ?>, <?= json_encode($user['nama']); ?>, <?= json_encode($user['nim']); ?>, <?= json_encode($user['jurusan']); ?>, <?= json_encode($user['status_keanggotaan']); ?>, <?= ($user['is_approved'] ? '1' : '0'); ?>)'
                                                        class="text-purple-600 hover:text-purple-800 font-semibold text-sm">
                                                        Edit
                                                    </button>
                                                <?php endif; ?>
                                                <button onclick='openResetModal(<?= json_encode($user['id_user']); ?>, <?= json_encode($user['nama']); ?>)'
                                                    class="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                                                    Reset Password
                                                </button>
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
        </main>
    </div>

    <div id="approveModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900">Setujui User</h2>
            </div>
            <form action="<?= BASEURL; ?>/dashboard/approveUser" method="POST" class="p-6">
                <input type="hidden" name="user_id" id="approve_user_id">
                <p class="text-gray-700 mb-4">Setujui user: <span id="approve_user_name" class="font-semibold"></span></p>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status Keanggotaan</label>
                    <select name="status" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
                        <option value="pengurus">Pengurus</option>
                        <option value="anggota_aktif">Anggota Aktif</option>
                        <option value="anggota_pasif">Anggota Pasif</option>
                    </select>
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Setujui
                    </button>
                    <button type="button" onclick="document.getElementById('approveModal').classList.add('hidden')" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div id="editModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900">Edit User</h2>
            </div>
            <form action="<?= BASEURL; ?>/dashboard/editUser/" method="POST" id="editUserForm" class="p-6">
                <input type="hidden" name="user_id" id="edit_user_id">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" name="nama" id="edit_nama" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">NIM</label>
                        <input type="text" name="nim" id="edit_nim" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
                    </div>
                    <div class="mb-4">
                        <label for="edit_jurusan" class="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
                        <select id="edit_jurusan" name="jurusan" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                            <option value="" disabled>Pilih Jurusan</option>
                            <option value="Informatics Engineering">Informatics Engineering</option>
                            <option value="Industrial Engineering">Industrial Engineering</option>
                            <option value="Visual Communication Design">Visual Communication Design</option>
                            <option value="Digital Business">Digital Business</option>
                            <option value="Retail Management">Retail Management</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status Keanggotaan</label>
                        <select name="status_keanggotaan" id="edit_status" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue">
                            <option value="pengurus">Pengurus</option>
                            <option value="anggota_aktif">Anggota Aktif</option>
                            <option value="anggota_pasif">Anggota Pasif</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" name="is_approved" id="edit_approved" class="w-4 h-4 text-ec-blue border-gray-300 rounded focus:ring-ec-blue">
                        <label for="edit_approved" class="ml-2 text-sm font-medium text-gray-700">Disetujui (Approved)</label>
                    </div>
                </div>
                <div class="flex gap-4 mt-6">
                    <button type="submit" class="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                        Update User
                    </button>
                    <button type="button" onclick="document.getElementById('editModal').classList.add('hidden')" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div id="resetModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div class="p-6 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-900">Reset Password</h2>
            </div>
            <form action="<?= BASEURL; ?>/dashboard/resetPassword" method="POST" class="p-6">
                <input type="hidden" name="user_id" id="reset_user_id">
                <p class="text-gray-700 mb-4">Reset password untuk: <span id="reset_user_name" class="font-semibold"></span></p>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                    <input type="password" name="new_password" required minlength="6" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-ec-blue focus:border-ec-blue" placeholder="Min. 6 karakter">
                </div>
                <div class="flex gap-4">
                    <button type="submit" class="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Reset Password
                    </button>
                    <button type="button" onclick="document.getElementById('resetModal').classList.add('hidden')" class="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Batal
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const BASEURL = '<?= BASEURL; ?>';
    </script>
    <!-- <script src="<?= BASEURL; ?>/js/admin-script.js"></script> -->
    <script src="<?= BASEURL; ?>/js/editAccountDashAdmin.js"></script>
    <script src="<?= BASEURL; ?>/js/simple-pagination.js"></script>
</body>

</html>