import { createSlice } from "@reduxjs/toolkit"



export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deck: ""
  },
  reducers: {
    add: (state, action) => {
      let {code} = action.payload
      //maybe have a verify clause here?
      state.deck = code
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