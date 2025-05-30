import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API_URL } from "../../constants";

export default function FilmsVideo({ vid, vdFn, ind }) {
    const [video, setVideo] = useState({ size: "", film_ext: "", vid_type: "", link: "" });
    const [vidErr, setVidErr] = useState("");
    const [genType, setGenType] = useState("file");
    const URL = `${BASE_API_URL}videoFormat.php`;

    const getMimeType = (ext) => {
        const mimeTypes = {
            mp4: 'video/mp4',
            mkv: 'video/mkv',
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
        const vid_link = e.target.value;
        const ext = vid_link.split('.').pop().split('?')[0].split('#')[0];
        const mime = getMimeType(ext);
        const size = await getFileSize(vid_link);

        if (!size) {
            setVidErr("Incorrect Video Link Format");
        } else {
            const updated = {
                size: size,
                film_ext: mime,
                vid_type: vid,
                link: vid_link
            };
            setVideo(updated);
            setVidErr("");
        }
    };

    const handleVideoFile = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        let size = (selectedFile.size/(1024*1024)).toFixed(2);  

        const validTypes = ['video/mp4', 'video/mkv', 'video/x-matroska'];
        if (!validTypes.includes(selectedFile.type)) {
            setVidErr("Incorrect Video File Format");
            return;
        }

        const formData = new FormData();
        formData.append("video", selectedFile);
        formData.append("targetDir", "../storage/vid");
        try {
            const response = await fetch(URL, {method: "POST",body: formData});
            const results = await response.json();
            console.log(results);
            if(results.success){
                setVideo({
                    size: size,
                    film_ext: selectedFile.type,
                    vid_type: vid,
                    link: results.name
                });
                setVidErr("");
            }
        } catch (err) {
            console.err("Video not Saved");
        }

    };

    useEffect(() => {
        vdFn((prev) => {
            const updatedData = [...prev.data];
            updatedData[ind] = video;
            return { ...prev, data: updatedData };
        });
    }, [video]);

    return (
        <div className="flex flex-col">
            <label htmlFor="video">Upload Video for {vid}</label>

            <span className="flex gap-2 mt-2 mb-2">
                <input type="button" value="Enter as Url" onClick={() => setGenType("url")}  />
                <input type="button" value="Enter as File" onClick={() => setGenType("file")}  />
            </span>

            {genType === "url" && (
                <input
                    type="url"
                    name="video"
                    placeholder={`Paste Link Here for ${vid} Video`}
                    onChange={handleVideoLink}
                    required
                />
            )}

            {genType === "file" && (
                <input
                    type="file"
                    name="video"
                    accept="video/mp4, video/mkv, video/x-matroska"
                    onChange={handleVideoFile}
                    required
                />
            )}

            <span className="text-red-500">{vidErr}</span>
        </div>
    );
}
