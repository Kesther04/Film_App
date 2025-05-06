<?php
require_once './Database_Handler/Database.php';

class Uploads extends Database{

    // Method to insert video uploads
    protected function insert_upload($data){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }               
                
            $query = "INSERT INTO uploads (film_id,video,series_id,size,film_ext,vid_type)VALUES(?,?,?,?,?,?)";
            $stmt = $conn->prepare($query);


            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("isiiss",...array_values($data));

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

