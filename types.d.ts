// declare type Card = number
declare type Action = "KEEP" | "THROW"
declare type Condition = "ALWAYS" | "ONLY" | "UNLESS"
declare type Predicate = "PRESENCE" | "ABSENCE"
declare type TagType = "SEQUENCE" | "WITH" | "WITHOUT" | "KEYWORD"
//whatever UI element gathers these should be ordered by priority

declare type getStartingHand = (keep: number[], sendBack?: number[]) => number[]

declare type Hand = Card[]

declare interface preCard {
  code: string
  name?: string
}

declare interface ActionTag {
  type: TagType
  payload: {
    turn?: number
    timing?: "EXACT" | "RELATIVE"
  }
}
declare interface Card extends preCard {
  name?: string
  cardIndex: number
  tags?: ActionTag[]
}

declare interface Counter {
  id: number
  tag: ActionTag //maybe eventually we could have composite counter
  hits: Hand[]
}

//DEPRECATED AND CONFUSING PART OF THE APP

declare interface AbstractDeck {
  deck  : Card[]
  initialMulligan: () => {preMulligan: number[], mullFunc: getStartingHand}
  // decorator: () => decoratedCard[]
}

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