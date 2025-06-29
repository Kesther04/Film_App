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
            $field = "user";
            
            return $this->select_user($arrData,$field);
        }

    }

    public function get_userId($email){
        return $this->select_userId($email);
    }

    public function getOverview($input){
        $data= json_decode(file_get_contents($input),true);
        $email = $data["email"] ?? "";
        if ($email == "" ) return json_encode([]);

        $uid = $this->select_userId($email);

        require_once './Controllers/FilmsController.php';
        $films = new FilmsController();
        require_once './Controllers/UploadsController.php';
        $upls = new UploadsController();
        require_once './Controllers/RecordsController.php';
        $records = new RecordsController();
        
        $filmCount = $films->get_Total_series_et_movies();
        $userCount = count($this->select_users());
        $storageCount = $upls->calc_storage();
        $DLCount = $records->count_records("download");
        $STCount = $records->count_records("stream");
        $latestUploads = $upls->latest_uploads();
        $topDLs = $films->top_record_films("download");
        $topStrs = $films->top_record_films("stream");
        
        $arrData = [
            "totalMovies"=>$filmCount["movies"],
            "totalSeries"=>$filmCount["series"],
            "totalUsers" => $userCount,
            "storageUsed"=>$storageCount,
            "downloadsToday"=>$DLCount,
            "streamsToday"=>$STCount,
            "latestUploads"=>$latestUploads,
            "topDownloads"=>$topDLs,
            "topStreams"=>$topStrs
        ];
        
        return json_encode($arrData);
    }

    public function get_all_users(){
        
        $allUsers = $this->select_users();
        $arrData = [];
        
        $curYear = date("Y");
        $curMon = date("m");
        $curDay = date("d");

        foreach ($allUsers as $row) {
            $caArr = explode(" ", $row["created_at"]);
            $caDateArr = explode("-",$caArr[0]);
            $caDate = $caDateArr[2].'/'.$caDateArr[1].'/'.$caDateArr[0];

            $llArr = explode(" ",$row["last_login"]);
            $llDate = explode("-",$llArr[0]);
            $newllDate = $llDate[2].'/'.$llDate[1].'/'.$llDate[0];
            $llYr = $llDate[0];
            $llMon = $llDate[1];
            $llDay = $llDate[2];

            if ($llYr == $curYear && $llMon + 6 >= $curMon) {
                $activeUser = true;
            }elseif ($llYr < $curYear) {
                $llMon = 12 - $llMon;

                if ($llMon + 6 >= $curMon) {
                    $activeUser = true;
                }else{
                    $activeUser = false;
                }
            }else{
                $activeUser = false;
            }          

            if ($row["is_admin"] == 0) {
                $isAdmin = false;
            }else {
                $isAdmin = true;
            }

            $arrData[] = [
                "google_id" => $row["google_id"],
                "name" => $row["username"],
                "email" => $row["email"],
                "is_admin" => $isAdmin,
                "joined_on" => $caDate,
                "last_login" => $newllDate,
                "activeState" => $activeUser

            ];

            
            
        }
        

        
        return json_encode(
            ["userData"=>$arrData]
        );
    }
}