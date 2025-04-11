<?php
require_once './header_cors_validator.php';

require_once './Controllers/FilmsController.php';

$type = $_GET['apiKey'];
$films = new FilmsController();

switch ($type) {
    case 'fetchFilms':
        echo $films->get_Films();        
        break;
    case 'fetchMovie':
        echo $films->get_Movie("php://input");
        break;
    default:
        echo json_encode([
            "status" => "error",
            "message" => "API KEY DOES NOT EXIST"
        ]);
        break;
}
