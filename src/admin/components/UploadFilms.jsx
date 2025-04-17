import { useState } from "react";
import FilmTypeHandler from "./FilmTypeHandler";

export default function UploadFilms(){
    const [type,setType] = useState("");
    const TypeHandle = (e) => setType(e.target.value);
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
                <div>
                    <label htmlFor="genre">Film Genre:</label>
                    <select name="genre[]" required>
                        <option value=""></option>
                        <option value="Adventure">Adventure</option>
                        <option value="Action">Action</option>
                        <option value="Animation">Animation</option>
                        <option value="Biography">Biography</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Drama">Drama</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="History">History</option>
                        <option value="Horror">Horror</option>
                        <option value="Music">Music</option>
                        <option value="Musical">Musical</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Sport">Sport</option>
                        <option value="Thriller">Thriller</option>
                        <option value="War">War</option>
                    </select>
                </div>

                {/* type returned */}
                <FilmTypeHandler type={type}/>
            </div>

            <div className="btn">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}