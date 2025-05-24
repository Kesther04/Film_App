import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_API_URL } from "../../constants";
import {  useNavigate } from "react-router-dom";

export default function FilmsPopupHandler({upl,vidDet,setVidDet,title}){
    let navigate = useNavigate();
    const URL =  `${BASE_API_URL}?apiKey=records`;
    
    
    const recordActivity = (type,upl_id,video,series_id = 0) => {
        
        axios.post(URL, {
            email: vidDet.user_email,
            film_id: vidDet.fid,
            upl_id: upl_id,
            type: type
        }, {withCredentials: true, headers:{'Content-Type':'application/json'}}).then(
            (res)=>{
                console.log(res.data);
                if(res.data.status == "success"){
                    if (type == "stream"){
                        navigate(`?stream=${video}___${series_id}`);
                        setVidDet({status:false,type:"",fid:null,sid:null});
                    }
                    

                    if (type == "download") {
                        const fileUrl = `../../../storage/vid/${video}`;
                        const a = document.createElement('a');
                        a.href = fileUrl;
                        a.download = video;
                        a.click();

                        setVidDet({status:false,type:"",fid:null,sid:null});
                    }
                }
            }
        ).catch(
            (err)=>console.log(err)
        )

    }
   
    console.log(upl,vidDet);
    let links = upl?.map(supl => {
        supl.video = supl.video.replace(/&#039;/g, "'");

        if (vidDet.type === "stream") {
            return (
                <div className="btn py-0.5" key={supl.id}>
                    <input type="button" value={`Stream on ${supl.vid_type}`} onClick={()=>{recordActivity(vidDet.type,supl.id,supl.video,supl.series_id)}} />
                </div>
            );
        } else if (vidDet.type === "download") {
            return (
                <div className="btn py-0.5" key={supl.id}>
                    <input type="button" value={`Download on ${supl.vid_type}`} onClick={()=>{recordActivity(vidDet.type,supl.id,supl.video)}}/>
                </div>
            );
        }

        return null; // In case `type` is neither 'stream' nor 'download'
    });

    return(
        <section className="popup">
            <div className="video-popup-box">
                <div className="video-quality-input active">
                    <div className="icon" onClick={()=>{setVidDet({status:false,type:"",fid:null,sid:null})}} >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <h1>Links Available for {title}</h1>
                    {links}
                </div>
            </div>
        </section>
    );
}