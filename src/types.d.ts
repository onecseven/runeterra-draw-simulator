
declare type mulliganAction = "KEEP" | "THROW"
declare type mulliganCondition = "ALWAYS" | "PRESENCE" | "ABSENCE"
declare type TagType = "SEQUENCE" | "WITH" | "WITHOUT" | "KEYWORD" | "GROUP"
declare type TagTiming = "EXACT" | "RELATIVE"

declare type getStartingHand = (keep: number[], sendBack?: number[]) => number[]

declare interface Hand {
  code: Card["code"]
  name: Card["name"]
  ids: Counter["id"][]
}

declare interface UIElementIterator {
  name: string
  value: string
}


declare interface Card {
  code: string
  name: string
  assets?: asset[]
  region: string
  cost: number
}

type cardProperties = "code" | "name" | "assets" | "region" | "cost"

declare interface asset {
  gameAbsolutePath: string
  fullAbsolutePath: string
}

declare interface MulliganQuery {
  referent: Card["code"]
  priority: number
  onHit: {
    action: mulliganAction
    condition: mulliganCondition
    referenceCard: Card["code"]
  }
}

declare interface formattedCard extends Card {
  count: number
}

declare namespace Dropdown {
  interface props {
    onSelectedChange: Function
    options: UIElementIterator[]
    name: string
  }
}

declare interface Tag {
  type: TagType
  turn: number
  timing?: "EXACT" | "RELATIVE"
  reference: Card
  referents?: Card[]
  groupName?: string
}

declare interface Counter {
  id: number
  tag: Tag //maybe eventually we could have composite counter
  hits: Hand[]
}