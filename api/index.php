<?php
require_once './header_cors_validator.php';
header("Content-Type: application/json");

require_once './Controllers/FilmsController.php';
require_once './Controllers/UserController.php';
require_once './Controllers/AdminController.php';
require_once './Controllers/QueryController.php';
require_once './Controllers/UploadsController.php';
require_once './Controllers/RecordsController.php';

$type = $_GET['apiKey'] ?? null;

switch ($type) {
    case 'fetchFilms':
        $films = new FilmsController();
        echo $films->get_Films();        
        break;
    case 'fetchFilmsSearched':
        $films = new QueryController();
        echo $films->get_searchedFilms("php://input");        
        break;
    case 'adminOverviewData':
        $user = new UserController();
        echo $user->getOverview("php://input");
        break;
    case 'fetchMovie':
        $films = new FilmsController();
        echo $films->get_Movie("php://input");
        break;
    case 'fetchSerie':
        $films = new FilmsController();
        echo $films->get_Serie("php://input");
        break;
    case 'searchQuery':
        $films = new FilmsController();
        echo $films->get_Searched("php://input");
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
    case 'fetchUploads':
        $uploads = new UploadsController();
        echo $uploads->get_uploads("php://input");
        break;
    case 'records':
        $records = new RecordsController();
        echo $records->save_records("php://input");
        break;
    case 'fetchRecords':
        $records = new RecordsController();
        echo $records->get_user_records("php://input");
        break;
    case 'pushFilmData':
        $film = new FilmsController();
        echo $film->handle_film_data("php://input");    
        break;
    case 'fetchUsers':
        $users = new UserController();
        echo $users->get_all_users();
        break;
    default:
        echo json_encode([
            "status" => "error",
            "message" => "API KEY DOES NOT EXIST"
        ]);
        break;
}
