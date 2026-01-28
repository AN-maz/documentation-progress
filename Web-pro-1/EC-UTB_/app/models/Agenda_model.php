<?php
require_once '../app/helper/IdGenerator.php';

class Agenda_model
{
    private $tableAgenda = 'agenda';
    private $tableAbsensi = 'absensi';
    private $tableUsers = 'users';
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }


    public function getAllAgenda($kategori = null)
    {
        $query = "SELECT * FROM " . $this->tableAgenda;
        // $this->db->query("SELECT * FROM " . $this->tableAgenda . " ORDER BY tanggal DESC, waktu_mulai DESC");
        if ($kategori) {
            $query .= " WHERE kategori = :kategori";
        }

        // TODO: Nanti tambahkan filter id_periode di sini juga ya

        $query .= " ORDER BY tanggal DESC, waktu_mulai DESC";


        $this->db->query($query);

        if ($kategori) {
            $this->db->bind('kategori', $kategori);
        }

        return $this->db->resultSet();
    }

    public function getAgendaById($id)
    {
        $this->db->query("SELECT * FROM " . $this->tableAgenda . " WHERE id_agenda = :id");
        $this->db->bind('id', $id);
        return $this->db->single();
    }

    public function addAgenda($data)
    {
        try {

            $gen = IdGenerator::generateId($this->db, $this->tableAgenda, 'id_agenda', 'AGD', 3);
            if (!$gen['success']) {
                throw new Exception($gen['message']);
            }
            $newId = $gen['id'];

            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data['judul'])));
            $slug .= '-' . bin2hex(random_bytes(3));

            $query = "INSERT INTO " . $this->tableAgenda . " 
                      (id_agenda, judul, slug, deskripsi, file_materi, notulensi, lokasi, tanggal, waktu_mulai, token_absen, status, kategori)
                      VALUES
                      (:id, :judul, :slug, :deskripsi, :file, :notulensi, :lokasi, :tanggal, :waktu, :token, 'buka', :kategori)";

            $this->db->query($query);
            $this->db->bind('id', $newId);
            $this->db->bind('judul', htmlspecialchars($data['judul']));
            $this->db->bind('slug', $slug);
            $this->db->bind('deskripsi', htmlspecialchars($data['deskripsi']));
            $this->db->bind('file', $data['file_materi']); // Bisa NULL
            $this->db->bind('lokasi', htmlspecialchars($data['lokasi']));
            $this->db->bind('tanggal', $data['tanggal']);
            $this->db->bind('waktu', $data['waktu_mulai']);
            $this->db->bind('token', $data['token_absen']);
            $this->db->bind('notulensi', htmlspecialchars($data['notulensi'])); // Bind Notulensi
            $this->db->bind('kategori', $data['kategori']); // Token dari Controller

            return $this->db->execute();
        } catch (Exception $e) {
            return 0;
        }
    }
    // Hapus satu data absensi (jika admin salah input)
    public function deleteAbsensi($id_absensi)
    {
        $query = "DELETE FROM " . $this->tableAbsensi . " WHERE id_absensi = :id";
        $this->db->query($query);
        $this->db->bind('id', $id_absensi);
        return $this->db->execute();
    }

    // Update Notulensi & File Materi Rapat
    public function updateMateriRapat($data)
    {
        // Query dinamis tergantung apakah file diganti atau tidak
        if (isset($data['file_materi'])) {
            $query = "UPDATE " . $this->tableAgenda . " 
                      SET notulensi = :notulensi, file_materi = :file 
                      WHERE id_agenda = :id";
        } else {
            $query = "UPDATE " . $this->tableAgenda . " 
                      SET notulensi = :notulensi 
                      WHERE id_agenda = :id";
        }

        $this->db->query($query);
        $this->db->bind('notulensi', $data['notulensi']);
        $this->db->bind('id', $data['id_agenda']);

        if (isset($data['file_materi'])) {
            $this->db->bind('file', $data['file_materi']);
        }

        return $this->db->execute();
    }

    public function submitAbsenManual($data)
    {
        // Generate ID Absen
        $gen = IdGenerator::generateId($this->db, $this->tableAbsensi, 'id_absensi', 'ABS', 5);
        if (!$gen['success']) return 0;
        $newId = $gen['id'];

        // Cek Duplikat
        if ($this->cekAbsenUser($data['id_agenda'], $data['id_user'])) return 0;

        $query = "INSERT INTO " . $this->tableAbsensi . " 
                  (id_absensi, id_agenda, id_user, status_kehadiran)
                  VALUES (:id, :agenda, :user, 'hadir')";

        $this->db->query($query);
        $this->db->bind('id', $newId);
        $this->db->bind('agenda', $data['id_agenda']);
        $this->db->bind('user', $data['id_user']);

        return $this->db->execute();
    }

    public function deleteAgenda($id)
    {
        $query = "DELETE FROM " . $this->tableAgenda . " WHERE id_agenda = :id";
        $this->db->query($query);
        $this->db->bind('id', $id);
        return $this->db->execute();
    }

    public function updateStatusAgenda($id, $status)
    {
        $query = "UPDATE " . $this->tableAgenda . " SET status = :status WHERE id_agenda = :id";
        $this->db->query($query);
        $this->db->bind('status', $status);
        $this->db->bind('id', $id);
        return $this->db->execute();
    }


    // ABSENSI

    public function cekAbsenUser($id_agenda, $id_user)
    {
        $this->db->query("SELECT id_absensi, waktu_absen FROM " . $this->tableAbsensi . " 
                          WHERE id_agenda = :id_agenda AND id_user = :id_user");
        $this->db->bind('id_agenda', $id_agenda);
        $this->db->bind('id_user', $id_user);
        return $this->db->single();
    }

    public function submitAbsen($data)
    {
        try {
            $agenda = $this->getAgendaById($data['id_agenda']);

            if (!$agenda) {
                return ['status' => false, 'pesan' => 'Agenda tidak ditemukan.'];
            }
            if ($agenda['status'] == 'tutup') {
                return ['status' => false, 'pesan' => 'Absensi sudah ditutup.'];
            }
            if ($agenda['token_absen'] !== $data['token_input']) {
                return ['status' => false, 'pesan' => 'Token absensi salah!'];
            }

            if ($this->cekAbsenUser($data['id_agenda'], $data['id_user'])) {
                return ['status' => false, 'pesan' => 'Kamu sudah absen sebelumnya.'];
            }

            $gen = IdGenerator::generateId($this->db, $this->tableAbsensi, 'id_absensi', 'ABS', 5);
            if (!$gen['success']) {
                throw new Exception($gen['message']);
            }
            $newIdAbsen = $gen['id'];

            $query = "INSERT INTO " . $this->tableAbsensi . " 
                      (id_absensi, id_agenda, id_user, status_kehadiran)
                      VALUES
                      (:id_absensi, :id_agenda, :id_user, 'hadir')";

            $this->db->query($query);
            $this->db->bind('id_absensi', $newIdAbsen);
            $this->db->bind('id_agenda', $data['id_agenda']);
            $this->db->bind('id_user', $data['id_user']);

            if ($this->db->execute()) {
                return ['status' => true, 'pesan' => 'Berhasil absen!'];
            } else {
                return ['status' => false, 'pesan' => 'Gagal menyimpan data absen.'];
            }
        } catch (Exception $e) {
            return ['status' => false, 'pesan' => 'System Error: ' . $e->getMessage()];
        }
    }

    public function getKehadiranByAgenda($id_agenda)
    {
        $query = "SELECT ab.*, u.nama, u.nim, u.jurusan, u.status_keanggotaan 
                  FROM " . $this->tableAbsensi . " ab
                  JOIN " . $this->tableUsers . " u ON ab.id_user = u.id_user
                  WHERE ab.id_agenda = :id_agenda
                  ORDER BY ab.waktu_absen ASC";

        $this->db->query($query);
        $this->db->bind('id_agenda', $id_agenda);
        return $this->db->resultSet();
    }


    public function getLatestAgendas($limit = 5)
    {

        $query = "SELECT * FROM " . $this->tableAgenda . " 
              WHERE kategori != 'rapat_internal' 
              ORDER BY tanggal DESC 
              LIMIT :limit";

        $this->db->query($query);
        $this->db->bind('limit', $limit, PDO::PARAM_INT);
        return $this->db->resultSet();
    }

    // Users
    public function countUserAttendance($id_user, $kategori_agenda)
    {
        $query = "SELECT COUNT(*) as total 
              FROM " . $this->tableAbsensi . " ab
              JOIN " . $this->tableAgenda . " ag ON ab.id_agenda = ag.id_agenda
              WHERE ab.id_user = :id_user AND ag.kategori = :kategori";

        $this->db->query($query);
        $this->db->bind('id_user', $id_user);
        $this->db->bind('kategori', $kategori_agenda);

        return $this->db->single()['total'];
    }

    public function getUserAbsenceStatus($id_agenda, $id_user)
    {
        $this->db->query("SELECT * FROM " . $this->tableAbsensi . " 
                      WHERE id_agenda = :id_agenda AND id_user = :id_user");
        $this->db->bind('id_agenda', $id_agenda);
        $this->db->bind('id_user', $id_user);
        return $this->db->single();
    }
}
