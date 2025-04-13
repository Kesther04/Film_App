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
                    'email' => $data['email']
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

    // To select user data from database based on email
    protected function select_user($data){
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
                
                if ($row['email'] === $data['email'] && password_verify($data['password'],$row['password'])) {
                    require_once './Database_Handler/session.php';
                    $_SESSION['user'] = [
                        'name' => $row['username'],
                        'email' => $row['email']
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