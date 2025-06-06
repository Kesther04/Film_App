export default function Record({film}){
    let size;
    if (film.size >= 1024) {
        let gbSize = film.size/1024;
        size = `${gbSize.toFixed(1)}GB`;
    }else{
        size = ` ${film.size}MB`;
    }

    let dateTime = film.date.split(" ");
    let date = dateTime[0]; 
    return(
        <div className="record">
            <div className="flex gap-2 xl:gap-5 w-full">
                <span className="overflow-hidden rounded-2xl">
                    {/* for the image */}
                    <img src={film.img} alt={film.img} className="w-40 h-30 xl:h-40 rounded-2xl hover:scale-105 object-cover transition duration-300 ease-in-out"/>
                </span>

                <span className="font-semibold italic py-5 flex flex-col justify-between w-full overflow-hidden text-sm xl:text-lg">
                    {/* for the text */}
                    {film.name.replace("&#039;","'")}
                        <br/>
                    {size}

                    <div className="font-bold italic w-auto h-auto self-end flex justify-end">
                        {/* for the date or time */}
                        <span className="h-auto justify-end bottom-0"> {date}</span>
                    </div>

                </span>
            </div>
           
        </div>
    );
}