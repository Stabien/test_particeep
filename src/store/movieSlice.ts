import { State, MovieLikeData, Movie } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    isLoaded: false,
  },
  reducers: {
    fillMoviesAction: (state: State, action: PayloadAction<Movie[]>): void => {
      state.movies = action.payload
      state.isLoaded = true
    },
    deleteMovieAction: (state: State, action: PayloadAction<string>): void => {
      state.movies = state.movies.filter((item) => item.id !== action.payload)
    },
    likeMovieAction: (state: State, action: PayloadAction<MovieLikeData>): void => {
      state.movies.map((movie) => {
        if (movie.id === action.payload.id) {
          if (action.payload.removePreviousDislike as boolean) {
            movie.dislikes -= 1
          }
          movie.likes += action.payload.value
        }
        return movie
      })
    },
    dislikeMovieAction: (state: State, action: PayloadAction<MovieLikeData>): void => {
      state.movies.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.removePreviousLike as boolean) {
            item.likes -= 1
          }
          item.dislikes += action.payload.value
        }
        return item
      })
    },
  },
})

export const { fillMoviesAction, deleteMovieAction, likeMovieAction, dislikeMovieAction } =
  movieSlice.actions
export default movieSlice.reducer
