<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (is_null($data)) {
    echo json_encode(["success" => false, "message" => "Format JSON salah atau Body kosong"]);
    exit();
}

if (!empty($data->email) && !empty($data->password)) {
    
    $query = "SELECT * FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            
            unset($row['password']); // Hapus hash dari output
            
            echo json_encode([
                "success" => true,
                "message" => "Login berhasil",
                "data" => $row
            ]);
        } else {
            echo json_encode([
                "success" => false, 
                "message" => "Password salah!"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false, 
            "message" => "Email tidak terdaftar!"
        ]);
    }
} else {
    echo json_encode([
        "success" => false, 
        "message" => "Data tidak lengkap! Email atau Password kosong."
    ]);
}
?>