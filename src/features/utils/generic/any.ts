import { isValueInArray } from "./isValueInArray"

export let any = <T>(targets: T[], array: T[]): boolean => {
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    let targetIsInArray = isValueInArray(array,target)
    if (targetIsInArray === false) {
      continue
    } else if (targetIsInArray) {
      return true
    }
  }
  return false
}