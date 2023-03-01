import { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import '../styles/CardMovie.css'
import likeButton from '../assets/like_button.png'
import dislikeButton from '../assets/dislike_button.png'
import { Movie, State } from '@/types'
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
    setLikeRatio((props.data.likes / (props.data.likes + props.data.dislikes)) * 100)
    setDislikeRatio((props.data.dislikes / (props.data.likes + props.data.dislikes)) * 100)
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
    setLikeRatio((props.data.likes / (props.data.likes + props.data.dislikes)) * 100)
    setDislikeRatio((props.data.dislikes / (props.data.likes + props.data.dislikes)) * 100)
  }

  return (
    <div className="itemMovie">
      <h1>{props.data.title}</h1>
      <h2>{props.data.category}</h2>
      <div className="bottom-container">
        <button onClick={() => dispatch(deleteMovie(props.data.id))} className="delete">
          Supprimer
        </button>
        <div className="rating">
          <div className="rating-buttons">
            <button onClick={() => handleLike()}>
              <img src={likeButton} alt="like" />
            </button>
            <button onClick={() => handleDislike()}>
              <img src={dislikeButton} alt="dislike" />
            </button>
          </div>
          <div className="rating-bar">
            <span className="like-rating" style={{ width: `${likeRatio} %` }}></span>
            <span className="dislike-rating" style={{ width: `${dislikeRatio} %` }}></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((state: State) => {
  return {
    movies: state.movies,
  }
})(CardMovie)
