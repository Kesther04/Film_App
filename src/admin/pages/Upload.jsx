import { useState } from "react";
import Dashboard from "../components/Dashboard";
import UploadFilms from "../components/UploadFilms";
import { createVideoContext } from "../context/FilmsContext";
import FilmsVideoHandler from "../components/FilmsVideoHandler";
import FilmsSavedPopup from "../components/FilmsSavedPopup";
export default function Upload() {
    
    const [selFilm,setSelFilm] = useState({status:false,type:"",isSaved:[],data:[],sid:[]});

    console.log(selFilm);
    
    return (
        <>
            <Dashboard ddState={true}/>
            <main className="admin-main">
                <section className="admin-content">
                    <createVideoContext.Provider value={{selFilm,setSelFilm}}>
                    <UploadFilms/>
                    </createVideoContext.Provider>
                </section>
            </main>
            {
                (selFilm.type == "movie" && selFilm.isSaved[0] == "Saved" && selFilm.status) ? <FilmsSavedPopup videoData={selFilm} videoFn={setSelFilm}/> :  
                (selFilm.type == "serie" && selFilm.isSaved.includes(selFilm.sid[selFilm.sid.length-1]) &&  selFilm.status) ? <FilmsSavedPopup videoData={selFilm} videoFn={setSelFilm}/> : 
                selFilm.status ? <FilmsVideoHandler videoData={selFilm} videoFn={setSelFilm}/> : ""
            }
     


        </>
    );
}