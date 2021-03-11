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