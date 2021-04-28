import { configureStore, ThunkAction, Action, } from "@reduxjs/toolkit"
import cardSlice from "../features/card/cardSlice"
import deckReducer from "../features/deck/deckSlice"
import mulliganSlice from "../features/rules/mulligan/mulliganSlice"
import tagSlice from "../features/rules/tags/tagSlice"
import  simulationSlice from "../features/simulation/simulationSlice"


export const store =  configureStore({
  reducer: {
    deck: deckReducer,
    card: cardSlice,
    mulligan: mulliganSlice,
    tags: tagSlice,
    simulations: simulationSlice
  },
  middleware: []
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
