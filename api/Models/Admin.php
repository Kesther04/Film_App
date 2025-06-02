<?php

require_once './Models/User.php';

class Admin extends User{

    // insert user as Admin
    protected function insert_admin($data){
        return $this->insert_user($data);
    }

    // select user if admin
    protected function select_admin($data){
        $field = "admin";
        return $this->select_user($data,$field);
    }

}