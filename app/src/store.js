import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "./features/card/cardSlice"
import deckReducer from "./features/deck/deckSlice"
import mulliganSlice from "./features/mulligan/mulliganSlice"

export default configureStore({
  reducer: {
    deck: deckReducer,
    card: cardSlice,
    mulligan: mulliganSlice,
    preloadedState: {
      deck: {
        cards: []
      },
    },
  },
})
