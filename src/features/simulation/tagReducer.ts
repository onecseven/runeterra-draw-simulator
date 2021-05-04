import { isValueInArray } from "../utils/isValueInArray"
import { every } from "../utils/every"
import { tagInitialState } from "../rules/tags/tagSlice"
import { checkArrays } from "../utils/array-equality"

let isSequenceInTarget = <Q,>(sequence: Q[], target: Q[]): boolean => {
  //this is a bit clever
  //it only checks the first value of the sequence,
  //and when it matches it removes it from the array
  //at the end, if the sequence is present in the target array, checkingRefs will be empty
  //if it is present but not in the right order, or not present at all, checkingRefs will not be empty
  let checkingRefs = sequence.slice()
  target.forEach(card => {
    if (card === checkingRefs[0]) {
      checkingRefs.shift()
    }      
  });
  if (checkingRefs.length === 0) {
    return true
  }
  return false
}


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
