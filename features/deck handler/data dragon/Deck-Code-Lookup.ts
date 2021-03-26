import * as data from '../../../assets/en_us/data/set1-en_us.json';
import { decode } from 'lor-deckcode'

export const CardLookup = (cardCode) => {
  return data.find(currentCard => cardCode === currentCard.cardCode)
}

export const deckCodeTranslation = (deckCode: string): preCard[] => {
  let newDeck = []
  let deck = decode(deckCode)
  deck.forEach(({code, count}) => {
    let fullCard = CardLookup(code)
    // TODO need error handling here
    let trimmedCard = {name: fullCard.name, code: fullCard.cardCode}
    doTimes(() => {
      newDeck.push(trimmedCard)
    }, count)
  })
  return newDeck
}