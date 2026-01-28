<?php

class News_model
{
    private $table = 'posts';
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getAllNews()
    {
        $this->db->query('SELECT n.id_post, n.judul as title, n.slug as slug, n.konten as content, n.gambar as image, n.created_at, u.nama as author_name 
                          FROM ' . $this->table . ' n 
                          LEFT JOIN users u ON n.author_id = u.id_akun 
                          ORDER BY n.created_at DESC');
        return $this->db->resultSet();
    }

    public function getNewsById($id)
    {
        $this->db->query('SELECT n.id_post, n.judul as title, n.slug as slug, n.konten as content, n.gambar as gambar, n.gambar as image, n.created_at, u.nama as author_name 
                          FROM ' . $this->table . ' n 
                          LEFT JOIN users u ON n.author_id = u.id_akun 
                          WHERE n.id_post = :id');
        $this->db->bind('id', $id);
        return $this->db->single();
    }

    public function addNews($data)
    {
        require_once __DIR__ . '/../helper/IdGenerator.php';
        require_once __DIR__ . '/../helper/SlugHelper.php';

        $slug = $this->uniqueSlug(generateSlug($data['judul']));
        $gen = IdGenerator::generateId($this->db, $this->table, 'id_post', 'NWS', 3);

        if (!$gen['success']) {
            return ['success' => false, 'message' => $gen['message'] ?? 'Gagal menghasilkan ID.'];
        }

        $id_post = $gen['id'];

        $query = "INSERT INTO " . $this->table . " (id_post, judul, slug, konten, gambar, author_id, created_at) 
                  VALUES (:id_post, :judul, :slug, :konten, :gambar, :author_id, :created_at)";
        
        $this->db->query($query);
        $this->db->bind('id_post', $id_post);
        $this->db->bind('judul', htmlspecialchars($data['judul']));
        $this->db->bind('slug', $slug);
        $this->db->bind('konten', $data['konten']); // Konten HTML (Wysiwyg) biasanya jangan di-htmlspecialchars
        $this->db->bind('gambar', $data['gambar'] ?? null);
        $this->db->bind('author_id', $data['author_id']);
        $this->db->bind('created_at', $data['created_at']);
        
        $this->db->execute();

        $rows = $this->db->rowCount();
        if ($rows > 0) {
            return ['success' => true, 'id' => $id_post, 'rows' => $rows];
        }

        return ['success' => false, 'message' => 'Gagal memasukkan data ke database.'];
    }

    public function updateNews($id, $data)
    {
        // PENTING: Panggil helper slug di sini
        require_once __DIR__ . '/../helper/SlugHelper.php';

        $slug = generateSlug($data['judul']);
        
        // PERBAIKAN UTAMA ADA DI SINI (Query Syntax)
        $query = "UPDATE " . $this->table . " 
                  SET judul = :judul, 
                      slug = :slug, 
                      konten = :konten, 
                      gambar = :gambar, 
                      created_at = :created_at 
                  WHERE id_post = :id";

        $this->db->query($query);
        
        $this->db->bind('id', $id);
        $this->db->bind('judul', htmlspecialchars($data['judul']));
        $this->db->bind('slug', $slug);
        $this->db->bind('konten', $data['konten']);
        $this->db->bind('gambar', $data['gambar'] ?? null);
        $this->db->bind('created_at', $data['created_at']);
        
        $this->db->execute();
        return $this->db->rowCount();
    }

    public function deleteNews($id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE id_post = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        $this->db->execute();
        return $this->db->rowCount();
    }

    private function uniqueSlug($slug)
    {
        $this->db->query("SELECT COUNT(*) as total FROM {$this->table} WHERE slug LIKE :slug");
        $this->db->bind('slug', $slug . '%');
        $count = $this->db->single()['total'];

        return $count ? $slug . '-' . ($count + 1) : $slug;
    }

    public function getNewsBySlug($slug)
    {
        $this->db->query("SELECT * FROM {$this->table} WHERE slug = :slug");
        $this->db->bind('slug', $slug);
        return $this->db->single();
    }

    public function getLatestNews($limit = 3)
    {
        $this->db->query("SELECT id_post, judul AS title, konten AS content, gambar AS image, created_at , slug AS slug
                          FROM {$this->table}
                          ORDER BY created_at DESC
                          LIMIT :limit");
        $this->db->bind('limit', (int)$limit, PDO::PARAM_INT);
        return $this->db->resultSet();
    }

    public function countAllNews()
    {
        $this->db->query('SELECT COUNT(*) as total FROM posts');
        return $this->db->single()['total'];
    }

    public function getNewsPerPage($start, $limit)
    {
        $this->db->query("SELECT * FROM posts ORDER BY created_at DESC LIMIT :start, :limit");
        $this->db->bind('start', $start, PDO::PARAM_INT); // Tambah PARAM_INT biar aman
        $this->db->bind('limit', $limit, PDO::PARAM_INT);
        return $this->db->resultSet();
    }
}