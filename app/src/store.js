import { configureStore } from "@reduxjs/toolkit"
import  deckReducer from "./features/deck-code/deckSlice"
export default configureStore({
  reducer: {
    deck: deckReducer,
    preloadedState: {
      deck: "",
    },
  },
})
