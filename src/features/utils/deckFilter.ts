const sortingCost = (a,b) => {
  if (a.cost > b.cost) {
    return 1
  } else if (a.cost < b.cost) {
    return -1
  } else return 0
}

export const deckFilter = (deck: Card[]): UIElementIterator<Card["code"]>[] => {
  return [...new Set(deck)].map(({ name, code, cost }) => ({name, value: code, cost})).sort(sortingCost)
} //_.uniqs the deck, and formats it in the way the dropdown expects
