<?php
session_start();
require_once './header_cors_validator.php';
session_unset();
session_destroy();
echo json_encode(['message'=>'Logged Out Successfully']);