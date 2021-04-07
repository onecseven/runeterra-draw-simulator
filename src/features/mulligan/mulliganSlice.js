import { createSlice } from "@reduxjs/toolkit"

/*
declare interface MulliganQuery {
  card: [number]
  priority: number
  onHit: {
    action: KEEP THROW
    Condition = "ALWAYS" | "PRESENCE" | "ABSENCE"
    referenceCards: number[]
  }
}
*/

export const mulliganSlice = createSlice({
  name: "mulligan",
  initialState: {
    queries: [],
  },
  reducers: {
    add: (state, action) => {
      state.queries.push(action.payload)
      return state
    },
  },
})

export const { add } = mulliganSlice.actions

export default mulliganSlice.reducer
