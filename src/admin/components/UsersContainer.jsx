import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../constants";
import UserCard from "./UserCard";
import { useLocation } from "react-router-dom";

const UsersContainer = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let searchVal = queryParams.get("search");
    if (searchVal) {
        searchVal.replace('+',' ');    
    }
    
    
    const URL = `${BASE_API_URL}?apiKey=fetchUsers`;
    useEffect(() => {
        
        async function fetchUsers() {
            const res = await fetch(URL, {
                method: 'GET',
                headers: {'Content-Type':'application/json'}
            });
            const data = await res.json();
            setAllUsers(data.userData);
        }
        fetchUsers();
    },[]);
    // console.log(allUsers);

    useEffect(()=> {
        setSearchedUsers([]);
        
        function wordChecker(word,query) {
            return word.toLowerCase().startsWith(query.toLowerCase());
        }

        if (searchVal){
            const filteredUsers = allUsers.filter(user => {
                const nameMatch = wordChecker(user.name,searchVal);
                const emailMatch = wordChecker(user.email,searchVal);
                const adminMatch = searchVal.toLowerCase() == "admin" && user.is_admin;
                const activeMatch = searchVal.toLowerCase() == "active" && user.activeState;
                const inactiveMatch = searchVal.toLowerCase() == "inactive" && !user.activeState;
            
                return ( nameMatch || emailMatch || adminMatch || activeMatch || inactiveMatch);
            });
            
            setSearchedUsers(filteredUsers);
        }
    },[searchVal]);

    if (queryParams.size == 1 && searchVal !== "") {
        if (searchedUsers.length == 0) return( <p className="italic text-red-500">No Results Found</p>);
        return (
            <>
                <h1 className="font-bold italic text-2xl">Results</h1>
                <div className="w-full min-h-150 h-auto grid grid-cols-4 gap-5 p-5 ">
                    {searchedUsers?.map((user,id) => <UserCard key={id} user={user}/>)}
                </div>
            </>
        );
    }
    return (
        
        <div className="w-full min-h-150 h-auto grid grid-cols-4 gap-5 p-5 ">
            {allUsers?.map((user,id) => <UserCard key={id} user={user}/>)}
        </div>
        
    );
}

export default UsersContainer;