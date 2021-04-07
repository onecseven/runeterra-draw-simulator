import { createSlice } from "@reduxjs/toolkit"
import {deckCodeTranslation} from "./Deck-Code-Lookup.ts"


export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    code: "",
    cards: []
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

export const { remove, add, update } = deckSlice.actions

export default deckSlice.reducer