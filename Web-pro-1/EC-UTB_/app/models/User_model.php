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

    public function registerUser($data)
    {
        try {

            $id_akun = $this->generateIdAkun();
            $currentYear = date('Y');

            $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);


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
                        (id_user, id_akun, nama, nim, jurusan,angkatan, alasan, status_keanggotaan)
                      VALUES
                        (:id_user, :id_akun, :nama, :nim, :jurusan, :angkatan, :alasan, 'pending')";

            $id_user = $this->generateIdUser();

            $this->db->query($queryUsers);
            $this->db->bind('id_user', $id_user);
            $this->db->bind('id_akun', $id_akun);
            $this->db->bind('nama', htmlspecialchars($data['nama']));
            $this->db->bind('nim', htmlspecialchars($data['nim']));
            $this->db->bind('jurusan', htmlspecialchars($data['jurusan']));
            $this->db->bind('angkatan', htmlspecialchars($data['angkatan']));
            $this->db->bind('alasan', htmlspecialchars($data['alasan']));
            $this->db->execute();

            return $this->db->rowCount();
        } catch (Exception $e) {
            return 0;
        }
    }


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
                  WHERE a.role NOT IN ('super_admin', 'admin_sdm', 'admin_edu') 
                  ORDER BY u.created_at DESC";
        $this->db->query($query);
        return $this->db->resultSet();
    }

    public function approveUser($id, $status)
    {

        $existing = $this->getUserById($id);
        if (!$existing) return ['success' => false, 'message' => 'User tidak ditemukan.'];

        try {
            // Start transaction
            $this->db->query('START TRANSACTION');
            $this->db->execute();

            $query = "UPDATE " . $this->tableUsers . " SET status_keanggotaan = :status WHERE id_user = :id";
            $this->db->query($query);
            $this->db->bind('status', $status);
            $this->db->bind('id', $id);
            $this->db->execute();
            $affected1 = $this->db->rowCount();

            $queryAkun = "UPDATE " . $this->tableAkun . " SET is_approved = 1 WHERE id_akun = :id_akun";
            $this->db->query($queryAkun);
            $this->db->bind('id_akun', $existing['id_akun']);
            $this->db->execute();
            $affected2 = $this->db->rowCount();

            // Commit
            $this->db->query('COMMIT');
            $this->db->execute();


            return ['success' => true, 'message' => 'User berhasil disetujui.'];
        } catch (Exception $e) {
            $this->db->query('ROLLBACK');
            $this->db->execute();
            return ['success' => false, 'message' => 'Database error: ' . $e->getMessage()];
        }
    }

    public function resetPassword($id, $newPassword)
    {
        if (!is_string($newPassword) || strlen($newPassword) < 6) {
            return 0;
        }

        $hash = password_hash($newPassword, PASSWORD_DEFAULT);

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

        $existing = $this->getUserById($id);
        if (!$existing) return ['success' => false, 'changed' => false, 'message' => 'User tidak ditemukan.'];

        $incoming = [
            'nama' => htmlspecialchars($data['nama']),
            'nim' => htmlspecialchars($data['nim']),
            'jurusan' => htmlspecialchars($data['jurusan']),
            'angkatan' => htmlspecialchars($data['angkatan']),
            'status_keanggotaan' => $data['status_keanggotaan']
        ];

        $noChange = (
            $incoming['nama'] === ($existing['nama'] ?? '') &&
            $incoming['nim'] === ($existing['nim'] ?? '') &&
            $incoming['jurusan'] === ($existing['jurusan'] ?? '') &&
            $incoming['angkatan'] === ($existing['angkatan'] ?? '') &&
            $incoming['status_keanggotaan'] === ($existing['status_keanggotaan'] ?? '') &&
            (!isset($data['is_approved']) || (int)$data['is_approved'] === (int)($existing['is_approved'] ?? 0))
        );

        if ($noChange) {
            return ['success' => false, 'changed' => false, 'message' => 'Tidak ada perubahan yang dilakukan.'];
        }

        $query = "UPDATE " . $this->tableUsers . " SET 
                    nama = :nama, 
                    nim = :nim, 
                    jurusan = :jurusan,
                    angkatan = :angkatan, 
                    status_keanggotaan = :status_keanggotaan
                  WHERE id_user = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        $this->db->bind('nama', $incoming['nama']);
        $this->db->bind('nim', $incoming['nim']);
        $this->db->bind('jurusan', $incoming['jurusan']);
        $this->db->bind('angkatan', $incoming['angkatan']);
        $this->db->bind('status_keanggotaan', $incoming['status_keanggotaan']);
        $this->db->execute();

        $affected = $this->db->rowCount();

        if ($incoming['status_keanggotaan'] === 'pending') {
            $newApproved = 0;
        } elseif (isset($data['is_approved'])) {
            $newApproved = (int)$data['is_approved'];
        } else {
            $newApproved = null;
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


    private function generateIdAkun()
    {
        $query = "SELECT MAX(CAST(SUBSTR(id_akun, 2) AS UNSIGNED)) as max_id FROM " . $this->tableAkun;
        $this->db->query($query);
        $result = $this->db->single();
        $nextId = ($result['max_id'] ?? 0) + 1;
        return 'AKN' . str_pad($nextId, 6, '0', STR_PAD_LEFT);
    }

    // Helper: Generate ID user
    private function generateIdUser()
    {
        $query = "SELECT MAX(CAST(SUBSTR(id_user, 2) AS UNSIGNED)) as max_id FROM " . $this->tableUsers;
        $this->db->query($query);
        $result = $this->db->single();
        $nextId = ($result['max_id'] ?? 0) + 1;
        return 'USR' . str_pad($nextId, 6, '0', STR_PAD_LEFT);
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

    public function getDistictJurusan()
    {
        $this->db->query("SELECT DISTINCT jurusan FROM {$this->tableUsers}");
        return $this->db->resultSet();
    }


    public function getStatsFiltered($jurusan = 'All', $angkatan = 'All')
    {
        // PERBAIKAN: Tambahkan spasi di akhir baris SQL agar aman saat digabung
        $query = "SELECT u.status_keanggotaan, COUNT(*) as total
                  FROM {$this->tableUsers} u 
                  JOIN {$this->tableAkun} a ON u.id_akun = a.id_akun 
                  WHERE u.status_keanggotaan != 'pending' 
                  AND a.role != 'admin' "; // <--- TAMBAH SPASI DI SINI!

        $params = [];

        if ($jurusan && $jurusan !== 'All') {
            $jurusanClean = str_replace('_', ' ', $jurusan);
            $query .= " AND u.jurusan = :jurusan ";
            $params['jurusan'] = $jurusanClean;
        }

        if ($angkatan && $angkatan !== 'All') {
            $query .= " AND u.angkatan = :angkatan ";
            $params['angkatan'] = $angkatan;
        }

        $query .= " GROUP BY u.status_keanggotaan";

        $this->db->query($query);

        foreach ($params as $key => $value) {
            $this->db->bind($key, $value);
        }

        return $this->db->resultSet();
    }

    public function getExportDataFiltered($jurusan = 'All', $angkatan = 'All')
    {
        $query = "SELECT u.nama, u.nim, u.jurusan, u.angkatan, u.status_keanggotaan 
                  FROM {$this->tableUsers} u
                  JOIN {$this->tableAkun} a ON u.id_akun = a.id_akun
                  WHERE u.status_keanggotaan != 'pending' 
                  AND a.role != 'admin' "; // <--- TAMBAH SPASI DI SINI!

        $params = [];

        if ($jurusan && $jurusan !== 'All') {
            $jurusanClean = str_replace('_', ' ', $jurusan);
            $query .= " AND u.jurusan = :jurusan ";
            $params['jurusan'] = $jurusanClean;
        }

        if ($angkatan && $angkatan !== 'All') {
            $query .= " AND u.angkatan = :angkatan ";
            $params['angkatan'] = $angkatan;
        }

        $query .= " ORDER BY u.angkatan DESC, u.nama ASC";

        $this->db->query($query);

        foreach ($params as $key => $value) {
            $this->db->bind($key, $value);
        }

        return $this->db->resultSet();
    }

    // USERS


    public function getProfile($id_user)
    {
        $this->db->query("SELECT u.*, a.email, a.role 
                      FROM " . $this->tableUsers . " u
                      JOIN akun a ON u.id_akun = a.id_akun
                      WHERE u.id_user = :id_user");

        $this->db->bind('id_user', $id_user);
        return $this->db->single();
    }
}
