<?php

require_once './Database_Handler/Database.php';

class Films extends Database{
    
    // Method to select Film Data
    protected function select_films(){
        

        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }

            $query = "SELECT * FROM films ORDER BY RAND()  LIMIT 9";
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

    // Method to select Specific Film Data
    protected function select_movie($id){

        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }               

            $query = "SELECT * FROM films WHERE id = ?";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",...array_values($id));

            
            if($stmt->execute()){
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data;

                $row = $result->fetch_assoc();
                $data = $row;

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

    // Method to get Film Id after Insert
    private function select_on_film_insert($name){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }         

            $query = "SELECT * FROM films WHERE title = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",$name);

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


    // Method to input Movie Data
    protected function input_movie($data){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }               

            $query = "INSERT INTO films (title,img,film_desc,film_cast,film_type,release_year,trailer_link)VALUES(?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $genres = $data["genres"];
            $videos = $data["videos"];

            unset($data["videos"], $data["genres"]);

            $stmt->bind_param("sssssis",...array_values($data));

            
            if($stmt->execute()){
                $stmt->close();
                $conn->close();

                $filmId = $this->select_on_film_insert($data["title"]);

                require_once './Controllers/GenreController.php';
                require_once './Controllers/UploadsController.php';
                $genRe = new GenreController();
                $uploads = new UploadsController();
                
                $checkGenres = $genRe->handle_genre($filmId,$genres);
                $checkUplds = $uploads->place_movie_uploads($filmId,$videos);
                
                if (!$checkGenres) {
                    return json_encode([
                        "status" => "error",
                        "message" => "Genre Upload not Complete"
                    ]);
                    exit();
                }
                
                if (!$checkUplds) {
                    return json_encode([
                        "status" => "error",
                        "message" => "video Uploads not Complete"
                    ]);
                    exit();
                }


                return json_encode([
                    "status" => "success",
                    "message" => "All Movie Data Inserted Successful"
                ]);
                exit();                   
            }else{
                $stmt->close();
                $conn->close();

                return json_encode([
                    "status" => "error",
                    "message" => "Movie not Inserted: ".$conn->error
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

    // Method to input Serie Data
    protected function input_serie($data){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }               

            $query = "INSERT INTO films (title,img,film_desc,film_cast,film_type,release_year,trailer_link)VALUES(?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $genres = $data["genres"];
            $videos = $data["videos"];

            unset($data["videos"], $data["genres"]);

            $stmt->bind_param("sssssis",...array_values($data));

            
            if($stmt->execute()){
                $stmt->close();
                $conn->close();

                $filmId = $this->select_on_film_insert($data["title"]);

                require_once './Controllers/GenreController.php';
                require_once './Controllers/UploadsController.php';
                $genRe = new GenreController();
                $uploads = new UploadsController();
                
                $checkGenres = $genRe->handle_genre($filmId,$genres);
                $checkUplds = $uploads->place_movie_uploads($filmId,$videos);
                
                if (!$checkGenres) {
                    return json_encode([
                        "status" => "error",
                        "message" => "Genre Upload not Complete"
                    ]);
                    exit();
                }
                
                if (!$checkUplds) {
                    return json_encode([
                        "status" => "error",
                        "message" => "video Uploads not Complete"
                    ]);
                    exit();
                }


                return json_encode([
                    "status" => "success",
                    "message" => "All Movie Data Inserted Successful"
                ]);
                exit();                   
            }else{
                $stmt->close();
                $conn->close();

                return json_encode([
                    "status" => "error",
                    "message" => "Movie not Inserted: ".$conn->error
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
