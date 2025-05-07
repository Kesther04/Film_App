import { useEffect,useState } from "react";
import MovieHandler from "./MovieHandler";
import SerieHandler from "./SerieHandler";
import { FilmsContext } from "../context/FilmsContext";

export default function FilmTypeHandler({type}) {
    let date = new Date().getFullYear();
    let relYears = [];
    
    for (let index = date; index > 2000; index--) {          
        relYears.push(index);
    }
    // console.log(relYears);
    

    if (type == "MOVIE" || type == "ANIMATED MOVIE") {
        return (
            <>
                <MovieHandler relYears={relYears} />
            </>
        );
    }else if (type == "SERIE" || type == "ANIMATED SERIE"){
        const [seriesNo,setSeriesNo] = useState(1);
        const [series,setSeries] = useState(Array(seriesNo).fill({}));
        const {serieData,setSerieData} = FilmsContext();
        const increment = () => setSeriesNo((prev)=> prev + 1);
        const decrement = () => setSeriesNo((prev)=> prev == 1 ? prev : prev - 1);
        useEffect(() => {
            // Whenever seriesNo changes, update series array
            // prevSeries is the already existing state
            setSeries((prevSeries) => {
                const newSeries = [...prevSeries];
                
                if (seriesNo > prevSeries.length) {
                    // Add more empty objects
                    // console.log([...newSeries, ...Array(seriesNo - prevSeries.length).fill({})]);
                    return [...newSeries, ...Array(seriesNo - prevSeries.length).fill({})];
                    
                } else {
                    // Trim to new length
                    return newSeries.slice(0, seriesNo);
                }
            });
            
            setSerieData({...serieData,season: series})
        }, [seriesNo]);

        useEffect(()=>{
            setSeries((prev) => prev = serieData.season)
        },[serieData]);

        console.log(series);
        return (
            <>
                {   
                    series.map((_,ind)=> (
                        <SerieHandler relYears={relYears} ind={ind} key={ind} />
                    ))
                }
    
                <div className="reverse-btn">
                    <input type="button" value="Add Another Season" onClick={increment} />
                    <span>{seriesNo}</span>
                    <input type="button" value="Remove Another Season" onClick={decrement} />
                </div>
            </>
        );
    }else{
        return null;
    }
    
}