import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar(){
    const [search, setSearch] = useState("");

    return (
        <span className="w-auto relative">
            {/* for search bar of the movie site */}
            <button className="absolute p-2 cursor-pointer text-sm">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input type="text" name="search" id="search" placeholder="Search Here.." required value={search} onChange={(e)=>setSearch(e.target.value)} className="pl-10 pr-4 py-1 xl:w-120 w-full border-solid border-gray-500 border-1 rounded-sm outline-none" />
        </span>
    )    
}

export default SearchBar;