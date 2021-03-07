import * as data from './assets/en_us/data/set1-en_us.json';
import {doTimes} from "./utils/doTimes"
import { decode, encode } from 'lor-deckcode'

export const CardLookup = (cardCode) => {
  return data.filter(currentCard => {
    if (cardCode === currentCard.cardCode) {
      return true
    } else {
      return false
    }
  })
  .map(card => 
    {
      return {name: card.name, code: card.cardCode} 
    })
}

export const deckCodeTranslation = (deckCode: string) => {
  let newDeck = []
  let deck = decode(deckCode)
  deck.forEach(({code, count}) => {
    let decoratedCard = CardLookup(code)
    doTimes(() => {
      newDeck.push(decoratedCard)
    }, count)
  })
  return newDeck
}