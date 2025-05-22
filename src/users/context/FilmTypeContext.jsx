import { createContext, useContext, useState } from "react";

// Create context with an explicit name (capitalized)
export const createFilmTypeContext = createContext(undefined);

// To use the Created Context
export const FilmTypeContext = () => {
    const film = useContext(createFilmTypeContext);

    if (film === undefined) {
        throw new Error("Error Occured");
    }

    return film;
};