<?php
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$id = null;

if (!empty($data->id)) {
    $id = $data->id;
} elseif (isset($_GET['id'])) {
    $id = $_GET['id'];
}


if (!empty($id)) {
    $query = "DELETE FROM company_info WHERE id = :id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            jsonResponse(true, "Data deleted successfully");
        } else {
            jsonResponse(false, "Data not found");
        }
    } else {
        jsonResponse(false, "Unable to delete data");
    }
} else {
    jsonResponse(false, "ID is required");
}
?>