import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Movie } from '@/types'
import { likeMovieAction, dislikeMovieAction, deleteMovieAction } from '@/store/movieSlice'
import { AnyAction } from '@reduxjs/toolkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

interface Props {
  movie: Movie
}

const CardMovie = (props: Props): JSX.Element => {
  const { movie } = props
  const [likeRatio, setLikeRatio] = useState((movie.likes / (movie.likes + movie.dislikes)) * 100)
  const [dislikeRatio, setDislikeRatio] = useState(
    (movie.dislikes / (movie.likes + movie.dislikes)) * 100,
  )
  const [isLiked, setIsLiked] = useState(movie.isLiked)
  const [isDisliked, setIsDisliked] = useState(movie.isDisliked)
  const dispatch = useDispatch()

  const deleteMovie = (id: string): AnyAction => {
    return deleteMovieAction(id)
  }

  const likeMovie = (value: number): AnyAction => {
    return likeMovieAction({
      id: movie.id,
      value,
      removePreviousDislike: isDisliked,
    })
  }

  const dislikeMovie = (value: number): AnyAction => {
    return dislikeMovieAction({
      id: movie.id,
      value,
      removePreviousLike: isLiked,
    })
  }

  const handleLike = (): void => {
    if (isDisliked) setIsDisliked(false)
    if (!isLiked) {
      dispatch(likeMovie(1))
      setIsLiked(true)
    } else {
      dispatch(likeMovie(-1))
      setIsLiked(false)
    }
  }

  const handleDislike = (): void => {
    if (isLiked) setIsLiked(false)
    if (!isDisliked) {
      dispatch(dislikeMovie(1))
      setIsDisliked(true)
    } else {
      dispatch(dislikeMovie(-1))
      setIsDisliked(false)
    }
  }

  useEffect(() => {
    setLikeRatio((movie.likes / (movie.likes + movie.dislikes)) * 100)
    setDislikeRatio((movie.dislikes / (movie.likes + movie.dislikes)) * 100)
  }, [movie.likes, movie.dislikes])

  return (
    <div className="w-96 p-6 sm:mr-4 my-2 ml-0 bg-black rounded text-yellow-400 shadow-sm">
      <h1 className="font-bold">{movie.title}</h1>
      <h2 className="text-white">{movie.category}</h2>
      <div className="mt-8 flex flex-row justify-between">
        <button
          onClick={() => dispatch(deleteMovie(movie.id))}
          className="bg-red-500 p-1.5 rounded text-sm h-10 my-auto text-white"
        >
          Supprimer
        </button>
        <div className="w-24">
          <div className="w-full flex flex-row justify-between text-white">
            <button
              className={`w-5 h-5 transition-all duration-200 ${isLiked ? 'text-yellow-500' : ''}`}
              onClick={() => handleLike()}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button
              className={`w-5 h-5 transition-all duration-200 ${
                isDisliked ? 'text-yellow-500' : ''
              }`}
              onClick={() => handleDislike()}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
          <div>
            <div className="w-full flex flex-row justify-between pt-2 text-white rounded">
              <span
                className={`rounded-l-sm bg-yellow-400 h-1 transition-all duration-200 ${
                  movie.dislikes === 0 ? 'rounded-r-sm' : ''
                }`}
                style={{ width: `${likeRatio}%` }}
              ></span>
              <span
                className={`rounded-r-sm bg-slate-500 h-1 transition-all duration-200 ${
                  movie.dislikes === 0 ? 'rounded-l-sm' : ''
                }`}
                style={{ width: `${dislikeRatio}%` }}
              ></span>
            </div>
            <div className="flex flex-row justify-between text-white">
              <span>{movie.likes}</span>
              <span>{movie.dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardMovie
