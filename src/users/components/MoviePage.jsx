
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
                                {movie.film_cast}
                            </p>
                            <p>
                                {movie.film_desc}
                            </p>
                        </span>
                        
                        <span className="btn flex w-full gap-2  mt-4 justify-end">
                            <button className="secondary-color secondary-bg p-2 rounded  cursor-pointer">Stream</button>
                            <button className="secondary-color secondary-bg p-2 rounded border-solid cursor-pointer">Download</button>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
} 