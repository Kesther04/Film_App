import { useState } from "react";
import FilmTypeHandler from "./FilmTypeHandler";
import GenreHandler from "./GenreHandler";
import { createFilmContext } from "../context/FilmsContext";
import axios from "axios";
import { BASE_API_URL } from "../../constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadFilms(){
    const [movieData,setMovieData] = useState({title: "",film_type: "",genre: [],img: "",trailer_link:"",release_year:"",film_cast: "",film_desc: "",video:[]});
    const [serieData,setSerieData] = useState({title: "",film_type: "",genre: [],season: []});
    const [type,setType] = useState("");
    const [msgHandler,setMsgHandler] = useState({status:"",msg:""});
    let navigate = useNavigate();
    const titleHandle = (e) => {
        if (type == "MOVIE" || type == "ANIMATED MOVIE") {
            setMovieData({...movieData,title:e.target.value});    
        }

        if (type == "SERIE" || type == "ANIMATED SERIE") {
            setSerieData({...serieData,title:e.target.value});  
        }
    }

    const typeHandle = (e) => {
        const typeVal = e.target.value;
        setType(typeVal);

        if (typeVal == "MOVIE" || typeVal == "ANIMATED MOVIE") {
            setMovieData({...movieData,film_type:typeVal});    
        }

        if (typeVal == "SERIE" || typeVal == "ANIMATED SERIE") {
            setSerieData({...serieData,film_type:typeVal});  
        }

        
    }
    
    

    const [genreNo,setGenreNo] = useState(1);
    
    function incrementGenre() {
        return setGenreNo((prev) => prev + 1);
    }
    function decrementGenre() {
        return setGenreNo((prev) => (prev === 1 ? prev : prev - 1));
    }
    
    
    const URL = `${BASE_API_URL}?apiKey=pushFilmData`;
    let pushableData;
    const pushFilm = (e) => {
        e.preventDefault();
        if (type == "MOVIE" || type == "ANIMATED MOVIE") {
            pushableData = movieData;
        }

        if (type == "SERIE" || type == "ANIMATED SERIE") {
            pushableData = serieData;
        }

        axios.post(URL,pushableData,{withCredentials: true,headers:{'Content-Type':'application/json'}})
            .then((res)=>{
                console.log(res.data)
                setMsgHandler({status:res.data.status,msg:res.data.message});
                if(res.data.status === "success"){
                    navigate('/admin/upload');
                }
                
            })
            .catch((err)=>console.log(err))           

    }

    let msg;
    msgHandler.status === "success" && (msg = (<p className="pp-msg">{msgHandler.msg}</p>))
    msgHandler.status === "error" && (msg = (<p className="p-msg">{msgHandler.msg}</p>))

    console.log(serieData);

    return (
        <form onSubmit={(data)=>pushFilm(data)}>
            <h1>Upload Film</h1>
            {msg}
            <div className="input-section">

                {/* type */}
                <div>
                    <label htmlFor="type">Film Type:</label>
                    <select name="type" id="type" required onChange={(e)=>typeHandle(e)}>
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