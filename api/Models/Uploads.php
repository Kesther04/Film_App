<?php
require_once './Database_Handler/Database.php';

class Uploads extends Database{
    // Method to connect to the Database
    private function get_connect(){
        $conn = $this->db_con();
            
        // Optional: check if the connection is alive
        if (method_exists($conn, 'ping') && !$conn->ping()) {
            $conn = $this->db_con();
        }

        return $conn;
    }

    // Method to insert video uploads
    protected function insert_upload($data){
        try {
            $conn = $this->get_connect();
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

    // Method to select uploads based on film_id and series_id
    protected function select_uploads($filmId,$serId){
        try {
            $conn = $this->get_connect();
            if($serId == null){
                $query = "SELECT * FROM uploads WHERE film_id = ? AND series_id IS NULL";
                $stmt = $conn->prepare($query);

                if (!$stmt) {
                    throw new Exception("SQL preparation failed: " . $conn->error);
                }

                $stmt->bind_param("i",$filmId);
            }else{
                $query = "SELECT * FROM uploads WHERE film_id = ? AND series_id = ?";
                $stmt = $conn->prepare($query);

                if (!$stmt) {
                    throw new Exception("SQL preparation failed: " . $conn->error);
                }

                $stmt->bind_param("ii",$filmId,$serId);
            }

            
            if (!$stmt->execute()) {
                throw new Exception("Uploads Not Selected");
            }else{    
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                while($row = $result->fetch_assoc()){
                    $data[] = $row;
                }

                return json_encode([
                    "status"=> "success",
                    "uploads"=>$data
                ]);
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