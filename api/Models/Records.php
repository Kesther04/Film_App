<?php

require_once './Database_Handler/Database.php';

class Records extends Database{
    
    // Method to connect to the Database
    private function get_connect(){
        $conn = $this->db_con();
            
        // Optional: check if the connection is alive
        if (method_exists($conn, 'ping') && !$conn->ping()) {
            $conn = $this->db_con();
        }

        return $conn;
    }

    // Method to insert records into the records table
    protected function insert_records($data){
        try {
            $conn = $this->get_connect();
            $query = "INSERT INTO records (user__id,film_id,upl_id,record_type)VALUES(?,?,?,?)";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("iiis",...array_values($data));

            if (!$stmt->execute()) {
                throw new Exception($data["type"]." not Recorded");
            }else {
                $stmt->close();
                $conn->close();

                return json_encode([
                    "status" => "success",
                    "message" => $data["type"]." Recorded"
                ]);                
            }
            

        } catch (Exception $e) {
            return json_encode([
                "status" => "error",
                "message" => "Error Occured: ".$e->getMessage()
            ]);
        }
    }
}