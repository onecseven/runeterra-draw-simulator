import { createSlice } from "@reduxjs/toolkit"

let initialMulliganQuery: MulliganQuery = {
  referent: null,
  priority: 1,
  onHit: {
    action: "KEEP_ALL",
    condition: "ALWAYS",
    referenceCard: null
  }
}

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mulliganQuery: initialMulliganQuery,
    tagQuery: {
    },
  },
  reducers: {
    setMulliganAction: (state, action: Actions.setMulliganAction) => {
      let mulliganAction = action.payload
      state.mulliganQuery.onHit.action = mulliganAction
    },
    setMulliganCondition: (state, action: Actions.setMulliganCondition) => {
      let mulliganCondition = action.payload
      state.mulliganQuery.onHit.condition = mulliganCondition
    },
    setMulliganReferent: (state, action: Actions.setMulliganReferent) => {
      let mulliganReferent = action.payload
      state.mulliganQuery.referent = mulliganReferent
    },
    setMulliganReference: (state, action: Actions.setMulliganReference) => {
      let mulliganReference = action.payload
      state.mulliganQuery.onHit.referenceCard = mulliganReference
    }
  }
})

export const {
  setMulliganAction,
  setMulliganCondition,
  setMulliganReferent,
  setMulliganReference
} = uiSlice.actions

export default uiSlice.reducer
