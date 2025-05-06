<?php
require_once './Models/Genres.php';

class GenreController extends Genres {

    public function handle_genre($id,$genres){
        $isSet = true;
        foreach ($genres as $key => $val) {
            if($this->input_genre($id,$val) !== "successful"){
                $isSet = false;
            }
        }

        return $isSet;
    }
}

?>