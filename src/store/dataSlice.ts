import { createSlice } from "@reduxjs/toolkit"
import { deckCodeTranslation } from "../features/utils/Deck-Code-Lookup"
import { tagValidator } from "../features/utils/tagValidator"
import { validateMulligan } from "../features/utils/validateMulligan"
import {
  getNumberOfTurns,
  getMulliganedHands,
} from "../features/simulation/simulateMulligan"
import { countTags } from "../features/simulation/simulateCounter"
import { checkArrays } from "../features/utils/generic/array-equality"

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

let hands: hand[] = []

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
    addDeck: (state, action: Actions.addDeck) => {
      let { code } = action.payload
      //maybe have a verify clause here?
      let cards = deckCodeTranslation(code)
      state.deck.code = code
      state.deck.cards = cards
      return state
    },
    addMulligan: (state, action: Actions.addMulligan) => {
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
    removeMulligan: (state, action: Actions.removeMulligan) => {
      let { index } = action.payload
      state.mulliganQueries.splice(index, 1)
    },
    addTag: (state, action: Actions.addTag) => {
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
    runMulligan: (state, action: Actions.runMulligan) => {
      let { numberOfSimulations } = action.payload
      let hands = getMulliganedHands({
        deck: state.deck.cards,
        mulliganQueries: state.mulliganQueries,
        numberOfSimulations,
      })
      let numberOfTurns = getNumberOfTurns(state.tags.counters)
      let formattedHands = hands.map((hand) => hand.slice(0, numberOfTurns)).map((cards) => {
        return { cards, read: false }
      })
      state.simulations.hands = state.simulations.hands.concat(formattedHands)
    },
    runTags: (state, action: Actions.runTags) => {
      state.tags.counters = countTags({
        hands: state.simulations.hands,
        tags: state.tags.counters,
      })
    },
  },
})

export const {
  addDeck,
  addMulligan,
  addTag,
  runMulligan,
  runTags,
  removeMulligan,
} = dataSlice.actions

export default dataSlice.reducer
