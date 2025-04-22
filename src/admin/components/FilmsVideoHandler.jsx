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
        // videoFn((prevVdData) => {
        //     const newVdData = [...prevVdData];

        //     return [...newVdData, ...Array().fill{}]
        // });
        videoFn({...videoData,data:[...Array(vidQuality.length).fill({})]});
        
    },[vidQuality]);
    // console.log(videoData.data);
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
                        <button>Done</button>
                    </div>
                </div>
            </div>
        </section>
    );
}