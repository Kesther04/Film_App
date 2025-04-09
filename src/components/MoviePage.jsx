
export default function MoviePage ({movie}) {
    return (
        <section className="movie">
            <div className="movie-info">
                <div className="movie-info-img">
                    <img src={movie.film_img_data} alt={movie.film_name}  />
                </div>
                <div className="movie-info-txt">
                    <span className="w-auto xl:w-100">
                        <h1 className="text-2xl py-3 font-bold">{movie.film_name}</h1>
                        <p>
                            {movie.film_desc} ---
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex dignissimos placeat facere nulla minima vero reprehenderit autem voluptate quis. Quasi, harum a culpa distinctio officia sequi aperiam vitae atque exercitationem!
                        </p>
                    </span>
                    
                    <span className="btn flex w-full gap-2  mt-4 justify-end">
                        <button className="bg-black text-white p-2 rounded border-solid cursor-pointer">Watch Video</button>
                        <button className="bg-black text-white p-2 rounded border-solid cursor-pointer">Download Video</button>
                    </span>
                </div>
            </div>
        </section>
    )
} 