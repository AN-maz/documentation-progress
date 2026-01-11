<?php

class UserController extends AdminController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        $data['judul'] = 'Account Management';
        $data['user'] = $user;
        $data['users'] = $userModel->getAllUsers();
        $this->view('dashboard/admin/accounts', $data);
    }

    public function approveUser()
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['user_id'] ?? null;
            $status = $_POST['status'] ?? null;

            if (!$id || !$status) {
                Flasher::setFlash('Gagal', 'Parameter tidak lengkap.', 'red');
            } else {
                $existing = $userModel->getUserById($id);
                if (!$existing) {
                    Flasher::setFlash('Gagal', 'User tidak ditemukan.', 'red');
                } else {
                    $res = $userModel->approveUser($id, $status);
                    if (is_array($res)) {
                        if ($res['success']) {
                            Flasher::setFlash('Berhasil', $res['message'], 'green');
                        } else {
                            Flasher::setFlash('Gagal', $res['message'], 'red');
                        }
                    } else {
                        // Backwards compatibility
                        if ($res > 0) {
                            Flasher::setFlash('Berhasil', 'User berhasil disetujui', 'green');
                        } else {
                            Flasher::setFlash('Gagal', 'User gagal disetujui', 'red');
                        }
                    }
                }
            }
        }
        header('Location: ' . BASEURL . '/dashboard/accounts');
        exit;
    }

    public function resetPassword()
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['user_id'] ?? null;
            $newPassword = $_POST['new_password'] ?? null;

            if (!$id || !$newPassword) {
                Flasher::setFlash('Gagal', 'Parameter tidak lengkap.', 'red');
            } else {
                $existing = $userModel->getUserById($id);
                if (!$existing) {
                    Flasher::setFlash('Gagal', 'User tidak ditemukan.', 'red');
                } else {
                    if (strlen($newPassword) < 6) {
                        Flasher::setFlash('Gagal', 'Password minimal 6 karakter.', 'red');
                    } elseif ($userModel->resetPassword($id, $newPassword) > 0) {
                        Flasher::setFlash('Berhasil', 'Password berhasil direset', 'green');
                    } else {
                        Flasher::setFlash('Gagal', 'Password gagal direset', 'red');
                    }
                }
            }
        }
        header('Location: ' . BASEURL . '/dashboard/accounts');
        exit;
    }

    public function editUser($id)
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $data = [
                'nama' => $_POST['nama'],
                'nim' => $_POST['nim'],
                'jurusan' => $_POST['jurusan'],
                'status_keanggotaan' => $_POST['status_keanggotaan'] ?? 'pending',
                'is_approved' => isset($_POST['is_approved']) ? 1 : 0
            ];

            $res = $userModel->updateUser($id, $data);

            if (is_array($res)) {
                if ($res['success'] && $res['changed']) {
                    Flasher::setFlash('Berhasil', $res['message'], 'green');
                } elseif (!$res['success'] && !$res['changed']) {
                    Flasher::setFlash('Peringatan', $res['message'], 'yellow');
                } else {
                    // generic fallback
                    Flasher::setFlash('Gagal', 'User gagal diupdate', 'red');
                }
            } else {
                // Backwards compatibility
                if ($res > 0) {
                    Flasher::setFlash('Berhasil', 'User berhasil diupdate', 'green');
                } else {
                    Flasher::setFlash('Peringatan', 'Tidak ada perubahan yang dilakukan.', 'yellow');
                }
            }
            header('Location: ' . BASEURL . '/dashboard/accounts');
            exit;
        }
    }
}
