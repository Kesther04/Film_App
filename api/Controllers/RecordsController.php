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
        $email = $data["email"] ?? "";
        if ($email == "" ) return json_encode(["status"=>"error","records"=>[]]);
        require_once './Controllers/UserController.php';
        $users = new UserController();
        $uid = $users->get_userId($email);
        return $this->select_user_records($uid,$data["type"]);
    }

    public function get_film_records($id,$type){
        return $this->select_film_records($id,$type);
    }

    public function count_records($type){
        $allRecs = $this->select_based_records($type);
        $curDate = date("Y-m-d");
        $todaysRecords = [];
        foreach ($allRecs as $key => $row) {
            $dateTime = explode(" ",$row["created_at"]);
            $date = $dateTime[0];
            if ($curDate == $date) {
                $todaysRecords[] = $row;
            }
        }
        $val = count($todaysRecords);
        return $val;
    }
}