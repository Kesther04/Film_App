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
        return $this->search_data_from_film($data);
    }
}
