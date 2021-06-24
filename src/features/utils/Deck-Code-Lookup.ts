import { doTimes } from "./generic/doTimes"
import { getDeckFromCode, Deck } from "lor-deckcodes-ts"
import { CardLookup } from "./CardLookup"


export const deckCodeTranslation = (deckCode: string): Card[] => {
  let newDeck: Card[] = []
  try {
    let deck: Deck = getDeckFromCode(deckCode)
    console.log(deck)
    deck.forEach(({ cardCode, count }) => {
      let card = CardLookup(cardCode)
      doTimes(() => {
        newDeck.push(card)
      }, count)
    })
    return newDeck
  } catch (e) {
    console.error("Deck Decode Failed")
    console.error(e)
    return null
  }
}
