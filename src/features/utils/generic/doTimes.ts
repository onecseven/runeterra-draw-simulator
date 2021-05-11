export const doTimes = (iteratee: Function, n: number): boolean => {
  if (n < 1 || n > 9007199254740991) {
    return false
  }
  while (n > 0){
    iteratee()
    n--
  }
  return true
}
