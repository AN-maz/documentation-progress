<?php


require_once '../app/helper/IdGenerator.php';


class Structure_model
{

    private $tableDivisi = 'divisi';
    private $tablePengurus = 'pengurus';
    private $tableUsers = 'users';
    private $db;
    private $activePeriodeId;

    public function __construct()
    {
        $this->db = new Database();

        $this->db->query("SELECT id_periode FROM periode WHERE is_active = 1 LIMIT 1");
        $result = $this->db->single();
        $this->activePeriodeId = $result['id_periode'];
    }

    public function getAllDivisions()
    {
        $this->db->query('SELECT * FROM ' . $this->tableDivisi);
        return $this->db->resultSet();
    }

    public function getDivisionBySlug($slug)
    {
        $this->db->query('SELECT * FROM ' . $this->tableDivisi . ' WHERE slug = :slug');
        $this->db->bind('slug', $slug);
        return $this->db->single();
    }

    public function getDivisionById($id)
    {
        $this->db->query('SELECT * FROM ' . $this->tableDivisi . ' WHERE id_divisi = :id');
        $this->db->bind('id', $id);
        return $this->db->single();
    }

    public function updateDivision($data)
    {
        $query = 'UPDATE ' . $this->tableDivisi . ' SET deskripsi = :deskripsi, proker = :proker, updated_at = CURRENT_TIMESTAMP';

        if (isset($data['foto_grup']) && !empty($data['foto_grup'])) {
            $query .= ", foto_grup = :foto_grup";
        }

        $query .= " WHERE id_divisi = :id_divisi";

        $this->db->query($query);
        $this->db->bind('deskripsi', $data['deskripsi']);
        $this->db->bind('proker', $data['proker']);
        $this->db->bind('id_divisi', $data['id_divisi']);

        if (isset($data['foto_grup']) && !empty($data['foto_grup'])) {
            $this->db->bind('foto_grup', $data['foto_grup']);
        }

        $this->db->execute();
        return $this->db->rowCount();
    }

    public function getMembersByDivisionId($id_divisi)
    {

        $query = "SELECT p.id_pengurus, p.jabatan, p.id_divisi,
                         u.id_user, u.nama, u.nim, u.jurusan, u.foto_profile
                  FROM " . $this->tablePengurus . " p
                  JOIN " . $this->tableUsers . " u ON p.id_user = u.id_user
                  WHERE p.id_divisi = :id_divisi
                  AND p.id_periode = :id_periode";

        $this->db->query($query);
        $this->db->bind('id_divisi', $id_divisi);
        $this->db->bind('id_periode', $this->activePeriodeId);
        return $this->db->resultSet();
    }

    public function addMember($data)
    {
        $check = "SELECT id_pengurus FROM " . $this->tablePengurus . " 
                  WHERE id_user = :id_user AND id_divisi = :id_divisi";
        $this->db->query($check);
        $this->db->bind('id_user', $data['id_user']);
        $this->db->bind('id_divisi', $data['id_divisi']);

        if ($this->db->single()) {
            return 0;
        }

        $query = "INSERT INTO " . $this->tablePengurus . " (id_user, id_divisi, jabatan) 
                  VALUES (:id_user, :id_divisi, :jabatan)";

        $this->db->query($query);
        $this->db->bind('id_user', $data['id_user']);
        $this->db->bind('id_divisi', $data['id_divisi']);
        $this->db->bind('jabatan', htmlspecialchars($data['jabatan']));

        $this->db->execute();
        return $this->db->rowCount();
    }

    // Update Member (Jabatan, Jurusan, DAN Foto)
    public function updateMemberData($id_pengurus, $jabatan, $jurusan, $foto = null)
    {
        try {
            $this->db->query('START TRANSACTION');
            $this->db->execute();

            // 1. Update Jabatan
            $query1 = "UPDATE " . $this->tablePengurus . " SET jabatan = :jabatan WHERE id_pengurus = :id";
            $this->db->query($query1);
            $this->db->bind('jabatan', htmlspecialchars($jabatan));
            $this->db->bind('id', $id_pengurus);
            $this->db->execute();

            // 2. Ambil id_user
            $this->db->query("SELECT id_user FROM " . $this->tablePengurus . " WHERE id_pengurus = :id");
            $this->db->bind('id', $id_pengurus);
            $userRow = $this->db->single();

            if ($userRow) {
                // 3. Siapkan Query Update User (Jurusan & Foto)
                $queryUser = "UPDATE " . $this->tableUsers . " SET jurusan = :jurusan";

                if ($foto != null) {
                    $queryUser .= ", foto_profile = :foto";
                }

                $queryUser .= " WHERE id_user = :id_user";

                $this->db->query($queryUser);
                $this->db->bind('jurusan', htmlspecialchars($jurusan));
                $this->db->bind('id_user', $userRow['id_user']);

                if ($foto != null) {
                    $this->db->bind('foto', $foto);
                }

                $this->db->execute();
            }

            $this->db->query('COMMIT');
            $this->db->execute();
            return 1;
        } catch (Exception $e) {
            $this->db->query('ROLLBACK');
            return 0;
        }
    }

    public function addMemberWithPhoto($data)
    {
        try {

            $gen = IdGenerator::generateId($this->db, $this->tablePengurus, 'id_pengurus', 'PENG', 3);
            if (!$gen['success']) {
                throw new Exception("ID Gen Error: " . $gen['message']);
            }
            $newIdPengurus = $gen['id'];

            $this->db->query('START TRANSACTION');

            if (!$this->db->execute()) {
                throw new Exception("Gagal Start Transaction");
            }

            $this->db->query("SELECT id_pengurus FROM " . $this->tablePengurus . " WHERE id_user = :id_user AND id_divisi = :id_divisi");
            $this->db->bind('id_user', $data['id_user']);
            $this->db->bind('id_divisi', $data['id_divisi']);
            if ($this->db->single()) {
                $this->db->query('ROLLBACK');
                $this->db->execute();
                return 0; // Duplikat
            }


            $queryInsert = "INSERT INTO " . $this->tablePengurus . " 
                            (id_pengurus, id_user, id_divisi, jabatan, id_periode) 
                            VALUES 
                            (:id_pengurus, :id_user, :id_divisi, :jabatan, :id_periode)";

            $this->db->query($queryInsert);
            $this->db->bind('id_pengurus', $newIdPengurus);
            $this->db->bind('id_user', $data['id_user']);
            $this->db->bind('id_divisi', $data['id_divisi']);
            $this->db->bind('jabatan', htmlspecialchars($data['jabatan']));
            $this->db->bind('id_periode', $this->activePeriodeId);;


            if (!$this->db->execute()) {
                throw new Exception("Gagal Insert Pengurus");
            }


            if (isset($data['foto']) && $data['foto'] != null) {
                $queryUpdateUser = "UPDATE " . $this->tableUsers . " SET foto_profile = :foto WHERE id_user = :id_user";
                $this->db->query($queryUpdateUser);
                $this->db->bind('foto', $data['foto']);
                $this->db->bind('id_user', $data['id_user']);

                if (!$this->db->execute()) {
                    throw new Exception("Gagal Update Foto User");
                }
            }

            $this->db->query('COMMIT');
            if (!$this->db->execute()) {
                throw new Exception("Gagal Commit");
            }

            return 1;
        } catch (Exception $e) {
            $this->db->query('ROLLBACK');
            $this->db->execute();

            die("SYSTEM ERROR: " . $e->getMessage());

            return 0;
        }
    }

    public function deleteMember($id_pengurus)
    {
        $query = "DELETE FROM " . $this->tablePengurus . " WHERE id_pengurus = :id";
        $this->db->query($query);
        $this->db->bind('id', $id_pengurus);
        $this->db->execute();
        return $this->db->rowCount();
    }

    public function searchCandidates($keyword)
    {
        $query = "SELECT u.id_user, u.nama, u.nim, u.jurusan,u.status_keanggotaan, u.foto_profile 
                  FROM " . $this->tableUsers . " u
                  JOIN akun a ON u.id_akun = a.id_akun
                  WHERE (u.nama LIKE :keyword OR u.nim LIKE :keyword) 
                  AND a.is_approved = 1
                  LIMIT 10";

        $this->db->query($query);
        $this->db->bind('keyword', "%$keyword%");
        return $this->db->resultSet();
    }

    public function getPengurusById($id_pengurus)
    {
        $query = "SELECT p.*, u.foto_profile, u.nama 
                  FROM " . $this->tablePengurus . " p
                  JOIN " . $this->tableUsers . " u ON p.id_user = u.id_user
                  WHERE p.id_pengurus = :id";

        $this->db->query($query);
        $this->db->bind('id', $id_pengurus);
        return $this->db->single();
    }

    public function resetUserPhoto($id_user)
    {
        $query = "UPDATE " . $this->tableUsers . " SET foto_profile = 'default_profile.jpg' WHERE id_user = :id_user";
        $this->db->query($query);
        $this->db->bind('id_user', $id_user);
        return $this->db->execute();
    }
}
