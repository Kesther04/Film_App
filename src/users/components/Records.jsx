import { Link } from "react-router-dom";
import Record from "./Record";

export default function Records({showNav,header,films}) {
    return(
        <section className={showNav ? "main-section open" : "main-section"}>
            <section className="records">
                <h1 className="text-2xl font-bold py-3">{header}</h1>
                <div className="w-full rounded xl:shadow-2xl h-auto flex flex-col gap-5">
                    {
                        films.map((film,ind) => (

                            (film.type == "SERIE") ? (<Link to={`/series/${film.id}`} key={ind}><Record film={film}/></Link>) : (film.type == "MOVIE") ? (<Link to={`/movies/${film.id}`} key={ind}><Record film={film}/></Link>): null


                        ))

                    }
                </div>
            </section>
        </section>
    );
}