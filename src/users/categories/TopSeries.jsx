import FilmCard from "../components/FilmCard";

export default function TopSeries({filmDet,type}){
    let read;
    switch (type) {
        case "Animation":
        read = filmDet.map((film,index) => (
            (film.film_type == "ANIMATED_SERIE") ? <FilmCard film={film} key={index} /> : "" 
        ));
        break;
        default:
        read = filmDet.map((film,index) => (
            (film.film_type == "SERIE" || film.film_type == "ANIMATED_SERIE") ? <FilmCard film={film} key={index} /> : "" 
        ));
        break;
    }
    if(read.every(film => film == ""))return"";
    return(
        <section className="movie-cat-section">
            
            {/* header for top series */}
            <h1>Top Series</h1>

            {/* films rating based on imdb */}
            <div className="movie-cat">
                {read}
            </div>
            
        </section>
    );
}