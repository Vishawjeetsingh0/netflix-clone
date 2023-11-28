import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name:"movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
    },
    reducers: {
        addNowPlayingMovies : (state, action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies : (state, action)=>{
            state.nowPopularMovies = action.payload;
        },
        addUpcomingMovies : (state, action)=>{
            state.nowUpcomingMovies = action.payload;
        },
        addTopRatedMovies : (state, action)=>{
            state.nowTopRatedMovies = action.payload;
        },
        addTVSeries : (state, action)=>{
            state.nowTVSeries = action.payload;
        },
        addTrailerVideo: (state,action)=>{
            state.trailerVideo = action.payload;
        },
        addTrailer: (state,action)=>{
            state.trailer = action.payload;
        },
        addMovieDetail:(state,action)=>{
            state.movieDetail = action.payload;
        },
        addCast:(state,action)=>{
            state.castDetail = action.payload;
        }
        
    }
});

export const {addNowPlayingMovies, addTrailerVideo, addPopularMovies, addUpcomingMovies, addTopRatedMovies, addTVSeries, addTrailer, addMovieDetail, addCast} = moviesSlice.actions;

export default moviesSlice.reducer;