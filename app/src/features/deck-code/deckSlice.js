import { createSlice } from "@reduxjs/toolkit"
import {deckCodeTranslation} from "../../../../dist/features/data-dragon/Deck-Code-Lookup"


export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    code: "",
    cards: null
  },
  reducers: {
    add: (state, action) => {
      let {code} = action.payload
      //maybe have a verify clause here?
      let cards = deckCodeTranslation(code)
      state.code = code
      state.cards = cards
      return state
        },
    remove: (state, action) => {
      return state
    },
    update: (state, action) => {
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const { remove, add, update } = deckSlice.actions

export default deckSlice.reducer