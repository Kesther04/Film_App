
export default function MoviePage ({movie}) {
    return (
        <section className="movie">
            
            <div className="movie-content">
                <div className="movie-trailer">
                    <iframe src={movie.trailer_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="movie-info">
                    <div className="movie-info-img">
                        <img src={movie.img} alt={movie.title}  />
                    </div>
                    <div className="movie-info-txt">
                        <span className="w-auto xl:w-100">
                            <h1 className="text-2xl py-3 font-bold">{movie.title}</h1>
                            <p>
                                {movie.film_desc} ---
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex dignissimos placeat facere nulla minima vero reprehenderit autem voluptate quis. Quasi, harum a culpa distinctio officia sequi aperiam vitae atque exercitationem!
                            </p>
                        </span>
                        
                        <span className="btn flex w-full gap-2  mt-4 justify-end">
                            <button className="bg-black text-white p-2 rounded border-solid cursor-pointer">Stream Movie</button>
                            <button className="bg-black text-white p-2 rounded border-solid cursor-pointer">Download Movie</button>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
} 