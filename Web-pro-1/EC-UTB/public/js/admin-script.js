function openEditModal(userId, userName, userNim, userJurusan, userStatus, userApproved) {
    if (typeof BASEURL === 'undefined') {
        console.error('BASEURL belum didefinisikan di file View utama!');
        return;
    }

    document.getElementById('edit_user_id').value = userId;
    document.getElementById('edit_nama').value = userName;
    document.getElementById('edit_nim').value = userNim;
    document.getElementById('edit_jurusan').value = userJurusan;
    document.getElementById('edit_status').value = userStatus;
    document.getElementById('edit_approved').checked = userApproved == 1;

    document.getElementById('editUserForm').action = BASEURL + '/dashboard/editUser/' + userId;
    
    document.getElementById('editModal').classList.remove('hidden');
}

function openResetModal(userId, userName) {
    const idInput = document.getElementById('reset_user_id');
    const nameLabel = document.getElementById('reset_user_name');
    const modal = document.getElementById('resetModal');

    if(idInput) idInput.value = userId;
    if(nameLabel) nameLabel.textContent = userName;
    if(modal) modal.classList.remove('hidden');
}
