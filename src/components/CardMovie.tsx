import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import likeButton from '@/assets/like_button.png'
import dislikeButton from '@/assets/dislike_button.png'
import { Movie } from '@/types'
import { likeMovieAction, dislikeMovieAction, deleteMovieAction } from '@/store/movieSlice'
import { AnyAction } from '@reduxjs/toolkit'

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
    <div className="w-96 p-6 mr-4 my-2 ml-0 bg-blue-500 rounded text-white">
      <h1 className="font-bold">{props.data.title}</h1>
      <h2>{props.data.category}</h2>
      <div className="bottom-container mt-8 flex flex-row justify-between">
        <button
          onClick={() => dispatch(deleteMovie(props.data.id))}
          className="bg-red-500 p-1.5 rounded text-sm"
        >
          Supprimer
        </button>
        <div className="w-24 rating">
          <div className="w-full flex flex-row justify-between">
            <button className="w-5 h-5" onClick={() => handleLike()}>
              <img src={likeButton} alt="like" />
            </button>
            <button className="w-5 h-5" onClick={() => handleDislike()}>
              <img src={dislikeButton} alt="dislike" />
            </button>
          </div>
          <div className="w-full flex flex-row justify-between rating-bar pt-2">
            <span className="bg-yellow-300 h-1" style={{ width: `${likeRatio}%` }}></span>
            <span className="bg-black h-1" style={{ width: `${dislikeRatio}%` }}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardMovie
