<?php
require_once '../header_cors_validator.php';

require_once '../Controllers/FilmsController.php';

$films = new FilmsController();

$res = file_get_contents("php://input");
$data = json_decode($res, true);    
if ($data) {
    echo $films->get_Movie($data);
}