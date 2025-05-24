
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MoviePage from "../components/MoviePage";
import { BASE_API_URL } from "../../constants";
import FilmsPopupHandler from "../components/FilmsPopupHandler";

export default function MovieReadPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const [upl,setUpl] = useState([]);
    const URL = `${BASE_API_URL}?apiKey=fetchMovie`;
    const sURL = `${BASE_API_URL}?apiKey=fetchUploads`;

    const [showNav, setShowNav] = useState(false);
    const [vidDet, setVidDet] = useState({ status: false, user_email: null, type: "", fid: null, sid: null });

    // Fetch the movie data
    useEffect(() => {
        async function fetchMovie() {
            const res = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieId)
            });
            const result = await res.json();
            setMovie(result.movieData);
        }
        fetchMovie();
    }, [movieId]);

    // Fetch upload data when vidDet.status is true
    useEffect(()=>{ 
        if (vidDet.status) {
            async function fetchUploads() {
                const res = await fetch(sURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({fid:vidDet.fid,sid:vidDet.sid})
                });

                const result = await res.json();
                // console.log("Uploads:", result);
                setUpl(result.uploads);
            }

            fetchUploads();

        }
    },[vidDet]);
    return (
        <>
            <Header showNav={showNav} setShowNav={setShowNav} />
            <main>
                <MoviePage movie={movie} setVidDet={setVidDet} />
                <Footer />
            </main>

            {/* Optional: Show popup */}
            {vidDet.status && <FilmsPopupHandler upl={upl} vidDet={vidDet} title={movie.title} setVidDet={setVidDet} />}
        </>
    );
}
