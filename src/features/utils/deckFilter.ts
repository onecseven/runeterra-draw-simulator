export const deckFilter = (deck: Card[]): UIElementIterator<Card["code"]>[] => {
  return [...new Set(deck)].map(({ name, code, cost }) => ({name, value: code, cost}))
} //_.uniqs the deck, and formats it in the way the dropdown expects
