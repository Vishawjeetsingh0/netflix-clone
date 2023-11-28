import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCast, addMovieDetail, addTrailer } from "../utils/moviesSlice";
import { IMG_CDN_URL } from "../utils/constants";

const Check = () => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  console.log("v ki value", searchParams.get("v"));

  const getTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        searchParams.get("v") +
        "/videos?language=en-US",
      API_OPTIONS
    );

    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailer(trailer));
  };

  useEffect(() => {
    getTrailer();
    getDetails();
    getCastDetail();
  }, []);

  const trailerData = useSelector((store) => store.movies.trailer);
 

  const getDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + searchParams.get("v"),
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addMovieDetail(json));
    console.log("detail", json);
  };

  const MovieDetail = useSelector((store) => store.movies.movieDetail);

 

  const getCastDetail = async()=>{
    const data = await fetch("https://api.themoviedb.org/3/movie/"+ searchParams.get("v")+"/credits",API_OPTIONS)
    const json = await data.json()
    dispatch(addCast(json));
    console.log("cast data ", json);
  }

  const Cast = useSelector((store) => store.movies.castDetail)

  const director = Cast?.crew.filter((f)=>  f.job==="Director")
  const writer = Cast?.crew.filter((f)=>  f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")
  console.log("writer",writer);

  // if(!trailerData?.key) return !<iframe></iframe>;

  return ( 
    
  <>
    {trailerData?.key ? 
    <div className=" bg-black text-white">
   
        <iframe
  
          className="w-full aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            trailerData?.key +
            "?&autoplay=1&loop=1&playlist=" +
            trailerData?.key
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
       <div className="md:flex p-[30px]">
          <div className="md:pl-[80px] md:pr-[80px] mr-[15px]  ">
            <img className="w-56 mb-5 md:mb-0 rounded-lg  md:w-[550px] md:h-[700px] justify-center align-middle m-auto"
              alt="backgroundimage"
              src={IMG_CDN_URL + MovieDetail?.poster_path}
            />
          </div>
          <div className="md:w-[780px]  md:mr-[95px]">
            <div className="md:text-6xl text-2xl flex text-yellow-400">
              {MovieDetail?.original_title} (
              {new Date(MovieDetail?.release_date).getFullYear()})
            </div>
            <div className="text-yellow-400 text-sm md:text-none mb-3">{MovieDetail?.tagline}</div>
            
            <div className="flex"><span className="text-xl  text-white mt-3">IMDB Rating : </span><div className="mt-2 ml-2"><p className=" bg-yellow-400 text-black font-bold w-12 h-12 text-center pt-2 border border-yellow-400  rounded-[100%]">{MovieDetail?.vote_average.toFixed(1)}</p></div></div>
            <div>
              <h1 className="text-xl  text-white mt-3 mb-3">Overview :</h1>
              <div className="text-sm md:w-[65%]">{MovieDetail?.overview}</div>
            </div>
            <div className="md:flex mt-7 mb-3">
              <div className="flex md:flex-none">
                <span className=" text-white">Status :</span>
                <div className="md:text-xl w-56  ml-2 md:ml-0 text-gray-400 brightness-105 "> {MovieDetail?.status}</div>
              </div>

              <div className="flex md:flex-none">
                <span className=" text-white">Release Date :</span>
                <div className="md:text-xl md:w-56 ml-2 md:ml-0 text-gray-400 brightness-105 "> {MovieDetail?.release_date}</div>
              </div>

              <div className="flex md:flex-none">
                <span className=" text-white">Runtime :</span>
                <div className="md:text-xl w-56  ml-2 md:ml-0 text-gray-400 brightness-105 ">{Math.floor((MovieDetail?.runtime)/60)}h {Math.floor((MovieDetail?.runtime)%60)}m</div>
              </div>
              
              </div>

             {director?.length > 0 && (
              <div className=" mt-7 text-white border border-t-gray-600 border-b-gray-600 pt-2 pb-2 border-r-0 border-l-0">
                <span className="mr-2" >
                  Director  :  {"  "}
                </span>
                <span className="text-gray-400">
                  {director?.map((d,i)=>(
                    <span key={i}>
                      {d.name}
                      {director.length -1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
             )}

              {writer?.length > 0 && (
              <div className="  text-white border border-t-0 border-b-gray-600 pt-2 pb-2 border-r-0 border-l-0">
                <span  className="mr-2">
                  Writer  :  {"  "}
                </span>
                <span className="text-gray-400">
                  {writer?.map((d,i)=>(
                    <span key={i}>
                      {d.name}
                      {writer.length -1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
             )}
          <h1 className="text-semibold text-xl mt-3">Top Cast</h1>
           <div className="overflow-x-scroll no-scrollbar">
            
            <span className="flex w-[2000px] ">
              {Cast?.cast.map((item) => {
                if(!item.profile_path) return null;
                return(
                  <div  className="" key={item.id}>
                    <div >
                      <div className="p-3  w-[100px]"><img className="h-[85px] rounded-full" alt="profile_image" src={IMG_CDN_URL + item.profile_path}/></div>
                      <div className="w-[90px] text-[10px] m-auto">{item.name}</div>
                      <div className="text-[12px] w-[50px] h-[20px] overflow-clip text-gray-400 m-auto">{item.character}</div>
                    </div>
                  </div>
                )
              })}
            </span>
           </div>
          </div>
        </div> 
      </div> : <div className="md:flex p-[30px]">
          <div className="md:pl-[80px] md:pr-[80px] mr-[15px]  ">
            <img className="rounded-lg  md:w-[550px] md:h-[700px] justify-center align-middle m-auto"
              alt="backgroundimage"
              src={IMG_CDN_URL + MovieDetail?.poster_path}
            />
          </div>
          <div className="md:w-[780px]  md:mr-[95px]">
            <div className="md:text-6xl text-2xl flex text-yellow-400">
              {MovieDetail?.original_title} (
              {new Date(MovieDetail?.release_date).getFullYear()})
            </div>
            <div className="text-yellow-400 text-sm md:text-none mb-3">{MovieDetail?.tagline}</div>
            
            <div className="flex"><span className="text-xl  text-white mt-3">IMDB Rating : </span><div className="mt-2 ml-2"><p className=" bg-yellow-400 text-black font-bold w-12 h-12 text-center pt-2 border border-yellow-400  rounded-[100%]">{MovieDetail?.vote_average.toFixed(1)}</p></div></div>
            <div>
              <h1 className="text-xl  text-white mt-3 mb-3">Overview :</h1>
              <div className="text-sm md:w-[65%]">{MovieDetail?.overview}</div>
            </div>
            <div className="md:flex mt-7 mb-3">
              <div className="flex md:flex-none">
                <span className=" text-white">Status :</span>
                <div className="md:text-xl w-56  ml-2 md:ml-0 text-gray-400 brightness-105 "> {MovieDetail?.status}</div>
              </div>

              <div className="flex md:flex-none">
                <span className=" text-white">Release Date :</span>
                <div className="md:text-xl md:w-56 ml-2 md:ml-0 text-gray-400 brightness-105 "> {MovieDetail?.release_date}</div>
              </div>

              <div className="flex md:flex-none">
                <span className=" text-white">Runtime :</span>
                <div className="md:text-xl w-56  ml-2 md:ml-0 text-gray-400 brightness-105 ">{Math.floor((MovieDetail?.runtime)/60)}h {Math.floor((MovieDetail?.runtime)%60)}m</div>
              </div>
              
              </div>

             {director?.length > 0 && (
              <div className=" mt-7 text-white border border-t-gray-600 border-b-gray-600 pt-2 pb-2 border-r-0 border-l-0">
                <span className="mr-2" >
                  Director  :  {"  "}
                </span>
                <span className="text-gray-400">
                  {director?.map((d,i)=>(
                    <span key={i}>
                      {d.name}
                      {director.length -1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
             )}

              {writer?.length > 0 && (
              <div className="  text-white border border-t-0 border-b-gray-600 pt-2 pb-2 border-r-0 border-l-0">
                <span  className="mr-2">
                  Writer  :  {"  "}
                </span>
                <span className="text-gray-400">
                  {writer?.map((d,i)=>(
                    <span key={i}>
                      {d.name}
                      {writer.length -1 !== i && ", "}
                    </span>
                  ))}
                </span>
              </div>
             )}
          <h1 className="text-semibold text-xl mt-3">Top Cast</h1>
           <div className="overflow-x-scroll no-scrollbar">
            
            <span className="flex w-[2000px] ">
              {Cast?.cast.map((item) => {
                if(!item.profile_path) return null;
                return(
                  <div  className="" key={item.id}>
                    <div >
                      <div className="p-3  w-[100px]"><img className="h-[85px] rounded-full" alt="profile_image" src={IMG_CDN_URL + item.profile_path}/></div>
                      <div className="w-[90px] text-[10px] m-auto">{item.name}</div>
                      <div className="text-[12px] w-[50px] h-[20px] overflow-clip text-gray-400 m-auto">{item.character}</div>
                    </div>
                  </div>
                )
              })}
            </span>
           </div>
          </div>
        </div> }
    </>
  );
};

export default Check;
