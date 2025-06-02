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

    // Method to select user records based on user__id
    protected function select_user_records($id,$type){
        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM records WHERE user__id = ? AND record_type = ? ORDER BY id DESC";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("is",$id,$type);

            if (!$stmt->execute()) {
                throw new Exception($type."s not Selected");
            }else {
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                require_once './Controllers/UploadsController.php';
                require_once './Controllers/SerieController.php';
                require_once './Controllers/FilmsController.php';
                $upl = new UploadsController();
                $serie = new SerieController();
                $film = new FilmsController();

                while($row = $result->fetch_assoc()){
                    $rowData = [];
                    $uplData = $upl->get_upload($row["upl_id"]);
                    if ($uplData["seriesId"] == NULL){
                        $filmData = json_decode( $film->get_movie_byId($row["film_id"]),true);

                        $rowData = [
                            "id" => $row["film_id"],
                            "type" => "MOVIE",
                            "name" => $uplData["videoName"],
                            "size" => $uplData["videoSize"],
                            "date" => $row["created_at"],
                            "img" => $filmData["movieData"]["img"]
                        ];

                        $data[] = $rowData;
                        
                    }else{
                        $seasonNo = $serie->get_serie_on_id($uplData["seriesId"]);
                        $filmData = json_decode( $film->get_serie_byId($row["film_id"]),true);

                        $rowData = [
                            "id" => $row["film_id"],
                            "type" => "SERIE",
                            "name" => $uplData["videoName"],
                            "size" => $uplData["videoSize"],
                            "date" => $row["created_at"]
                        ];

                        foreach ($filmData["serieData"]["img"] as $key => $value) {
                            $ns = $seasonNo - 1;
                            if($ns == $key){
                               $rowData["img"] = $value; 
                               
                            }
                        }


                        
                        $data[] = $rowData;
                        
                    }

                    
                }

                return json_encode([
                    "status"=>"success",
                    "records"=>$data
                ]);


            }
            
        } catch (Exception $e) {
            return json_encode([
                "status" => "error",
                "message" => "Error Occured: ".$e->getMessage()
            ]);
        }   
    }

    
    // Method to select records based on film_id
    protected function select_film_records($id,$type){
        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM records WHERE film_id = ? AND record_type = ? ORDER BY id DESC";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("is",$id,$type);

            if (!$stmt->execute()) {
                throw new Exception($type."s not Selected");
            }else {
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }

                return $data;
            }
            
        } catch (Exception $e) {
            return json_encode([
                "status" => "error",
                "message" => "Error Occured: ".$e->getMessage()
            ]);
        }   
    }

    // Method to select based on record type
    protected function select_based_records($type){
        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM records WHERE record_type = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",$type);

            if (!$stmt->execute()) {
                throw new Exception($type."s not Selected");
            }else {
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                
                return $data;
            }
            
        } catch (Exception $e) {
            return [];
        }
    }
}
