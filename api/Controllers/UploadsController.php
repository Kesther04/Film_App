<?php

require_once './Models/Uploads.php';

class UploadsController extends Uploads{


    // Method to upload movie videos
    public function place_movie_uploads($id,$title,$rel_yr,$videos){

        $isSet = true;
        foreach ($videos as $key => $vid) {
            
            $old = "../storage/vid/".$vid["link"];
            $newTitle = $title."_".$vid["vid_type"]."_(".$rel_yr.").mp4";
            $new = "../storage/vid/".$newTitle;

            if(rename($old,$new)){
            

                $arr = [
                    "id" =>  $id,
                    "video" =>   $newTitle,
                    "sid" => NULL,
                    "size" => $vid["size"],
                    "film_ext" => $vid["film_ext"],
                    "type" =>  $vid["vid_type"]
                ];

                if($this->insert_upload($arr) !== "successful"){
                    $isSet = false;
                };
            }
        }

        return $isSet;
    }

    // Method to upload serie Videos
    public function place_serie_uploads($id,$title,$season,$episode,$epName,$sid,$rel_yr,$videos) {
        $isSet = true;
        foreach ($videos as $key => $vid) {
            
            $old = "../storage/vid/".$vid["link"];

            if ($season >= 10 && $episode < 10 ) {
                $newTitle = $title."_"."S".$season."E0".$episode."_".$epName."_".$vid["vid_type"]."_(".$rel_yr.").mp4";                
            }elseif ($season < 10 && $episode >= 10) {
                $newTitle = $title."_"."S0".$season."E".$episode."_".$epName."_".$vid["vid_type"]."_(".$rel_yr.").mp4";     
            }elseif ($season >= 10 && $episode >= 10) {
                $newTitle = $title."_"."S".$season."E".$episode."_".$epName."_".$vid["vid_type"]."_(".$rel_yr.").mp4";     
            }else{
                $newTitle = $title."_"."S0".$season."E0".$episode."_".$epName."_".$vid["vid_type"]."_(".$rel_yr.").mp4";     
            }

            $new = "../storage/vid/".$newTitle;

            if(rename($old,$new)){
            
                $arr = [
                    "id" =>  $id,
                    "video" =>   $newTitle,
                    "sid" => $sid,
                    "size" => $vid["size"],
                    "film_ext" => $vid["film_ext"],
                    "type" =>  $vid["vid_type"]
                ];
            }

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