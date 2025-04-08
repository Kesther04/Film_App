<?php

require_once '../Models/Films.php';

class FilmsController{

    public function get_Films(){
        $films = new Films();
        return $films->select_Films();
    }
}
