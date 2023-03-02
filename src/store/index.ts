import { configureStore } from '@reduxjs/toolkit'
import movieSlice from './movieSlice'

const store = configureStore({
  reducer: movieSlice,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
