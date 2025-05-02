import { useEffect, useState } from "react";
import { VideoContext } from "./FilmsContext";

export default function EpisodeHandler({ind,season_id,setSeason}) {
    let sid = ind + 1;
    const [episode,setEpisode] = useState({id: sid,ep_title: "",ep_desc: "",video:[]});
    const {selFilm,setSelFilm} = VideoContext();

    useEffect(()=>{
        setSeason((prev) => {
            let updatedEps = [...prev.episode];
            updatedEps[ind] = episode;
            
            return {...prev,episode:updatedEps};
        });
    },[episode]);


    useEffect(()=>{
        (selFilm.eid === episode.id && selFilm.sid === season_id) && setEpisode({...episode,video:selFilm.data});
    },[selFilm.data]);    
    
    const setEpisodeVid = () => {
        setSelFilm((prev) => {

            const newSes = prev.sid.filter((id) => id !== season_id+'.'+episode.id);


            return {
                ...selFilm,
                type:"serie",
                status:true,
                data:episode.video,
                sid:[...newSes,season_id+'.'+episode.id]
            }
        });
    }
    
    
    return(
        <>
            <div className="input-section">
                <div>
                    <label htmlFor="episode">Episode:</label>
                    <input type="number" name="episode_no" value= {episode.id}  readOnly required/>
                    
                    <input type="text" name="episode_title"  placeholder="Enter Episode Title.." required onChange={(e)=>setEpisode({...episode,ep_title:e.target.value})} />
                </div>

                <div>
                    <label htmlFor="episode_desc">Episode Description.:</label>
                    <textarea name="episode_desc"  placeholder="Enter Episode Description.." required onChange={(e)=>setEpisode({...episode,ep_desc:e.target.value})} ></textarea>
                </div>


                {/* video / videos (for setting up download links or video links) */}
                <div>
                    <label htmlFor="video">Episode Video:</label>
                    <input 
                        type="button" 
                        name="video"  
                        value={selFilm.isSaved.includes(season_id+'.'+episode.id) ? "Saved Successfully" :"Click Here to upload Episode Video"} 
                        className={selFilm.isSaved.includes(season_id+'.'+episode.id) ? "saved" : ""}
                        required 
                        onClick={()=>setEpisodeVid()}
                    />
                </div>
            </div>

        </>
    );
}