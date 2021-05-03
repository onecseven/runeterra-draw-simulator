import { createSlice } from "@reduxjs/toolkit"
import {deckCodeTranslation} from "../utils/Deck-Code-Lookup"

type initialState = {
  code: string,
  cards: Card[]
}

const initialState: initialState= {
  code: "",
  cards: []
}

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    add: (state, action) => {
      let {code} = action.payload
      //maybe have a verify clause here?
      let cards = deckCodeTranslation(code)
      state.code = code
      state.cards = cards
      return state
        },
  },
})

export const { add } = deckSlice.actions

export default deckSlice.reducer