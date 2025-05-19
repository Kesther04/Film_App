<?php

require_once './Database_Handler/Database.php';

class Queries extends Database{

    // Method to connect to the Database
    private function get_connect(){
        $conn = $this->db_con();
            
        // Optional: check if the connection is alive
        if (method_exists($conn, 'ping') && !$conn->ping()) {
            $conn = $this->db_con();
        }

        return $conn;
    }
    
    // Method to input search
    protected function input_search($kword){
        try {
            $conn = $this->get_connect();
            $query = "INSERT INTO searches (user__id,keyword)VALUES(?,?)";
            $stmt = $conn->prepare($query);
            
            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            session_start();
            require_once './Controllers/UserController.php';
            $users = new UserController();
            $id = $users->get_userId($_SESSION['user']['email']);
            if ($id == 0) {
                throw new Exception("Search not Saved");
            }
            $stmt->bind_param("is",$id,$kword);

            if (!$stmt->execute()) {
                throw new Exception("Search not Saved");
            }else{
                $stmt->close();
                $conn->close();
                return "Search Saved";
                exit();
            }
        } catch (Exception $e) {
            return "Error Occured:".$e->getMessage();
            exit();
        }
    }

    // Method to select all searches
    protected function select_searched(){
        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM searches ORDER BY id DESC";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            if (!$stmt->execute()) {
                throw new Exception("getting search failed");
            }else{
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                require_once './Controllers/FilmsController.php';
                $films = new FilmsController();
               
                while ($row = $result->fetch_assoc()) {
                    if (!$row) {
                        throw new Exception($data);
                          
                    }
                    $searchRes = $films->get_Searches($row["keyword"]);

                    foreach($searchRes as $search){
                        if (!in_array($search,$data)) {
                            $data[] = $search;
                        }
                    }
                    
                }
                return $data;
                exit();
            }
        } catch (Exception $e) {
            return $e->getMessage();
            exit();
        }
    }

    //Method to select searches based on id
    protected function select_searched_on_uid($id){
        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM searches WHERE user__id = ? ORDER BY id DESC";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("i",$id);
            if (!$stmt->execute()) {
                throw new Exception("getting search failed");
            }else{
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();
                $data = [];

                require_once './Controllers/FilmsController.php';
                $films = new FilmsController();
               
                while ($row = $result->fetch_assoc()) {
                    if (!$row) {
                        throw new Exception($data);
                          
                    }
                    $searchRes = $films->get_Searches($row["keyword"]);

                    foreach($searchRes as $search){
                        if (!in_array($search,$data)) {
                            $data[] = $search;
                        }
                    }
                    
                }
                return $data;
                exit();
            }
        } catch (Exception $e) {
            return $e->getMessage();
            exit();
        }
    }
}