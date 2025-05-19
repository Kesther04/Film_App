import FilmCard from "../components/FilmCard";

export default function Popular({filmDet,type}){
    let read;
    switch (type) {
        case "Movies":
        read = filmDet.map((film,index) => (
            (film.film_type == "MOVIE" || film.film_type == "ANIMATED_MOVIE") ? <FilmCard film={film} key={index} /> : "" 
        ));
        break;
        case "Series":
        read = filmDet.map((film,index) => (
            (film.film_type == "SERIE" || film.film_type == "ANIMATED_SERIE") ? <FilmCard film={film} key={index} /> : "" 
        ));
        break;
        case "Animation":
        read = filmDet.map((film,index) => (
            (film.film_type == "ANIMATED_MOVIE" || film.film_type == "ANIMATED_SERIE") ? <FilmCard film={film} key={index} /> : "" 
        ));
        break;
        default:
        read = filmDet.map((film,index) => (<FilmCard film={film} key={index} />));
        break;
    }
    if(read.every(film => film == ""))return"";
    return(
    <section className="movie-cat-section">
                
        {/* header for popular movies */}
        <h1>
            Popular
        </h1>

        {/* films with alot of downloads / watch history / searches  */}
        <div className="movie-cat">
            {read}
        </div>
        
    </section>
    );
}