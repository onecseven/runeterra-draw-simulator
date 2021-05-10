import { isValueInArray } from "./isValueInArray"

export let every = <T>(targets: T[], array: T[]): boolean => {
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (isValueInArray(array, target) == false) {
      return false
    }
  }
  return true
}