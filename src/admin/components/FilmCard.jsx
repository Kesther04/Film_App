export default function FilmCard({film}){
    let genres = film.genres;
    let img = film.img.split(".+.");
    let rel_yr = film.release_year.split(".+.");
    return(
        <div className="rounded-xl min-h-120 p-5  shadow-xl flex flex-col gap-5">
            
            <div className="w-full h-auto  relative flex justify-center content-center text-center">
                {/* profile image div */}
                <div className="w-50 h-60 relative overflow-hidden cursor-pointer rounded text-center">
                    <img src={img[img.length-1]} alt={film.title} className="w-full h-full rounded object-fill transition ease-in-out duration-500s scale-100 hover:scale-105"/>
                </div>

            
            </div>
            
            <div className="flex flex-col min-h-30 h-auto  gap-2">
                <p className="text-center font-bold  italic">{film.title}</p>
                
                <div className="text-center italic text-sm">
                    {genres.map(genre => (<span>{`${genre} `} </span>))}
                </div>

                <div className="flex gap-2 justify-center">
                <span className="border italic px-1 rounded hover:text-blue-500 cursor-pointer">{film.film_type.replace(/_/g,' ')}</span>
                <span className="border italic px-1 rounded  hover:text-blue-500 cursor-pointer">{rel_yr[rel_yr.length - 1]}</span>
                </div>
            </div>                   

            <div className="btn flex gap-2 justify-end">
                <button className="p-1">View</button>
                <button className="p-1">Edit</button>
                <button className="p-1">Delete</button>
            </div>

        </div>
    );
}