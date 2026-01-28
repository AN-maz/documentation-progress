<?php

class Dashboard extends Controller
{

    public function __construct()
    {
        AccessControl::allowSdm();
    }

    public function index()
    {
        $data['judul'] = 'SDM Admin Dashboard';
        $data['active_page'] = 'dashboard';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);

        // Data Statistik Global
        $data['news'] = $this->model('News_model')->getAllNews();
        $data['users'] = $this->model('User_model')->getAllUsers();

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/sdm/sidebar', $data);
        $this->view('templates/adminLayout/sdm/mobileNav', $data);
        $this->view('dashboard_/admin/sdm/index', $data);
        $this->view('templates/FooterDash');
    }
}
