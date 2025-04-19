import { useEffect, useState } from "react";

export default function EpisodeHandler({season,setSeason}) {
    const [epNo,setEpNo] = useState(1);
    const [eps,setEps] = useState(Array(epNo).fill({}));
    const increment = () => setEpNo((prev)=> prev + 1);
    const decrement = () => setEpNo((prev)=> prev == 1 ? prev : prev - 1);
    const [episode,setEpisode] = useState({id: "",ep_title: "",ep_desc: "",video:[]});
    // let sid;
    useEffect(() => {
       
        setEps((prevEps) => {
            const newEps = [...prevEps];

            if (epNo > prevEps.length) {
            // Add more empty objects
            return [...newEps, ...Array(epNo - prevEps.length).fill({})];
            } else {
            // Trim to new length
            return newEps.slice(0, epNo);
            }
        });
        setSeason({...season,episode:episode});

    }, [epNo]);

    return(
        <>
            {eps.map((_,ind) => (
                <div className="input-section" key={ind}>
                    <div>
                        <label htmlFor="episode">Episode:</label>
                        <input type="number" name="episode_no" value= {episode.id = ind+1}  readOnly required/>
                        
                        <input type="text" name="episode_title"  placeholder="Enter Episode Title.." required onChange={(e)=>setEpisode({...episode,ep_title:e.target.value})} />
                    </div>

                    <div>
                        <label htmlFor="episode_desc">Episode Description.:</label>
                        <textarea name="episode_desc"  placeholder="Enter Episode Description.." required onChange={(e)=>setEpisode({...episode,ep_desc:e.target.value})} ></textarea>
                    </div>


                    {/* video / videos (for setting up download links or video links) */}
                    <div>
                        <label htmlFor="video">Film Video:</label>
                        <input type="button" name="video"  value="Click Here to add Film Video" required />
                    </div>
                </div>
            ))}


            <div className="reverse-btn">
                <input type="button" value="Add Another Episode" onClick={increment}/>
                <span>{epNo}</span>
                <input type="button" value="Remove Another Episode" onClick={decrement} />
            </div>
        </>
    );
}