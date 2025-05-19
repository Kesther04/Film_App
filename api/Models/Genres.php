<?php

require_once './Database_Handler/Database.php';

class Genres extends Database{
    
    // Method to connect to the Database
    private function get_connect(){
        $conn = $this->db_con();
            
        // Optional: check if the connection is alive
        if (method_exists($conn, 'ping') && !$conn->ping()) {
            $conn = $this->db_con();
        }

        return $conn;
    }

    //  Method to input Genre
    protected function input_genre($id,$name){
        try {
            $conn = $this->get_connect();
            $query = "INSERT INTO genres (film_id,name)VALUES(?,?)";
            $stmt = $conn->prepare($query);
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("is",$id,$name);

            if (!$stmt->execute()) {
                return "unsuccessful";
            }else{
                $stmt->close();
                $conn->close();

                return "successful";
                    
            }
        } catch (Exception $e) {
            return "unsuccessful"; 
        }
    }

    protected function select_genres($id){
        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM genres WHERE film_id = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }
            
            $stmt->bind_param("i",$id);

            if (!$stmt->execute()) {
                return "unsuccessful";
            }else{
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                while ($row = $result->fetch_assoc()) {
                    $data[] = $row["name"];
                }

                return $data;   
            }
        } catch (Exception $e) {
            return "unsuccessful";
        }
    }
}