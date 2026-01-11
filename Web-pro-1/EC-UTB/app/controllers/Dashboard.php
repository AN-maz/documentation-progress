<?php

class Dashboard extends Controller
{

    public function __construct()
    {
        AccessControl::check();
    }

    public function index()
    {

        $user = $this->model('User_model')->getUserById($_SESSION['user_id']);

        $data = [
            'judul' => 'Dashboard',
            'active_page' => 'dashboard',
            'user' => $user
        ];

        if ($user['role'] == 'admin') {
            $data['news'] = $this->model('News_model')->getAllNews();
            $data['users'] = $this->model('User_model')->getAllUsers();

            $this->view('templates/tempDashAdmin/headerDashAdmin', $data);
            $this->view('dashboard/admin/index', $data);
        } else {
            $this->view('dashboard/user/index', $data);
        }
    }

    // Admin: News Management
    public function news()
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        $data['judul'] = 'News Management';
        $data['active_page'] = 'news';
        $data['user'] = $user;
        $data['news'] = $this->model('News_model')->getAllNews();

        $this->view('templates/tempDashAdmin/headerDashAdmin', $data);
        $this->view('dashboard/admin/news', $data);
    }


    // Admin: Account Management
    public function accounts()
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        $data['judul'] = 'Account Management';
        $data['active_page'] = 'accounts';
        $data['user'] = $user;
        $data['users'] = $userModel->getAllUsers();

        $this->view('templates/tempDashAdmin/headerDashAdmin', $data);
        $this->view('dashboard/admin/accounts', $data);
    }





    public function addNews()
    {
        require_once __DIR__ . '/admin/NewsController.php';
        $ctrl = new NewsController();
        $ctrl->addNews();
    }

    public function editNews($id = null)
    {
        require_once __DIR__ . '/admin/NewsController.php';
        $ctrl = new NewsController();
        $ctrl->editNews($id);
    }

    public function deleteNews($id = null)
    {
        require_once __DIR__ . '/admin/NewsController.php';
        $ctrl = new NewsController();
        $ctrl->deleteNews($id);
    }

    public function editUser($id = null)
    {
        require_once __DIR__ . '/admin/UserController.php';
        $ctrl = new UserController();
        $ctrl->editUser($id);
    }

    public function approveUser()
    {
        require_once __DIR__ . '/admin/UserController.php';
        $ctrl = new UserController();
        $ctrl->approveUser();
    }

    public function resetPassword()
    {
        require_once __DIR__ . '/admin/UserController.php';
        $ctrl = new UserController();
        $ctrl->resetPassword();
    }
}
