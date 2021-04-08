export const formatDeck = (deck: Card[]): formattedCard[] => {
  const register = {}
  let remappedDeck: formattedCard[] = []
  // there has to be a faster way to do this

  deck.forEach((card) => {
    const { code } = card
    if (code in register) {
      register[code].count++
    } else {
      register[code] = {count: 1, ...card}
    }
  })

  for (let keys in register) {
    remappedDeck.push(register[keys])
  }


  remappedDeck = remappedDeck.sort((a,b) => {
    if (a.cost > b.cost) {
      return 1;
  } else if (a.cost < b.cost) { 
      return -1;
  }

  if (a.name < b.name) { 
      return -1;
  } else if (a.name > b.name) {
      return 1
  } else { 
      return 0;
  }
  })
  return remappedDeck
}