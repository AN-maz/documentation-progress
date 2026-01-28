<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/helper/Cors.php';
require_once __DIR__ . '/core/App.php';
require_once __DIR__ . '/core/Controller.php';
require_once __DIR__ . '/core/Constant.php';
require_once __DIR__ . '/core/Database.php';
require_once __DIR__ . '/helper/Flasher.php';
require_once __DIR__ . '/helper/Upload.php';
require_once __DIR__ . '/core/ApiController.php';
require_once __DIR__ . '/helper/AccessControl.php';
require_once __DIR__ . '/core/AdminController.php';

// Enhanced Session Security Configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 0); // Set to 1 if using HTTPS
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.use_strict_mode', 1);
ini_set('session.gc_maxlifetime', 3600); // 1 hour
ini_set('session.cookie_lifetime', 3600); // 1 hour

// Start secure session
if (session_status() === PHP_SESSION_NONE) {

    session_start();

    if(!isset($_SESSION['user_id']) && isset($_COOKIE['remember_token'])){
        require_once __DIR__ . '/models/User_model.php';
        $userModel = new User_model();
        $tokenhash = hash('sha256', $_COOKIE['remember_token']);
        $user = $userModel->getUserByToken($tokenhash);

        if($user){

            if(strtotime($user['cookie_expiry']) > time()){
                $_SESSION['user_id'] = $user['id_user'];
                $_SESSION['user_role'] = $user['role'];
                $_SESSION['user_nama'] = $user['nama'];
                $_SESSION['user_status'] = $user['status_keanggotaan'];

                session_regenerate_id(true);
            }else{
                $userModel->deleteRemmeberToken($user['id_akun']);
                setcookie('remember_token','',time() - 3600,'/');
            }
        }
    }

    // Regenerate session ID periodically to prevent session fixation
    if (!isset($_SESSION['created'])) {
        $_SESSION['created'] = time();
    } else if (time() - $_SESSION['created'] > 1800) { // 30 minutes
        session_regenerate_id(true);
        $_SESSION['created'] = time();
    }
}
