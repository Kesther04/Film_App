<?php

require_once './Models/User.php';

class UserController extends User{
    
    // To sign Up the user with an Account
    public function signup_user($input){
        $data = json_decode(file_get_contents($input), true);
        
        if (empty($data['name']) || empty($data['email']) || empty($data['password'])){
            return json_encode(["status" => "error","message" => "Incomplete Data"]);
        }elseif(!filter_var($data['email'],FILTER_VALIDATE_EMAIL)){
            return json_encode(["status" => "error","message" => "Invalid Email"]);
        }else {
            $password = htmlspecialchars($data['password']);
            $options = [
                'cost' => 12
            ];
            $hashedPwd = password_hash($password, PASSWORD_BCRYPT, $options);

            $arrData = [
                'google_id' => NULL,
                'email' => htmlspecialchars(trim($data['email'])),
                'username' => htmlspecialchars(trim($data['name'])),
                'is_admin' => FALSE,
                'password' => $hashedPwd
            ];           
            
            return $this->insert_user($arrData);
        }

    }

    // To sign In the user if the user has as an account and enters the correct credentials
    public function signin_user($input){
        $data = json_decode(file_get_contents($input), true);
        
        if (empty($data['email']) || empty($data['password'])){
            return json_encode(["status" => "error","message" => "Incomplete Data"]);
        }elseif(!filter_var($data['email'],FILTER_VALIDATE_EMAIL)){
            return json_encode(["status" => "error","message" => "Invalid Email"]);
        }else {
            $password = htmlspecialchars($data['password']);
            
            $arrData = [
                'email' => htmlspecialchars(trim($data['email'])),
                'password' => $password
            ];           
            
            return $this->select_user($arrData);
        }

    }

}