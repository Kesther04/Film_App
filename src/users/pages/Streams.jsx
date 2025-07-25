import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Records from "../components/Records";
import { UseSession } from "../components/UseSession";
import { BASE_API_URL } from "../../constants";

export default function Streams(){
    const [showNav, setShowNav] = useState(true);
    const {user} = UseSession();
    const [films,setFilms] = useState([]);
    const URL = `${BASE_API_URL}?apiKey=fetchRecords`;
    
    useEffect(()=>{        
        async function fetchRecords() {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email:user?.email, type:"stream"})
            });
            const data = await res.json();
            console.log(data);
            setFilms(data.records);
        }
        fetchRecords();
    },[user]);

    useEffect(()=>{
        const mediaQuery = window.matchMedia('(max-width:1000px)');
        const handleNav = (e) => {
        if(e.matches) {
            setShowNav(false);
        }else{
            setShowNav(true);
        }

        }
        handleNav(mediaQuery);
        mediaQuery.addListener(handleNav);

        return () => {
        mediaQuery.removeListener(handleNav);
        }
    },[]);
    
    
    return (
        <>
            <Header showNav={showNav} setShowNav={setShowNav} />
            <main>
                <Records showNav={showNav} header={"Watch History"} films={films} />
            <Footer/>
            </main>
        </>
    );
}