import { doTimes } from "./generic/doTimes"
import { getDeckFromCode, Deck } from "lor-deckcodes-ts"
import { CardLookup } from "./CardLookup"

export const deckCodeTranslation = async (deckCode: string) => {
  let newDeck: Card[] = []
  let deck: Deck = getDeckFromCode(deckCode)
  for (let index = 0; index < deck.length; index++) {
    const card = deck[index]
    let { cardCode, count } = card
    try {
      let newCard = await CardLookup(cardCode)
      doTimes(() => {
        newDeck.push(newCard)
      }, count)
    } catch (e) {
      console.error("Deck Decode Failed")
      console.error(e)
      return null
    }
  }
  return newDeck
}
