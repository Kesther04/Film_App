import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function FilmsPopupHandler({upl,type,setVidDet,title}){
   
    let fsupl;
    let links = upl?.map(supl => {
        supl.video = supl.video.replace(/&#039;/g, "'");

        if (type === "stream") {
            return (
                <div className="btn py-0.5" key={supl.id}>
                    <a href={`?stream=${supl.video}___${supl.series_id}`}>
                        <input type="button" value={`Stream on ${supl.vid_type}`} />
                    </a>
                </div>
            );
        } else if (type === "download") {
            return (
                <div className="btn py-0.5" key={supl.id}>
                    <input type="button" value={`Download on ${supl.vid_type}`} />
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