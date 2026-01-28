<?php

class Structure extends Controller
{
    public function __construct()
    {
        // Hanya super & Super Admin
        AccessControl::allowSuperAdmin();
    }

    public function index()
    {
        $data['judul'] = 'Structure Management';
        $data['active_page'] = 'structure';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        
        $data['divisi'] = $this->model('Structure_model')->getAllDivisions();

        // Hitung jumlah member per divisi
        foreach ($data['divisi'] as &$d) {
            $members = $this->model('Structure_model')->getMembersByDivisionId($d['id_divisi']);
            $d['member_count'] = count($members);
        }

        // Load View Struktur Baru
        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/super/sidebar', $data);
        $this->view('templates/adminLayout/super/mobileNav', $data);
        $this->view('dashboard_/admin/super/structure/index', $data);
        $this->view('templates/FooterDash'); 
    }

    public function detail($id)
    {
        $divisi = $this->model('Structure_model')->getDivisionById($id);

        if (!$divisi) {
            Flasher::setFlash('Divisi tidak ditemukan.', 'Error', 'red');
            header('Location: ' . BASEURL . '/super/structure');
            exit;
        }

        $data['judul'] = 'Manage ' . $divisi['nama_divisi'];
        $data['active_page'] = 'structure';
        $data['user'] = $this->model('User_model')->getUserById($_SESSION['user_id']);
        $data['divisi'] = $divisi;

        // Decode Proker
        $prokerArray = json_decode($divisi['proker'], true);
        $data['proker_text'] = $prokerArray ? implode(", ", $prokerArray) : '';

        $data['members'] = $this->model('Structure_model')->getMembersByDivisionId($id);

        $this->view('templates/HeaderDash', $data);
        $this->view('templates/adminLayout/super/sidebar', $data);
        $this->view('templates/adminLayout/super/mobileNav', $data);
        $this->view('dashboard_/admin/super/structure/detail', $data);
        $this->view('templates/FooterDash');
    }

    public function update_division()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id_divisi = $_POST['id_divisi'];
            $folder = $_POST['folder_gambar'];

            $prokerInput = $_POST['proker'];
            $prokerArray = array_map('trim', explode(',', $prokerInput));
            $prokerJson = json_encode($prokerArray);

            $data = [
                'id_divisi' => $id_divisi,
                'deskripsi' => htmlspecialchars($_POST['deskripsi']),
                'proker'    => $prokerJson,
                'foto_grup' => ''
            ];

            if (isset($_FILES['foto_grup']) && $_FILES['foto_grup']['error'] === UPLOAD_ERR_OK) {
                // Perhatikan: Method uploadImage harus dipindahkan ke sini atau dibuat Helper
                // Untuk amannya, kita panggil method private di bawah
                $uploadResult = $this->uploadImage($_FILES['foto_grup'], $folder);
                if ($uploadResult['success']) {
                    $data['foto_grup'] = $folder . '/' . $uploadResult['fileName'];
                } else {
                    Flasher::setFlash('Gagal upload gambar: ' . $uploadResult['message'], 'Error', 'red');
                    header('Location: ' . BASEURL . '/super/structure/detail/' . $id_divisi);
                    exit;
                }
            }

            if ($this->model('Structure_model')->updateDivision($data) > 0) {
                Flasher::setFlash('Informasi Divisi berhasil diupdate.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Data disimpan (Tidak ada perubahan).', 'Info', 'yellow');
            }

            header('Location: ' . BASEURL . '/super/structure/detail/' . $id_divisi);
            exit;
        }
    }

    public function add_member()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $folder = $_POST['folder_gambar'];

            if (empty($_POST['id_user'])) {
                Flasher::setFlash('Gagal: User belum dipilih dari dropdown!', 'Error', 'red');
                header('Location: ' . BASEURL . '/super/structure/detail/' . $_POST['id_divisi']);
                exit;
            }

            $data = [
                'id_divisi' => $_POST['id_divisi'],
                'id_user'   => $_POST['id_user'],
                'jabatan'   => $_POST['jabatan'],
                'foto'      => null
            ];

            if (isset($_FILES['foto_member']) && $_FILES['foto_member']['error'] === UPLOAD_ERR_OK) {
                $uploadResult = $this->uploadImage($_FILES['foto_member'], $folder);
                if ($uploadResult['success']) {
                    $data['foto'] = $uploadResult['fileName'];
                }
            }

            if ($this->model('Structure_model')->addMemberWithPhoto($data) > 0) {
                Flasher::setFlash('Member berhasil ditambahkan.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Gagal: Member sudah ada atau User tidak valid.', 'Gagal', 'red');
            }

            header('Location: ' . BASEURL . '/super/structure/detail/' . $data['id_divisi']);
            exit;
        }
    }

    public function update_member_role()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id_pengurus = $_POST['id_pengurus'];
            $id_divisi = $_POST['id_divisi'];
            $jabatan = $_POST['jabatan'];
            $jurusan = $_POST['jurusan'];
            $folder = $_POST['folder_gambar'];

            $fotoBaru = null;
            $oldData = $this->model('Structure_model')->getPengurusById($id_pengurus);
            $fotoLama = $oldData['foto_profile'];

            if (isset($_FILES['foto_member']) && $_FILES['foto_member']['error'] === UPLOAD_ERR_OK) {
                $uploadResult = $this->uploadImage($_FILES['foto_member'], $folder);
                if ($uploadResult['success']) {
                    $fotoBaru = $uploadResult['fileName'];
                } else {
                    Flasher::setFlash($uploadResult['message'], 'Gagal Upload', 'red');
                    header('Location: ' . BASEURL . '/super/structure/detail/' . $id_divisi);
                    exit;
                }
            }

            if ($this->model('Structure_model')->updateMemberData($id_pengurus, $jabatan, $jurusan, $fotoBaru) > 0) {
                if ($fotoBaru != null) {
                    $this->deleteImage($fotoLama, $folder);
                }
                Flasher::setFlash('Data member berhasil diperbarui.', 'Berhasil', 'green');
            } else {
                if ($fotoBaru != null) {
                    $this->deleteImage($fotoBaru, $folder);
                }
                Flasher::setFlash('Tidak ada perubahan data.', 'Info', 'yellow');
            }

            header('Location: ' . BASEURL . '/super/structure/detail/' . $id_divisi);
            exit;
        }
    }

    public function delete_member($id_pengurus, $id_divisi)
    {
        $divisi = $this->model('Structure_model')->getDivisionById($id_divisi);
        $folder = $divisi['folder_gambar'];
        $member = $this->model('Structure_model')->getPengurusById($id_pengurus);

        if ($member) {
            $foto = $member['foto_profile'];
            $id_user = $member['id_user'];

            if ($this->model('Structure_model')->deleteMember($id_pengurus) > 0) {
                $this->deleteImage($foto, $folder);
                $this->model('Structure_model')->resetUserPhoto($id_user);
                Flasher::setFlash('Member berhasil dihapus dari struktur.', 'Berhasil', 'green');
            } else {
                Flasher::setFlash('Gagal menghapus member.', 'Gagal', 'red');
            }
        } else {
            Flasher::setFlash('Member tidak ditemukan.', 'Error', 'red');
        }

        header('Location: ' . BASEURL . '/super/structure/detail/' . $id_divisi);
        exit;
    }

    public function search_user()
    {
        if (!isset($_POST['keyword'])) {
            echo json_encode([]);
            exit;
        }
        $keyword = $_POST['keyword'];
        $users = $this->model('Structure_model')->searchCandidates($keyword);
        echo json_encode($users);
    }

    // --- HELPER FUNCTION (Copy dari Structure.php lama) ---
    private function uploadImage($file, $subfolder)
    {
        $fileName = $file['name'];
        $fileSize = $file['size'];
        $error    = $file['error'];
        $tmpName  = $file['tmp_name'];

        if ($error === 4) return ['success' => false, 'message' => 'Pilih gambar terlebih dahulu'];

        $validExtension = ['jpg', 'jpeg', 'png'];
        $fileExtension = explode('.', $fileName);
        $fileExtension = strtolower(end($fileExtension));

        if (!in_array($fileExtension, $validExtension)) return ['success' => false, 'message' => 'Bukan file gambar yang valid'];

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $tmpName);
        finfo_close($finfo);

        if (!in_array($mime, ['image/jpeg', 'image/png'])) return ['success' => false, 'message' => 'File mencurigakan!'];

        if ($fileSize > 2000000) return ['success' => false, 'message' => 'Ukuran file terlalu besar (Max 2MB)'];

        $newFileName = uniqid() . '.' . $fileExtension;
        $targetDir = '../public/images/pengurus/' . $subfolder;
        if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

        if (move_uploaded_file($tmpName, $targetDir . '/' . $newFileName)) {
            return ['success' => true, 'fileName' => $newFileName];
        } else {
            return ['success' => false, 'message' => 'Gagal upload ke server'];
        }
    }

    private function deleteImage($fileName, $subfolder)
    {
        if ($fileName == 'default_profile.jpg' || empty($fileName)) return;
        $path = '../public/images/pengurus/' . $subfolder . '/' . $fileName;
        if (file_exists($path)) unlink($path);
    }
}