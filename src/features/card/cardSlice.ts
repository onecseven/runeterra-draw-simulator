import { createSlice } from "@reduxjs/toolkit"

type initialState = {
  selectedCard: Card | null
}

const initialState: initialState = {
  selectedCard: null
}

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    selectCard: (state, action) => {
      state.selectedCard = action.payload
      return state
    },
    clearSelection: (state,action) => {
      state.selectedCard = null
      return state
    }
  },
})

export const { selectCard, clearSelection } = cardSlice.actions

export default cardSlice.reducer
