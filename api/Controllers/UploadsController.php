<?php

require_once './Models/Uploads.php';

class UploadsController extends Uploads{


    // Method to upload movie videos
    public function place_movie_uploads($id,$videos){

        $isSet = true;
        foreach ($videos as $key => $vid) {
            $arr = [
                "id" =>  $id,
                "video" =>   $vid["link"],
                "sid" => NULL,
                "size" => $vid["size"],
                "film_ext" => $vid["film_ext"],
                "type" =>  $vid["vid_type"]
            ];

            if($this->insert_upload($arr) !== "successful"){
                $isSet = false;
            };
        }

        return $isSet;
    }

    // Method to upload serie Videos
    public function place_serie_uploads($id,$sid,$videos) {
        $isSet = true;
        foreach ($videos as $key => $vid) {
            $arr = [
                "id" =>  $id,
                "video" =>   $vid["link"],
                "sid" => $sid,
                "size" => $vid["size"],
                "film_ext" => $vid["film_ext"],
                "type" =>  $vid["vid_type"]
            ];

            if($this->insert_upload($arr) !== "successful"){
                $isSet = false;
            };
        }

        return $isSet;
    }

    // Method to get Uploads
    public function get_uploads($input){
        $data = json_decode(file_get_contents($input), true);
        return $this->select_uploads($data["fid"],$data["sid"]);
    }

    // Method to get upload based on id for series_id,video and size 
    public function get_upload($id){
        return $this->select_specific_upload($id);
    }
}