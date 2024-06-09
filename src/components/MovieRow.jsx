import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import axios from 'axios';
import MovieItem from './MovieItem';
import { FaTimes } from 'react-icons/fa';
const key = import.meta.env.VITE_TMDB_KEY;


// eslint-disable-next-line react/prop-types
const MovieRow = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState('');

  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}`);
      const trailers = response.data.results;
      if (trailers.length > 0) {
        const youtubeTrailer = trailers.find(trailer => trailer.site === 'YouTube');
        if (youtubeTrailer) {
          setTrailerId(youtubeTrailer.key);
        }
      }
    } catch (error) {
      console.error('Failed to fetch the trailer', error);
    }
  };

  const handleCloseTrailer = () => {
    setTrailerId(null);
  };

  return (
    <>
      <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>{title}</h2>
      <div className='relative flex items-center'>
        <div id='slider' className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} fetchTrailer={fetchTrailer} />
          ))}
        </div>
      </div>
      {trailerId && (
        <div className="relative w-full flex justify-center items-center">
          <div className="absolute top-0 right-0 p-2">
            <FaTimes
              size={30}
              className="text-white cursor-pointer"
              onClick={handleCloseTrailer}
            />
          </div>
          <div className="w-full">
            <Youtube opts={opts} videoId={trailerId} />
          </div>
        </div>
      )}
    </>
  );
};

export default MovieRow;
