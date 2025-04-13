<?php

session_start();

require_once './header_cors_validator.php';

$response = [
    'logged_in' => isset($_SESSION['user']),
    'user' => $_SESSION['user'] ?? null
];

echo json_encode($response);