import { createSlice } from "@reduxjs/toolkit"
import { CardLookup } from "../utils/CardLookup"
import { doTimes } from "../utils/doTimes"
import {shuffle} from "../utils/shuffler"
import { mulligan } from "./mulliganReducer"

let hands: Card[][] = []

export const simulationSlice = createSlice({
  name: "simulation",
  initialState: {
    hands
  },
  reducers: {
    run: (state, action) => {
      let {deck, mulliganQueries, tags, numberOfSimulations} = action.payload
      let hands = []
      let codeDeck: Card["code"][] = deck.map(({code}) => code)
      doTimes(() => {
        let innerDeck = shuffle(codeDeck)
        let mulliganedDeck = mulligan({
          deck: innerDeck,
          mulliganQueries
        })
        hands.push(mulliganedDeck)
      }, numberOfSimulations)
      return {
        hands: hands.map(v => v.map(q => CardLookup(q)))
      }
    },
  },
})


export const { run } = simulationSlice.actions

export default simulationSlice.reducer
