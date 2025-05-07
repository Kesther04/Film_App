import { useEffect, useState } from "react";
import EpisodeHandler from "./EpisodeHandler";
import { FilmsContext } from "../context/FilmsContext";

export default function SerieHandler({ relYears, ind }) {
  let sid = ind + 1;
  const [season, setSeason] = useState({
    id: sid,
    img: "",
    trailer_link: "",
    release_year: "",
    film_cast: "",
    episode: [],
  });

  const [epNo, setEpNo] = useState(1);
  const [eps, setEps] = useState([{ id: 1, ep_title: "", ep_desc: "", video: [] }]);

  const { setSerieData } = FilmsContext();

  const increment = () => setEpNo(prev => prev + 1);
  const decrement = () => setEpNo(prev => (prev > 1 ? prev - 1 : prev));

  // Adjust episode list length based on epNo
  useEffect(() => {
    setEps(prev => {
      const currentLength = prev.length;
      if (epNo > currentLength) {
        const newEpisodes = Array.from({ length: epNo - currentLength }, (_, i) => ({
          id: currentLength + i + 1,
          ep_title: "",
          ep_desc: "",
          video: [],
        }));
        return [...prev, ...newEpisodes];
      } else {
        return prev.slice(0, epNo);
      }
    });
  }, [epNo]);

  // Sync episodes into season
  useEffect(() => {
    setSeason(prev => ({
      ...prev,
      episode: eps,
    }));
  }, [eps]);

  // Sync season into global series data
  useEffect(() => {
    setSerieData(prev => {
      let updatedSeason = [...prev.season];
      updatedSeason[ind] = season;
      return { ...prev, season: updatedSeason };
    });
  }, [season]);

  return (
    <>
      <div className="input-section">
        <div>
          <label htmlFor="season">Season:</label>
          <input type="number" name="season" value={season.id} readOnly required />
        </div>
        <div>
          <label htmlFor="img">Film Thumbnail Link:</label>
          <input
            type="url"
            name="img"
            placeholder="Paste Film Thumbnail URL.."
            required
            onChange={e => setSeason({ ...season, img: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="tr_link">Trailer Link:</label>
          <input
            type="url"
            name="tr_link"
            placeholder="https://TrailerLink.com"
            required
            onChange={e => setSeason({ ...season, trailer_link: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="cast">Film Cast:</label>
          <textarea
            name="cast"
            placeholder="Enter Film Cast.."
            title="Separate with Commas"
            required
            onChange={e => setSeason({ ...season, film_cast: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label htmlFor="rel_year">Release Year:</label>
          <select
            name="rel_year"
            required
            onChange={e => setSeason({ ...season, release_year: e.target.value })}
          >
            <option value=""></option>
            {relYears.map((relYear, id) => (
              <option value={relYear} key={id}>
                {relYear}
              </option>
            ))}
          </select>
        </div>
      </div>

      {eps.map((ep, i) => (
        <EpisodeHandler
          key={ep.id}
          episode={ep}
          setEpisode={updatedEp => {
            const updated = [...eps];
            updated[i] = updatedEp;
            setEps(updated);
          }}
          season_id={sid}
        />
      ))}

      <div className="reverse-btn">
        <input type="button" value="Add Another Episode" onClick={increment} />
        <span>{epNo}</span>
        <input type="button" value="Remove Another Episode" onClick={decrement} />
      </div>
    </>
  );
}
