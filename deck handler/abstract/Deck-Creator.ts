/*
Deck Creator:
input: deck size (int)
output: a Deck Data Structure

the shuffle algorithm is from stack overflow lol

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i --) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

*/

import {Card} from "./card"

//when I implement the runeterra info
//it will pair the decks with 40 numbers and translate on that

export class Deck implements AbstractDeck {
  deck: Card[]
  constructor() {
    // this.deck = [...Array(40)].map((value, index) => index)
    this.deck = []
    for (let i = 0; i < 40; i++) {
      this.deck.push(new Card(i))
    }
  }
  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = this.deck[i]
      this.deck[i] = this.deck[j]
      this.deck[j] = temp
    }
  }
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
  decorate(target, tag){
    //add tag to card
  }
}
