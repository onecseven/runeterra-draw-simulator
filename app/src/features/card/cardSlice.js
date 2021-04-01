import { createSlice } from "@reduxjs/toolkit"

export const cardSlice = createSlice({
  name: "card",
  initialState: {
    selectedCard: null,
  },
  reducers: {
    selectCard: (state, action) => {
      state.selectedCard = action.payload
      return state
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectCard } = cardSlice.actions

export default cardSlice.reducer
