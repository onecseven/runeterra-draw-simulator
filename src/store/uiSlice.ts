import { createSlice } from "@reduxjs/toolkit"
import { stat } from "node:fs"

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
      let {mulliganAction} = action.payload
      state.mulliganQuery.onHit.action = mulliganAction
    }
  }
})

export const {
  setMulliganAction
} = uiSlice.actions

export default uiSlice.reducer
