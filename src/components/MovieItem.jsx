/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import { createImageUrl } from '../services/movieServices';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import '.././MovieItem.css'

const MovieItem = ({movie}) => {

    const [like, setLike] = useState(false);

    const {title, backdrop_path, poster_path} = movie;


    const likeFunction = ()=> {
        if(like) {
            setLike(false)
        } else {
            setLike(true)
        }
    }

  return (
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2'>
        <img 
            className='w-full h-40 block object-cover object-top'
            src={createImageUrl(backdrop_path ?? poster_path, 'w500')} 
            alt={title} 
        />

        <div className='movie-container absolute top-0 left-0 w-full h-40 bg-black/80'>
            <p
             className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>
                {movie.title}
            </p>

            <p>
                {like ? (
                    <FaHeart
                     size={20}
                     className='absolute top-2 left-2 text-gray-300'
                     onClick={likeFunction}
                    />
                ) : (
                    <FaRegHeart
                     size={20}
                     className='absolute top-2 left-2 text-gray-300'
                     onClick={likeFunction}
                     />
                )}
            </p>
        </div>
      
    </div>
  )
}

export default MovieItem