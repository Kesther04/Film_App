import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Streams(){
    const [showNav, setShowNav] = useState(true);
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
            
            <Footer/>
            </main>
        </>
    );
}