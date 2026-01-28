<?php
class Auth extends Controller
{

    public function index()
    {
        if (isset($_SESSION['user_id'])) {
            $this->redirectBasedOnRole($_SESSION['user_role']);
        }

        $data['judul'] = 'Login';
        $this->view('auth/login', $data);
    }

    public function login()
    {

        if (!isset($_POST['email']) || !isset($_POST['password'])) {
            $this->index();
            return;
        }

        $user = $this->model('User_model')->getUserByEmail($_POST['email']);

        if ($user && password_verify($_POST['password'], $user['password'])) {

            // Cek Approval User Biasa
            if ($user['role'] == 'user' && $user['is_approved'] == 0) {
                Flasher::setFlash('Akun belum disetujui Admin.', 'Silahkan tunggu.', 'yellow');
                header('Location: ' . BASEURL . '/auth');
                exit;
            }
            
            // Set Session
            $_SESSION['user_id'] = $user['id_user'];
            $_SESSION['user_role'] = $user['role'];
            $_SESSION['user_nama'] = $user['nama'];
            $_SESSION['user_status'] = $user['status_keanggotaan']; 

            // Logic Remember Me
            if (isset($_POST['remember'])) {
                $token = bin2hex(random_bytes(32));
                $tokenHash = hash('sha256', $token);
                $expiry = date('Y-m-d H:i:s', time() + (60 * 60 * 24 * 30));

                $this->model('User_model')->UpdateRememberToken($user['id_akun'], $tokenHash, $expiry);

                setcookie('remember_token', $token, [
                    'expires' => time() + (60 * 60 * 24 * 30),
                    'path' => '/',
                    'httponly' => true,
                    'samesite' => 'Strict'
                ]);
            }

            // --- KEAMANAN ---
            session_regenerate_id(true);
            $this->redirectBasedOnRole($user['role']);
            
        } else {
            // Login Gagal
            Flasher::setFlash('Email atau Password Salah.', 'Coba lagi.', 'red');
            header('Location: ' . BASEURL . '/auth');
            exit;
        }
    }

    public function register()
    {
        $data['judul'] = 'Register';
        $this->view('auth/register', $data);
    }

    public function processRegister()
    {
        if ($this->model('User_model')->registerUser($_POST) > 0) {
            Flasher::setFlash('Berhasil Mendaftar!', 'Tunggu persetujuan Admin.', 'green');
            header('Location: ' . BASEURL . '/auth');
            exit;
        } else {
            Flasher::setFlash('Gagal Mendaftar.', 'Email/NIM mungkin sudah ada.', 'red');
            header('Location: ' . BASEURL . '/auth/register');
            exit;
        }
    }

    public function logout()
    {
        if (isset($_SESSION['user_id'])) {
            $user = $this->model('User_model')->getUserById($_SESSION['user_id']);
            if ($user) {
                $this->model('User_model')->deleteRemmeberToken($user['id_akun']); 
            }
        }

        if (isset($_COOKIE['remember_token'])) {
            setcookie('remember_token', '', time() - 3600, '/');
        }

        $_SESSION = [];
        session_unset();
        session_destroy();

        header('Location: ' . BASEURL . '/home');
        exit;
    }

    // Helper Function Private
    private function redirectBasedOnRole($role)
    {
        switch ($role) {
            case 'super_admin':
                header('Location: ' . BASEURL . '/super/dashboard');
                break;

            case 'admin_edu':
                header('Location: ' . BASEURL . '/edu/dashboard');
                break;

            case 'admin_sdm':
                header('Location: ' . BASEURL . '/sdm/dashboard');
                break;
            
            case 'user':
                header('Location: ' . BASEURL . '/DashboardUsers'); 
                break;

            default:
                header('Location: ' . BASEURL . '/home');
                break;
        }
        exit;
    }
}