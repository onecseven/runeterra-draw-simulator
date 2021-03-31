import * as data from "../../assets/cardInfo.json"
import {doTimes} from "../../utils/doTimes"
import { decode } from 'lor-deckcode'

export const CardLookup = (cardCode) => {
  return data[cardCode] || null
}

export const deckCodeTranslation = (deckCode: string): preCard[] => {
  let newDeck = []
  try {
    let deck = decode(deckCode)
    deck.forEach(({code, count}) => {
      let fullCard = CardLookup(code)
      let trimmedCard = {name: fullCard.name, code: fullCard.cardCode, assets: fullCard.assets, region: fullCard.region, cost: fullCard.cost}
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