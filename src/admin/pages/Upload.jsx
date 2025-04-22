import { useState } from "react";
import Dashboard from "../components/Dashboard";
import UploadFilms from "../components/UploadFilms";
import { createVideoContext } from "../components/FilmsContext";
import FilmsVideoHandler from "../components/FilmsVideoHandler";
export default function Upload() {
    // const [showNav, setShowNav] = useState(true);

    const [selFilm,setSelFilm] = useState({status:false,data:[],eid:null,sid:null});
    // console.log(selFilm.data);
    return (
        <>
            <Dashboard ddState={true}/>
            <main>
                <section className="admin-content">
                    <createVideoContext.Provider value={{selFilm,setSelFilm}}>
                    <UploadFilms/>
                    </createVideoContext.Provider>
                </section>
            </main>
            {selFilm.status ? <FilmsVideoHandler videoData={selFilm} videoFn={setSelFilm}/> : ""}
        </>
    );
}