<?php

class Users extends Controller
{
    protected $userModel;
    public function __construct()
    {
        AccessControl::allowSuperAdmin();
        $this->userModel = $this->model('User_model');
    }

    public function index()
    {
        $data['judul'] = 'All Users';
        $data['active_page'] = 'users';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        $data['users'] = $this->model('User_model')->getAllUsers();

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/super/sidebar', $data);
        $this->view('templates/adminLayout/super/mobileNav', $data);
        $this->view('dashboard_/admin/super/account/index', $data); 
        $this->view('templates/FooterDash');// Pastikan view ada
    }
    public function approve()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return;
        }

        $id     = $_POST['user_id'] ?? null;
        $status = $_POST['status'] ?? null;

        if (!$id || !$status) {
            Flasher::setFlash('Gagal', 'Data tidak lengkap', 'red');
            $this->redirect();
        }

        if ($this->userModel->approveUser($id, $status)) {
            Flasher::setFlash('Berhasil', 'User berhasil disetujui', 'green');
        } else {
            Flasher::setFlash('Gagal', 'Gagal menyetujui user', 'red');
        }

        $this->redirect();
    }


    // ================================
    // RESET PASSWORD
    // ================================
    public function resetPassword()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return;
        }

        $id          = $_POST['user_id'] ?? null;
        $newPassword = $_POST['new_password'] ?? null;

        if (!$id || !$newPassword) {
            Flasher::setFlash('Gagal', 'Parameter tidak lengkap', 'red');
            $this->redirect();
        }

        if (strlen($newPassword) < 6) {
            Flasher::setFlash('Gagal', 'Password minimal 6 karakter', 'red');
            $this->redirect();
        }

        $user = $this->userModel->getUserById($id);

        if (!$user) {
            Flasher::setFlash('Gagal', 'User tidak ditemukan', 'red');
            $this->redirect();
        }

        if ($this->userModel->resetPassword($id, $newPassword) > 0) {
            Flasher::setFlash('Berhasil', 'Password berhasil direset', 'green');
        } else {
            Flasher::setFlash('Gagal', 'Password gagal direset', 'red');
        }

        $this->redirect();
    }


    // ================================
    // EDIT USER
    // ================================
    public function edit()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return;
        }

        $id = $_POST['user_id'] ?? null;

        if (!$id) {
            Flasher::setFlash('Gagal', 'ID tidak ditemukan', 'red');
            $this->redirect();
        }

        $data = [
            'nama'              => $_POST['nama'] ?? '',
            'nim'               => $_POST['nim'] ?? '',
            'jurusan'           => $_POST['jurusan'] ?? '',
            'angkatan'          => $_POST['angkatan'] ?? '',
            'status_keanggotaan' => $_POST['status_keanggotaan'] ?? 'pending',
            'is_approved'       => isset($_POST['is_approved']) ? 1 : 0
        ];

        $result = $this->userModel->updateUser($id, $data);

        // Handle return model fleksibel
        if (is_array($result)) {

            if ($result['success'] && $result['changed']) {
                Flasher::setFlash('Berhasil', $result['message'], 'green');
            } elseif (!$result['changed']) {
                Flasher::setFlash('Info', 'Tidak ada perubahan', 'yellow');
            } else {
                Flasher::setFlash('Gagal', $result['message'], 'red');
            }
        } else {

            if ($result > 0) {
                Flasher::setFlash('Berhasil', 'User berhasil diupdate', 'green');
            } else {
                Flasher::setFlash('Info', 'Tidak ada perubahan', 'yellow');
            }
        }

        $this->redirect();
    }


    // ================================
    // HELPER REDIRECT
    // ================================
    private function redirect()
    {
        header('Location: ' . BASEURL . '/super/Users');
        exit;
    }
}
