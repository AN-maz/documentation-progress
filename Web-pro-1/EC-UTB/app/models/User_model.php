<?php

class User_model
{
    private $tableUsers = 'users';
    private $tableAkun = 'akun';
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    // Register User Baru (Insert ke tabel akun + users)
    public function registerUser($data)
    {
        try {
            // 1. Generate ID untuk akun
            $id_akun = $this->generateIdAkun();

            // 2. Hash password
            $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);

            // 3. Insert ke tabel akun
            $queryAkun = "INSERT INTO " . $this->tableAkun . " 
                        (id_akun, email, password, role, is_approved, cookie_token, cookie_expiry)
                      VALUES
                        (:id_akun, :email, :password, 'user', 0, '', '')";

            $this->db->query($queryAkun);
            $this->db->bind('id_akun', $id_akun);
            $this->db->bind('email', htmlspecialchars($data['email']));
            $this->db->bind('password', $password_hash);
            $this->db->execute();

            // 4. Insert ke tabel users
            $queryUsers = "INSERT INTO " . $this->tableUsers . " 
                        (id_user, id_akun, nama, nim, jurusan, alasan, status_keanggotaan)
                      VALUES
                        (:id_user, :id_akun, :nama, :nim, :jurusan, :alasan, 'pending')";

            $id_user = $this->generateIdUser();

            $this->db->query($queryUsers);
            $this->db->bind('id_user', $id_user);
            $this->db->bind('id_akun', $id_akun);
            $this->db->bind('nama', htmlspecialchars($data['nama']));
            $this->db->bind('nim', htmlspecialchars($data['nim']));
            $this->db->bind('jurusan', htmlspecialchars($data['jurusan']));
            $this->db->bind('alasan', htmlspecialchars($data['alasan']));
            $this->db->execute();

            return $this->db->rowCount();
        } catch (Exception $e) {
            return 0;
        }
    }

    // Get user by email (cek di tabel akun, JOIN dengan users)
    public function getUserByEmail($email)
    {
        $query = "SELECT a.*, u.* 
                  FROM " . $this->tableAkun . " a
                  LEFT JOIN " . $this->tableUsers . " u ON a.id_akun = u.id_akun
                  WHERE a.email = :email";
        $this->db->query($query);
        $this->db->bind('email', $email);
        return $this->db->single();
    }

    public function getUserById($id)
    {
        $query = "SELECT u.*, a.* 
                  FROM " . $this->tableUsers . " u
                  LEFT JOIN " . $this->tableAkun . " a ON u.id_akun = a.id_akun
                  WHERE u.id_user = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        return $this->db->single();
    }

    public function getAllUsers()
    {
        $query = "SELECT u.*, a.email, a.role, a.is_approved 
                  FROM " . $this->tableUsers . " u
                  LEFT JOIN " . $this->tableAkun . " a ON u.id_akun = a.id_akun
                  WHERE a.role != 'admin' 
                  ORDER BY u.created_at DESC";
        $this->db->query($query);
        return $this->db->resultSet();
    }

    public function approveUser($id, $status)
    {
        // Validate user exists
        $existing = $this->getUserById($id);
        if (!$existing) return ['success' => false, 'message' => 'User tidak ditemukan.'];

        try {
            // Start transaction
            $this->db->query('START TRANSACTION');
            $this->db->execute();

            // Update users table (do NOT set is_approved here — that column exists in akun table)
            $query = "UPDATE " . $this->tableUsers . " SET status_keanggotaan = :status WHERE id_user = :id";
            $this->db->query($query);
            $this->db->bind('status', $status);
            $this->db->bind('id', $id);
            $this->db->execute();
            $affected1 = $this->db->rowCount();

            // Update akun table using id_akun from existing user
            $queryAkun = "UPDATE " . $this->tableAkun . " SET is_approved = 1 WHERE id_akun = :id_akun";
            $this->db->query($queryAkun);
            $this->db->bind('id_akun', $existing['id_akun']);
            $this->db->execute();
            $affected2 = $this->db->rowCount();

            // Commit
            $this->db->query('COMMIT');
            $this->db->execute();

            // Even if rowCount is 0 (same values), consider it successful as queries executed
            return ['success' => true, 'message' => 'User berhasil disetujui.'];
        } catch (Exception $e) {
            // Rollback on error
            $this->db->query('ROLLBACK');
            $this->db->execute();
            return ['success' => false, 'message' => 'Database error: ' . $e->getMessage()];
        }
    }

    public function resetPassword($id, $newPassword)
    {
        // Basic validation: minimum length
        if (!is_string($newPassword) || strlen($newPassword) < 6) {
            return 0;
        }

        $hash = password_hash($newPassword, PASSWORD_DEFAULT);

        // Dapatkan id_akun dari id_user
        $user = $this->getUserById($id);
        if (!$user) return 0;

        $query = "UPDATE " . $this->tableAkun . " SET password = :password WHERE id_akun = :id_akun";
        $this->db->query($query);
        $this->db->bind('password', $hash);
        $this->db->bind('id_akun', $user['id_akun']);
        $this->db->execute();

        return $this->db->rowCount();
    }

    public function updateUser($id, $data)
    {
        // Ensure user exists
        $existing = $this->getUserById($id);
        if (!$existing) return ['success' => false, 'changed' => false, 'message' => 'User tidak ditemukan.'];

        // Detect if anything actually changes
        $incoming = [
            'nama' => htmlspecialchars($data['nama']),
            'nim' => htmlspecialchars($data['nim']),
            'jurusan' => htmlspecialchars($data['jurusan']),
            'status_keanggotaan' => $data['status_keanggotaan']
        ];

        $noChange = (
            $incoming['nama'] === ($existing['nama'] ?? '') &&
            $incoming['nim'] === ($existing['nim'] ?? '') &&
            $incoming['jurusan'] === ($existing['jurusan'] ?? '') &&
            $incoming['status_keanggotaan'] === ($existing['status_keanggotaan'] ?? '') &&
            (!isset($data['is_approved']) || (int)$data['is_approved'] === (int)($existing['is_approved'] ?? 0))
        );

        if ($noChange) {
            return ['success' => false, 'changed' => false, 'message' => 'Tidak ada perubahan yang dilakukan.'];
        }

        // Update users table
        $query = "UPDATE " . $this->tableUsers . " SET 
                    nama = :nama, 
                    nim = :nim, 
                    jurusan = :jurusan, 
                    status_keanggotaan = :status_keanggotaan
                  WHERE id_user = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        $this->db->bind('nama', $incoming['nama']);
        $this->db->bind('nim', $incoming['nim']);
        $this->db->bind('jurusan', $incoming['jurusan']);
        $this->db->bind('status_keanggotaan', $incoming['status_keanggotaan']);
        $this->db->execute();

        $affected = $this->db->rowCount();

        if ($incoming['status_keanggotaan'] === 'pending') {
            $newApproved = 0;
        } elseif (isset($data['is_approved'])) {
            $newApproved = (int)$data['is_approved'];
        } else {
            $newApproved = null; // no change to akun
        }

        if (!is_null($newApproved)) {
            $queryAkun = "UPDATE " . $this->tableAkun . " SET is_approved = :is_approved WHERE id_akun = :id_akun";
            $this->db->query($queryAkun);
            $this->db->bind('is_approved', $newApproved);
            $this->db->bind('id_akun', $existing['id_akun']);
            $this->db->execute();
            $affected += $this->db->rowCount();
        }

        return ['success' => true, 'changed' => true, 'message' => 'User berhasil diupdate.', 'affected' => $affected];
    }

    // Helper: Generate ID akun
    private function generateIdAkun()
    {
        $query = "SELECT MAX(CAST(SUBSTR(id_akun, 2) AS UNSIGNED)) as max_id FROM " . $this->tableAkun;
        $this->db->query($query);
        $result = $this->db->single();
        $nextId = ($result['max_id'] ?? 0) + 1;
        return 'A' . str_pad($nextId, 6, '0', STR_PAD_LEFT);
    }

    // Helper: Generate ID user
    private function generateIdUser()
    {
        $query = "SELECT MAX(CAST(SUBSTR(id_user, 2) AS UNSIGNED)) as max_id FROM " . $this->tableUsers;
        $this->db->query($query);
        $result = $this->db->single();
        $nextId = ($result['max_id'] ?? 0) + 1;
        return 'U' . str_pad($nextId, 6, '0', STR_PAD_LEFT);
    }

    // TOKEN REMEMBER ME FUNCTIONS
    public function UpdateRememberToken($id_akun, $token, $expiry)
    {
        $query = "UPDATE " . $this->tableAkun . " SET cookie_token = :token, cookie_expiry = :expiry WHERE id_akun = :id_akun";

        $this->db->query($query);
        $this->db->bind('token', $token);
        $this->db->bind('expiry', $expiry);
        $this->db->bind('id_akun', $id_akun);

        return $this->db->execute();
    }

    public function getUserByToken($token)
    {
        $query = "SELECT a.*, u.* FROM  {$this->tableAkun} a LEFT JOIN {$this->tableUsers} u ON a.id_akun = u.id_akun WHERE a.cookie_token = :token";

        $this->db->query($query);
        $this->db->bind('token', $token);
        return $this->db->single();
    }

    public function deleteRemmeberToken($id_akun)
    {
        $query = "UPDATE " . $this->tableAkun . " SET cookie_token = NULL, cookie_expiry = NULL WHERE id_akun = :id_akun";

        $this->db->query($query);
        $this->db->bind('id_akun', $id_akun);
        return $this->db->execute();
    }

    // FILTER DASHBOARD USER
    public function getStatsByJurusan($jurusan = null)
    {

        $jurusan = str_replace('_', ' ', $jurusan);
        
        $query = "SELECT u.status_keanggotaan, COUNT(*) as total
                  FROM {$this->tableUsers} u 
                  JOIN {$this->tableAkun} a ON u.id_akun = a.id_akun 
                  WHERE u.status_keanggotaan != 'pending' 
                  AND a.role != 'admin' ";

        if ($jurusan && $jurusan !== 'All') {
            $query .= ' AND u.jurusan = :jurusan ';
        }

        $query .= ' GROUP BY u.status_keanggotaan';

        $this->db->query($query);

        if ($jurusan && $jurusan !== 'All') {
            $this->db->bind('jurusan', $jurusan);
        }

        return $this->db->resultSet();
    }

    public function getDistictJurusan(){
        $this->db->query("SELECT DISTINCT jurusan FROM {$this->tableUsers}");
        return $this->db->resultSet();
    }
}
