export default function Record({film}){
    let size;
    if (film.size >= 1024) {
        let gbSize = film.size/1024;
        size = `${gbSize.toFixed(1)}GB`;
    }else{
        size = ` ${film.size}MB`;
    }

   
    return(
        <div className="record">
            <div className="flex gap-5">
                <span className="overflow-hidden relative rounded-2xl">
                    {/* for the image */}
                    <img src={film.img} alt={film.img} className="w-40 h-40 rounded-2xl hover:scale-105 object-cover transition duration-300 ease-in-out"/>
                </span>

                <span className="font-bold italic py-5">
                    {/* for the text */}
                    {film.name.replace("&#039;","'")}<br/>{size}
                </span>
            </div>
            <div className="font-bold italic gap-5 relative w-40">
                {/* for the date or time */}
                <span className="h-auto justify-end absolute bottom-0"> {film.date}</span>
            </div>
        </div>
    );
}