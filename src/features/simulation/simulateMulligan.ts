import { isValueInArray } from "../utils/generic/isValueInArray"
import { tagInitialState } from "../../store/dataSlice"
import { doTimes } from "../utils/generic/doTimes"
import { shuffle } from "../utils/generic/shuffler"
import { insertAtRandom } from "../utils/generic/insertAtRandom"

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
          handSoFar = keptq
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
