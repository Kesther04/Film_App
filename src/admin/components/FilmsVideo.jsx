import { useEffect } from "react";
import { useState } from "react";

export default function FilmsVideo({vid,vdFn, ind}){
   
    const [video,setVideo] = useState({size: "",film_ext: "",vid_type: "",link: ""});
    const [vidErr,setVidErr] = useState("");
    const [genType, setGenType] = useState("file");

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
        const ext = vid_link.split('.').pop().split('?')[0].split('#')[0];
        const mime = getMimeType(ext);
        const size = await getFileSize(vid_link);
        if(size == null){
            setVidErr("Incorrect Video Link Format");
        }else{
            
            setVideo({
                size: size,
                film_ext: mime,
                vid_type: vid,
                link: vid_link
            });
            setVidErr("");

            
        }

        vdFn((prev) => {
            const updatedData = [...prev.data];
            updatedData[ind] = video;
    
            return {...prev,data:updatedData};
        });

        
    };

    const handleVideoFile = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        const validTypes = ['video/mp4','video/mkv', 'video/x-matroska'];

        let size = (selectedFile.size/(1024*1024)).toFixed(2);  

        if (!validTypes.includes(selectedFile.type)) {
            setVidErr("Incorrect Video File Format");
        }else{
            
            setVideo({
                size: size,
                film_ext: selectedFile.type,
                vid_type: vid,
                link: selectedFile.name
            });
            setVidErr("");
        }

        vdFn((prev) => {
            const updatedData = [...prev.data];
            updatedData[ind] = video;
    
            return {...prev,data:updatedData};
        });
    }

    useEffect(()=>{
        vdFn((prev) => {
            const updatedData = [...prev.data];
            updatedData[ind] = video;
    
            return {...prev,data:updatedData};
        });

    },[video]);

    return (
        
        <div>

            <input type="button" value="Enter as Url" onClick={()=>setGenType("url")} />
            <input type="button" value="Enter as File" onClick={()=>setGenType("file")} />

            {
                genType == "url" ?  <input type="url" name="vid[]" placeholder={`Paste Link Here for ${vid} Video of Film`} required onChange={(e)=>handleVideoLink(e)}/> : ""
            }

            {
                genType == "file" ?  <input type="file" name="vid[]" placeholder={`Paste Link Here for ${vid} Video of Film`} required onChange={(e)=>handleVideoFile(e)}/> : ""
            }


            <span className="text-red-500">{vidErr}</span>
        </div>
    );
}