<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

if (isset($_GET['id']) && !empty($_GET['id'])) {
    // READ single record
    $id = $_GET['id'];
    
    $query = "SELECT * FROM company_info WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        jsonResponse(true, "Data found", $row);
    } else {
        jsonResponse(false, "Data not found");
    }
} else {
    $query = "SELECT * FROM company_info ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    
    if (count($data) > 0) {
        jsonResponse(true, "Data retrieved successfully", $data);
    } else {
        jsonResponse(false, "No data found", []);
    }
}
?>