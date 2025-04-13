import { useEffect, useState} from "react";
import MovieCard from "./MovieCard";
import { BASE_API_URL } from "../../constants";


function MovieCat({showNav}){

    const [movieDet,setMovieDet] = useState([]);

    const URL = `${BASE_API_URL}?apiKey=fetchFilms`;
    useEffect(() => {
        
        async function fetchFilms() {
            const res = await fetch(URL, {
                method: 'GET',
                headers: {'Content-Type':'application/json'}
            });
            const data = await res.json();
            console.log(data);
            setMovieDet(data.movieData);
        }
        fetchFilms();
    },[]);
    return (
        <section className={showNav ? "main-section open":"main-section"}>
            <section className="movie-cat-section">

                {/* header for the film category */}
                <h1>
                    Suggestions
                </h1>
                {/* films under each category */}
                <div className="movie-cat">
                    {movieDet.map((film,index) => (
                        <MovieCard film={film} key={index} />
                    ))}
                </div>
                
            </section>
            <section className="movie-cat-section">
            
                {/* header for the film category */}
                <h1>
                    <span className="flex gap-2">
                    Trending Now 
                    <img src="https://i.pinimg.com/736x/af/ab/26/afab26f2c1d6ef0cd3402dd5ef77e2de.jpg" alt="" className="w-6" />
                    </span>
                </h1>

                {/* films under each category */}
                <div className="movie-cat">
                    {movieDet.map((film,index) => (
                        <MovieCard film={film} key={index} />
                    ))}
                </div>
                
            </section>
            <section className="movie-cat-section">
            
            {/* header for the film category */}
            <h1>
                Popular Movies
            </h1>

            {/* films under each category */}
            <div className="movie-cat">
                {movieDet.map((film,index) => (
                    <MovieCard film={film} key={index} />
                ))}
            </div>
            
            </section>
            <section className="movie-cat-section">
                
                {/* header for the film category */}
                <h1>
                    Top Movies
                </h1>

                {/* films under each category */}
                <div className="movie-cat">
                    {movieDet.map((film,index) => (
                        <MovieCard film={film} key={index} />
                    ))}
                </div>
                
            </section>
            <section className="movie-cat-section">
                
                {/* header for the film category */}
                <h1>
                    Top Series
                </h1>

                {/* films under each category */}
                <div className="movie-cat">
                    {movieDet.map((film,index) => (
                        <MovieCard film={film} key={index}  />
                    ))}
                </div>
                
            </section>
        </section>
    )
}

export default MovieCat;