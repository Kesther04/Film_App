import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseSession } from "./UseSession";

export default function MoviePage ({movie,setVidDet}) {
    let navigate = useNavigate();
    const {user} = UseSession();    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let preStreamFile = queryParams.get("stream"); // This will give you the filename
    let streamFile;
    let decodedFile;
    if (preStreamFile){
        streamFile = preStreamFile?.split("___");
        decodedFile = decodeURIComponent(streamFile[0]?.replace(/"/g, ''));
    }
    let indCast = movie.film_cast?.split(",").map((idCast) => (
        <span className="border p-1 text-xs rounded font-bold text-white bg-black" key={idCast}>
            {idCast}
        </span>
    ));


    function setVidQual(e){
        if (!user) return navigate("/user/auth/signin");
        setVidDet(() => {
            return {
                status:true,user_email:user.email,type:e,fid:movie.id,sid:null
            }
        });
    }

    console.log(user);
    return (
        <section className="movie">            
            <div className="movie-content">
                <div className="movie-trailer">
                    {
                        queryParams.size == 1 ?
                        <video controls autoPlay width={360} height={640}>
                            <source src={`../../../storage/vid/${decodedFile}`} type="video/mp4"/>
                        </video>
                        :
                        <iframe
                            src={movie.trailer_link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>    
                    }
                    

                    {/* */}
                </div>
                <div className="movie-info">
                    <Link to={`/movies/${movie.id}`}>
                    <div className="movie-info-img">
                        <img src={movie.img} alt={movie.title}  />
                    </div>
                    </Link>
                    <div className="movie-info-txt">
                        <span className="w-auto xl:w-100">
                            <h1 className="text-2xl py-3 font-bold">{movie.title}</h1>

                            <p>
                                {movie.film_desc}
                            </p>
                            <div className="py-2 flex justify-end">
                                {indCast}
                            </div>
                        </span>
                        
                        <span className="btn flex w-full gap-2  mt-4 justify-end">
                            <button className="secondary-color secondary-bg p-2 rounded  cursor-pointer" value="stream" onClick={(e)=>setVidQual(e.target.value)}>
                                Stream
                            </button>
                            <button className="secondary-color secondary-bg p-2 rounded border-solid cursor-pointer" value="download" onClick={(e)=>setVidQual(e.target.value)}>Download</button>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
} 
