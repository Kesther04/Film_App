import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BASE_API_URL } from "../../constants";
import SeriePage from "../components/SeriePage";
import FilmsPopupHandler from "../components/FilmsPopupHandler";

export default function SerieReadPage() {
    const { serieId } = useParams();
    const [serie, setSerie] = useState({});
    const [upl,setUpl] = useState([]);
    const [loading,setLoading] = useState(true);
    const URL = `${BASE_API_URL}?apiKey=fetchSerie`;
    const sURL = `${BASE_API_URL}?apiKey=fetchUploads`;

    useEffect(() => {
        async function fetchSerie() {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(serieId)
            });
            const result = await res.json();
            setSerie(result.serieData);
            setLoading(false);
        }
        fetchSerie();
    },[serieId]);
    const [showNav, setShowNav] = useState(false);
    const [vidDet,setVidDet] = useState({status:false,user_email: null,type:"",fid:null,sid:null});
    useEffect(()=>{ 
        if (vidDet.status) {
            async function fetchUploads() {
                const res = await fetch(sURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({fid:vidDet.fid,sid:vidDet.sid})
                });

                const result = await res.json();
                setUpl(result.uploads);
            }

            fetchUploads();

        }
    },[vidDet]);
    return (
        <>
            <Header showNav={showNav} setShowNav={setShowNav}/>
            <main>
                <SeriePage serie={serie} loading={loading} setVidDet={setVidDet}/>
                <Footer/>
            </main>

            {vidDet.status && <FilmsPopupHandler upl={upl} vidDet={vidDet} title={serie.title} setVidDet={setVidDet} />}
        </>
    );
}