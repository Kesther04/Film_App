import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar(){
    const [search, setSearch] = useState("");

    return (
        <span className="w-auto relative">
            {/* for search bar of the movie site */}
            <button className="absolute py-1.5 px-3 cursor-pointer">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input type="text" name="search" id="search" placeholder="Search Here.." required value={search} onChange={(e)=>setSearch(e.target.value)} className="px-8 py-1 w-120 border-solid border-gray-500 border-1 rounded-sm outline-none" />
        </span>
    )    
}

export default SearchBar;