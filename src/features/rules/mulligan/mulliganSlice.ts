import { createSlice } from "@reduxjs/toolkit"

export const CONDITIONS: UIElementIterator[] = [
  { value: "ALWAYS", name: "Always" },
  { value: "PRESENCE", name: "In the presence of another card" },
  { value: "ABSENCE", name: "In the absence of another card" },
]

export const ACTIONS: UIElementIterator[] = [
  { value: "KEEP", name: "Keep" },
  { value: "THROW", name: "Throw" },
]


export const validateMulligan = (
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


export const ruleTranslator = (referent: Card["code"], action: mulliganAction, condition: mulliganCondition, referenceCard: Card["code"], deck: Card[]) => {
  let pastTense = (action: mulliganAction) => action === "KEEP" ? 'kept' : action === "THROW" ? "thrown" : null
  let fullReferent = deck.find(card => card.code == referent)
  let fullReference = deck.find(card => card.code == referenceCard)
  let ERROR_STRING = `Malformed query
referent: ${referent}
action: ${action}
condition: ${condition}
referenceCard: ${referenceCard}
`
  if (condition !== "ALWAYS" && !fullReference) throw new Error(ERROR_STRING)
  switch (condition){
    case "ALWAYS": 
      return `${fullReferent.name} will be ${pastTense(action)} every time.`
    case "ABSENCE":
      if (!fullReference) throw new Error(ERROR_STRING)
      return `${fullReferent.name} will be ${pastTense(action)} when ${fullReference.name} is not in the mulligan.`
    case "PRESENCE":
      if (!fullReference) throw new Error(ERROR_STRING)
      return `${fullReferent.name} will be ${pastTense(action)} when ${fullReference.name} is also in the mulligan.`
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
      const  {mulliganAction, condition, referent, reference} = action.payload
      if (validateMulligan(referent, mulliganAction, condition, reference)){
        let query = {
          referent,
          priority: 1,
          onHit: {
            action: mulliganAction,
            condition,
            referenceCard: reference
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
