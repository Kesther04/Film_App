import FilmCard from "../components/FilmCard";

export default function Trending({filmDet,type}){
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
    return (
    <section className="movie-cat-section">
    
        {/* header for trending */}
        <h1>
            <span className="flex gap-2">
            Trending Now 
            <img src="https://i.pinimg.com/736x/af/ab/26/afab26f2c1d6ef0cd3402dd5ef77e2de.jpg" alt="" className="w-6" />
            </span>
        </h1>

        {/* films based on an API that shows top trending movies */}
        <div className="movie-cat">
            {read}
        </div>
        
    </section>
    );
}