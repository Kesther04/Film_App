import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { UseSession } from "./UseSession";


function Header({showNav,setShowNav}){
    const { loggedIn, user} = UseSession();    
    
    return (
        <header className="border-b-1 border-gray-200 border-b-solid h-auto xl:h-12 w-full px-1 xl:px-5 py-2 flex flex-wrap fixed justify-center sm:justify-between gap-2 xl:gap-0 top-0 primary-bg z-10 primary-color ">
            <div className="cursor-pointer text-xl font-bold border rounded-sm px-2 z-30" onClick={()=>{setShowNav(showNav ? false : true)}}>
                &#9776;
            </div>

            <nav className={showNav ? "header-nav open" :  "header-nav" }>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/series">TV Show</Link></li>
                    <li><Link to="/movies">Movie</Link></li>
                    <li><Link to="/animation" >Animation</Link></li>
                </ul>
            </nav>

            <div className="logo">
                {/* logo img for the brand of the movie website */}
            </div>


            <SearchBar user={user}/>

            {loggedIn ? 
            
            <div className="btn flex gap-2 justify-around py-2 sm:py-0">
                <button className="py-2 sm:py-0">
                    <Link to='/download_history'>
                        Download History
                    </Link>
                </button>


                <button className="py-2 sm:py-0">
                    <Link to='/watch_history'>
                        Watch History
                    </Link>
                </button>

            </div>
            :
            <div className="btn flex gap-2 justify-around ">

                <button  title="Sign Up Here to create your user account" className="py-2 sm:py-0">
                    <Link to='/user/auth/signup'>
                        Sign Up
                    </Link>
                </button>


                <button title="Sign In Here to access your user account" className="py-2 sm:py-0">
                    <Link to='/user/auth/signin'>
                        Sign In
                    </Link>
                </button>
                
            </div>
            }


        </header>
    )
}

export default Header