import data from "../../assets/set1-lite-en_us/en_us/data/set1-en_us.json"
import {doTimes} from "../../utils/doTimes"
import { decode } from 'lor-deckcode'

export const CardLookup = (cardCode) => {
  return data.find(currentCard => cardCode === currentCard.cardCode)
}

export const deckCodeTranslation = (deckCode: string): preCard[] => {
  let newDeck = []
  try {
    let deck = decode(deckCode)
    deck.forEach(({code, count}) => {
      let fullCard = CardLookup(code)
      let trimmedCard = {name: fullCard.name, code: fullCard.cardCode}
      doTimes(() => {
        newDeck.push(trimmedCard)
      }, count)
    })
    return newDeck
  } catch (e) {
    console.error("Deck Decode Failed")
    console.error(e)
    return null
  }

}