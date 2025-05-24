import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Downloads(){
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