<?php

class News extends ApiController
{
    public function index($id = null)
    {
        $newsModel = $this->model('News_model');
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case 'GET':
                if ($id) {
                    $news = $newsModel->getNewsById($id);
                    if ($news) {
                        $this->response($news);
                    } else {
                        $this->response(null, 'News not found', 404);
                    }
                } else {
                    $data = $newsModel->getAllNews();

                    $this->response($data, 'List of all news', 200);
                }
                break;

            case 'POST':
                $input = $this->input();

                // Validasi Input
                if (!isset($input['judul']) || !isset($input['konten'])) {
                    $this->response(null, 'judul and konten are required', 400);
                }

                $data = [
                    'judul' => $input['judul'],
                    'konten' => $input['konten'],
                    'gambar' => $input['gambar'] ?? null,
                    'author_id' => $input['author_id'] ?? 1
                ];

                $res = $newsModel->addNews($data);
                if (is_array($res) && isset($res['success']) && $res['success']) {
                    $this->response(['id' => $res['id']], 'News created successfully', 201);
                } else {
                    $message = is_array($res) && isset($res['message']) ? $res['message'] : 'Failed to create news';
                    $this->response(null, $message, 500);
                }
                break;

            case 'PUT':
                if (!$id) {
                    $this->response(null, 'News ID is required', 400);
                }

                $input = $this->input();
                $existingNews = $newsModel->getNewsById($id);

                if (!$existingNews) {
                    $this->response(null, 'News not found', 404);
                }

                $data = [
                    'judul' => $input['judul'] ?? $existingNews['judul'],
                    'konten' => $input['konten'] ?? $existingNews['konten'],
                    'gambar' => $input['gambar'] ?? $existingNews['gambar']
                ];

                if ($newsModel->updateNews($id, $data) > 0) {
                    $this->response($data, 'News updated successfully');
                } else {
                    $this->response(null, 'Failed to update news', 500);
                }
                break;

            case 'DELETE':
                if (!$id) {
                    $this->response(null, 'News ID is required', 400);
                }

                $news = $newsModel->getNewsById($id);
                if (!$news) {
                    $this->response(null, 'News not found', 404);
                }

                // Hapus gambar jika ada (Sesuai kodemu sebelumnya)
                if (isset($news['gambar']) && $news['gambar']) {
                    require_once __DIR__ . '/../../helper/Upload.php';
                    Upload::deleteImage($news['gambar']);
                }

                if ($newsModel->deleteNews($id) > 0) {
                    $this->response(null, 'News deleted successfully');
                } else {
                    $this->response(null, 'Failed to delete news', 500);
                }
                break;

            default:
                $this->response(null, 'Method not allowed', 405);
                break;
        }
    }
}
