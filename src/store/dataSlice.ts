import { createSlice } from "@reduxjs/toolkit"
import { deckCodeTranslation } from "../features/utils/Deck-Code-Lookup"
import { tagValidator } from "../features/utils/tagValidator"
import { validateMulligan } from "../features/utils/validateMulligan"
import { getNumberOfTurns, getMulliganedHands } from "../features/simulation/simulateMulligan"
import { countTags } from "../features/simulation/simulateCounter"

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

let hands: Card["code"][][] = []

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
    runMulligan: (state, action) => {
      let { numberOfSimulations } = action.payload
      let hands = getMulliganedHands({
        deck: state.deck.cards,
        mulliganQueries: state.mulliganQueries,
        numberOfSimulations,
      })
      let numberOfTurns = getNumberOfTurns(state.tags.counters)
      let trimmedHands = hands.map((hand) => hand.slice(0, numberOfTurns))
      state.simulations.hands = trimmedHands
    },
    runTags: (state, action) => {
      state.tags.counters = countTags({
        hands: state.simulations.hands,
        tags: state.tags.counters
      })
    }
  },
})

export const { addDeck, addMulligan, addTag, runMulligan, runTags} = dataSlice.actions

export default dataSlice.reducer

