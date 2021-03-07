const Mulliganer = (
  queries: MulliganQuery[],
  preMull: number[],
  // mullFunc: getStartingHand
  mullFunc: Function
): number[] => {
  //we want to make sure that once a card it's been mulliganed
  //it is not selected again by a Query.
  let sendBack: number[] = []
  //cycle through the queries
  //if the queries subject is found in the preMull, then do the Queries' onHit
  let modifiedHand = preMull.sort().slice()
  let performAction = (action: Action, card: [number]): number[] => {
    let firstFind = true
    switch (action) {
      case "THROW":
        sendBack.push(card[0])
        return modifiedHand.filter((element) => {
          if (card[0] == element && firstFind) {
            firstFind = false
            return false
          } else return true
        })
        break
      case "KEEP":
        return modifiedHand
        break
    }
  }
  let checkPredicate = (predicate: Predicate, references: number[]): boolean => {
    let goalOfHits = references.length
    let hitCount = 0
    let countPresentHits = (ref: number) => {
      if (modifiedHand.includes(ref)){
        hitCount++
      }
    }
    references.forEach((ref) => countPresentHits(ref))
    switch (predicate) {
      case "PRESENCE":
        return hitCount == goalOfHits
        break //unreachable but for safety lol
      case "ABSENCE": 
                return goalOfHits > hitCount;
        break
    }
  }
  let reverseAction = (action: Action): Action => {
    switch (action) {
      case "KEEP":
        return "THROW"
      case "THROW":
        return "KEEP"
    }
  }
  queries.forEach((query) => {
    let { card, onHit } = query
    let { condition, predicate, action, referenceCards } = onHit
    if (modifiedHand.includes(card[0])) {
      switch (condition) {
        case "ALWAYS":
          modifiedHand = performAction(action, card)
          break
        case "ONLY":
          if (checkPredicate(predicate, referenceCards)) {
            modifiedHand = performAction(action, card)
          } else {
            modifiedHand = performAction(reverseAction(action), card)
          }
          break
        case "UNLESS":
          if (checkPredicate(predicate, referenceCards) == false){
            modifiedHand = performAction(action, card)
          } else {
            modifiedHand = performAction(reverseAction(action), card)
          }
          break
      }
    }
  })
  return mullFunc(modifiedHand, sendBack)
}

export {Mulliganer}