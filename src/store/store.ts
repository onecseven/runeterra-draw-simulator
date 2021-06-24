import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit"
import dataSlice from "./dataSlice"
import uiSlice  from "./uiSlice"
import {asyncDispatchMiddleware} from "./naughty-middleware"
export const store = configureStore({
  reducer: {
    data: dataSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) => {
    let middlewareArray = getDefaultMiddleware()
    middlewareArray.push(asyncDispatchMiddleware)
    return [asyncDispatchMiddleware]
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
