import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import cardSlice from "../features/card/cardSlice"
import simulationSlice from "../features/simulation/simulationSlice"
import dataSlice from "./dataSlice"

export const store = configureStore({
  reducer: {
    data: dataSlice,
    card: cardSlice,
    simulations: simulationSlice,
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
