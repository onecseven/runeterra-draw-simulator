import { Action, createSlice } from "@reduxjs/toolkit"
import { isKeyword } from "../features/utils/typeGuards"

let initialMulliganQuery: MulliganQuery = {
  referent: null,
  priority: 1,
  onHit: {
    action: "KEEP_ALL",
    condition: "ALWAYS",
    referenceCard: null,
  },
}

let initialTagQuery = {
  type: null,
  turn: 1,
  referents: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    keyword: null
    },
  groupName: null
}

type notif = "SUCCESS" | "FAILURE" | null
let notification: notif = null 

type deckInputNotif = "SUCCESS" | "FAILURE" | null
let deckInputNotif: deckInputNotif = null

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mulliganQuery: initialMulliganQuery,
    tagQuery: initialTagQuery,
    tagQueryBuilder: {
      amountOfReferents: 0
    },
    notification,
    deckInputNotif,
    spinner: true
  },
  reducers: {
    setMulliganAction: (state, action: Actions.UI.setMulliganAction) => {
      let mulliganAction = action.payload
      state.mulliganQuery.onHit.action = mulliganAction
    },
    setMulliganCondition: (state, action: Actions.UI.setMulliganCondition) => {
      let mulliganCondition = action.payload
      state.mulliganQuery.onHit.condition = mulliganCondition
    },
    setMulliganReferent: (state, action: Actions.UI.setMulliganReferent) => {
      let mulliganReferent = action.payload
      state.mulliganQuery.referent = mulliganReferent
    },
    setMulliganReference: (state, action: Actions.UI.setMulliganReference) => {
      let mulliganReference = action.payload
      state.mulliganQuery.onHit.referenceCard = mulliganReference
    },
    clearUI: (state, action: Actions.UI.clearUI) => {
      state.mulliganQuery = initialMulliganQuery
      state.tagQuery = initialTagQuery
      state.notification = null
    },
    setTagType: (state, action: Actions.UI.setTagType) => {
      state.tagQuery.type = action.payload
    },
    setTagTurns: (state, action: Actions.UI.setTagTurns) => {
      state.tagQuery.turn = action.payload
    },
    setTagReferents: (state, action: Actions.UI.setTagReferents) => {
      let { index, code } = action.payload
      if (Number.isInteger(index)) {
        state.tagQuery.referents[index] = code
      } else if (isKeyword(String(index))) {
        state.tagQuery.groupName = index
        if (Array.isArray(action.payload.code)){
          action.payload.code.forEach((cardCode, index) => {
            if (index < 5) {
              state.tagQuery.referents[index] = cardCode
            }
          })
        }
      }
    },
    setAmountTagReferents: (state, action: Actions.UI.setAmountTagReferents) => {
      state.tagQueryBuilder.amountOfReferents = action.payload
    },
    setNotificationSuccess: (state, action: Actions.UI.notificationSuccess) => {
      state.notification = "SUCCESS"
      setTimeout(() => {
        action.asyncDispatch({type:"ui/setNotificationNeutral", payload: null})
      }, 3000)
    },
    setNotificationFailure: (state, action: Actions.UI.notificationFailure) => {
      state.notification = "FAILURE"
      setTimeout(() => {
        action.asyncDispatch({type:"ui/setNotificationNeutral", payload: null})
      }, 3000)
    },
    setNotificationNeutral:  (state, action: Actions.UI.notificationNeutral) => {
      state.notification = null
    },
    setDeckInputSuccess: (state, action: Actions.UI.deckInputSuccess) => {
      state.deckInputNotif = "SUCCESS"
      setTimeout(() => {
        action.asyncDispatch({type:"ui/setDeckInputNeutral", payload: null})
      }, 3000)
    },
    setDeckInputFailure: (state, action: Actions.UI.deckInputFailure) => {
      state.deckInputNotif = "FAILURE"
      setTimeout(() => {
        action.asyncDispatch({type:"ui/setDeckInputNeutral", payload: null})
      }, 3000)
    },
    setDeckInputNeutral:  (state, action: Actions.UI.deckInputNeutral) => {
      state.deckInputNotif = null
    },
    setSpinnerOn: (state, action: Actions.UI.setSpinnerOn) => {
      state.spinner = true
    },
    setSpinnerOff: (state, action: Actions.UI.setSpinnerOff) => {
      state.spinner = false
    }
  },
})

export const {
  setMulliganAction,
  setMulliganCondition,
  setMulliganReferent,
  setMulliganReference,
  clearUI,
  setTagType,
  setTagTurns,
  setTagReferents,
  setAmountTagReferents,
  setNotificationSuccess,
  setNotificationFailure,
  setNotificationNeutral,
  setDeckInputFailure,
  setDeckInputNeutral,
  setDeckInputSuccess,
  setSpinnerOn,
  setSpinnerOff
} = uiSlice.actions

export default uiSlice.reducer
