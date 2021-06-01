export const deckFilter = (deck: Card[]): UIElementIterator<Card["code"]>[] => {
  return [...new Set(deck)].map(({ name, code }) => ({name, value: code}))
} //_.uniqs the deck, and formats it in the way the dropdown expects
