import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import MovieCat from "./components/MovieCat"


function App() {
  const [showNav, setShowNav] = useState(null);
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
