import { createSlice } from "@reduxjs/toolkit"
import { doTimes } from "../utils/doTimes"
import {shuffle} from "../utils/shuffler"

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
      doTimes(() => {
        let innerDeck = shuffle(deck)
        hands.push(innerDeck)
      }, numberOfSimulations)
      return {
        hands
      }
    },
  },
})


export const { run } = simulationSlice.actions

export default simulationSlice.reducer
