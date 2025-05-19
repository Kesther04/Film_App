import FilmCard from "./FilmCard";

export default function SearchResults({showNav,loading,results,query}){
    return(
        <section className={showNav ? "main-section open":"main-section"}>
            <section className="movie-cat-section">
                {/* header for search results*/}
                <h1>Results</h1>
                {/* films based on user searches*/}
                <div className="movie-cat">
                    {!loading && results.length === 0 && (
                        <p className="no_results">No results found for "{query}"</p>
                    )}

                    {!loading && results.length > 0 && (
                        results.map((film, index) => (
                            (film.id = film.film_id)&&<FilmCard film={film} key={index}/>
                        ))
                    )}        
                </div>

            </section>


        </section>
    
    );
}