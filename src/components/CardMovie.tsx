import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Movie } from '@/types'
import { likeMovieAction, dislikeMovieAction, deleteMovieAction } from '@/store/movieSlice'
import { AnyAction } from '@reduxjs/toolkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

interface Props {
  data: Movie
}

const CardMovie = (props: Props): JSX.Element => {
  const [likeRatio, setLikeRatio] = useState(
    (props.data.likes / (props.data.likes + props.data.dislikes)) * 100,
  )
  const [dislikeRatio, setDislikeRatio] = useState(
    (props.data.dislikes / (props.data.likes + props.data.dislikes)) * 100,
  )
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const dispatch = useDispatch()

  const deleteMovie = (id: string): AnyAction => {
    return deleteMovieAction(id)
  }

  const likeMovie = (value: number): AnyAction => {
    return likeMovieAction({
      id: props.data.id,
      value,
      removePreviousDislike: isDisliked,
    })
  }

  const dislikeMovie = (value: number): AnyAction => {
    return dislikeMovieAction({
      id: props.data.id,
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
    setLikeRatio((props.data.likes / (props.data.likes + props.data.dislikes)) * 100)
    setDislikeRatio((props.data.dislikes / (props.data.likes + props.data.dislikes)) * 100)
  }, [props.data.likes, props.data.dislikes])

  return (
    <div className="w-96 p-6 sm:mr-4 my-2 ml-0 bg-black rounded text-yellow-400 shadow-sm">
      <h1 className="font-bold">{props.data.title}</h1>
      <h2 className="text-white">{props.data.category}</h2>
      <div className="mt-8 flex flex-row justify-between">
        <button
          onClick={() => dispatch(deleteMovie(props.data.id))}
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
                className="bg-yellow-400 h-1 transition-all duration-200"
                style={{ width: `${likeRatio}%` }}
              ></span>
              <span
                className="bg-slate-500 h-1 transition-all duration-200"
                style={{ width: `${dislikeRatio}%` }}
              ></span>
            </div>
            <div className="flex flex-row justify-between text-white">
              <span>{props.data.likes}</span>
              <span>{props.data.dislikes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardMovie
