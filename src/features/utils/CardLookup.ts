import data from "../../assets/cardInfo.json"

export const CardLookup = (cardCode: string): Card => {
  let preCard: dataCards = data[cardCode]
  if (!preCard) {
    throw new Error(`Card Unavailable: ${cardCode}`)
  }
  let card = {
    name: preCard.name,
    code: cardCode,
    assets: preCard.assets,
    region: preCard.region,
    cost: preCard.cost,
    keywords: preCard.keywords,
  }
  return card || null
}
