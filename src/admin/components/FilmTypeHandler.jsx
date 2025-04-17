export default function FilmTypeHandler({type}) {
    if (type == "MOVIE" || type == "ANIMATED MOVIE") {
        return (
            <>
                
                <div>
                    <label htmlFor="img">Film Thumbnail:</label>
                    <input type="url" name="img"  placeholder="Enter Film Thumbnail.." required/>
                </div>
    
                <div>
                    <label htmlFor="tr_link">Trailer Link:</label>
                    <input type="url" name="tr_link"  placeholder="https://TrailerLink.com" required/>
                </div>
    
                <div>
                    <label htmlFor="cast">Film Cast:</label>
                    <textarea name="cast"  placeholder="Enter Film Cast.." required></textarea>
                </div>
    
                <div>
                    <label htmlFor="desc">Film Description:</label>
                    <textarea name="desc" placeholder="Enter Film Description.." required></textarea>
                </div>
    
                <div>
                    <label htmlFor="rel_year">Release Year:</label>
                    <input type="number" name="rel_year"  placeholder="Enter Year of Release.." required />
                </div>

                {/* video / videos (for setting up download links or video links) */}
                <div>
                    <label htmlFor="video">Film Video:</label>
                    <input type="url" name="video"  placeholder="Enter Film Video.." required />
                </div>
            </>
        );
    }else if (type == "SERIE" || type == "ANIMATED SERIE"){
        return (
            <>
                <div>
                    <label htmlFor="season">Season:</label>
                    <input type="number" name="season" id="season" placeholder="Enter Season Number.." required />
                </div>
                <div>
                    <label htmlFor="img">Film Thumbnail:</label>
                    <input type="url" name="img" placeholder="Enter Film Thumbnail.." required/>
                </div>
    
                <div>
                    <label htmlFor="tr_link">Trailer Link:</label>
                    <input type="url" name="tr_link"  placeholder="https://TrailerLink.com" required/>
                </div>
    
                <div>
                    <label htmlFor="cast">Film Cast:</label>
                    <textarea name="cast"  placeholder="Enter Film Cast.." required></textarea>
                </div>
    
                <div>
                    <label htmlFor="rel_year">Release Year:</label>
                    <input type="number" name="rel_year"  placeholder="Enter Year of Release.." required />
                </div>
    
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
            </>
        );
    }else{
        return null;
    }
    
}