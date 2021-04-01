import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "./features/card/cardSlice"
import  deckReducer from "./features/deck/deckSlice"
export default configureStore({
  reducer: {
    deck: deckReducer,
    card: cardSlice,
    preloadedState: {
      deck: "",
    },
  },
})
