import { createSlice } from '@reduxjs/toolkit'

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    counter: 0,
  },
  reducers: {
    add: (state, action) => {
      state.counter += action.payload as number
    },
    sub: (state, action) => {
      state.counter -= action.payload as number
    },
  },
})

export default exampleSlice.reducer
