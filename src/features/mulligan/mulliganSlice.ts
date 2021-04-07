import { createSlice } from "@reduxjs/toolkit"

declare type mulliganAction = "KEEP" | "THROW"
declare type mulliganCondition = "ALWAYS" | "PRESENCE" | "ABSENCE"

declare interface MulliganQuery {
  card: Card["code"]
  priority: number
  onHit: {
    action: mulliganAction,
    condition: mulliganCondition,
    referenceCards: Card["code"][]
  }
}

const queries: MulliganQuery[] = []


export const mulliganSlice = createSlice({
  name: "mulligan",
  initialState: {
    queries
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
