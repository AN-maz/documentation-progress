<?php

class News extends Controller
{
    public function __construct()
    {
        AccessControl::allowSuperAdmin();
    }

    public function index()
    {
        $data['judul'] = 'News Management';
        $data['active_page'] = 'news';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        $data['news'] = $this->model('News_model')->getAllNews();

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/super/sidebar', $data);
        $this->view('templates/adminLayout/super/mobileNav', $data);
        $this->view('dashboard_/admin/super/news/news', $data); 
        $this->view('templates/FooterDash'); //// Pastikan path view ini benar
    }

    public function add()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $user = $this->model('User_model')->getUserById($_SESSION['user_id']);
            $gambar = null;

            if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] === UPLOAD_ERR_OK) {
                // Gunakan Helper Upload yang sudah ada (atau buat private function seperti di Structure.php)
                // Asumsi Upload::uploadImage sudah support folder dinamis, kalau belum pakai cara manual
                $uploadResult = Upload::uploadImage($_FILES['gambar']); 
                if ($uploadResult['success']) {
                    $gambar = $uploadResult['filename'];
                } else {
                    Flasher::setFlash('Gagal Upload: ' . $uploadResult['message'], 'Error', 'red');
                    header('Location: ' . BASEURL . '/super/news');
                    exit;
                }
            }

            $data = [
                'judul' => $_POST['judul'],
                'konten' => $_POST['konten'],
                'gambar' => $gambar,
                'author_id' => $user['id_akun'],
                'created_at' => $_POST['created_at']
            ];

            $res = $this->model('News_model')->addNews($data);
            if (is_array($res) && isset($res['success']) && $res['success']) {
                Flasher::setFlash('News berhasil ditambahkan.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Gagal menambahkan news.', 'Error', 'red');
            }
            header('Location: ' . BASEURL . '/super/news');
            exit;
        }
    }

    public function edit($id)
    {
        // Menampilkan Form Edit
        $data['judul'] = 'Edit News';
        $data['active_page'] = 'news';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        $data['news'] = $this->model('News_model')->getNewsById($id);

        if (!$data['news']) {
            header('Location: ' . BASEURL . '/super/news');
            exit;
        }

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/super/sidebar', $data);
        $this->view('templates/adminLayout/super/mobileNav', $data);
        $this->view('dashboard_/admin/super/news/editNews', $data);
    }

    public function update($id)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $existingNews = $this->model('News_model')->getNewsById($id);
            $gambar = $existingNews['gambar'];

            if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] !== 4) {
                $uploadResult = Upload::uploadImage($_FILES['gambar'], $gambar);
                if ($uploadResult['success']) {
                    $gambar = $uploadResult['filename'];
                }
            }

            $data = [
                'judul' => $_POST['judul'],
                'konten' => $_POST['konten'],
                'gambar' => $gambar,
                'created_at' => $_POST['created_at']
            ];

            if ($this->model('News_model')->updateNews($id, $data) > 0) {
                Flasher::setFlash('News berhasil diupdate.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Tidak ada perubahan.', 'Info', 'yellow');
            }
            header('Location: ' . BASEURL . '/super/news');
            exit;
        }
    }

    public function delete($id)
    {
        $news = $this->model('News_model')->getNewsById($id);
        if ($news && $news['gambar']) {
            Upload::deleteImage($news['gambar']);
        }

        if ($this->model('News_model')->deleteNews($id) > 0) {
            Flasher::setFlash('News berhasil dihapus.', 'Berhasil', 'green');
        } else {
            Flasher::setFlash('Gagal menghapus news.', 'Error', 'red');
        }
        header('Location: ' . BASEURL . '/super/news');
        exit;
    }
}