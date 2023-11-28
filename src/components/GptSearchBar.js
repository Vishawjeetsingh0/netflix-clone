import React, { useRef } from "react";
import language from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    
  const dispatch = useDispatch();
    const languageKey = useSelector(store => store.config.language);
    const searchText = useRef(null);

    const searchMovieTMDB =async (movie) =>{
      const data = await fetch ("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",API_OPTIONS)
      const json = await data.json();

      return json.results;
    }

    const handleGptSearchClick = async()=>{

      const gptQuery = "Act as a Movie Recomendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Solay, Don, Golmaal, Koi Mil Gaya"
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if(!gptResults.choices){

      }
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

     const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

     const tmdbResults = await Promise.all(promiseArray);
       
     dispatch(addGptMovieResult({movieNames:gptMovies, movieResults:tmdbResults}))
    }

  return (
    <div className="md:pt-[13%] pt-[27%]  flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=> e.preventDefault()}>
        <input
        ref={searchText}
          type="text"
          className="p-2 md:m-4 md:p-4 m-3 col-span-9 rounded-lg"
          placeholder={language[languageKey]?.gptSearchplaceholder}
        />
        <button className=" col-span-3 md:m-4 m-3 pl-3 pb-1  px-4 bg-red-600 contrast-200 text-white rounded-lg" onClick={handleGptSearchClick}>
          {language[languageKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
