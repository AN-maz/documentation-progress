<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

if (
    !empty($_POST['title']) && 
    !empty($_POST['description']) && 
    !empty($_POST['category'])
) {

    $image_name = "";
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $target_dir = "../imgs/"; 

        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $file_extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
        $unique_name = time() . '_' . uniqid() . '.' . $file_extension;
        $target_file = $target_dir . $unique_name;

        $allowed_types = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array(strtolower($file_extension), $allowed_types)) {
            echo json_encode(["success" => false, "message" => "Hanya file JPG, JPEG, PNG & GIF yang diperbolehkan"]);
            exit();
        }

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $image_name = $unique_name; // Ini yang akan disimpan di DB
        } else {
            echo json_encode(["success" => false, "message" => "Gagal mengupload gambar ke server"]);
            exit();
        }
    } else {
        echo json_encode(["success" => false, "message" => "Gambar wajib diupload!"]);
        exit();
    }


    $query = "INSERT INTO company_info (title, description, image_url, category) VALUES (:title, :description, :image_url, :category)";
    $stmt = $db->prepare($query);

    // Sanitasi Input
    $title = htmlspecialchars(strip_tags($_POST['title']));
    $desc = htmlspecialchars(strip_tags($_POST['description']));
    $cat = htmlspecialchars(strip_tags($_POST['category']));

    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $desc);
    $stmt->bindParam(':image_url', $image_name); // Simpan nama file unik tadi
    $stmt->bindParam(':category', $cat);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Data berhasil dibuat"]);
    } else {
        $error = $stmt->errorInfo();
        echo json_encode(["success" => false, "message" => "Gagal database: " . $error[2]]);
    }

} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap (Title, Desc, Category)"]);
}
?>