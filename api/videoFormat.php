<?php
require_once '../header_cors_validator.php';
header("Content-Type: multipart/form-data");

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['video'])) {
    $targetDir = $_POST['targetDir'];
    $newName = $_POST['newName'] ?? $_FILES['video']['name'];

    // Ensure directory exists
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $targetFilePath = $targetDir . '/' . basename($newName);

    if (move_uploaded_file($_FILES['video']['tmp_name'], $targetFilePath)) {
        echo json_encode(["success" => true, "message" => "File uploaded to $targetFilePath", "name" => $_FILES["video"]["name"]]);
    } else {
        echo json_encode(["success" => false, "message" => "Upload failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No file uploaded"]);
}
?>
