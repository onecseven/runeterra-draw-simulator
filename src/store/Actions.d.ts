declare namespace Actions {
  type addDeck = {
    type: "data/addDeck"
    payload: {
      code: string
    }
  }
  type addMulligan = {
    type: "data/addMulligan"
    payload: {
      mulliganAction: mulliganAction
      condition: mulliganCondition
      referent: Card["code"]
      reference: Card["code"]
    }
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
}
