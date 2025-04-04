import SearchBar from "./SearchBar"


function Header({showNav,setShowNav}){
    
    return (
        <header className="border-b-1 border-gray-500 border-b-solid h-12 w-full px-5 py-2 flex fixed justify-between  -top-0 bg-white z-10 xl:flex ">
            <div className="cursor-pointer text-xl font-bold border rounded px-2" onClick={()=>{setShowNav(showNav ? false : true)}}>
                &#9776;
            </div>

            <nav className={showNav ? "header-nav open" :  "header-nav" }>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">TV Show</a></li>
                    <li><a href="#">Movie</a></li>
                    <li><a href="#" >Animation</a></li>
                </ul>
            </nav>

            <div className="logo">
                {/* logo img for the brand of the movie website */}
            </div>


            <SearchBar/>

            <div className="btn flex gap-2 justify-around">
                <button className="px-2 border-solid border-black border-1 rounded bg-black text-white cursor-pointer">Downloads</button>
                <button className="px-2 border-solid border-black border-1 rounded bg-black text-white cursor-pointer">Watch History</button>
            </div>
        </header>
    )
}

export default Header