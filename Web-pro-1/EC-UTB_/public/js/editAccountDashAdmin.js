// Helper untuk mengisi value element secara aman
const safeSetVal = (id, val, isCheck = false) => {
  const el = document.getElementById(id);
  if (el) {
    if (isCheck) el.checked = (val == 1 || val == '1'); // Pastikan handle string '1' juga
    else el.value = val;
  }
};

function openEditModal(
  userId,
  userName,
  userNim,
  userJurusan,
  userAngkatan,
  userStatus,
  userApproved,
) {
  // Cek Modal
  const modal = document.getElementById("editModal");
  if (!modal) return;

  // Isi data ke dalam input form (termasuk Hidden ID)
  safeSetVal("edit_user_id", userId);
  safeSetVal("edit_nama", userName);
  safeSetVal("edit_nim", userNim);
  safeSetVal("edit_jurusan", userJurusan);
  safeSetVal("edit_angkatan", userAngkatan);
  safeSetVal("edit_status", userStatus);
  safeSetVal("edit_approved", userApproved, true);

  // HAPUS BAGIAN PENGUBAHAN FORM ACTION DI SINI
  // Biarkan form action tetap default sesuai PHP: /super/Users/edit

  // Tampilkan Modal
  modal.classList.remove("hidden");
}

function openApproveModal(userId, userName) {
  const modal = document.getElementById("approveModal");
  if (modal) {
    safeSetVal("approve_user_id", userId);
    const label = document.getElementById("approve_user_name");
    if (label) label.textContent = userName;
    modal.classList.remove("hidden");
  }
}

function openResetModal(userId, userName) {
  const modal = document.getElementById("resetModal");
  if (modal) {
    safeSetVal("reset_user_id", userId);
    const label = document.getElementById("reset_user_name");
    if (label) label.textContent = userName;
    modal.classList.remove("hidden");
  }
}

// Logic Tutup Modal (Klik di luar modal)
window.onclick = function(event) {
    const modals = ['editModal', 'approveModal', 'resetModal', 'detailModal'];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

function closeDetailModal() {
    const modal = document.getElementById("detailModal");
    if (modal) modal.classList.add("hidden");
}