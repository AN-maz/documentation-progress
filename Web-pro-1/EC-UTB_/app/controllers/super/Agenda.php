<?php

class Agenda extends Controller
{
    public function __construct()
    {
        // HAK AKSES KHUSUS SUPER ADMIN
        AccessControl::allowSuperAdmin();
    }

    public function index()
    {
        $data['judul'] = 'All Agenda Management';
        $data['active_page'] = 'agenda';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);

        // Super Admin melihat SEMUA agenda (Umum & Rapat)
        // Jika ingin hanya 'umum', ubah jadi: getAllAgenda('umum')
        $data['agenda_list'] = $this->model('Agenda_model')->getAllAgenda(); 

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/super/sidebar', $data);
        $this->view('templates/adminLayout/super/mobileNav', $data);
        $this->view('dashboard_/admin/super/agenda/index', $data);
        $this->view('templates/FooterDash'); //
    }

    public function detail($id)
    {
        $agenda = $this->model('Agenda_model')->getAgendaById($id);

        if (!$agenda) {
            Flasher::setFlash('Agenda tidak ditemukan.', 'Error', 'red');
            header('Location: ' . BASEURL . '/super/agenda');
            exit;
        }

        $data['judul'] = 'Detail Agenda';
        $data['active_page'] = 'agenda';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        $data['agenda'] = $agenda;
        $data['kehadiran'] = $this->model('Agenda_model')->getKehadiranByAgenda($id);

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/super/sidebar', $data);
        $this->view('templates/adminLayout/super/mobileNav', $data);
        $this->view('dashboard_/admin/super/agenda/detail', $data); 
        $this->view('templates/FooterDash');
    }

    public function add()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Generate Token Random
            $token = strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));
            $kategori = $_POST['kategori'] ?? 'umum'; 

            $data = [
                'judul'         => $_POST['judul'],
                'deskripsi'     => $_POST['deskripsi'],
                'lokasi'        => $_POST['lokasi'],
                'tanggal'       => $_POST['tanggal'],
                'waktu_mulai'   => $_POST['waktu_mulai'],
                'token_absen'   => $token,
                'file_materi'   => null,
                'kategori'      => $kategori,
                'notulensi'     => $_POST['notulensi'] ?? null
            ];

            // Handle Upload File Materi
            if (isset($_FILES['file_materi']) && $_FILES['file_materi']['error'] === UPLOAD_ERR_OK) {
                $upload = $this->uploadMateri($_FILES['file_materi']);
                if ($upload['success']) {
                    $data['file_materi'] = $upload['fileName'];
                } else {
                    Flasher::setFlash($upload['message'], 'Gagal Upload', 'red');
                    header('Location: ' . BASEURL . '/super/agenda');
                    exit;
                }
            }

            if ($this->model('Agenda_model')->addAgenda($data) > 0) {
                Flasher::setFlash('Agenda berhasil dibuat.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Gagal membuat agenda.', 'Error', 'red');
            }

            header('Location: ' . BASEURL . '/super/agenda');
            exit;
        }
    }

    public function toggle_status($id, $currentStatus)
    {
        $newStatus = ($currentStatus == 'buka') ? 'tutup' : 'buka';

        if ($this->model('Agenda_model')->updateStatusAgenda($id, $newStatus) > 0) {
            $pesan = ($newStatus == 'tutup') ? 'Agenda ditutup. Absensi dimatikan.' : 'Agenda dibuka kembali.';
            Flasher::setFlash($pesan, 'Status Update', 'green');
        } else {
            Flasher::setFlash('Gagal mengubah status.', 'Error', 'red');
        }

        header('Location: ' . BASEURL . '/super/agenda/detail/' . $id);
        exit;
    }

    public function delete($id)
    {
        $agenda = $this->model('Agenda_model')->getAgendaById($id);

        if ($this->model('Agenda_model')->deleteAgenda($id) > 0) {
            // Hapus file fisik materi jika ada
            if ($agenda['file_materi']) {
                $path = '../public/materi/' . $agenda['file_materi'];
                if (file_exists($path)) unlink($path);
            }

            Flasher::setFlash('Agenda berhasil dihapus.', 'Berhasil', 'green');
        } else {
            Flasher::setFlash('Gagal menghapus agenda.', 'Error', 'red');
        }

        header('Location: ' . BASEURL . '/super/agenda');
        exit;
    }

    // --- Helper Upload Private (Biar tidak perlu file external) ---
    private function uploadMateri($file)
    {
        $fileName = $file['name'];
        $fileSize = $file['size'];
        $tmpName  = $file['tmp_name'];

        $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        // Support Markdown dan PDF
        if ($ext != 'md' && $ext != 'pdf') {
            return ['success' => false, 'message' => 'Hanya file Markdown (.md) atau PDF yang diperbolehkan!'];
        }

        if ($fileSize > 5000000) {
            return ['success' => false, 'message' => 'Ukuran file terlalu besar (Max 5MB)'];
        }

        $newFileName = 'materi-' . uniqid() . '.' . $ext;
        $targetDir = '../public/materi/';

        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        if (move_uploaded_file($tmpName, $targetDir . $newFileName)) {
            return ['success' => true, 'fileName' => $newFileName];
        } else {
            return ['success' => false, 'message' => 'Gagal upload file materi.'];
        }
    }
}