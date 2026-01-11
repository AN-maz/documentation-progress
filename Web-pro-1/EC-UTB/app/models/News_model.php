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
        $this->db->query('SELECT n.id_post, n.judul as title, n.konten as content, n.gambar as gambar, n.gambar as image, n.created_at, u.nama as author_name 
                          FROM ' . $this->table . ' n 
                          LEFT JOIN users u ON n.author_id = u.id_akun 
                          ORDER BY n.created_at DESC');

        return $this->db->resultSet();
    }

    public function getNewsById($id)
    {
        // Perbaikan: n.id_posts jadi n.id_post
        $this->db->query('SELECT n.id_post, n.judul as title, n.konten as content, n.gambar as gambar, n.gambar as image, n.created_at, u.nama as author_name 
                          FROM ' . $this->table . ' n 
                          LEFT JOIN users u ON n.author_id = u.id_akun 
                          WHERE n.id_post = :id');
        $this->db->bind('id', $id);
        return $this->db->single();
    }

    public function addNews($data)
    {
        // Use IdGenerator to create patterned id_post (e.g., NWS-001)
        require_once __DIR__ . '/../helper/IdGenerator.php';
        $gen = IdGenerator::generateId($this->db, $this->table, 'id_post', 'NWS', 3);
        if (!$gen['success']) {
            // Return structured failure so callers can show an appropriate message
            return ['success' => false, 'message' => $gen['message'] ?? 'Gagal menghasilkan ID.'];
        }

        $id_post = $gen['id'];

        $query = "INSERT INTO " . $this->table . " (id_post, judul, konten, gambar, author_id, created_at) 
                  VALUES (:id_post, :judul, :konten, :gambar, :author_id, :created_at)";
        $this->db->query($query);
        $this->db->bind('id_post', $id_post);
        $this->db->bind('judul', htmlspecialchars($data['judul']));
        $this->db->bind('konten', htmlspecialchars($data['konten']));
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
        // Perbaikan: WHERE id jadi WHERE id_post
        $query = "UPDATE " . $this->table . " SET judul = :judul, konten = :konten, gambar = :gambar, created_at = :created_at 
                  WHERE id_post = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        $this->db->bind('judul', htmlspecialchars($data['judul']));
        $this->db->bind('konten', htmlspecialchars($data['konten']));
        $this->db->bind('gambar', $data['gambar'] ?? null);
        $this->db->bind('created_at', $data['created_at']);
        $this->db->execute();
        return $this->db->rowCount();
    }

    public function deleteNews($id)
    {
        // Perbaikan: WHERE id jadi WHERE id_post
        $query = "DELETE FROM " . $this->table . " WHERE id_post = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        $this->db->execute();
        return $this->db->rowCount();
    }
}