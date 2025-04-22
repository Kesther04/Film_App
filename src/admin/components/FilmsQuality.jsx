import { useState } from "react";

export default function FilmsQuality({vidQuality,setVidQuality,disInputs,setDisInputs}) {
    const [checked] = useState({"360P":false,"480P":false,"720P":false,"1080P":false});
    

    function vidQualityHandler(e) {
        let qual = e.target.value;
        if (checked[qual]) {
            setVidQuality(vidQuality.filter(vid => vid !== e.target.value));
            checked[qual] = false;
        }else{
            setVidQuality([...vidQuality,e.target.value]);
            checked[qual] = true;
        }
        console.log(checked,vidQuality);    
    }
    
    
    return (
        <div className={disInputs ? "video-quality-input active" : "video-quality-input"}>
            <h1>Select Video Quality Types</h1>
            <div>
                <input type="checkbox" checked={checked["360P"]} name="360P" value="360P" onChange={(e)=>vidQualityHandler(e)} />
                <label htmlFor="360P">360P</label>
            </div>
            <div>
                <input type="checkbox" checked={checked["480P"]} name="480P" value="480P" onChange={(e)=>vidQualityHandler(e)} />
                <label htmlFor="480P">480P</label>
            </div>
            <div>
                <input type="checkbox" checked={checked["720P"]} name="720P" value="720P" onChange={(e)=>vidQualityHandler(e)} />
                <label htmlFor="720P">720P</label>
            </div>
            <div>
                <input type="checkbox" checked={checked["1080P"]} name="1080P" value="1080P" onChange={(e)=>vidQualityHandler(e)} />
                <label htmlFor="1080P">1080P</label>
            </div>
            
            <div className="btn flex gap-2 justify-center" onClick={()=>setDisInputs(false)}>
                <button>Click Here</button>
            </div>
        </div>
    );
}