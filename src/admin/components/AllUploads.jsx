import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../constants";
import FilmCard from "./FilmCard";
import { useLocation } from "react-router-dom";

export default function AllUploads() {
    const [allFilms, setAllFilms] = useState([]);
    const [searchedFilms, setSearchedFilms] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let searchVal = queryParams.get("search");
    if (searchVal) {
        searchVal.replace('+',' ');    
    }
    const URL = `${BASE_API_URL}?apiKey=fetchFilms`;
    useEffect(() => {
        
        async function fetchFilms() {
            const res = await fetch(URL, {
                method: 'GET',
                headers: {'Content-Type':'application/json'}
            });
            const data = await res.json();
            setAllFilms(data.filmData);
        }
        fetchFilms();
    },[]);
    // console.log(allFilms);

    useEffect(()=> {
        setSearchedFilms([]);
        
        function wordChecker(word,query) {
            return word.toLowerCase().includes(query.toLowerCase());
        }

        

        if (searchVal){
            let filteredFilms = allFilms.filter(film => {
                const titleMatch = wordChecker(film.title,searchVal);
                const typeMatch = wordChecker(film.film_type,searchVal);
                const relYearMatch = wordChecker(film.release_year,searchVal);
                
                return (titleMatch || typeMatch || relYearMatch);

            });
            
            if (filteredFilms.length === 0) {
                filteredFilms = allFilms.filter(film =>
                    film.genres?.some(genre =>
                        genre.toLowerCase() === searchVal.toLowerCase()
                    )
                );
            }
            
            
            setSearchedFilms(filteredFilms);
        }
    },[searchVal]);

    if (queryParams.size == 1 && searchVal !== "") {
        if (searchedFilms.length == 0) return( <p className="italic text-red-500">No Results Found</p>);
        return (
            <>
                <h1 className="font-bold italic text-2xl">Results</h1>
                <div className="w-full min-h-150 h-auto grid grid-cols-4 gap-5 p-5 ">
                    {searchedFilms?.map((film,id) => <FilmCard key={id} film={film}/>)}
                </div>
            </>
        );
    }
    return (
        <div className="w-full min-h-150 h-auto grid grid-cols-4 gap-5 p-5 ">
            {allFilms.map((film, id) => (<FilmCard key={id} film={film} />))}
        </div>
    );
}