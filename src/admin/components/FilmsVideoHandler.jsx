import { useEffect, useState } from "react";
import FilmsQuality from "./FilmsQuality";
import FilmsVideo from "./FilmsVideo";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilmsVideoHandler({videoData,videoFn}) {    
    const [vidQuality,setVidQuality] = useState([]);
    const [disInputs,setDisInputs] = useState(true);
    let disLinks = false;
    
    disInputs ? disLinks = false : disLinks = true;
    
    useEffect(()=>{
    
        videoFn({...videoData,data:[...Array(vidQuality.length).fill({})]});
        
    },[vidQuality]);

    function validateArrayOfObjects(array) {
        if (!Array.isArray(array)) return false;
        if (array.length === 0) return false;
        
        return array.every(obj => {
            if (typeof obj !== 'object' || obj === null || Array.isArray(obj) || obj === "") return false;

            const keys = Object.keys(obj);
            if (keys.length == 0) return false;

            return keys.every(key => {
                const value = obj[key];
                if (value == "" || value == null) {
                    return false; 
                }else { 
                    return true;
                }
            });
        });
    }


    const saveVidUpload = () => {
        
        if (!validateArrayOfObjects(videoData.data)) {
            return videoFn({...videoData,status:true}); 
        }else{

            if (videoData.type == "movie") {
                videoFn({...videoData,status:false,isSaved:["Saved"]});    
            }

            if (videoData.type == "serie"){
                let serievdDt = videoData.sid[videoData.sid.length-1];
                videoFn({...videoData,status:false,isSaved:[...videoData.isSaved.filter((id => id !== serievdDt)),serievdDt]});
            }
        }
               
    }

    return (
        <section className="popup">
            <div className="video-popup-box">
                <FilmsQuality vidQuality={vidQuality} setVidQuality={setVidQuality} disLinks={disLinks} disInputs={disInputs} setDisInputs={setDisInputs} vdData={videoData} vdFn={videoFn} />

                <div className={disLinks ? "video-link-input active" : "video-link-input"}>
                    <div className="icon" onClick={()=>{setDisInputs(true)}} >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    {vidQuality.sort().map((vid,ind) => (
                        <FilmsVideo vid={vid}  ind={ind} vdFn={videoFn} key={ind}/>
                    ))}
                    <div className="btn flex gap-2 justify-center">
                        <button onClick={()=>saveVidUpload()}>Save</button>
                    </div>
                </div>
            </div>
        </section>
    );
}