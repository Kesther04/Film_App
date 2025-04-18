import { useState } from "react";
import FilmTypeHandler from "./FilmTypeHandler";
import EpisodeHandler from "./EpisodeHandler";
import GenreHandler from "./GenreHandler";

export default function UploadFilms(){
    const [type,setType] = useState("");
    const TypeHandle = (e) => setType(e.target.value);
    const [genreNo,setGenreNo] = useState(1);

    function incrementGenre() {
        return setGenreNo((prev) => prev + 1);
    }
    function decrementGenre() {
        return setGenreNo((prev) => (prev === 1 ? prev : prev - 1));
    }

    return (
        <form>
            <h1>Upload Film</h1>
            <div className="input-section">
                {/* title */}
                <div>
                    <label htmlFor="title">Film Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter Film Title.." required/>
                </div>
                
                {/* type */}
                <div>
                    <label htmlFor="type">Film Type:</label>
                    <select name="type" id="type" required onChange={(e)=>TypeHandle(e)}>
                        <option value=""></option>
                        <option value="MOVIE">MOVIE</option>
                        <option value="SERIE">SERIE</option>
                        <option value="ANIMATED MOVIE">ANIMATED MOVIE</option>
                        <option value="ANIMATED SERIE">ANIMATED SERIE</option>
                    </select>
                </div>


                {/* genres */}
                <GenreHandler genreNo={genreNo}/>            
            </div>
            <div className="reverse-btn">
                <input type="button" value="Add Extra Genre" onClick={()=>incrementGenre()} />
                <span>{genreNo}</span>
                <input type="button" value="Remove Extra Genre" onClick={()=>decrementGenre()} />
            </div>
        
            {/* type returned */}
            <FilmTypeHandler type={type}/>
            
            
            

            
            <div className="btn">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}