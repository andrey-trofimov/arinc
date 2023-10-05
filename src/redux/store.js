import { configureStore } from '@reduxjs/toolkit'
import dbSliceReducer from './slice/dbSlice'

export const store = configureStore({
  reducer: {
    db: dbSliceReducer,
  },
})