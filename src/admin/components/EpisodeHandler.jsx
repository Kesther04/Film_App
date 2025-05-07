import { useEffect} from "react";
import { VideoContext } from "../context/FilmsContext";

export default function EpisodeHandler({ episode, setEpisode, season_id }) {
  const { selFilm, setSelFilm } = VideoContext();

  useEffect(() => {
    if (selFilm.sid[selFilm.sid.length - 1] == season_id + "." + episode.id) {
      setEpisode({ ...episode, video: selFilm.data });
    }
  }, [selFilm.data]);

  const setEpisodeVid = () => {
    setSelFilm(prev => ({
      ...prev,
      type: "serie",
      status: true,
      data: episode.video,
      sid: [...prev.sid.filter(id => id !== season_id + "." + episode.id), season_id + "." + episode.id],
    }));
  };

  return (
    <div className="input-section">
      <div>
        <label htmlFor="episode">Episode:</label>
        <input type="number" value={episode.id} readOnly />
        <input
          type="text"
          placeholder="Enter Episode Title.."
          value={episode.ep_title}
          onChange={e => setEpisode({ ...episode, ep_title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="episode_desc">Episode Description:</label>
        <textarea
          placeholder="Enter Episode Description.."
          value={episode.ep_desc}
          onChange={e => setEpisode({ ...episode, ep_desc: e.target.value })}
        ></textarea>
      </div>

      <div>
        <label htmlFor="video">Episode Video:</label>
        <input
          type="button"
          value={
            selFilm.isSaved.includes(season_id + "." + episode.id)
              ? "Saved Successfully"
              : "Click Here to upload Episode Video"
          }
          className={selFilm.isSaved.includes(season_id + "." + episode.id) ? "saved" : ""}
          onClick={setEpisodeVid}
        />
      </div>
    </div>
  );
}
