import { doTimes } from "../utils/doTimes"
import { shuffle } from "../utils/shuffler"
import { mulligan } from "./mulliganReducer"
import { tagInitialState } from "../../store/dataSlice"

const getNumberOfTurns = (tags: tagInitialState["counters"]) => {
  let highestTurn = 0
  for (let index in tags) {
    let counter = tags[index]
    highestTurn =
      counter.tag.turn > highestTurn ? counter.tag.turn : highestTurn
  }
  return highestTurn
}

export const runSimulation = ({
  deck,
  numberOfSimulations,
  mulliganQueries,
  tags,
}: {
  deck: Card[]
  mulliganQueries: MulliganQuery[]
  numberOfSimulations: number
  tags: tagInitialState["counters"]
}) => {
  let codeDeck: Card["code"][] = deck.map(({ code }) => code)
  let hands = []
  let numberOfTurns = getNumberOfTurns(tags)
  doTimes(() => {
    let innerDeck = shuffle(codeDeck)
    console.log(innerDeck.length)
    let mulliganedDeck = mulligan({
      deck: innerDeck,
      mulliganQueries,
    })
    hands.push(mulliganedDeck)
  }, numberOfSimulations)
  let trimmedHands = hands.map((hand) => hand.slice(0, numberOfTurns))
  return numberOfTurns ? trimmedHands : hands
}
