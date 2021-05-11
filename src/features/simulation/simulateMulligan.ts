import { isValueInArray } from "../utils/isValueInArray"
import { tagInitialState } from "../../store/dataSlice"
import { doTimes } from "../utils/doTimes"
import { shuffle } from "../utils/shuffler"

export const getNumberOfTurns = (tags: tagInitialState["counters"]) => {
  let highestTurn = 0
  for (let index in tags) {
    let counter = tags[index]
    highestTurn =
      counter.tag.turn > highestTurn ? counter.tag.turn : highestTurn
  }
  return highestTurn
}

let doMulliganAction = (action: mulliganAction, preMullHand: Card["code"][], referent: Card["code"]) => {
  let thrown: Card["code"][] = []
  let kept = preMullHand.slice()
  switch (action) {
    case "THROW":
      thrown = kept.filter((code) => (code === referent))
      kept = kept.filter((code) => (code !== referent))
      break
    case "KEEP":
      break
  }
  return {
    kept,
    thrown
  }
}

let insertAtRandom = <T,>(value: T, array: T[]) => {
  let place = Math.floor(Math.random() * array.length)
  let newArray = array.slice()
  newArray.splice(place, 0, value)
  return newArray
}

const mulligan = ({
  deck,
  mulliganQueries,
}: {
  deck: Card["code"][]
  mulliganQueries: MulliganQuery[]
}): Card["code"][] => {
  let [first, second, third, fourth, ...rest] = deck
  let handSoFar = [first, second, third, fourth]
  mulliganQueries.forEach(({referent, onHit}) => {
    if (isValueInArray(handSoFar, referent)) {
      let {referenceCard, condition, action} = onHit
      if (condition === "ALWAYS") {
        let {kept, thrown} = doMulliganAction(action, handSoFar, referent)
        thrown.forEach(thrownCard => {
          rest = insertAtRandom(thrownCard, rest)
        })
        handSoFar = kept
      } else {
        let presenceOrAbsence = condition === "PRESENCE" 
        if (isValueInArray(handSoFar, referenceCard) == presenceOrAbsence) {
          let {kept, thrown} = doMulliganAction(action, handSoFar, referent)
          thrown.forEach(thrownCard => {
            rest = insertAtRandom(thrownCard, rest)
          })
          handSoFar = kept
        }
      }
    }
  })
  return handSoFar.concat(rest)
}


export const getMulliganedHands = ({
  deck,
  numberOfSimulations,
  mulliganQueries}: {
  deck: Card[]
  mulliganQueries: MulliganQuery[]
  numberOfSimulations: number
}) => {
  let codeDeck: Card["code"][] = deck.map(({ code }) => code)
  let hands = []
  doTimes(() => {
    let innerDeck = shuffle(codeDeck)
    let mulliganedDeck = mulligan({
      deck: innerDeck,
      mulliganQueries,
    })
    hands.push(mulliganedDeck)
  }, numberOfSimulations)
  return hands
}