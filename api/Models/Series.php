<?php
require_once './Database_Handler/Database.php';

class Series extends Database{

    // To fetch series id when it's uploaded
    private function select_on_series_upload($filmId,$sid,$eid){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }      
            $query = "SELECT * FROM series WHERE film_id = ? AND season = ? AND episode = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("iii",$filmId,$sid,$eid);

            if ($stmt->execute()) {
                $res = $stmt->get_result();
                $stmt->close();
                $conn->close();
                

                $row = $res->fetch_assoc();
                

                return $row["id"];
            }
        } catch (Exception $e) {
            return "unsuccessful";
            exit();
        }
    }

    // Method to input episode data into database
    protected function input_episode($data){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }               
                
            $query = "INSERT INTO series (film_id,season,episode,title,episode_desc)VALUES(?,?,?,?,?)";
            $stmt = $conn->prepare($query);
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $videos = $data["videos"];

            unset($data["videos"]);

            $stmt->bind_param("iiiss",...array_values($data));

            if ($stmt->execute()) {
                $stmt->close();
                $conn->close();

                $seriesId = $this->select_on_series_upload($data["film_id"],$data["season"],$data["episode"]);

                require_once './Controllers/UploadsController.php';
                $uploads = new UploadsController();

                $checkUplds = $uploads->place_serie_uploads($data["film_id"],$seriesId,$videos);
                if (!$checkUplds) {
                   return "Video Uploads not Complete";
                }        

                return "successful";
            }else{
                return "unsuccessful";    
            }
        } catch (Exception $e) {
            return "unsuccessful"; 
        }
    }
}