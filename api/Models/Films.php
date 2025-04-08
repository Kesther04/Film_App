<?php

require_once '../Database_Handler/Database.php';

class Films extends Database{
    // Film Data properties
    // private $name;
    // private $img;
    // private $desc;
    // private $video;
    // private $dt;

    // Method to select Film Data
    public function select_films(){
        header("Access-Control-Allow-Origin:*");
        header("Content-Type: application/json"); 

        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }

            $query = "SELECT * FROM films_store ORDER BY RAND()  LIMIT 9";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            
            if($stmt->execute()){
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }

                return json_encode([
                    "status" => "success",
                    "movieData" => $data
                ]);
                exit();                   
            }else{
                $stmt->close();
                $conn->close();

                return json_encode([
                    "status" => "error",
                    "message" => "Films Not Fetched: ".$conn->error
                ]);
                exit();

            }
            
            

        } catch (Exception $e) {
            return json_encode([
                "status" => "error",
                "message" => "Error Occured: ".$e->getMessage()
            ]);
            exit();
        }



    }
}
