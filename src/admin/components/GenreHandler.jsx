import { useEffect, useState } from "react";

export default function GenreHandler({genreNo}) {
    const [genres,setGenres] = useState(Array(genreNo).fill(""));
    
    let genreOpt = ["Adventure","Action","Animation","Biography","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Musical","Mystery","Romance","Sci-Fi","Sport","Thriller","War"]; 

    const handleChange = (index, value) => {
        const updated = [...genres];
        updated[index] = value;
        setGenres(updated);
    }
    
    useEffect(() => {
        // Whenever genreNo changes, update genres array
        // prevGenres is the already existing state
        setGenres((prevGenres) => {
            const newGenres = [...prevGenres];

            if (genreNo > prevGenres.length) {
            // Add more empty strings
            return [...newGenres, ...Array(genreNo - prevGenres.length).fill("")];
            } else {
            // Trim to new length
            return newGenres.slice(0, genreNo);
            }
        });
    }, [genreNo]);
    return(
        <>
            {genres.map((genre,index) => {
                // Compute options available for this dropdown
                const usedGenres = genres.filter((_, i) => i !== index);
                const availableOptions = genreOpt.filter((option) => !usedGenres.includes(option) || option === genre);

                return(

                    <div key={index}>
                        <label htmlFor="genre">Film Genre:</label>
                        <select name="genre[]" required   onChange={(e) => handleChange(index,e.target.value)}>
                            
                            <option value=""></option>
                            {availableOptions.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}

                        </select>
                        
                    </div>
                );
            })}
        </>
    );
}