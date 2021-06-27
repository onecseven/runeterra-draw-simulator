import { every } from "../utils/generic/every"
import { tagInitialState } from "../../store/dataSlice"
import { isSequenceInTarget } from "../utils/generic/isSequenceInTarget"
import { any } from "./generic/any"
import { some } from "./generic/some"

let tagVerification = (tag: Tag, hand: Card["code"][]): boolean => {
  let { type, referents } = tag
  switch (type) {
    case "WITH": {
      return every(referents, hand)
    }
    case "WITHOUT": {
      return some(referents, hand)
    }
    case "ANY": {
      return any(referents, hand)
    }
    case "KEYWORD": {
      return any(referents, hand)
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
  hands: Card["code"][][]
  tag: Tag
}): number => {
  let counter = 0
  for (let hand of hands) {
    if (tagVerification(tag, hand)) {
      counter++
    }
  }
  return counter
}
