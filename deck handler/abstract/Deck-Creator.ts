//when I implement the runeterra info

export class Deck implements AbstractDeck {
  deck: Card[]
  constructor(preDeck: preCard[]) {
    this.deck = preDeck.map(({name, code}, index) => {
        return {
          name,
          code,
          cardIndex: index
        }
       });{

    }
  }
  //this probably has to go to its own subfolder lol
  initialMulligan() { 
    this.shuffle()
    let preMulligan  = this.deck.map(({cardNum}) => cardNum).splice(0,4) //we need a new way to do this
    let getStartingHand = (keep: number[], sendBack: number[] = []): number[] => {
      switch (sendBack.length === 0){
        case true:
          return keep
        case false:
          sendBack.forEach((card, index) =>{
            this.deck.push(card)
          })
          this.shuffle() 
          sendBack.forEach((card,index) => {
            keep.push(this.draw())
          })
          return keep
      }
    }
    return {preMulligan, mullFunc: getStartingHand}
  }

  decorate(target: Card["code"], tag: ActionTag){
    this.deck = this.deck.map((card) => {
      if (card.code === target) {
        card.tags.push(tag)
        return card
      } else {
        return card
      }
    })
  }
}
