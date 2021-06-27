export const CardLookup = (cardCode: string) => {
return import("../../assets/cardInfo.json").then((data) => {
    let preCard: dataCards = data.default[cardCode]
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
  })
}
