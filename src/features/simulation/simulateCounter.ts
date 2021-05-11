import { every } from "../utils/generic/every"
import { tagInitialState } from "../../store/dataSlice"
import { isSequenceInTarget } from "../utils/generic/isSequenceInTarget"

let tagVerification = (tag: Tag, hand: Card["code"][]): boolean => {
  let { type, referents } = tag
  console.log(`
  referents: ${referents}
  hand: ${hand}
  `)
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
  tags,
}: {
  hands: Card["code"][][]
  tags: tagInitialState["counters"]
}): tagInitialState["counters"] => {
  for (let hand of hands) {
    for (let index in tags) {
      let {tag, hits} = tags[index]
      if (tagVerification(tag, hand)){
        hits.push(hand)
      }
    }
  }
  return tags
}