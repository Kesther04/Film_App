<?php
require_once './Models/Records.php';

class RecordsController extends Records{

    public function save_records($input){
        $data = json_decode(file_get_contents($input), true);
        require_once './Controllers/UserController.php';
        $users = new UserController();
        $uid = $users->get_userId($data["email"]);

        $newData = [
            "user__id" => $uid,
            "film_id" => $data["film_id"],
            "upl_id" => $data["upl_id"],
            "type" => $data["type"]
        ];
        return $this->insert_records($newData);
    }

    public function get_user_records($input){
        $data = json_decode(file_get_contents($input), true);
        
        require_once './Controllers/UserController.php';
        $users = new UserController();
        $uid = $users->get_userId($data["email"] ?? null);
        return $this->select_user_records($uid,$data["type"]);
        // return json_encode(["records"=>$uid]);
    }
}