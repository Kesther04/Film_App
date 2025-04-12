import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"


function Header({showNav,setShowNav}){
    
    return (
        <header className="border-b-1 border-gray-200 border-b-solid h-auto xl:h-12 w-full px-1 xl:px-5 py-2 flex flex-wrap fixed justify-between gap-2 xl:gap-0  -top-0 primary-bg z-10">
            <div className="cursor-pointer text-xl font-bold border rounded-sm px-2 z-30" onClick={()=>{setShowNav(showNav ? false : true)}}>
                &#9776;
            </div>

            <nav className={showNav ? "header-nav open" :  "header-nav" }>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#">TV Show</Link></li>
                    <li><Link to="#">Movie</Link></li>
                    <li><Link to="#" >Animation</Link></li>
                </ul>
            </nav>

            <div className="logo">
                {/* logo img for the brand of the movie website */}
            </div>


            <SearchBar/>

            <div className="btn flex gap-2 justify-around">
                <button className="px-2 secondary-color secondary-bg rounded cursor-pointer">Downloads</button>
                <button className="px-2 secondary-color secondary-bg rounded cursor-pointer">Watch History</button>
            </div>
        </header>
    )
}

export default Header