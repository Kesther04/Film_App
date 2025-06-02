<?php
require_once './Models/Admin.php';

class AdminController extends Admin{
        
    // To sign Up the user as an Admin
    public function signup_admin($input){
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
                'is_admin' => TRUE,
                'password' => $hashedPwd
            ];           
            
            return $this->insert_admin($arrData);
        }

    }

    // To sign In the user if the user is an Admin and enters correct credentials
    public function signin_admin($input){
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
                
            
            return $this->select_admin($arrData);
        }

    }

    public function get_overview($input){

        return;
    }
}