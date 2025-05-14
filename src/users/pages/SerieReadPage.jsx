import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BASE_API_URL } from "../../constants";
import SeriePage from "../components/SeriePage";

export default function SerieReadPage() {
    const { serieId } = useParams();
    const [serie, setSerie] = useState({});
    const [loading,setLoading] = useState(true);
    const URL = `${BASE_API_URL}?apiKey=fetchSerie`;

    useEffect(() => {
        async function fetchSerie() {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(serieId)
            });
            const result = await res.json();
            console.log(result.serieData);
            setSerie(result.serieData);
            setLoading(false);
        }
        fetchSerie();
    },[serieId]);
    const [showNav, setShowNav] = useState(false);
    return (
<>
            <Header showNav={showNav} setShowNav={setShowNav}/>
            <main>
                <SeriePage serie={serie} loading={loading}/>
                <Footer/>
            </main>
        </>
    );
}