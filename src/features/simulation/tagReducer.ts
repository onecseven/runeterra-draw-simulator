import { isValueInArray } from "../utils/isValueInArray"
import { every } from "../utils/every"
import { tagInitialState } from "../rules/tags/tagSlice"

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
      //TODO
    }
  }
}

export const countTags = ({
  hands,
  tags,
}: {
  hands: Card["code"][]
  tags: tagInitialState["counters"]
}): void => {
  for (let hand of hands) {
    for (let index in tags) {
    }
  }
}
