export default function EpisodeHandler() {
    return(
        <>
            <div className="input-section">
            <div>
                <label htmlFor="episode">Episode:</label>
                <input type="number" name="episode"  placeholder="Enter Episode Number.." required />
            </div>

            <div>
                <label htmlFor="episode_desc">Episode Description.:</label>
                <textarea name="episode_desc"  placeholder="Enter Episode Description.." required ></textarea>
            </div>


            {/* video / videos (for setting up download links or video links) */}
            <div>
                <label htmlFor="video">Film Video:</label>
                <input type="url" name="video"  placeholder="Enter Film Video.." required />
            </div>
            </div>

            <div className="reverse-btn">
                <input type="button" value="Add Another Episode" />
                <span>1</span>
                <input type="button" value="Remove Another Episode" />
            </div>
        </>
    );
}