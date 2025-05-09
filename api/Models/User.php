<?php

require_once './Database_Handler/Database.php';

class User extends Database{

    

    // To insert user data into database
    protected function insert_user($data){
        try {
            $conn = $this->db_con();
            
            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }

            $query = "INSERT INTO users (google_id,email,username,is_admin,password) VALUES (?,?,?,?,?)";

            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("sssis",...array_values($data));

            if ($stmt->execute()) {
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
                
            }else{
                $stmt->close();
                $conn->close();

                return json_encode([
                    "status" => "error",
                    "message" => "Form Submission UnSuccessful".$conn->error
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

    // To update users table when user logs in
    private function update_on_user_login($id){
        try{
            $conn = $this->db_con();

            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }

            $query = "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?";

            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",$id);

            if ($stmt->execute()) {
                $stmt->close();
                $conn->close();

                return "successful";
                
            }else{
                return "unsuccessful";
            
            }


        }catch(Exception $e){
            return "unsuccessful".$e->getMessage();
            
        }
    }

    // To select user data from database based on email
    protected function select_user($data,$field){
        try {
            $conn = $this->db_con();

            // Optional: check if the connection is alive
            if (method_exists($conn, 'ping') && !$conn->ping()) {
                $conn = $this->db_con();
            }

            $query = "SELECT * FROM users WHERE email = ?";

            $stmt = $conn->prepare($query);

            if (!$stmt) {
                throw new Exception("SQL preparation failed: " . $conn->error);
            }

            $stmt->bind_param("s",$data['email']);

            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $stmt->close();
                $conn->close();

                $row = $result->fetch_assoc();
                $updateUserLogin = $this->update_on_user_login($row['id']);
                if ($field == 'admin' && $row['email'] === $data['email'] && password_verify($data['password'],$row['password'])) {
                   

                    
                    if ($row['is_admin'] == 0) {
                        $isAdmin = false;
                        return json_encode([
                            "status"=>"error",
                            "message"=>"User is Not an Admin"
                        ]); 
                        exit();
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
                            return json_encode([
                                "status"=>"error",
                                "message"=>$updateUserLogin
                            ]); 
                            exit();    
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
                        return json_encode([
                            "status"=>"error",
                            "message"=>$updateUserLogin
                        ]); 
                        exit();  
                    }
                }else{
                    return json_encode([
                        "status"=>"error",
                        "message"=>"Incorrect Email and Password"
                    ]); 
                    exit();
                }

            }else {
                $stmt->close();
                $conn->close();

                return json_encode([
                    "status"=>"error",
                    "message"=>"User Data not Fetched"
                ]);
                exit();
            }
            
        } catch (Exception $e) {
            return json_encode([
                "status"=>"error",
                "message"=>"Error Occured".$e->getMessage()
            ]);
            exit();
        }
    
    }
}