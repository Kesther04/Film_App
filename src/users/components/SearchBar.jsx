import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/QueryContext";

function SearchBar({user}){
    const [search, setSearch] = useState("");
    const { setQuery } = useSearch();
    const navigate = useNavigate();

    const searchData = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        if(!user) return( navigate("/user/auth/signin"));
        setQuery(search);
        
        navigate("/search");
    };

    return (
        <span className="w-auto relative">
            <form onSubmit={searchData}>
                <button className="absolute p-2 cursor-pointer text-sm">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                    type="text"
                    placeholder="Search Here.."
                    required
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-1 xl:w-120 w-full border border-gray-500 rounded-sm outline-none focus:shadow-sm focus:border-gray-700"
                />
            </form>
        </span>
    );
}

export default SearchBar;