import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector(store => store.movies);
  console.log("movies", movies);

  return (
   movies.nowPlayingMovies && (<div className=' bg-black'>
    <div className='mt-0 md:-mt-64 relative z-20'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies.nowTopRatedMovies}/>
      <MovieList title={"Popular"} movies={movies.nowPopularMovies}/>
      <MovieList title={"Upcoming Movies"} movies={movies.nowUpcomingMovies}/>
      {/* <MovieList title={"TV Series"} movies={movies.nowTVSeries}/> */}
    </div>
    </div>
    )
  );
}

export default SecondaryContainer