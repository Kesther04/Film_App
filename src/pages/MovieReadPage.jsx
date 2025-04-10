import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MoviePage from "../components/MoviePage";

export default function MovieReadPage(){
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const URL = 'http://localhost/REACT_PROJECTS/Film_App/api/Backend/Movie_Display.php';

    useEffect(() => {
        async function fetchMovie() {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(movieId)
            });
            const result = await res.json();
            console.log(result.movieData);
            setMovie(result.movieData);
        }
        fetchMovie();
    },[movieId]);
    const [showNav, setShowNav] = useState(false);
    return (
        <>
            <Header showNav={showNav} setShowNav={setShowNav}/>
            <main>
                <MoviePage movie={movie} />
                <Footer/>
            </main>
        </>
    );
}