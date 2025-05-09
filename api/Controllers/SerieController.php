<?php
require_once './Models/Series.php';

class SerieController extends Series{
    
    public function handle_series($film_id,$season,$eps){
        $status;
        foreach($eps as $key => $ep){
            $arr = [
                "film_id" => $film_id,
                "season" => $season,
                "episode" => $ep["id"],
                "title" => $ep["ep_title"],
                "episode_desc" => $ep["ep_desc"],
                "videos" => $ep["video"]
            ];

            $status = $this->input_episode($arr);
            if ($status !== "successful") {
                $status =  $ep["ep_title"]." ".$status;
                break;
            }

        }
        return $status;

    }
}