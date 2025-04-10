import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import MovieCat from "./components/MovieCat"


function App() {
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
          <MovieCat showNav={showNav}/>
          <Footer/>
        </main>
      </>
    )
}

export default App
