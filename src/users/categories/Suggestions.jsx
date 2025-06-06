import { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import { UseSession } from "../components/UseSession";
import { BASE_API_URL } from "../../constants";

export default function Suggestions({type}) {
    const [filmDet,setFilmDet] = useState([]);
    const { user} = UseSession();
    
    const URL = `${BASE_API_URL}?apiKey=fetchFilmsSearched`;
    useEffect(()=>{
        async function fetchFilmsSearched() {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(user)
            });
            const data = await res.json();
            
            if(data.status =="success"){
                setFilmDet(data.filmData);    
            } 
           
        }
        fetchFilmsSearched();
    },[user]);
    
    let read;
    
    let cond = (film) => {
        return film.film_id ? film.id = film.film_id : film.id
    }

    if (filmDet.length > 0) {
        switch (type) {
            case "Movies":
            read = filmDet.map((film,index) => (
                (cond(film))&&
                (film.film_type == "MOVIE" || film.film_type == "ANIMATED_MOVIE") ? <FilmCard film={film} key={index} /> : "" 
            ));
            break;
            case "Series":
            read = filmDet.map((film,index) => (
                (cond(film))&&
                (film.film_type == "SERIE" || film.film_type == "ANIMATED_SERIE") ? <FilmCard film={film} key={index} /> : "" 
            ));
            break;
            case "Animation":
            read = filmDet.map((film,index) => (
                (cond(film))&&
                (film.film_type == "ANIMATED_MOVIE" || film.film_type == "ANIMATED_SERIE") ? <FilmCard film={film} key={index} /> : "" 
            ));
            break;
            default:
            read = filmDet.map((film,index) => ((cond(film))&&<FilmCard film={film} key={index} />));
            break;
        }
        if(read.every(film => film == ""))return"";     
    }
   
    return (
        <section className="movie-cat-section">
            {/* header for suggestions */}
            <h1>Suggestions</h1>
            {/* films based on user searches,downloads or watch history */}
            <div className="movie-cat">
                {read}
            </div>

        </section>
    );
    
}