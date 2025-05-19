import FilmCard from "../components/FilmCard";

export default function TopMovies({filmDet,type}){
    let read;
    switch (type) {
        case "Animation":
        read = filmDet.map((film,index) => (
            (film.film_type == "ANIMATED_MOVIE") ? <FilmCard film={film} key={index} /> : "" 
        ));
        break;
        default:
        read = filmDet.map((film,index) => (
            (film.film_type == "MOVIE" || film.film_type == "ANIMATED_MOVIE") ? <FilmCard film={film} key={index} /> : "" 
        ));
        break;
    }
    console.log(read);
    if(read.every(film => film == ""))return"";
    return(
        <section className="movie-cat-section">
            
            {/* header for top movies */}
            <h1>
                Top Movies
            </h1>

            {/* films rating based on imdb*/}
            <div className="movie-cat">
                {read}
            </div>
            
        </section>
    );
}