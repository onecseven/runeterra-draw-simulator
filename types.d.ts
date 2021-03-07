// declare type Card = number
declare type Action = "KEEP" | "THROW"
declare type Condition = "ALWAYS" | "ONLY" | "UNLESS"
declare type Predicate = "PRESENCE" | "ABSENCE"
//whatever UI element gathers these should be ordered by priority
declare interface MulliganQuery {
  card: [number]
  priority: number
  onHit: {
    action: Action
    condition: Condition
    predicate: Predicate
    referenceCards: number[]
  }
}

declare type getStartingHand = (keep: number[], sendBack?: number[]) => number[]

declare interface Tag {
  byTurn: number,
  strict: boolean,
  name: string,
  members: number[]
}
declare interface decoratedCard {
  cardNum: number,
  tags: Tag["name"][],
}
declare interface AbstractDeck {
  deck  : number[] | decoratedCard[]
  shuffle: () => void
  initialMulligan: () => {preMulligan: number[], mullFunc: getStartingHand}
  // decorator: () => decoratedCard[]
}
