import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseSession } from "./UseSession";


export default function SeriePage({ serie, loading, setVidDet }) {
    let navigate = useNavigate();
    const {user} = UseSession();    
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let preStreamFile = queryParams.get("stream"); // This will give you the filename
    let streamFile;
    let decodedFile;
    if (preStreamFile){
        streamFile = preStreamFile?.split("___");
        let bdecodedFile =  streamFile[0]?.replace("&#039;","'").replace("%20"," ");
        console.log(streamFile);
        decodedFile = decodeURIComponent(bdecodedFile.replace(/"/g, ''));
    }

    console.log(queryParams);
    
    // Group episodes by season, keeping full episode objects
    const groupBySeason = (episodes) => {
        const seasonMap = {};

        episodes.forEach((ep) => {
            const { season } = ep;
            if (!seasonMap[season]) {
                seasonMap[season] = [];
            }
            seasonMap[season].push(ep);
        });

        return Object.entries(seasonMap).map(([season, episodes]) => ({
            season: Number(season),
            episodes,
        }));
    };

    // Grouped episodes by season
    const grouped = !loading ? groupBySeason(serie.episodes) : [];

    // On load, set currentSeason and currentEpisode to last episode's season
    useEffect(() => {
        if (!loading && serie.episodes?.length) {
            const lastEpisode = serie.episodes[serie.episodes.length - 1];
            setCurrentSeason(lastEpisode.season);
            setCurrentEpisode(lastEpisode);

            if (preStreamFile) {
                const nowEpisode = serie.episodes.filter((ep)=>ep.id == streamFile[1]);
                setCurrentSeason(nowEpisode[0].season);
                setCurrentEpisode(nowEpisode[0]);
            }
        }
    }, [loading]);


    useEffect(() => {
        if (!loading && preStreamFile) {
            const nowEpisode = serie.episodes?.filter((ep)=>ep.id == streamFile[1]);
            setCurrentSeason(nowEpisode[0].season);
            setCurrentEpisode(nowEpisode[0]);
            window.location.reload();
        }
    },[preStreamFile]);



    // Update trailer, img, and cast based on currentSeason (zero-based index)
    const trailer = serie.trailer_link?.[currentSeason - 1];
    const img = serie.img?.[currentSeason - 1];
    const cast = serie.film_cast?.[currentSeason - 1] || "";
    let indCast = "";
    const desc = currentEpisode?.episode_desc;
    const ep_title = currentEpisode?.title;

    if (!loading) {
        indCast = cast.split(",").map((idCast) => (
            <span className="border p-1 text-xs rounded font-bold text-white bg-black">
                {idCast}
            </span>
        ));
    }

    // Get episodes for the current season
    const episodesForCurrentSeason = grouped.find((s) => s.season === currentSeason)?.episodes || [];

    function setVidQual(e){
        if(!user) return navigate("/user/auth/signin");
        setVidDet(
            {
                status:true,user_email:user.email,type:e,fid:serie.id,sid:currentEpisode?.id
            }
        );
    }

    return (
        <section className="serie">
            <div className="serie-content">
                <div className="serie-trailer">
                    {
                        queryParams.size == 1 ?
                            <video controls autoPlay width={360} height={640}>
                                <source src={`../../../storage/vid/${decodedFile}`} type="video/mp4"/>
                            </video>
                        :
                        <iframe
                            src={trailer}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>    
                    }
                </div>

                <div className="serie-info">
                    <div className="serie-info-dir">
                        <Link to={`/series/${serie.id}`}>
                        <div className="serie-info-img">
                            <img src={img} alt={serie.title} />
                        </div>
                        </Link>

                        <div className="serie-info-nav">
                            <h1 className="text-2xl py-3 font-bold">Seasons</h1>
                            <span className="btn grid grid-cols-5 gap-2">
                                {grouped.map((season) => (
                                    <button
                                        key={season.season}
                                        className={`secondary-color secondary-bg cursor-pointer p-1 rounded ${
                                            currentSeason === season.season ? "current" : ""
                                        }`}
                                        onClick={() => {
                                            setCurrentSeason(season.season);
                                            setCurrentEpisode(
                                                season.episodes[season.episodes.length - 1]
                                            );
                                        }}
                                    >
                                        {`S0${season.season}`}
                                    </button>
                                ))}
                            </span>

                            <h1 className="text-2xl py-3 font-bold">Episodes</h1>
                            <span className="btn grid grid-cols-5  gap-2">
                                {episodesForCurrentSeason.map((ep) => (
                                    <button
                                        key={ep.episode}
                                        className={`secondary-color secondary-bg cursor-pointer p-1 rounded ${
                                            currentEpisode?.episode === ep.episode ? "current" : ""
                                        }`}
                                        onClick={() => setCurrentEpisode(ep)}
                                    >
                                        {`E0${ep.episode}`}
                                    </button>
                                ))}
                            </span>
                        </div>
                    </div>

                    <div className="serie-info-txt">
                        <span className="w-auto xl:w-100">
                            <h1 className="text-2xl py-3 font-bold">{serie.title}</h1>
                            <p className="font-bold text-md">{ep_title}</p>
                            <p>{desc}</p>
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
    );
}
