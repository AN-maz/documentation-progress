// Helper untuk mengisi value element secara aman
const safeSetVal = (id, val, isCheck = false) => {
    const el = document.getElementById(id);
    if (el) {
        if (isCheck) el.checked = (val == 1);
        else el.value = val;
    }
};

function openEditModal(userId, userName, userNim, userJurusan, userStatus, userApproved) {
    // Pastikan BASEURL ada
    if (typeof BASEURL === 'undefined') {
        console.error('BASEURL is not defined in the view!');
        return;
    }

    const modal = document.getElementById('editModal');
    if (!modal) return;

    // Isi data ke form modal secara aman
    safeSetVal('edit_user_id', userId);
    safeSetVal('edit_nama', userName);
    safeSetVal('edit_nim', userNim);
    safeSetVal('edit_jurusan', userJurusan);
    safeSetVal('edit_status', userStatus);
    safeSetVal('edit_approved', userApproved, true);

    // Update Action Form
    const form = document.getElementById('editUserForm');
    if (form) {
        form.action = BASEURL + '/dashboard/editUser/' + userId;
    }

    // Tampilkan Modal
    modal.classList.remove('hidden');
}

// Tambahkan juga fungsi modal lainnya agar tetap berfungsi di page ini
function openApproveModal(userId, userName) {
    const modal = document.getElementById('approveModal');
    if (modal) {
        safeSetVal('approve_user_id', userId);
        const label = document.getElementById('approve_user_name');
        if (label) label.textContent = userName;
        modal.classList.remove('hidden');
    }
}

function openResetModal(userId, userName) {
    const modal = document.getElementById('resetModal');
    if (modal) {
        safeSetVal('reset_user_id', userId);
        const label = document.getElementById('reset_user_name');
        if (label) label.textContent = userName;
        modal.classList.remove('hidden');
    }
}