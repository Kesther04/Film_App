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

    private function check_if_arr_empty($arr,$err){
        foreach ($arr as $key => $val) {
            if (is_array($val)) {
                if (empty($val)) {
                    $err = true;
                }else{
                    $arr[$key] = $this->check_if_arr_empty($val,$err);
                }
            }else{
                if(empty($val)){
                    $err = true;
                }
            }
        }

        return $err;
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
        $err = false;

        if (empty($data["film_type"])) {
            
            return json_encode(["status" => "error","message" => "Film Type not Found"]);
        }elseif ($data["film_type"] == "MOVIE" || $data["film_type"] == "ANIMATED MOVIE") {
            // to push movies to be inserted
            try {
                
                $dataFormat = [
                    "title" => $data["title"],
                    "genres" => $data["genre"],
                    "img" => $data["img"],
                    "desc" => $data["film_desc"],
                    "cast" => $data["film_cast"],
                    "type" => str_replace(' ','_',$data["film_type"]),
                    "release_year" => $data["release_year"],
                    "trailer_link" => $data["trailer_link"],
                    "videos" => $data["video"]
                ]; 
                $updErr = $this->check_if_arr_empty($dataFormat,$err);
                
                if ($updErr == true) {
                    return json_encode(["status" => "error","message" => "Ensure Movie Data is Complete"]);
                }else{

                    $movieDataFormat = $this->sanitize_arr_data($dataFormat);
                    return $this->input_movie($movieDataFormat);
                
                }

            } catch (Exception $e) {
                return json_encode(["status"=>"error","message"=>"Error Occured".$e->getMessage()]);
            }
            
        }elseif ($data["film_type"]  == "SERIE" || $data["film_type"] == "ANIMATED SERIE") {
            // to push series to be inserted
            try {
                $img = [];
                $cast = [];
                $rel_yr = [];
                $tr_link = [];
                $ep = [];
                $seasonNo = [];
                foreach ($data["season"] as $key => $value) {
                    
                    switch ($key) {

                        case "img":
                            $img[] = $value;                            
                            break;
                        case "film_cast":
                            $cast[] = $value;
                            break;
                        case "release_year":
                            $rel_yr[] = $value;
                            break;
                        case "trailer_link":
                            $tr_link[] = $value;
                            break;
                        case "episode":
                            $ep[] = $value;
                            break;
                        default:
                            $seasonNo[] = $value;
                            break;
                    }
                }
                $dataFormat = [
                    "title" => $data["title"],
                    "genres" => $data["genre"],
                    "img" => $img,
                    "desc" => NULL,
                    "cast" => $cast,
                    "release_year" => $rel_yr,
                    "trailer_link" => $tr_link,
                    "type" => str_replace(' ','_',$data["film_type"]),
                    "seasonNo" => $seasonNo,
                    "episodes" => $ep
                ];

              
                $updErr = $this->check_if_arr_empty($dataFormat,$err);

                if ($updErr == true) {
                    return json_encode(["status" => "error","message" => "Ensure Serie Data is Complete"]);
                }else{
                
                    $serieDataFormat = $this->sanitize_arr_data($dataFormat);
                    // return $this->input_serie($serieDataFormat);    
                    return json_encode(["status"=>"success","message"=>$serieDataFormat]);                
                }
            } catch (Exception $e) {
                return json_encode(["status"=>"error","message"=>"Error Occured".$e->getMessage()]);
            }
        

        }else{
            return json_encode(["status" => "error", "message" => "Invalid Film Type"]);
        }


    }
}

