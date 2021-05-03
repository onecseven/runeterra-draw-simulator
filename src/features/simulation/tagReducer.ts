import { isValueInArray } from "../utils/isValueInArray"
import { every } from "../utils/every"
import { tagInitialState } from "../rules/tags/tagSlice"
import { checkArrays } from "../utils/array-equality"

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
      if (every(referents, hand)){
        let filteredHand = hand.filter(card => {
          return isValueInArray(referents, card)
        })
        return checkArrays(filteredHand, referents)
      }
    }
  }
}

export const countTags = ({
  hands,
  tags,
}: {
  hands: Card["code"][]
  tags: tagInitialState["counters"]
}): tagInitialState["counters"] => {
  for (let hand of hands) {
    for (let index in tags) {
      let currentTag = tags[index]
      if (tagVerification(currentTag, hand)){
        currentTag.hits.push(hand)
      }
    }
  }
  return tags
}
