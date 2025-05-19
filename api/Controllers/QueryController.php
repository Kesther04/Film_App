<?php

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
