import { useState } from "react";

export default function FilmsVideo({vid,vdFn, ind}){
    const [video,setVideo] = useState({size: "",film_ext: "",vid_type: "",link: ""});

    const getFileExtension = (url) => {
        return url.split('.').pop().split('?')[0].split('#')[0];
    };
    
    const getMimeType = (ext) => {
        const mimeTypes = {
            mp4: 'video/mp4',
            jpg: 'image/jpeg',
            png: 'image/png',
            pdf: 'application/pdf',
            mp3: 'audio/mpeg',
            txt: 'text/plain',
            json: 'application/json',
            // Add more as needed
        };
        return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
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

        setVideo({
            size: size,
            film_ext: ext,
            vid_type: mime,
            link: vid_link
        });

        vdFn((prev) => {
            const updatedData = [...prev.data];
            updatedData[ind] = video;
    
            return {...prev,data:updatedData};
        });
    };

    return (
        <>
            <div>
                <input type="url" name="vid[]" placeholder={`Paste Link Here for ${vid} Video of Film`} required onChange={(e)=>handleVideoLink(e)}/>
            </div>
        </>
    );
}