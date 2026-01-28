<?php

class AccessControl {

    public static function check() {
        if (!isset($_SESSION['user_id'])) {
            header('Location: ' . BASEURL . '/auth');
            exit;
        } 
    }

    // Cek apakah user adalah salah satu dari tipe admin
    public static function isAnyAdmin() {
        $role = $_SESSION['user_role'] ?? '';
        return in_array($role, ADMIN_ROLES); // Menggunakan define constant di config
    }

    // Middleware khusus Super Admin
    public static function allowSuperAdmin() {
        self::check();
        if ($_SESSION['user_role'] !== 'super_admin') {
            Flasher::setFlash('Akses ditolak! Halaman ini khusus Super Admin.', 'Dilarang', 'red');
            header('Location: ' . BASEURL . '/home'); // Tendang balik
            exit;
        }
    }

    // Middleware Admin Edu (Super Admin BOLEH masuk juga)
    public static function allowEdu() {
        self::check();
        $role = $_SESSION['user_role'];
        if ($role !== 'admin_edu' && $role !== 'super_admin') {
            Flasher::setFlash('Anda bukan Admin Education.', 'Akses Ditolak', 'red');
            header('Location: ' . BASEURL . '/home');
            exit;
        }
    }

    // Middleware Admin SDM (Super Admin BOLEH masuk juga)
    public static function allowSdm() {
        self::check();
        $role = $_SESSION['user_role'];
        if ($role !== 'admin_sdm' && $role !== 'super_admin') {
            Flasher::setFlash('Anda bukan Admin SDM/HRD.', 'Akses Ditolak', 'red');
            header('Location: ' . BASEURL . '/home');
            exit;
        }
    }
}