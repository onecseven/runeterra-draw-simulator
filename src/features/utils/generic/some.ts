import { isValueInArray } from "./isValueInArray"

/** this will return true when you have drawn some of the cards specified but not all and not none */
export let some = <T>(targets: T[], array: T[]): boolean => {
  let fails = []
  let hits = []
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (isValueInArray(array, target)) {
      hits.push(true)
    } else {
      fails.push(false)
    }
  }
  if (fails.length === targets.length || hits.length === targets.length) return false 
  return true
}