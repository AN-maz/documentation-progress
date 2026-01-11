<?php
class NewsController extends AdminController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data = [
            'judul' => 'News Management',
            'news' => $this->model('News_model')->getAllNews()
        ];
        $this->view('dashboard/admin/news', $data);
    }

    public function addNews()
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $gambar = null;

            // Handle file upload
            if (isset($_FILES['gambar']) && $_FILES['gambar']['error'] === UPLOAD_ERR_OK) {
                $uploadResult = Upload::uploadImage($_FILES['gambar']);
                if ($uploadResult['success']) {
                    $gambar = $uploadResult['filename'];
                } else {
                    Flasher::setFlash('Gagal', $uploadResult['message'], 'red');
                    header('Location: ' . BASEURL . '/dashboard/news');
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
                Flasher::setFlash('Berhasil', 'News berhasil ditambahkan', 'green');
            } else {
                $msg = is_array($res) && isset($res['message']) ? $res['message'] : 'News gagal ditambahkan';
                Flasher::setFlash('Gagal', $msg, 'red');
            }

            header('Location: ' . BASEURL . '/dashboard/news');
            exit;
        }
    }

    public function editNews($id = null)
    {
        // Guard: jika ID tidak diberikan
        if (is_null($id)) {
            Flasher::setFlash('Invalid request', 'ID berita tidak diberikan.', 'red');
            header('Location: ' . BASEURL . '/dashboard/news');
            exit;
        }

        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        $newsModel = $this->model('News_model');

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Ambil data berita yang lama
            $existingNews = $newsModel->getNewsById($id);
            $gambar = $existingNews['gambar'] ?? $existingNews['image'] ?? null;

            // Cek apakah user mengunggah gambar baru
            if ($_FILES['gambar']['error'] !== 4) { // 4 berarti tidak ada file yang diunggah
                $uploadResult = Upload::uploadImage($_FILES['gambar'], $gambar);
                if ($uploadResult['success']) {
                    $gambar = $uploadResult['filename'];
                } else {
                    Flasher::setFlash('Gagal', $uploadResult['message'], 'red');
                    header('Location: ' . BASEURL . '/dashboard/news');
                    exit;
                }
            }

            $data = [
                'judul' => $_POST['judul'],
                'konten' => $_POST['konten'],
                'gambar' => $gambar,
                'created_at' => $_POST['created_at']
            ];

            if ($newsModel->updateNews($id, $data) > 0) {
                Flasher::setFlash('Berhasil', 'News berhasil diupdate', 'green');
            } else {
                Flasher::setFlash('Gagal', 'News gagal diupdate atau tidak ada perubahan', 'red');
            }
            header('Location: ' . BASEURL . '/dashboard/news');
            exit;
        } else {
            $data['judul'] = 'Edit News';
            $data['user'] = $user;
            $data['news'] = $newsModel->getNewsById($id);
            $data['active_page'] = 'news';
            $this->view('dashboard/admin/editNews', $data);
        }
    }

    public function deleteNews($id)
    {
        $userModel = $this->model('User_model');
        $user = $userModel->getUserById($_SESSION['user_id']);

        if ($user['role'] != 'admin') {
            header('Location: ' . BASEURL . '/dashboard');
            exit;
        }

        // Get news data to delete image
        $newsModel = $this->model('News_model');
        $news = $newsModel->getNewsById($id);

        if ($news && isset($news['gambar']) && $news['gambar']) {
            Upload::deleteImage($news['gambar']);
        }

        if ($newsModel->deleteNews($id) > 0) {
            Flasher::setFlash('Berhasil', 'News berhasil dihapus', 'green');
        } else {
            Flasher::setFlash('Gagal', 'News gagal dihapus', 'red');
        }
        header('Location: ' . BASEURL . '/dashboard/news');
        exit;
    }
}
