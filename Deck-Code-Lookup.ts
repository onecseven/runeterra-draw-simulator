import * as data from './assets/en_us/data/set1-en_us.json';
import {doTimes} from "./utils/doTimes"

export const CardLookup = (cardCode) => {
  data.forEach(currentCard => {
    if (cardCode === currentCard.cardCode) {
      return { name: currentCard.name, code: currentCard.cardCode }
    }
  });
}

export const deckCodeTranslation = (deck) => {
  let newDeck = []
  deck.forEach(({code, count}) => {
    let decoratedCard = CardLookup(code)
    doTimes(() => {
      newDeck.push(decoratedCard)
    }, count)
  })
  return newDeck
}