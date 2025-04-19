import { createContext, useContext } from "react";

export const createFilmContext = createContext(undefined);

export  function FilmsContext() {
    const film = useContext(createFilmContext);

    if (film === undefined) {
        throw new Error("Error Occured");
    }

    return film;
}