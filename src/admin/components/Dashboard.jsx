import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFilm } from "@fortawesome/free-solid-svg-icons/faFilm";
import { faArrowRightFromBracket, faHouse, faListCheck, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard(){
    return (
        <section className="dashboard open">
            
            <div className="logo">
                {/* logo img for the brand of the movie website */}
            </div>
            
            <ul className="db-links">
                <li>
                    <Link to="/admin/">
                        <FontAwesomeIcon icon={faListCheck} />
                        <span>Overview</span>
                    </Link>
                </li>

                <li>
                    <Link to="/" target="-blank">
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Home</span>
                    </Link>
                </li>

                <li>
                    <Link to="#">
                        <FontAwesomeIcon icon={faFilm} />
                        <span>Films</span>
                    </Link>
                </li>
            
                <li>
                    <Link to="#">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Users</span>
                    </Link>
                </li>
                
                <li>
                    <Link to="#">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Profile</span>
                    </Link>
                </li>
                
                <li>
                    <Link to="/admin/logout">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span>Log Out</span>
                    </Link>
                </li>
            </ul>


        </section>
    );
}