import data from "../../assets/cardInfo.json"

export const CardLookup = (cardCode: string): Card => {
  let preCard: dataCards = data[cardCode]
  if (!preCard) {
    throw new Error(`Card Unavailable: ${cardCode}`)
  }
  let card = {
    name: preCard.name,
    code: preCard.cardCode,
    assets: preCard.assets,
    region: preCard.region,
    cost: preCard.cost,
    keywords: preCard.keywords,
    type: preCard.type,
    supertype: preCard.supertype,
  }
  return card || null
}
