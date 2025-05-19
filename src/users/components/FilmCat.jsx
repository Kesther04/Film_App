import { useEffect, useState} from "react";
import { BASE_API_URL } from "../../constants";
import Suggestions from "../categories/Suggestions";
import Trending from "../categories/Trending";
import Popular from "../categories/Popular";
import TopMovies from "../categories/TopMovies";
import TopSeries from "../categories/TopSeries";


function FilmCat({showNav,type}){

    const [filmDet,setFilmDet] = useState([]);

    const URL = `${BASE_API_URL}?apiKey=fetchFilms`;
    useEffect(() => {
        
        async function fetchFilms() {
            const res = await fetch(URL, {
                method: 'GET',
                headers: {'Content-Type':'application/json'}
            });
            const data = await res.json();
            console.log(data);
            setFilmDet(data.filmData);
        }
        fetchFilms();
    },[]);
    switch (type) {
        case "Movies":
        return (
            <section className={showNav ? "main-section open":"main-section"}>
                <Suggestions filmDet={filmDet} type={type}/>
                <Trending filmDet={filmDet} type={type}/>
                <Popular filmDet={filmDet} type={type}/>
                <TopMovies filmDet={filmDet} type={type}/>
            </section>
        );
        case "Series":
        return (
            <section className={showNav ? "main-section open":"main-section"}>
                <Suggestions filmDet={filmDet} type={type}/>
                <Trending filmDet={filmDet} type={type}/>
                <Popular filmDet={filmDet} type={type}/>
                <TopSeries filmDet={filmDet} type={type}/>
            </section>
        );
        case "Animation":
        return (
            <section className={showNav ? "main-section open":"main-section"}>
                <Suggestions filmDet={filmDet} type={type}/>
                <Trending filmDet={filmDet} type={type}/>
                <Popular filmDet={filmDet} type={type}/>
                <TopMovies filmDet={filmDet} type={type}/>
                <TopSeries filmDet={filmDet} type={type}/>
            </section>
        );
        default:
        return (
            <section className={showNav ? "main-section open":"main-section"}>
                <Suggestions filmDet={filmDet} type={type}/>
                <Trending filmDet={filmDet} type={type}/>
                <Popular filmDet={filmDet} type={type}/>
                <TopMovies filmDet={filmDet} type={type}/>
                <TopSeries filmDet={filmDet} type={type}/>
            </section>
        );
        
    }

}

export default FilmCat;