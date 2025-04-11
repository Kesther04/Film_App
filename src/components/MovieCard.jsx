import { Link } from "react-router-dom";

export default function MovieCard({film}){
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