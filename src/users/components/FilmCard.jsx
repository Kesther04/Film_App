import { Link } from "react-router-dom";

export default function FilmCard({film}){
    if (film.film_type == "MOVIE" || film.film_type == "ANIMATED_MOVIE"){
        return (
            
            <div>
                {/* film card containing the film thumbnail and desc under it.. */}
                <Link to={`/movies/${film.id}`} className="LinkHolder">
                    <span><img src={film.img} alt={film.title} /></span>
                    <p>
                        {/* description */}
                        {film.title}
                    </p>
                </Link>
            </div>
            
            
        );
    }

    if (film.film_type == "SERIE" || film.film_type == "ANIMATED_SERIE"){
        const img  = film.img.split(".+.");
        return (
            
            <div>
                {/* film card containing the film thumbnail and desc under it.. */}
                <Link to={`/series/${film.id}`} className="LinkHolder">
                    <span><img src={img[img.length - 1]} alt={film.title} /></span>
                    <p>
                        {/* description */}
                        {film.title}
                    </p>
                </Link>
            </div>
            
            
        );
    }

    
}