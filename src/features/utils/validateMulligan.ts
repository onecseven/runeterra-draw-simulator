import { Card } from "lor-deckcode"

export const validateMulligan = (potentialQuery
): potentialQuery is MulliganQuery => {
  let card = potentialQuery.referent
  let {action, condition, referenceCard} = potentialQuery.onHit
  if (card && action && condition) {
    if (condition != "ALWAYS" && referenceCard) {
      return true
    } else if (condition == "ALWAYS") {
      return true
    } else {
      return false
    }
  } else return false
}
