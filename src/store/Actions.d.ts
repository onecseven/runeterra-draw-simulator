
declare type action = {
  type: string
  payload: any
}

declare namespace Actions {
  declare namespace data {
    type addDeck = {
      type: "data/addDeck"
      payload: {
        code: string
      }
    }
    type addMulligan = {
      type: "data/addMulligan"
      payload: MulliganQuery
      asyncDispatch: (action: action) => any
    }
    type removeMulligan = {
      type: "data/removeMulligan"
      payload: {
        index: number
      }
    }
    type removeTag = {
      type: "data/removeTag"
      payload: {
        index: number
      }
    }
    type addTag = {
      type: "data/addTag"
      payload: {
        type: TagType
        turn: number
        referents?: Card["code"][]
        groupName?: string
      }
      asyncDispatch: (action: action) => any
    }
    type runMulligan = {
      type: "data/runMulligan"
      payload: {
        numberOfSimulations: number
      }
    }
    type runTags = {
      type: "data/runTags"
      payload: {}
    }
  }
  declare namespace UI {
    type setMulliganAction = {
      type: "ui/setMulliganaction"
      payload: mulliganAction
    }
    type setMulliganCondition = {
      type: "ui/setMulliganCondition"
      payload: mulliganCondition
    }
    type setMulliganReferent = {
      type: "ui/setMulliganReferent"
      payload: Card["code"]
    }
    type setMulliganReferent = {
      type: "ui/setMulliganReferent"
      payload: Card["code"]
    }
    type setMulliganReference = {
      type: "ui/setMulliganReference"
      payload: Card["code"]
    }
    type clearUI = {
      type: "ui/clearUI"
      payload: null
    }
    type setTagType = {
      type: "ui/setTagType"
      payload: TagType
    }
    type setTagReferents = {
      type: "ui/addTagReferents"
      payload: {
        code: Card["code"] | Card["code"][]
        index: number | "keyword"
      }
    }
    type setTagTurns = {
      type: "ui/setTagTurns"
      payload: number
    }
    type setAmountTagReferents = {
      type: "ui/setAmountTagReferents"
      payload: number
    }
    type switchTab = {
      type: "ui/switchTab",
      payload: null
    }
    type notificationSuccess = {
      type: "ui/notificationSuccess"
      payload: null
      asyncDispatch: (action: action) => any
    }
    type notificationFailure = {
      type: "ui/notificationFailure"
      payload: null
      asyncDispatch: (action: action) => any
    }
  }
}
