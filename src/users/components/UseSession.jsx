import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../constants";

export function UseSession() {
    const [session,setSession] = useState({loading:true,loggedIn:false, user:null});
    const URL = `${BASE_API_URL}check_session.php`;

    useEffect(()=>{
        axios.get(URL,{withCredentials: true}).then(res => {
            setSession({
                loading:false,
                loggedIn: res.data.logged_in,
                user: res.data.user
            });
        }).catch(() => {
            setSession({
                loading:false,
                loggedIn: false,
                user: null
            });
            
        });
    },[]);
    return session;
}