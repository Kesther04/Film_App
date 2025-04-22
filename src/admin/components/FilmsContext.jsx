import { createContext, useContext } from "react";

export const createFilmContext = createContext(undefined);

export  function FilmsContext() {
    const film = useContext(createFilmContext);

    if (film === undefined) {
        throw new Error("Error Occured");
    }

    return film;
}

export const createVideoContext = createContext(undefined);

export  function VideoContext() {
    const video = useContext(createVideoContext);

    if (video === undefined) {
        throw new Error("Error Occured");
    }

    return video;
}
