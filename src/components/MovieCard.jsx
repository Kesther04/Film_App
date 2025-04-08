
export default function MovieCard({film}){
    return (

        <div>
            {/* film card containing the film thumbnail and desc under it.. */}
            <span><img src={film.film_img_data} alt={film.film_name} /></span>
            <p>
                {/* description */}
                {film.film_name}
            </p>
        </div>
        
    );
}