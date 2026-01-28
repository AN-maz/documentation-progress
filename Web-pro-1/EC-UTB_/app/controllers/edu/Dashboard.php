<?php
class Dashboard extends Controller
{
    public function __construct()
    {
        AccessControl::allowEdu(); 
    }

    public function index()
    {
        $data['judul'] = 'Dashboard Edukasi';
        $data['active_page'] = 'dashboard';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        
        $data['recent_agendas'] = $this->model('Agenda_model')->getLatestAgendas(5);
        $data['total_news'] = $this->model('News_model')->countAllNews();

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/edu/sidebar', $data);
        $this->view('templates/adminLayout/edu/mobileNav', $data);
        $this->view('dashboard_/admin/edu/index', $data);
        $this->view('templates/FooterDash');
    }
}
