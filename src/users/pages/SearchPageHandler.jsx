import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSearch } from "../context/QueryContext";
import axios from "axios";
import { BASE_API_URL } from "../../constants";
import SearchResults from "../components/searchResults";

export default function SearchPageHandler() {
  const [showNav, setShowNav] = useState(true);
  const { query } = useSearch();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = `${BASE_API_URL}?apiKey=searchQuery`; 
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:1000px)");
    const handleNav = (e) => setShowNav(!e.matches);
    handleNav(mediaQuery);
    mediaQuery.addListener(handleNav);
    return () => mediaQuery.removeListener(handleNav);
  }, []);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios.post(URL, query , {withCredentials: true,headers: { "Content-Type": "application/json" },})
      .then((res) => {
        setResults(res.data.searchData || []);
        setLoading(false);
      })
      .catch((error) => console.error(error));
      // .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      <Header showNav={showNav} setShowNav={setShowNav} />
      <main>
        <SearchResults showNav={showNav} loading={loading} results={results} query={query}/>
        <Footer />
      </main>
    </>
  );
}
