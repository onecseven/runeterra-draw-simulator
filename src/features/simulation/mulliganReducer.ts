import { isValueInArray } from "../utils/isValueInArray"

let mulliganAction = (action: mulliganAction, preMullHand: Card["code"][], referent: Card["code"]) => {
  let thrown: Card["code"][] = []
  let kept = preMullHand
  switch (action) {
    case "THROW":
      thrown.concat(kept.splice(preMullHand.indexOf(referent)))
      break
    case "KEEP":
      kept = preMullHand
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
        let {kept, thrown} = mulliganAction(onHit.action, handSoFar, referent)
        rest.concat(thrown)
        handSoFar = kept
      } else {
        let presenceOrAbsence = condition === "PRESENCE"
        if (isValueInArray(handSoFar, referenceCard) == presenceOrAbsence) {
          let {kept, thrown} = mulliganAction(onHit.action, handSoFar, referent)
          rest.concat(thrown)
          handSoFar = kept
        }
      }
    }
  })
  return handSoFar.concat(rest)
}
