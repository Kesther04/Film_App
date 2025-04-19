import { useState } from "react";
import EpisodeHandler from "./EpisodeHandler";
import { FilmsContext } from "./FilmsContext";

export default function SerieHandler({relYears,ind}){
    let sid = ind + 1;
    const [season,setSeason] = useState({id: sid,img: "",trailer_link:"",release_year:"",film_cast: "",episode:[]});
    const {serieData} = FilmsContext();
    serieData.season[ind] = season;
    return (
        <>
            <div className="input-section">

                <div>
                    <label htmlFor="season">Season:</label>
                    <input type="number" name="season" value={season.id} readOnly required />

                </div>
                <div>
                    <label htmlFor="img">Film Thumbnail Link:</label>
                    <input type="url" name="img"  placeholder="Paste Film Thumbnail URL.." required onChange={(e)=>setSeason({...season,img:e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="tr_link">Trailer Link:</label>
                    <input type="url" name="tr_link"  placeholder="https://TrailerLink.com" required onChange={(e)=>setSeason({...season,trailer_link:e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="cast">Film Cast:</label>
                    <textarea name="cast"  placeholder="Enter Film Cast.." title="Separate with Commas" required onChange={(e)=>setSeason({...season,film_cast:e.target.value})} ></textarea>
                </div>

                <div>
                    <label htmlFor="rel_year">Release Year:</label>
                    <select name="rel_year" required onChange={(e)=>setSeason({...season,release_year:e.target.value})}>
                        <option value=""></option>
                        {
                            relYears.map((relYear,id) => (
                                <option value={relYear} key={id}>{relYear}</option> 
                            )) 
                        }
                    </select>
                </div>

            </div>

            <EpisodeHandler season={season} setSeason={setSeason}/>
        </>
    );
}