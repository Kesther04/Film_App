import { useState } from "react";

export default function FilmsVideoHandler() {
    const [vidQuality,setVidQuality] = useState([]);
    return (
        <section className="popup">
            <div className="video-popup-box">
                <h1>Select Video Quality Types</h1>
                <div>
                    <input type="checkbox" name="360P" value="360P" />
                    <label htmlFor="360P">360P</label>
                </div>
                <div>
                    <input type="checkbox" name="480P" value="480P" />
                    <label htmlFor="480P">480P</label>
                </div>
                <div>
                    <input type="checkbox" name="720P" value="720P" />
                    <label htmlFor="720P">720P</label>
                </div>
                <div>
                    <input type="checkbox" name="1080P" value="1080P" />
                    <label htmlFor="1080P">1080P</label>
                </div>
                
                <div className="btn flex gap-2 justify-center">
                    <button>Click Here</button>
                </div>
            </div>
        </section>
    );
}