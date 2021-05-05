import { createSlice } from "@reduxjs/toolkit"
import { doTimes } from "../utils/doTimes"
import {shuffle} from "../utils/shuffler"
import { mulligan } from "./mulliganReducer"
import {tagInitialState} from "../../store/dataSlice"

let hands: Card[][] = []

const getNumberOfTurns = (tags: tagInitialState["counters"]) => {
  let highestTurn = 0
  for (let index in tags) {
    let counter = tags[index]
    highestTurn = counter.tag.turn > highestTurn ? counter.tag.turn : highestTurn
  }
  return highestTurn
}

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
      let trimmedHands = hands.map(hand => hand.slice(0, getNumberOfTurns(tags)))
      return {
        hands: trimmedHands
      }
    },
  },
})


export const { run } = simulationSlice.actions

export default simulationSlice.reducer
