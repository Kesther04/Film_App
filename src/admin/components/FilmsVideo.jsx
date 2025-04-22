import { useState } from "react";

export default function FilmsVideo({vid,vdFn, ind}){
    const [video,setVideo] = useState({size: "",film_ext: "",vid_type: "",link: ""});
    const [vidErr,setVidErr] = useState("");
    const getFileExtension = (url) => {
        return url.split('.').pop().split('?')[0].split('#')[0];
    };
    
    const getMimeType = (ext) => {
        const mimeTypes = {
            mp4: 'video/mp4',
            mkv: 'video/mkv'
            // Add more as needed
        };
        return mimeTypes[ext.toLowerCase()] || null;
    };
    
    const getFileSize = async (url) => {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            const size = res.headers.get('content-length');
            return size ? Number(size) : null;
        } catch (err) {
            console.error('Error fetching file size:', err);
            return null;
        }
    };
    
    
    const handleVideoLink = async (e) => {
        let vid_link = e.target.value;
        const ext = getFileExtension(vid_link);
        const mime = getMimeType(ext);
        const size = await getFileSize(vid_link);
        if(size == null){
            setVidErr("Incorrect Video Format");
        }else{
            setVideo({
                size: size,
                film_ext: mime,
                vid_type: vid,
                link: vid_link
            });
        }

        vdFn((prev) => {
            const updatedData = [...prev.data];
            updatedData[ind] = video;
    
            return {...prev,data:updatedData};
        });
    };

    return (
        
        <div>
            <input type="file" name="vid[]" placeholder={`Paste Link Here for ${vid} Video of Film`} required onChange={(e)=>handleVideoLink(e)}/>
            <span className="text-red-500">{vidErr}</span>
        </div>
    );
}