import { createSlice } from "@reduxjs/toolkit"
import {deckCodeTranslation} from "../features/utils/Deck-Code-Lookup"
import {tagValidator} from "../features/rules/tags/tagSlice"
import {validateMulligan} from "../features/rules/mulligan/mulliganSlice"

interface tagInitialState {
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

const mulliganInitialState: MulliganQuery[] = []

type deckInitialState = {
  code: string,
  cards: Card[]
}

const deckInitialState: deckInitialState = {
  code: "",
  cards: []
}


export const dataSlice = createSlice({
  name: "data",
  initialState: {
    deck: {
      code: null,
      cards: null
    },
    tags: tagInitialState,
    mulliganQueries: mulliganInitialState
  },
  reducers: {
    addDeck: (state, action) => {
      let {code} = action.payload
      //maybe have a verify clause here?
      let cards = deckCodeTranslation(code)
      state.deck.code = code
      state.deck.cards = cards
      return state
        },
    addMulligan: (state, action) => {
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
}})


export const { addDeck, addMulligan, addTag} = dataSlice.actions

export default dataSlice.reducer


/*
TODO remove action for tags
TODO remove action for mulligans
TODO update selectors to use new paths for data
TODO update store to use this slice
*/