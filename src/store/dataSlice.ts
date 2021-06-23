import { createSlice } from "@reduxjs/toolkit"
import { deckCodeTranslation } from "../features/utils/Deck-Code-Lookup"
import { tagValidator } from "../features/utils/tagValidator"
import { validateMulligan } from "../features/utils/validateMulligan"
import {
  getNumberOfTurns,
  getMulliganedHands,
} from "../features/utils/simulateMulligan"
import { countTags } from "../features/utils/simulateCounter"
import { ACTIONS } from "./constants"
import { deckFilter } from "../features/utils/deckFilter"

export interface tagInitialState {
  counters: {
    [id: number]: {
      //should match Counter["id"]
      tag: Tag
      // hits: Card["code"][][]
      hits: number
    }
  }
}

const tagInitialState: tagInitialState = {
  counters: {},
}

let hands: number = 0

const mulliganInitialState: MulliganQuery[] = []

type deckInitialState = {
  code: string
  cards: Card[]
}

const deckInitialState: deckInitialState = {
  code: null,
  cards: [],
}

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    deck: deckInitialState,
    tags: tagInitialState,
    mulliganQueries: mulliganInitialState,
    simulations: {
      hands,
    },
  },
  reducers: {
    addDeck: (state, action: Actions.data.addDeck) => {
      let { code } = action.payload
      let cards = deckCodeTranslation(code)
      if (!cards || cards.length < 40) {
        action.asyncDispatch({type:"ui/setDeckInputFailure", payload: null})
        return state
      }
      state.deck.code = code
      state.deck.cards = cards
      action.asyncDispatch({type:"ui/setDeckInputSuccess", payload: null})
      return state
    },
    addMulligan: (state, action: Actions.data.addMulligan) => {
      const mulliganQuery = action.payload
      if (validateMulligan(mulliganQuery)) {
        if (mulliganQuery.referent === "ALL") {
          action.asyncDispatch({type:"data/addMulliganToAll", payload: mulliganQuery})
          return state
        }
        state.mulliganQueries.unshift(mulliganQuery)
        action.asyncDispatch({type:"ui/clearUI", payload: null})
        action.asyncDispatch({type:"ui/setNotificationSuccess", payload: null})
      } else {
        action.asyncDispatch({type:"ui/setNotificationFailure", payload: null})
      }
      return state
    },
    addMulliganToAll: (state, action: Actions.data.addMulliganToAll) => {
      let lastCard 
      state.deck.cards.forEach(card => {
        if (lastCard === card.code) return
        action.asyncDispatch({type: "data/addMulligan", payload: {
          ...action.payload,
          referent: card.code
        }})
        lastCard = card.code
      })
    },
    removeMulligan: (state, action: Actions.data.removeMulligan) => {
      let { index } = action.payload
      state.mulliganQueries.splice(index, 1)
    },
    addTag: (state, action: Actions.data.addTag) => {
      let tag = tagValidator(action.payload, [])
      if (tag) {
        let id = Object.keys(state.tags.counters).length
        state.tags.counters[id] = {
          tag,
          hits: 0
        }
        action.asyncDispatch({type:"ui/clearUI", payload: null})
        action.asyncDispatch({type:"ui/setNotificationSuccess", payload: null})
      } else {
        action.asyncDispatch({type:"ui/clearUI", payload: null})
        action.asyncDispatch({type:"ui/setNotificationFailure", payload: null})
      }
      return state
    },
    runMulligan: (state, action: Actions.data.runMulligan) => {
      // let { numberOfSimulations } = action.payload
      // let hands = getMulliganedHands({
      //   deck: state.deck.cards,
      //   mulliganQueries: state.mulliganQueries,
      //   numberOfSimulations,
      // })
      // let numberOfTurns = getNumberOfTurns(state.tags.counters)
      // let formattedHands = hands.map((hand) => hand.slice(0, numberOfTurns+4)).map((cards) => {
      //   return { cards, read: false }
      // })
      // state.simulations.hands = state.simulations.hands.concat(formattedHands)
      // action.asyncDispatch({type: "data/runTags", payload: null})
    },
    runTags: (state, action: Actions.data.runTags) => {
      let { index, hits, hands} = action.payload
      state.tags.counters[index].hits = hits
      state.simulations.hands = hands
      action.asyncDispatch({type: "ui/setSpinnerOff", payload:null})
    },
    removeTag: (state, action: Actions.data.removeTag) => {
      let {index} = action.payload
      let newTags = {}
      for (let key in state.tags.counters) {
        if (key === index.toString()) continue
        let id = Object.keys(newTags).length
        newTags[id] = {
          tag: state.tags.counters[id].tag,
          hits: state.tags.counters[id].hits,
        }
      }
      state.tags.counters = newTags
    },
  }
})

export const {
  addDeck,
  addMulligan,
  addTag,
  runMulligan,
  runTags,
  removeMulligan,
  removeTag
} = dataSlice.actions

export default dataSlice.reducer
