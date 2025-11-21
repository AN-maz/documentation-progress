<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

if (!file_exists('../config.php')) {
    echo json_encode(["success" => false, "message" => "File config.php tidak ditemukan! Cek path include."]);
    exit();
}

include_once '../config.php';

try {
    $database = new Database();
    $db = $database->getConnection();
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Gagal koneksi database: " . $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (is_null($data)) {
    echo json_encode(["success" => false, "message" => "JSON tidak terbaca. Pastikan kirim RAW JSON."]);
    exit();
}

if (
    !empty($data->nama) && 
    !empty($data->email) && 
    !empty($data->password)
) {
    $checkQuery = "SELECT id FROM users WHERE email = :email LIMIT 1";
    $stmtCheck = $db->prepare($checkQuery);
    $stmtCheck->bindParam(':email', $data->email);
    
    if (!$stmtCheck->execute()) {
        $err = $stmtCheck->errorInfo();
        echo json_encode(["success" => false, "message" => "SQL Error (Cek Email): " . $err[2]]);
        exit();
    }

    if ($stmtCheck->rowCount() > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Email sudah terdaftar! Gunakan email lain."
        ]);
        exit();
    }

    $password_hash = password_hash($data->password, PASSWORD_BCRYPT);

    $query = "INSERT INTO users (nama, email, password) VALUES (:nama, :email, :password)";
    
    $stmt = $db->prepare($query);

    $data->nama = htmlspecialchars(strip_tags($data->nama));
    $data->email = htmlspecialchars(strip_tags($data->email));

    $stmt->bindParam(':nama', $data->nama);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':password', $password_hash);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Registrasi berhasil! Silakan login."
        ]);
    } else {
        $errorInfo = $stmt->errorInfo();
        echo json_encode([
            "success" => false,
            "message" => "Gagal Database: " . $errorInfo[2] 
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Data tidak lengkap! Nama, Email, atau Password kosong."
    ]);
}
?>