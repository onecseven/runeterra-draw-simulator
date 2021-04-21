import    data from "../../assets/cardInfo.json"
import { doTimes } from "../utils/doTimes"
import { decode } from "lor-deckcode"

declare interface dataCards {
  associatedCards: string[],
  associatedCardRefs: [],
  assets: asset[],
  region: string,
  regionRef: string,
  attack: number,
  cost: number,
  health: number,
  description: string,
  descriptionRaw: string,
  levelupDescription: string,
  levelupDescriptionRaw: string,
  flavorText: string,
  artistName: string,
  name: string,
  cardCode: string,
  keywords: string[],
  keywordRefs: string[],
  spellSpeed: string,
  spellSpeedRef: string,
  rarity: string,
  rarityRef: string,
  subtype: string,
  subtypes: [],
  supertype: string,
  type: string,
  collectible: boolean,
  set: string
}

export const CardLookup = (cardCode: string): Card => {
  console.log(data) 
  let preCard: dataCards = data[cardCode] 
  if (!preCard) throw new Error("Card unavailable") 
  let card = {
    name: preCard.name,
    code: preCard.cardCode,
    assets: preCard.assets,
    region: preCard.region,
    cost: preCard.cost,
    keywords: preCard.keywords,
    type: preCard.keywords,
    supertype: preCard.supertype
  }
  return card || null
}

export const deckCodeTranslation = (deckCode: string): Card[] => {
  let newDeck: Card[] = []
  try {
    let deck = decode(deckCode)
    deck.forEach(({ code, count }) => {
      let card = CardLookup(code)
      console.log(card)
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
