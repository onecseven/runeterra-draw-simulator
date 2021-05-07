import { isValueInArray } from "../utils/isValueInArray"
import { shuffle } from "../utils/shuffler"

let mulliganAction = (action: mulliganAction, preMullHand: Card["code"][], referent: Card["code"]) => {
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
        let {kept, thrown} = mulliganAction(action, handSoFar, referent)
        rest.push(...thrown)
        shuffle(rest)
        handSoFar = kept
      } else {
        let presenceOrAbsence = condition === "PRESENCE"
        if (isValueInArray(handSoFar, referenceCard) == presenceOrAbsence) {
          let {kept, thrown} = mulliganAction(action, handSoFar, referent)
          rest.push(...thrown)
          shuffle(rest)
          handSoFar = kept
        }
      }
    }
  })
  let all = handSoFar.concat(rest)
  return all
}
