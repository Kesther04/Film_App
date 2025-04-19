import { useState } from "react";
import FilmTypeHandler from "./FilmTypeHandler";
import GenreHandler from "./GenreHandler";
import { createFilmContext } from "./FilmsContext";

export default function UploadFilms(){
    const [movieData,setMovieData] = useState({title: "",film_type: "",genre: [],img: "",trailer_link:"",release_year:"",film_cast: "",film_desc: "",video:[]});
    const [serieData,setSerieData] = useState({title: "",film_type: "",genre: [],season: []});
    const [type,setType] = useState("");
    const titleHandle = (e) => {
        if (type == "MOVIE" || type == "ANIMATED MOVIE") {
            setMovieData({...movieData,title:e.target.value});    
        }

        if (type == "SERIE" || type == "ANIMATED SERIE") {
            setSerieData({...serieData,title:e.target.value});  
        }
    }
    const TypeHandle = (e) => {
        setType(e.target.value);
        if (type == "MOVIE" || type == "ANIMATED MOVIE") {
            setMovieData({...movieData,film_type:type});    
        }

        if (type == "SERIE" || type == "ANIMATED SERIE") {
            setSerieData({...serieData,film_type:type});  
        }
    };

    const [genreNo,setGenreNo] = useState(1);
    
    function incrementGenre() {
        return setGenreNo((prev) => prev + 1);
    }
    function decrementGenre() {
        return setGenreNo((prev) => (prev === 1 ? prev : prev - 1));
    }
    console.log(serieData);
    return (
        <form>
            <h1>Upload Film</h1>
            <div className="input-section">
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
                
                {/* title */}
                <div>
                    <label htmlFor="title">Film Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter Film Title.." required onChange={(e)=>titleHandle(e)} />
                </div>
                
                


                {/* genres */}
                {(type == "MOVIE" || type == "ANIMATED MOVIE") && <GenreHandler genreNo={genreNo} md={movieData} smd={setMovieData} />}
                
                {(type == "SERIE" || type == "ANIMATED SERIE") && <GenreHandler genreNo={genreNo} md={serieData} smd={setSerieData} />}
            </div>
            <div className="reverse-btn">
                <input type="button" value="Add Extra Genre" onClick={()=>incrementGenre()} />
                <span>{genreNo}</span>
                <input type="button" value="Remove Extra Genre" onClick={()=>decrementGenre()} />
            </div>
        
            {/* type returned */}


            {
                (type == "MOVIE" || type == "ANIMATED MOVIE") 
                &&
                <createFilmContext.Provider value={{movieData,setMovieData}} >     
                    <FilmTypeHandler type={type}/>
                </createFilmContext.Provider> 
            }

            {
                (type == "SERIE" || type == "ANIMATED SERIE") 
                &&
                <createFilmContext.Provider value={{serieData,setSerieData}} >     
                    <FilmTypeHandler type={type}/>
                </createFilmContext.Provider> 
            }
            
            

            
            <div className="btn">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}