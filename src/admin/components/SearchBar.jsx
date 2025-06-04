import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ph}){
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const searchData = (e) => {
        setSearch(e);
        e = e.replace(/ /g,"+");
        navigate(`?search=${e}`);
    }
    console.log(search);
    return (
    <div className="py-2 flex justify-center">
    <span className="w-auto relative">
            <button className="absolute p-2 cursor-pointer text-sm ">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
                type="text"
                placeholder={ph}
                required
                value={search}
                onChange={(e) => searchData(e.target.value)}
                className="pl-10 pr-4 py-1 xl:w-120 w-full border border-gray-500 rounded-sm outline-none focus:shadow-sm focus:border-gray-700"
            />
    </span>
    </div>
    
    );
}