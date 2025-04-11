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
}

