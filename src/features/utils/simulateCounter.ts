import { every } from "../utils/generic/every"
import { tagInitialState } from "../../store/dataSlice"
import { isSequenceInTarget } from "../utils/generic/isSequenceInTarget"

let tagVerification = (tag: Tag, hand: Card["code"][]): boolean => {
  let { type, referents } = tag
  switch (type) {
    case "WITH": {
      return every(referents, hand)
    }
    case "WITHOUT": {
      return !every(referents, hand)
    }
    case "GROUP": {
      return every(referents, hand)
    }
    case "KEYWORD": {
      return every(referents, hand)
    }
    case "SEQUENCE": {
      return isSequenceInTarget(referents, hand)
    }
  }
}

export const countTags = ({
  hands,
  tag,
}: {
  hands: hand[]
  tag: Tag
}): number => {
  let counter = 0
  for (let hand of hands) {
    if (tagVerification(tag, hand.cards)) {
      counter++
    }
  }
  return counter
}
