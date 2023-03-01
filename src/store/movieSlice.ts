import { State, MovieLikeData } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
  },
  reducers: {
    fillMoviesAction: (state: State, action): void => {
      state.movies = action.payload.movies
    },
    deleteMovieAction: (state: State, action: PayloadAction<string>): void => {
      state.movies = state.movies.filter((item) => item.id !== action.payload)
    },
    likeMovieAction: (state: State, action: PayloadAction<MovieLikeData>): void => {
      state.movies = state.movies.map((item) => {
        if (item.id === action.payload.id)
          if (action.payload.removePreviousDislike) item.dislikes -= 1
        item.likes += action.payload.value
        return item
      })
    },
    dislikeMovieAction: (state: State, action: PayloadAction<MovieLikeData>): void => {
      state.movies = state.movies.map((item) => {
        if (item.id === action.payload.id) if (action.payload.removePreviousLike) item.likes -= 1
        item.dislikes += action.payload.value
        return item
      })
    },
  },
})

export const { fillMoviesAction, deleteMovieAction, likeMovieAction, dislikeMovieAction } =
  movieSlice.actions
export default movieSlice.reducer
