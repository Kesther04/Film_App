<?php

require_once './Models/Films.php';

class FilmsController extends Films{

    
    public function get_Films(){
        return $this->select_Films();
    }

    public function get_Movie($input){
        $id = ['id' => json_decode(file_get_contents($input), true)];
        return $this->select_movie($id);
    }

    public function get_Serie($input){
        $id = ['id' => json_decode(file_get_contents($input), true)];
        return $this->select_serie($id);
    }

    private function check_if_arr_empty($arr) {
        foreach ($arr as $val) {
            if (is_array($val)) {
                if (empty($val) || $this->check_if_arr_empty($val)) {
                    return true;
                }
            } else {
                if (empty($val)) {
                    return true;
                }
            }
        }
        return false;
    }
    

    private function sanitize_arr_data($array) {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = $this->sanitize_arr_data($value);
            } else {
                $array[$key] = htmlspecialchars(trim($value));
            }
        }
        return $array;
    }

    public function handle_film_data($input){
        $data = json_decode(file_get_contents($input), true);

        $updErr = $this->check_if_arr_empty($data);
        if ($updErr == true) {
            return json_encode(["status" => "error","message" => "Ensure Film Data is Complete"]);
        }else{

            $data["film_type"] = str_replace(' ','_',$data["film_type"]);
            $dataFormat = $this->sanitize_arr_data($data);

            if ($dataFormat["film_type"] == "MOVIE" || $dataFormat["film_type"] == "ANIMATED_MOVIE") {
                // for uploading movies
                try{
                    $movieDataFormat = [
                        "title" => $dataFormat["title"],
                        "genres" => $dataFormat["genre"],
                        "img" => $dataFormat["img"],
                        "desc" => $dataFormat["film_desc"],
                        "cast" => $dataFormat["film_cast"],
                        "type" => $dataFormat["film_type"],
                        "release_year" => $dataFormat["release_year"],
                        "trailer_link" => $dataFormat["trailer_link"],
                        "videos" => $dataFormat["video"]
                    ]; 

                    return $this->input_movie($movieDataFormat);
                }catch (Exception $e) {
                    return json_encode(["status"=>"error","message"=>"Error Occured".$e->getMessage()]);
                }
        
            }elseif ($dataFormat["film_type"]  == "SERIE" || $dataFormat["film_type"] == "ANIMATED_SERIE") {
                // for uploading series
                try{ 
                    $img = [];
                    $cast = [];
                    $rel_yr = [];
                    $tr_link = [];
                    $ep = [];
                    $seasonNo = [];


                    foreach ($dataFormat["season"] as $dtvalue) {

                        foreach ($dtvalue as $key => $val) {
                            switch ($key) {
                                case "img":
                                    $img[] = $val;                            
                                    break;
                                case "film_cast":
                                    $cast[] = $val;
                                    break;
                                case "release_year":
                                    $rel_yr[] = $val;
                                    break;
                                case "trailer_link":
                                    $tr_link[] = $val;
                                    break;
                                case "episode":
                                    $ep[] = $val;
                                    break;
                                case "id":
                                    $seasonNo[] = $val;
                                    break;
                            }
                        }
                    }

                    
                    $serieDataFormat = [
                        "title" => $dataFormat["title"],
                        "genres" => $dataFormat["genre"],
                        "img" => implode(".+.",$img),
                        "desc" => NULL,
                        "cast" => implode(".+.",$cast),
                        "type" => $dataFormat["film_type"],
                        "release_year" => implode(".+.",$rel_yr),
                        "trailer_link" => implode(".+.",$tr_link),
                        "seasonNo" => $seasonNo,
                        "episodes" => $ep
                    ];

                    return $this->input_serie($serieDataFormat);    
                    // return json_encode(["status"=>"success","message"=>$serieDataFormat]);         
                }catch (Exception $e) {
                    return json_encode(["status"=>"error","message"=>"Error Occured".$e->getMessage()]);
                }
           
            }else{    
                return json_encode(["status" => "error", "message" => "Invalid Film Type"]);
            }
        }
    }

    public function get_Searched($input){
        $data = json_decode(file_get_contents($input), true);
        $data = htmlspecialchars(trim($data));
        if (empty($data)) {
            return json_encode(["status" => "error","searchData" => "Invalid Search"]);
        }
        return $this->search_data_from_searchbar($data);
    }

    public function get_Searches($data){
        return $this->search_data_from_searches($data);
    }

    public function get_movie_byId($id){
        return $this->select_movie(["id" =>$id]);
    }

    public function get_serie_byId($id){
        return $this->select_serie(["id" => $id]);
    }

    public function get_Total_series_et_movies(){
        $films = json_decode($this->select_Films(),true);
        $allFilms = $films["filmData"];
        $movieCount = 0;
        $serieCount = 0;
        foreach ($allFilms as $row) {
            if ($row["film_type"] == "MOVIE" || $row["film_type"] == "ANIMATED_MOVIE") {
                $movieCount += 1;      
            }

            if ($row["film_type"] == "SERIE" || $row["film_type"] == "ANIMATED_SERIE") {
                $serieCount += 1;      
            }
        }

        $arrData = [
            "movies" => $movieCount,
            "series" => $serieCount
        ];

        return $arrData;
    }

    // method top 5 recorded(downloaded/streamed) films using usort to display them in descending order similar to rsort & arsort
    public function top_record_films($type){
        $films = json_decode($this->select_Films(),true);
        $allFilms = $films["filmData"];

        require_once './Controllers/RecordsController.php';
        $records = new RecordsController();

        $arrData = [];
        foreach ($allFilms as $row) {
           $dlCount =  count($records->get_film_records($row["id"],$type));
           $arrData[] = [$row["title"],$dlCount];            
        }

        usort($arrData, function ($a,$b){
            return $b[1] <=> $a[1];
        });

        $newData = array_slice($arrData,0,5);
        return $newData;
    }    
}
