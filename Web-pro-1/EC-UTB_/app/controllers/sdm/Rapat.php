<?php

class Rapat extends Controller
{
    public function __construct()
    {
        AccessControl::allowSdm();
    }

    public function index()
    {
        $data['judul'] = 'Rapat Internal';
        $data['active_page'] = 'rapat';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);

        // Filter: Hanya ambil agenda rapat_internal
        $data['agenda_list'] = $this->model('Agenda_model')->getAllAgenda('rapat_internal');

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/sdm/sidebar', $data);
        $this->view('templates/adminLayout/sdm/mobileNav', $data);
        $this->view('dashboard_/admin/sdm/rapat/index', $data);
        $this->view('templates/FooterDash');
    }

    public function detail($id)
    {
        $agenda = $this->model('Agenda_model')->getAgendaById($id);

        if (!$agenda || $agenda['kategori'] != 'rapat_internal') {
            header('Location: ' . BASEURL . '/sdm/rapat');
            exit;
        }

        $data['judul'] = 'Detail Rapat';
        $data['active_page'] = 'rapat';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        $data['agenda'] = $agenda;
        $data['kehadiran'] = $this->model('Agenda_model')->getKehadiranByAgenda($id);

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/sdm/sidebar', $data);
        $this->view('templates/adminLayout/sdm/mobileNav', $data);
        $this->view('dashboard_/admin/sdm/rapat/detail', $data);
        $this->view('templates/FooterDash');
    }

    public function add()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $token = strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));

            $data = [
                'judul'         => $_POST['judul'],
                'deskripsi'     => $_POST['deskripsi'],
                'lokasi'        => $_POST['lokasi'],
                'tanggal'       => $_POST['tanggal'],
                'waktu_mulai'   => $_POST['waktu_mulai'],
                'token_absen'   => $token,
                'file_materi'   => null,
                'kategori'      => 'rapat_internal', // Hardcode kategori
                'notulensi'     => $_POST['notulensi'] ?? null
            ];


            if (isset($_FILES['file_materi']) && $_FILES['file_materi']['error'] === UPLOAD_ERR_OK) {
                $upload = $this->uploadMateri($_FILES['file_materi']);
                if ($upload['success']) {
                    $data['file_materi'] = $upload['fileName'];
                } else {
                    Flasher::setFlash($upload['message'], 'Gagal Upload', 'red');
                    header('Location: ' . BASEURL . '/sdm/rapat');
                    exit;
                }
            }

            if ($this->model('Agenda_model')->addAgenda($data) > 0) {
                Flasher::setFlash('Jadwal rapat berhasil dibuat.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Gagal membuat jadwal rapat.', 'Error', 'red');
            }

            header('Location: ' . BASEURL . '/sdm/rapat');
            exit;
        }
    }

    public function update_rapat()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id_agenda = $_POST['id_agenda'];
            $data = [
                'id_agenda' => $id_agenda,
                'notulensi' => $_POST['notulensi']
            ];

            if (isset($_FILES['file_materi']) && $_FILES['file_materi']['error'] === UPLOAD_ERR_OK) {
                $upload = $this->uploadMateri($_FILES['file_materi']);
                if ($upload['success']) {
                    $data['file_materi'] = $upload['fileName'];
                    // Hapus file lama
                    $agendaLama = $this->model('Agenda_model')->getAgendaById($id_agenda);
                    if ($agendaLama['file_materi']) {
                        $pathLama = '../public/materi/' . $agendaLama['file_materi'];
                        if (file_exists($pathLama)) unlink($pathLama);
                    }
                } else {
                    Flasher::setFlash($upload['message'], 'Gagal Upload', 'red');
                    header('Location: ' . BASEURL . '/sdm/rapat/detail/' . $id_agenda);
                    exit;
                }
            }

            if ($this->model('Agenda_model')->updateMateriRapat($data) > 0) {
                Flasher::setFlash('Notulensi berhasil diperbarui.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Tidak ada perubahan disimpan.', 'Info', 'blue');
            }

            header('Location: ' . BASEURL . '/sdm/rapat/detail/' . $id_agenda);
            exit;
        }
    }

    public function absen_manual()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $data = [
                'id_agenda' => $_POST['id_agenda'],
                'id_user'   => $_POST['id_user']
            ];

            if ($this->model('Agenda_model')->submitAbsenManual($data)) {
                Flasher::setFlash('Member berhasil diabsenkan.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Gagal absen (Mungkin sudah hadir).', 'Error', 'red');
            }

            header('Location: ' . BASEURL . '/sdm/rapat/detail/' . $data['id_agenda']);
            exit;
        }
    }

    public function delete_absensi($id_absensi, $id_agenda)
    {
        if ($this->model('Agenda_model')->deleteAbsensi($id_absensi) > 0) {
            Flasher::setFlash('Data absensi berhasil dihapus.', 'Berhasil', 'green');
        } else {
            Flasher::setFlash('Gagal menghapus data absensi.', 'Error', 'red');
        }
        header('Location: ' . BASEURL . '/sdm/rapat/detail/' . $id_agenda);
        exit;
    }

    // --- Helper Upload Materi ---
    private function uploadMateri($file)
    {
        $fileName = $file['name'];
        $fileSize = $file['size'];
        $tmpName  = $file['tmp_name'];

        $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
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
