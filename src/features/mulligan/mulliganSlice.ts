import { createSlice } from "@reduxjs/toolkit"

export const CONDITIONS: Dropdown.option[] = [
  { value: "ALWAYS", name: "Always" },
  { value: "PRESENCE", name: "In the presence of another card" },
  { value: "ABSENCE", name: "In the absence of another card" },
]

export const ACTIONS: Dropdown.option[] = [
  { value: "KEEP", name: "Keep" },
  { value: "THROW", name: "Throw" },
]

declare interface MulliganQuery {
  referent: Card["code"]
  priority: number
  onHit: {
    action: mulliganAction,
    condition: mulliganCondition,
    referenceCards: Card["code"][]
  }
}

const validateMulligan = (
  card: Card["code"],
  action: mulliganAction,
  condition: mulliganCondition,
  reference: Card["code"]
): boolean => {
  if (card && action && condition) {
    if (condition != "ALWAYS" && reference) {
      return true
    } else if (condition == "ALWAYS") {
      return true
    } else {
      return false
    }
  } else return false
}

const queries: MulliganQuery[] = []


export const mulliganSlice = createSlice({
  name: "mulligan",
  initialState: {
    queries
  },
  reducers: {
    add: (state, action) => {
      const  {mulliganAction, condition, referent, reference} = action.payload
      if (validateMulligan(referent, mulliganAction, condition, reference)){
        let query = {
          referent,
          priority: 1,
          onHit: {
            action: mulliganAction,
            condition,
            referenceCards: [reference]
          }
        }
        state.queries.push(query)
      }
      return state
    },
  },
})

export const { add } = mulliganSlice.actions

export default mulliganSlice.reducer
