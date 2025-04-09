<?php

require_once '../Models/Films.php';

class FilmsController extends Films{

    
    public function get_Films(){
        return $this->select_Films();
    }

    public function get_Movie($id){
        header("Access-Control-Allow-Origin:*");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
        header("Access-Control-Allow-Headers: Content-Type");
        header("Content-Type: application/json");   
        return $this->select_movie($id);
    }
}

