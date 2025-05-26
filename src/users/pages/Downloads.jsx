import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Records from "../components/Records";
import { UseSession } from "../components/UseSession";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../constants";

export default function Downloads(){
    const [showNav, setShowNav] = useState(false);
    const {loggedIn,user} = UseSession();
    const URL = `${BASE_API_URL}?apiKey=fetchRecords`;
    let navigate = useNavigate();
    if (!loggedIn) navigate("/user/auth/signin");
    
    useEffect(()=>{
            
        async function fetchRecords() {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(user?.email)
            });
            const data = await res.json();
            // console.log(data.msg);
        }
        fetchRecords();
        
    },[user]);

    return (
        <>
            <Header showNav={showNav} setShowNav={setShowNav} />
            <main>
            <Records showNav={showNav} />
            <Footer/>
            </main>
        </>
    );
}