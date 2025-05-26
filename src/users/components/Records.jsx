import { Link } from "react-router-dom";
import Record from "./Record";

export default function Records({showNav}) {
    return(
        <section className={showNav ? "main-section open" : "main-section"}>
            <section className="records">
                <div className="records-content">
                    <Link to={"/movies/"}><Record/></Link>
                </div>
            </section>
        </section>
    );
}