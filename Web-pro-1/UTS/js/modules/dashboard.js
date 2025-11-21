export function initDashboard() {
    const userData = JSON.parse(window.sessionStorage.getItem('userData') || 'null');

    if (!userData) {
        window.location.href = 'login.html';
        return;
    }

    // Update Info User
    const elNames = ['userName', 'profileName'];
    const elEmails = ['userEmail', 'profileEmail'];
    
    elNames.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.textContent = userData.nama;
    });

    elEmails.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.textContent = userData.email;
    });

    const elTime = document.getElementById('loginTime');
    if(elTime) elTime.textContent = new Date(userData.loginTime).toLocaleString('id-ID');

    // Registrasi fungsi agar dapat dipanggil di HTML
    window.showSection = showSection;
    window.handleLogout = handleLogout;
    window.openModal = openModal;
    window.handleSave = handleSave;
    window.editData = editData;
    window.deleteData = deleteData;

    // Load Data pertama kali
    loadTableData();
}

/* ============================
   1. READ DATA
============================ */
async function loadTableData() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Memuat data...</td></tr>';

    try {
        const response = await fetch('api/read.php');
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            let html = '';
            result.data.forEach((item, index) => {
                html += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>
                            <img src="imgs/${item.image_url}" alt="img" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                        </td>
                        <td>${item.title}</td>
                        <td><span class="badge bg-info">${item.category}</span></td>
                        <td>
                            <button class="btn btn-sm btn-warning text-white" onclick="editData(${item.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteData(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            tableBody.innerHTML = html;
        } else {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Tidak ada data</td></tr>';
        }
    } catch (error) {
        console.error('Error:', error);
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-danger">Gagal memuat data</td></tr>';
    }
}

/* ============================
   2. CREATE/UPDATE (FINAL VERSION)
   — SUDAH DIGABUNG DENGAN REVISI TEMANMU
============================ */
async function handleSave(event) {
    event.preventDefault();

    const id = document.getElementById('dataId').value;
    const title = document.getElementById('dataTitle').value;
    const category = document.getElementById('dataCategory').value;
    const description = document.getElementById('dataDesc').value;

    // Ambil file dari input type="file"
    const fileInput = document.getElementById('dataImage');
    const file = fileInput.files[0];

    // Validasi (jika Create, wajib pilih gambar)
    if (!id && !file) {
        alert('Harap pilih gambar!');
        return;
    }

    // Kirim sebagai FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);

    if (id) formData.append('id', id);
    if (file) formData.append('image', file);

    const url = id ? 'api/update.php' : 'api/create.php';

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData // jangan set Content-Type manual
        });

        const result = await response.json();

        if (result.success) {
            alert('Berhasil menyimpan data!');

            const modalEl = document.getElementById('dataModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal.hide();

            loadTableData();
        } else {
            alert('Gagal: ' + result.message);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan sistem');
    }
}

/* ============================
   3. EDIT DATA
============================ */
async function editData(id) {
    try {
        const response = await fetch(`api/read.php?id=${id}`);
        const result = await response.json();

        if (result.success) {
            const data = result.data;
            
            document.getElementById('dataId').value = data.id;
            document.getElementById('dataTitle').value = data.title;
            document.getElementById('dataCategory').value = data.category;
            document.getElementById('dataDesc').value = data.description;
            
            // --- TAMBAHAN: Tampilkan Preview Gambar ---
            const imgPreview = document.getElementById('imgPreview');
            if (data.image_url) {
                imgPreview.src = `imgs/${data.image_url}`;
                imgPreview.style.display = 'block';
            } else {
                imgPreview.style.display = 'none';
            }
            
            // Reset Input File (Biar kosong)
            document.getElementById('dataImage').value = ''; 
            // -----------------------------------------

            document.getElementById('modalTitle').textContent = 'Edit Data';
            
            const modal = new bootstrap.Modal(document.getElementById('dataModal'));
            modal.show();
        }
    } catch (error) {
        console.error(error);
        alert('Gagal mengambil data detail');
    }
}
/* ============================
   4. DELETE DATA
============================ */
async function deleteData(id) {
    if (!confirm('Yakin ingin menghapus data ini?')) return;

    try {
        const response = await fetch('api/delete.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });

        const result = await response.json();

        if (result.success) {
            alert('Data berhasil dihapus');
            loadTableData();
        } else {
            alert('Gagal menghapus: ' + result.message);
        }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menghapus');
    }
}

/* ============================
   5. OPEN MODAL (RESET FORM)
============================ */
function openModal() {
    document.getElementById('dataForm').reset();
    document.getElementById('dataId').value = '';
    document.getElementById('modalTitle').textContent = 'Tambah Data';

    document.getElementById('imgPreview').style.display = 'none';
    
    const modal = new bootstrap.Modal(document.getElementById('dataModal'));
    modal.show();
}

/* ============================
   6. NAVIGASI DASHBOARD
============================ */
function showSection(section) {
    document.querySelectorAll('.content-section').forEach(el => {
        el.style.display = 'none';
    });

    document.querySelectorAll('.sidebar .nav-link').forEach(el => {
        el.classList.remove('active');
    });

    const targetSection = document.getElementById(`${section}Section`);
    if (targetSection) targetSection.style.display = 'block';

    if (event && event.target) {
        const link = event.target.closest('.nav-link');
        if (link) link.classList.add('active');
    }
}

/* ============================
   7. LOGOUT
============================ */
function handleLogout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        window.sessionStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}
