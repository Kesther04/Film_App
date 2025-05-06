import { useEffect } from "react";
import { FilmsContext, VideoContext } from "../context/FilmsContext";

export default function MovieHandler({relYears}) {
    const {movieData, setMovieData} = FilmsContext();
    const {selFilm,setSelFilm} = VideoContext();
    useEffect(()=>{
        setMovieData({...movieData,video:selFilm.data});
    },[selFilm.data]);
    return (
        <>
            <div className="input-section">
                <div>
                    <label htmlFor="img">Film Thumbnail Link:</label>
                    <input type="url" name="img"  placeholder="Paste Film Thumbnail URL.." required onChange={(e)=>setMovieData({...movieData,img:e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="tr_link">Trailer Link:</label>
                    <input type="url" name="tr_link"  placeholder="https://TrailerLink.com" required onChange={(e)=>setMovieData({...movieData,trailer_link:e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="rel_year">Release Year:</label>
                    <select name="rel_year" required onChange={(e)=>setMovieData({...movieData,release_year:e.target.value})}>
                        <option value=""></option>
                        {
                            relYears.map((relYear,id) => (
                                <option value={relYear} key={id}>{relYear}</option> 
                            )) 
                        }
                    </select>
                </div>
                    
                <div>
                    <label htmlFor="cast">Film Cast:</label>
                    <textarea name="cast"  placeholder="Enter Film Cast.." title="Separate with Commas" required onChange={(e)=>setMovieData({...movieData,film_cast:e.target.value})}></textarea>
                </div>

                <div>
                    <label htmlFor="desc">Film Description:</label>
                    <textarea name="desc" placeholder="Enter Film Description.." required onChange={(e)=>setMovieData({...movieData,film_desc:e.target.value})}></textarea>
                </div>


                {/* video / videos (for setting up download links or video links) */}
                <div>
                    <label htmlFor="video">Movie Video:</label>
                    <input 
                        type="button" 
                        name="video"  
                        value={selFilm.isSaved[0] ? "Saved Successfully" :"Click Here to upload Movie Video"} 
                        className={selFilm.isSaved[0] ? "saved" : ""}
                        required 
                        onClick={()=>setSelFilm({...selFilm,type:"movie",status:true,data:movieData.video})} 
                    />
                </div>
            </div>
            
        </>
    );
}