import { isValueInArray } from "../utils/isValueInArray"
import { shuffle } from "../utils/shuffler"

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

// TODO: IMPORTANT FIX mulligan is not outputting consistently sized hands. we're leaving out
// some cards (sometimes 4 when we're only mulliganing 3 at)

export const mulligan = ({
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
  let all = handSoFar.concat(rest)
  return all
}
