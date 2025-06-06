import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faFilm } from "@fortawesome/free-solid-svg-icons/faFilm";
import { faArrowRightFromBracket, faHouse, faListCheck, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";
import { useState } from "react";
import { UseSessionAdmin } from "./UseSessionAdmin";


export default function Dashboard({ddState}){
    const [toLo,setToLo] = useState(false);
    const [isOpen,setIsOpen] = useState(ddState);
    const toggleDropDown = () => setIsOpen(!isOpen);
    const {user} = UseSessionAdmin();
    let navigate = useNavigate(); 
    let params = useParams();
    let AdminName;
    if (user) {
        !user.is_admin ? navigate('/admin/auth/signin') : AdminName = user.name;
    }else{
        navigate('/admin/auth/signin');
    }    
    
    params == "/admin/upload" || params == "/admin/alter_upload" && setIsOpen(true) 
    // console.log(params);
    

    return (
        <>
            
            <section className="dashboard open">
                
                <div className="logo">
                    {/* logo img for the brand of the movie website */}
                </div>
                
                <ul className="db-links">
                    <li title="Overview">
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
                        <Link to="#" onClick={toggleDropDown}>
                            <FontAwesomeIcon icon={faFilm} />
                            <span>
                                Films
                            </span>
                            <span className={isOpen ? "arrow open" : "arrow"}>
                                &#9662;
                            </span>
                        </Link>
                        <ul className={isOpen ? "open" : ""}>
                            <li><Link to="/admin/upload">Enter Upload</Link></li>
                            <li><Link to="/admin/view_uploads">View Uploads</Link></li>
                        </ul>
                    </li>
                
                    <li>
                        <Link to="/admin/user_details">
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Users</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/admin/profile">
                            <FontAwesomeIcon icon={faUser} />
                            <span>Profile</span>
                        </Link>
                    </li>
                    
                    <li>
                        <button onClick={()=>setToLo(true)}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            <span>Log Out</span>
                        </button>
                    </li>
                    
                </ul>


            </section>
            {toLo ? <Logout toLo={setToLo} /> : ""}
        </>
    );
}