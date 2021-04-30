import { isValueInArray } from "./isValueInArray"

export let every = <T>(targets: T[], array: T[]): boolean => {
  targets.forEach(target => {
    if (isValueInArray(array, target) === false) {
      return false
    }
  })
  return true
}
