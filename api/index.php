<?php
require_once './header_cors_validator.php';

require_once './Controllers/FilmsController.php';
require_once './Controllers/UserController.php';
require_once './Controllers/AdminController.php';

$type = $_GET['apiKey'];

switch ($type) {
    case 'fetchFilms':
        $films = new FilmsController();
        echo $films->get_Films();        
        break;
    case 'fetchMovie':
        $films = new FilmsController();
        echo $films->get_Movie("php://input");
        break;
    case 'signUp':
        $users = new UserController();
        echo $users->signup_user("php://input");
        break;
    case 'signIn':
        $users = new UserController();
        echo $users->signin_user("php://input");
        break;
    case 'admin_signUp':
        $admin = new AdminController();
        echo $admin->signup_admin("php://input");
        break;
    case 'admin_signIn':
        $admin = new AdminController();
        echo $admin->signin_admin("php://input");
        break;
    default:
        echo json_encode([
            "status" => "error",
            "message" => "API KEY DOES NOT EXIST"
        ]);
        break;
}
