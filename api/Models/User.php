<?php

require_once './Database_Handler/Database.php';

class User extends Database{
    // Method to connect to the Database
    private function get_connect(){
        $conn = $this->db_con();
            
        // Optional: check if the connection is alive
        if (method_exists($conn, 'ping') && !$conn->ping()) {
            $conn = $this->db_con();
        }

        return $conn;
    }

    // To insert user data into database
    protected function insert_user($data){
        try {
            $conn = $this->get_connect();

            $query = "INSERT INTO users (google_id,email,username,is_admin,password) VALUES (?,?,?,?,?)";

            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("sssis",...array_values($data));

            if (!$stmt->execute()) {
                $stmt->close();
                $conn->close();
                throw new Exception("Form Submission UnSuccessful");
                
            }else{
                $stmt->close();
                $conn->close();

                require_once './Database_Handler/session.php';
                $_SESSION['user'] = [
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'isAdmin' => $data['is_admin']
                ];

                if ($_SESSION['user']) {
                    return json_encode([
                        "status" => "success",
                        "message" => "User Signed In Successfully"
                    ]);       
                }
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

    // To update users table when user logs in
    private function update_on_user_login($id){
        try{
            $conn = $this->get_connect();

            $query = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",$id);

            if (!$stmt->execute()) {
                throw new Exception("update unsuccessful");
            }else{
                $stmt->close();
                $conn->close();

                return "successful";
                
            }

        }catch(Exception $e){
            return "unsuccessful".$e->getMessage();
            
        }
    }

    // To select user data from database based on email
    protected function select_user($data,$field){
        try {
            $conn = $this->get_connect();
            $query = "SELECT * FROM users WHERE email = ?";
            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",$data['email']);


            if (!$stmt->execute()) {
                $stmt->close();
                $conn->close();
                throw new Exception("User Data not Fetched");
            }else {
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();

                if(!($row = $result->fetch_assoc())){
                    throw new Exception("Invaild Credentials");
                };
                $updateUserLogin = $this->update_on_user_login($row['id']);
                if ($field == 'admin' && $row['email'] === $data['email'] && password_verify($data['password'],$row['password'])) {
                   
                    if ($row['is_admin'] == 0) {
                        $isAdmin = false;
                        throw new Exception("User is Not an Admin");
                        
                    }else{

                        $isAdmin = true;
                        if ($updateUserLogin === "successful") {
                            require_once './Database_Handler/session.php';
                            $_SESSION['user'] = [
                                'name' => $row['username'],
                                'email' => $row['email'],
                                'is_admin' => $isAdmin
                            ];
        
                            if ($_SESSION['user']) {
                                return json_encode([
                                    "status"=>"success",
                                    "message"=>"Sign In Successful"
                                ]); 
                                exit();    
                            }
                        }else{
                            throw new Exception($updateUserLogin);
                            
                        }
                        
                    }

                   
                }else if ($row['email'] === $data['email'] && password_verify($data['password'],$row['password'])) {
                    

                    if ($row['is_admin'] == 0) {
                        $isAdmin = false;
                    }else{
                        $isAdmin = true;
                    }

                    if ($updateUserLogin === "successful") {
                        require_once './Database_Handler/session.php';
                        $_SESSION['user'] = [
                            'name' => $row['username'],
                            'email' => $row['email'],
                            'is_admin' => $isAdmin
                        ];

                        if ($_SESSION['user']) {
                            return json_encode([
                                "status"=>"success",
                                "message"=>"Sign In Successful"
                            ]); 
                            exit();    
                        }
                    }else{
                        throw new Exception($updateUserLogin);
                    }
                }else{
                    throw new Exception("Invalid Credentials");
                }
            }
            
        } catch (Exception $e) {
            return json_encode([
                "status"=>"error",
                "message"=>"Error Occured: ".$e->getMessage()
            ]);
            exit();
        }
    
    }
}