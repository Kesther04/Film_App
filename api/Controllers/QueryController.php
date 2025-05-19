<?php

// require_once './Models/Queries.php';

// class QueryController extends Queries{

//     public function record_search($kword){
//         return $this->input_search($kword);
//     }

//     public function get_searchedFilms($input){
//         $data = json_decode(file_get_contents($input), true);
//         $arrData = [];        
        
//         require_once './Controllers/FilmsController.php'; 
//         $films = new FilmsController();

//         if ($data !== null) {
//             require_once './Controllers/UserController.php';
//             $users = new UserController();
//             $uid = $users->get_userId($data["email"]);
            
//             $searchedUid = $this->select_searched_on_uid($uid);
//             foreach ($searchedUid as $val) {
//                 if (count($searchedUid) == 0) {
//                     break;
//                 }

//                 if (!in_array($val, $arrData)) {
//                     $arrData[] = $val;
//                 }
//             }
            
//             $searched = $this->select_searched();
//             foreach ($searched as $val) {
//                 if (count($searched) == 0) {
//                     break;
//                 }

//                 if (!in_array($val, $arrData)) {
//                     $arrData[] = $val;
//                 }
//             }
            
            
//             $nfilms = json_decode(($films->get_Films()),true);
//             foreach ($arrData as $valArr) {
                        
//                 foreach ($nfilms["filmData"] as $val) {
//                     if (count($nfilms["filmData"]) == 0) {
//                         break;
//                     }

//                     if ($val["id"] !== $valArr["film_id"]) {
//                         $arrData[] = $val;
//                     }
//                 }

//             }
//             return json_encode(["status"=>"success","filmData"=>$arrData]);           
//         }else{
           
//             $searched = $this->select_searched();
//             foreach ($searched as $val) {
//                 if (count($searched) == 0) {
//                     break;
//                 }

//                 if (!in_array($val, $arrData)) {
//                     $arrData[] = $val;
//                 }
//             }


//             $nfilms = json_decode(($films->get_Films()),true);
            
                        
//             foreach ($nfilms["filmData"] as $val) {
//                 if (count($nfilms["filmData"]) == 0) {
//                     break;
//                 }
//                 foreach ($arrData as $key => $valArr) {
//                     if ($val["id"] !== $valArr["film_id"]) {
//                         $arrData[] = $val;
//                     }
//                 }

//             }

//             return json_encode(["status"=>"success","filmData"=>$arrData]);  
//         }

             
//     }
// } 


require_once './Models/Queries.php';
require_once './Controllers/FilmsController.php';
require_once './Controllers/UserController.php';

class QueryController extends Queries {

    public function record_search($kword) {
        return $this->input_search($kword);
    }

    public function get_searchedFilms($input) {
        $data = json_decode(file_get_contents($input), true);
        $arrData = [];

        $filmsController = new FilmsController();
        $userController = new UserController();

        // Get all films
        $nfilms = json_decode($filmsController->get_Films(), true);
        $allFilms = $nfilms["filmData"] ?? [];

        if ($data !== null && isset($data["email"])) {
            $uid = $userController->get_userId($data["email"]);

            // Get user-specific search
            $userSearches = $this->select_searched_on_uid($uid);

            // Add to $arrData uniquely
            foreach ($userSearches as $val) {
                $arrData[$val["film_id"]] = $val;
            }
        }

        // Get general search records
        $generalSearches = $this->select_searched();
        foreach ($generalSearches as $val) {
            $arrData[$val["film_id"]] = $val;
        }

        // Filter and add only films not already searched
        $finalFilmData = [];

        $searchedIds = array_keys($arrData);
        foreach ($allFilms as $film) {
            if (!in_array($film["id"], $searchedIds)) {
                $finalFilmData[] = $film;
            }
        }

        // Merge searched + remaining films
        $merged = array_values($arrData); // reindex
        $merged = array_merge($merged, $finalFilmData);

        return json_encode(["status" => "success", "filmData" => $merged]);
    }
}
