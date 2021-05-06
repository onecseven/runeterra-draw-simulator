import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import cardSlice from "../features/card/cardSlice"
import dataSlice from "./dataSlice"

export const store = configureStore({
  reducer: {
    data: dataSlice,
    card: cardSlice,
  },
  middleware: [],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
