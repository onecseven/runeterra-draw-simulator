import { doTimes } from "./doTimes"
import { decode } from "lor-deckcode"
import { CardLookup } from "./CardLookup"


export const deckCodeTranslation = (deckCode: string): Card[] => {
  let newDeck: Card[] = []
  try {
    let deck = decode(deckCode)
    deck.forEach(({ code, count }) => {
      let card = CardLookup(code)
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
