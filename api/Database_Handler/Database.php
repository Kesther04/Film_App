<?php


class Database {
    private $host = "localhost";
    private $servername = "root";
    private $password = "ROOT_link65$";
    private $dbname = "films_db";
    
    protected function db_con(){
        try {
            $con = new mysqli($this->host,$this->servername,$this->password,$this->dbname);
            return $con;    
        } catch (Exception $e) {
            die("Connection Failed".$e->getMessage());
        }
        

    }
}


?>