declare type mulliganAction = "KEEP" | "THROW"
declare type mulliganCondition = "ALWAYS" | "PRESENCE" | "ABSENCE"
declare type TagType = "SEQUENCE" | "WITH" | "WITHOUT" | "KEYWORD" | "GROUP"
declare type TagTiming = "EXACT" | "RELATIVE"
declare type KEYWORD =
  | "Burst"
  | "Quick Attack"
  | "Fast"
  | "Lifesteal"
  | "Elusive"
  | "Imbue"
  | "Ephemeral"
  | "Slow"
  | "Skill"
  | "Challenger"
  | "Overwhelm"
  | "Regeneration"
  | "Can't Block"
  | "Last Breath"
  | "Fearsome"
  | "Barrier"
  | "Fleeting"
  | "Tough"
  | "Double Attack"
  | "Trap"
  | "Attune"
  | "Deep"
  | "Immobile"
  | "Scout"
  | "Missing Translation"
  | "Vulnerable"
  | "Focus"
  | "Landmark"
  | "SpellShield"
  | "Fury"
  | "Augment"

declare interface dataCards {
  associatedCards: string[]
  associatedCardRefs: []
  assets: asset[]
  region: string
  regionRef: string
  attack: number
  cost: number
  health: number
  description: string
  descriptionRaw: string
  levelupDescription: string
  levelupDescriptionRaw: string
  flavorText: string
  artistName: string
  name: string
  cardCode: string
  keywords: KEYWORD[]
  keywordRefs: string[]
  spellSpeed: string
  spellSpeedRef: string
  rarity: string
  rarityRef: string
  subtype: string
  subtypes: []
  supertype: "Champion"
  type: "Spell" | "Unit"
  collectible: boolean
  set: string
}

declare type getStartingHand = (keep: number[], sendBack?: number[]) => number[]


declare interface UIElementIterator {
  name: string
  value: string | number
}

declare interface Card {
  code: string
  name: string
  assets?: asset[]
  region: string
  cost: number
  keywords: KEYWORD[]
  type: dataCards.type
  supertype: dataCards.supertype
  count?: number
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

declare namespace Dropdown {
  interface props {
    onSelectedChange(arg: (string | number) | (string | number)[]): void
    options: UIElementIterator[]
    name: string
    defaultNumber?: number
  }
}

declare interface Tag {
  type: TagType
  turn: number
  referents?: Card["code"][]
  groupName?: string
}

declare interface Counter {
  tag: Tag //maybe eventually we could have composite counter
  hits: Card["code"][][]
}
