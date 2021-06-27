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
/** takes a hand, and does the mulligan action it's told to */
let doMulliganAction = (
  action: mulliganAction,
  preMullHand: Card["code"][],
  referent: Card["code"]
) => {
  let thrown: Card["code"][] = []
  let kept = preMullHand
  // console.log(`
  //   Mulligan Hit
  //   Mulligan Action: ${action}
  //   Hand: ${preMullHand}
  //   Referent: ${referent}`)
  switch (action) {
    case "THROW":
      thrown = kept.filter((code) => code === referent)
      kept = kept.filter((code) => code !== referent)
      break
    default:
      if (action === "KEEP_ALL") break
      let max = action === "KEEP_TWO" ? 2 : 1 //if it's not keep all or keep two it must be keep one
      thrown = kept.filter((code) => code === referent)
      kept = kept.filter((code) => code !== referent)
      doTimes(() => {
        if (thrown.length > 0) kept.push(thrown.pop())
      }, max)
      break
  }
  return {
    kept,
    thrown,
  }
}
/** checks that the condition in the mulligan is valid by checking if the referent is present in the hand
 * and checking if that aggrees with 
 */
let conditionCheck = (
  condition: mulliganCondition,
  hand: Card["code"][],
  referent: Card["code"],
  referenceCard: Card["code"]
) => {
  let presenceOrAbsence = condition === "PRESENCE"
  if (condition === "ALWAYS" && isValueInArray(hand, referent)) {
    return true
  } else if (referenceCard 
    && isValueInArray(hand, referent) 
    && isValueInArray(hand, referenceCard) === presenceOrAbsence) {
    return true
  } else {
    return false
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
  let hand = [first, second, third, fourth]
  for (let index = 0; index < mulliganQueries.length; index++) {
    const { referent, onHit } = mulliganQueries[index]
    let { referenceCard, condition, action } = onHit
    let hit = false
    if (conditionCheck(condition, hand, referent, referenceCard)) {
      let { kept, thrown } = doMulliganAction(action, hand, referent)
      thrown.forEach((thrownCard) => {
        rest = insertAtRandom(thrownCard, rest)
      })
      hand = kept
      hit = true
    }
    if (hit) break
  }
  return hand.concat(rest)
}

export const getMulliganedHands = ({
  deck,
  numberOfSimulations,
  mulliganQueries,
}: {
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
