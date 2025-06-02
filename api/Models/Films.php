<?php

require_once './Database_Handler/Database.php';

class Films extends Database{

    // Method to connect to the Database
    private function get_connect(){
        $conn = $this->db_con();
            
        // Optional: check if the connection is alive
        if (method_exists($conn, 'ping') && !$conn->ping()) {
            $conn = $this->db_con();
        }

        return $conn;
    }


    // Method to select Film Data
    protected function select_films(){
        
        try {
           
            $conn = $this->get_connect();

            $query = "SELECT * FROM films";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }


            if (!$stmt->execute()) {
                throw new Exception("Films Not Fetched");   
            }else{
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                require_once './Controllers/GenreController.php';
                $genres = new GenreController();

                while($row = $result->fetch_assoc()){
                    // foreach ($row ) {
                    
                
                    $row["genres"] = $genres->get_genres($row["id"]);
                    $data[] = $row;
                }

                return json_encode([
                    "status" => "success",
                    "filmData" => $data
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

    // Method to search for Film
    private function search_data_from_film($kword){
        try {
            $conn = $this->get_connect();
            $query = "SELECT 
            films.id as film_id, 
            genres.id as genre_id,
            title,
            img,
            film_type
            FROM films LEFT JOIN genres ON films.id = genres.film_id  
            WHERE title LIKE CONCAT('%',?,'%') OR film_cast LIKE CONCAT('%',?,'%') OR release_year LIKE CONCAT('%',?,'%') OR genres.name = ? ";
            $stmt = $conn->prepare($query);
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("ssss",$kword,$kword,$kword,$kword);

            if (!$stmt->execute()) {
                throw new Exception("Search not Executed");
            }else{
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                while ($row = $result->fetch_assoc()) {
                    $dataId = $row["film_id"];
                    if (!isset($data[$dataId])) {
                        $data[$dataId] = $row;    
                    }

                }

                $data = array_values($data);


                return [
                    "status" => "success",
                    "searchData" => $data
                ];
                exit();          
            }
            
        } catch (Exception $e) {
            return [
                "status" => "error",
                "searchData" => "Error Occured: ".$e->getMessage()
            ];
            exit();
        }        
    }

    
    // Method to search data from films according to searchbar
    protected function search_data_from_searchbar($kword){
        $search = $this->search_data_from_film($kword);

        require_once './Controllers/QueryController.php';
        $query = new QueryController();
        $queryStore = $query->record_search($kword);

        return json_encode($search);
    }
    

    // Method to search data from films according to searches table
    protected function search_data_from_searches($kword){
        $search = $this->search_data_from_film($kword);
        return $search["searchData"];
    }

    // Method to select Specific Movie Data
    protected function select_movie($id){

        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM films WHERE id = ?";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",...array_values($id));

            
            if(!$stmt->execute()){

                $stmt->close();
                $conn->close();
                throw new Exception("Films Not Fetched");  
            }else{
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data;

                $row = $result->fetch_assoc();
                $row["film_cast"] = str_replace('&#039;',"'",$row["film_cast"]);
                $data = $row;

                return json_encode([
                    "status" => "success",
                    "movieData" => $data
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

    // Method to select Specific Serie Data
    protected function select_serie($id){

        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM films WHERE id = ?";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",...array_values($id));

            
            if(!$stmt->execute()){
                $stmt->close();
                $conn->close();
                throw new Exception("Films Not Fetched");  
                
            }else{
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data;

                $row = $result->fetch_assoc();
                $row["film_cast"] = str_replace('&#039;',"'",$row["film_cast"]);
                $data = $row;
                
                // get serie genres

                // get serie episodes
                require_once './Controllers/SerieController.php';
                $serie = new SerieController();

                $episodes = $serie->get_episodes($id);

                $data["episodes"] = $episodes;
                $data["trailer_link"] = explode(".+.",$data["trailer_link"]);
                $data["img"] = explode(".+.",$data["img"]);
                $data["film_cast"] = explode(".+.",$data["film_cast"]);
                $data["release_year"] = explode(".+.",$data["release_year"]);


                return json_encode([
                    "status" => "success",
                    "serieData" => $data
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
            $conn = $this->get_connect();
            $query = "SELECT * FROM films WHERE title = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",$name);

            if (!$stmt->execute()) {
                $stmt->close();
                $conn->close();
                return 0;  
            }else{
                $res = $stmt->get_result();
                $stmt->close();
                $conn->close();
                
                $row = $res->fetch_assoc();

                return $row["id"];
            }
        } catch (Exception $e) {
            return 0;
        }
    }


    // Method to input Movie Data
    protected function input_movie($data){
        try {
            $conn = $this->get_connect();
            $query = "INSERT INTO films (title,img,film_desc,film_cast,film_type,release_year,trailer_link)VALUES(?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $genres = $data["genres"];
            $videos = $data["videos"];

            unset($data["videos"], $data["genres"]);

            $stmt->bind_param("sssssss",...array_values($data));
            
            if(!$stmt->execute()){
                $stmt->close();
                $conn->close();
                throw new Exception("Movie not Inserted"); 
            }else{
                $stmt->close();
                $conn->close();

                $filmId = $this->select_on_film_insert($data["title"]);

                if ($filmId == 0) {
                    throw new Exception("Select from Films Table Failed"); 
                }

                require_once './Controllers/GenreController.php';
                require_once './Controllers/UploadsController.php';
                $genRe = new GenreController();
                $uploads = new UploadsController();
                
                $checkGenres = $genRe->handle_genre($filmId,$genres);
                $mtitle = str_replace(" ","_",$data["title"]);
                $checkUplds = $uploads->place_movie_uploads($filmId,$mtitle,$data["release_year"],$videos);
                
                if (!$checkGenres) {
                    throw new Exception("Genre Uploads not Complete"); 
                }
                
                if (!$checkUplds) {
                    throw new Exception("Video Uploads not Complete"); 
                    
                }

                return json_encode([
                    "status" => "success",
                    "message" => "All Movie Data Inserted Successful"
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
            $conn = $this->get_connect();        

            $query = "INSERT INTO films (title,img,film_desc,film_cast,film_type,release_year,trailer_link)VALUES(?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($query);    
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $genres = $data["genres"];
            $seasonNo = $data["seasonNo"];
            $episodes = $data["episodes"];

            unset($data["episodes"], $data["genres"], $data["seasonNo"]);

            $stmt->bind_param("sssssss",...array_values($data));

            
            if(!$stmt->execute()){
                $stmt->close();
                $conn->close();
                throw new Exception("Serie not Inserted");
            }else{
                $stmt->close();
                $conn->close();

                $filmId = $this->select_on_film_insert($data["title"]);

                if ($filmId == 0) {
                    throw new Exception("Select from Films Table Failed"); 
                }

                require_once './Controllers/GenreController.php';
                require_once './Controllers/SerieController.php';
                $genRe = new GenreController();
                $serie = new SerieController();
                
                $checkGenres = $genRe->handle_genre($filmId,$genres);
                
                if (!$checkGenres) {
                    throw new Exception("Genre Upload not Complete");
                }

                foreach ($seasonNo as $key => $singleNo) {
                    $serieCon = $serie->handle_series($filmId,$singleNo,$episodes[$key]);

                    if ($serieCon !== "successful") {
                        throw new Exception($serieCon);
                    }
                }                
                return json_encode([
                    "status" => "success",
                    "message" => "All Serie Data Inserted Successful"
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
