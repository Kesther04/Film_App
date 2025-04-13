import axios from "axios";
import { useEffect, useState } from "react";

export function UseSession() {
    const [session,setSession] = useState({loading:true,loggedIn:false, user:null});
    const URL = "http://localhost/REACT_PROJECTS/Film_App/api/check_session.php";

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