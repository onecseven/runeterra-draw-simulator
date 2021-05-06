import { createSlice } from "@reduxjs/toolkit"
import { deckCodeTranslation } from "../features/utils/Deck-Code-Lookup"
import { tagValidator } from "../features/rules/tags/tagValidator"
import { validateMulligan } from "../features/rules/mulligan/validateMulligan"
import { runSimulation } from "../features/simulation/runSimulation"

export interface tagInitialState {
  counters: {
    [id: number]: {
      //should match Counter["id"]
      tag: Tag
      hits: Card["code"][][]
    }
  }
}

const tagInitialState: tagInitialState = {
  counters: {},
}

let hands: Card[][] = []

const mulliganInitialState: MulliganQuery[] = []

type deckInitialState = {
  code: string
  cards: Card[]
}

const deckInitialState: deckInitialState = {
  code: "",
  cards: [],
}

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    deck: {
      code: null,
      cards: [],
    },
    tags: tagInitialState,
    mulliganQueries: mulliganInitialState,
    simulations: {
      hands,
    },
  },
  reducers: {
    addDeck: (state, action) => {
      let { code } = action.payload
      //maybe have a verify clause here?
      let cards = deckCodeTranslation(code)
      state.deck.code = code
      state.deck.cards = cards
      return state
    },
    addMulligan: (state, action) => {
      const { mulliganAction, condition, referent, reference } = action.payload
      if (validateMulligan(referent, mulliganAction, condition, reference)) {
        let query = {
          referent,
          priority: 1,
          onHit: {
            action: mulliganAction,
            condition,
            referenceCard: reference,
          },
        }
        state.mulliganQueries.push(query)
      }
      return state
    },
    addTag: (state, action) => {
      let tag = tagValidator(action.payload, [])
      if (tag) {
        let id = Object.keys(state.tags.counters).length + 1
        state.tags.counters[id] = {
          tag,
          hits: [],
        }
        return state
      }
    },
    runSim: (state, action) => {
      let { numberOfSimulations } = action.payload
      let trimmedHands = runSimulation({
        deck: state.deck.cards,
        mulliganQueries: state.mulliganQueries,
        tags: state.tags.counters,
        numberOfSimulations,
      })
      state.simulations.hands = trimmedHands
    },
  },
})

export const { addDeck, addMulligan, addTag, runSim} = dataSlice.actions

export default dataSlice.reducer

/*
TODO remove action for tags
TODO remove action for mulligans
DONE update selectors to use new paths for data
DONE update store to use this slice
*/
