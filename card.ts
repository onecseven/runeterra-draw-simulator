export class Card {
  cardNum: number
  tags: Tag["name"][]
  constructor(cardNum: number){
    this.cardNum = cardNum
  }
}