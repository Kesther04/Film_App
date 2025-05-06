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
}