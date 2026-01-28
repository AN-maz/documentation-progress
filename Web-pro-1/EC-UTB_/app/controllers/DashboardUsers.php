<?php

class DashboardUsers extends Controller
{
    public function __construct()
    {
        if (!isset($_SESSION['user_id'])) {
            header('Location: ' . BASEURL . '/login');
            exit;
        }
    }

    public function index()
    {
        $id_user = $_SESSION['user_id'];
        $user = $this->model('User_model')->getProfile($id_user);

        $data['judul'] = 'Dashboard User';
        $data['active_page'] = 'dashboard';
        $data['user'] = $user;

        // Statistik Kehadiran
        $data['total_agenda'] = $this->model('Agenda_model')->countUserAttendance($id_user, 'umum');

        // Khusus Pengurus: Hitung juga Rapat Internal
        if ($user['status_keanggotaan'] == 'pengurus') {
            $data['total_rapat'] = $this->model('Agenda_model')->countUserAttendance($id_user, 'rapat_internal');
        }

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/usersLayout/sidebar', $data);
        $this->view('templates/usersLayout/mobileNav', $data);
        $this->view('dashboard_/users/index', $data);
        $this->view('templates/FooterDash');
    }

    // --- MENU AGENDA (UMUM) ---
    public function agenda()
    {
        $data['judul'] = 'Agenda Kegiatan';
        $data['active_page'] = 'agenda';
        $data['user'] = $this->model('User_model')->getProfile($_SESSION['user_id']);

        // Ambil SEMUA agenda umum
        $data['agenda_list'] = $this->model('Agenda_model')->getAllAgenda('umum'); // Pastikan method ini filter 'umum'

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/usersLayout/sidebar', $data);
        $this->view('templates/usersLayout/mobileNav', $data);
        $this->view('dashboard_/users/agenda/index', $data);
        $this->view('templates/FooterDash');
    }

    public function agendaDetail($id)
    {
        $id_user = $_SESSION['user_id'];
        $agenda = $this->model('Agenda_model')->getAgendaById($id);

        if (!$agenda || $agenda['kategori'] != 'umum') {
            header('Location: ' . BASEURL . '/dashboard/agenda');
            exit;
        }

        $data['judul'] = $agenda['judul'];
        $data['active_page'] = 'agenda';
        $data['user'] = $this->model('User_model')->getProfile($id_user);
        $data['agenda'] = $agenda;

        $data['sudah_absen'] = $this->model('Agenda_model')->getUserAbsenceStatus($id, $id_user);

        $data['materi_content'] = $agenda['deskripsi'];

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/usersLayout/sidebar', $data);
        $this->view('templates/usersLayout/mobileNav', $data);
        $this->view('dashboard_/users/agenda/detail', $data);
        $this->view('templates/FooterDash');
    }

    // --- MENU RAPAT (KHUSUS PENGURUS) ---
    public function rapat()
    {
        $user = $this->model('User_model')->getProfile($_SESSION['user_id']);

        if ($user['status_keanggotaan'] != 'pengurus') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        $data['judul'] = 'Rapat Internal';
        $data['active_page'] = 'rapat';
        $data['user'] = $user;

        // Ambil agenda rapat_internal
        $data['agenda_list'] = $this->model('Agenda_model')->getAllAgenda('rapat_internal');

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/usersLayout/sidebar', $data);
        $this->view('templates/usersLayout/mobileNav', $data);
        $this->view('dashboard_/users/rapat/index', $data);
        $this->view('templates/FooterDash');
    }

    public function rapatDetail($id)
    {
        $user = $this->model('User_model')->getProfile($_SESSION['user_id']);

        if ($user['status_keanggotaan'] != 'pengurus') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        $agenda = $this->model('Agenda_model')->getAgendaById($id);
        if (!$agenda || $agenda['kategori'] != 'rapat_internal') {
            header('Location: ' . BASEURL . '/dashboard/rapat');
            exit;
        }

        $data['judul'] = 'Detail Rapat';
        $data['active_page'] = 'rapat';
        $data['user'] = $user;
        $data['agenda'] = $agenda;
        $data['sudah_absen'] = $this->model('Agenda_model')->getUserAbsenceStatus($id, $user['id_user']);

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/usersLayout/sidebar', $data);
        $this->view('templates/usersLayout/mobileNav', $data);
        $this->view('dashboard_/users/rapat/detail', $data);
        $this->view('templates/FooterDash');
    }

    // --- LOGIC SUBMIT ABSEN ---
    public function submit_absen()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $data = [
                'id_agenda'   => $_POST['id_agenda'],
                'id_user'     => $_SESSION['user_id'],
                'token_input' => trim(strtoupper($_POST['token']))
            ];

            $result = $this->model('Agenda_model')->submitAbsen($data);

            if ($result['status']) {
                Flasher::setFlash($result['pesan'], 'Berhasil', 'green');
            } else {
                Flasher::setFlash($result['pesan'], 'Gagal', 'red');
            }


            $agenda = $this->model('Agenda_model')->getAgendaById($data['id_agenda']);
            if ($agenda['kategori'] == 'rapat_internal') {
                header('Location: ' . BASEURL . '/dashboard/rapatDetail/' . $data['id_agenda']);
            } else {
                header('Location: ' . BASEURL . '/dashboard/agendaDetail/' . $data['id_agenda']);
            }
            exit;
        }
    }
}
