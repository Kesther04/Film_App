<?php

require_once './Database_Handler/Database.php';

class Genres extends Database{

    //  Method to input Genre
    protected function input_genre($id,$name){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }               
                
            $query = "INSERT INTO genres (film_id,name)VALUES(?,?)";
            $stmt = $conn->prepare($query);
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("is",$id,$name);

            if ($stmt->execute()) {
                $stmt->close();
                $conn->close();

                return "successful";
            }else{
                return "unsuccessful";    
            }
        } catch (Exception $e) {
            return "unsuccessful"; 
        }
    }
}

