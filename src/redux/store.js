import { configureStore } from '@reduxjs/toolkit'
import dbSliceReducer from './slice/dbSlice'
import paginationSliceReducer from './slice/paginationSlice'

export const store = configureStore({
  reducer: {
    db: dbSliceReducer,
    pagination: paginationSliceReducer,
  },
})