import { isValueInArray } from "./generic/isValueInArray"
import { tagInitialState } from "../../store/dataSlice"
import { doTimes } from "./generic/doTimes"
import { shuffle } from "./generic/shuffler"
import { insertAtRandom } from "./generic/insertAtRandom"

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
  let kept = preMullHand
  switch (action) {
    case "THROW":
      thrown = kept.filter((code) => (code === referent))
      kept = kept.filter((code) => (code !== referent))
      break
    default:
      if (action === "KEEP_ALL") break
      let max = action === "KEEP_TWO" ? 2 : 1 //if it's not keep all or keep two it must be keep one
      thrown = kept.filter((code) => (code === referent))
      kept = kept.filter((code) => (code !== referent))
      doTimes(() => {
        if (thrown.length > 0) kept.push(thrown.pop())
      }, max)
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
