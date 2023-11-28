import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { background_img } from '../utils/constants'

const GptSearch = () => {
  return (
    
      <>
       <div className='fixed -z-10 '>
      <img 
          className='h-screen object-cover md:w-screen'
          src={background_img}
          alt="background_image"
        />
      </div> 
      <div className=''>
      <GptSearchBar/>
      <GptMovieSuggestion/>
      </div>
      </>
    
  )
}

export default GptSearch