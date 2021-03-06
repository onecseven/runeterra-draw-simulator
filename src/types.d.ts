
declare type mulliganAction =  "THROW" | "KEEP_ALL" | "KEEP_ONE" | "KEEP_TWO"
declare type mulliganCondition = "ALWAYS" | "PRESENCE" | "ABSENCE"
declare type TagType = "SEQUENCE" | "WITH" | "WITHOUT" | "KEYWORD" | "ANY"
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
  | "Vulnerable"
  | "Focus"
  | "Landmark"
  | "SpellShield"
  | "Fury"
  | "Augment"

declare interface dataCards extends Card{
  associatedCards: string[]
  associatedCardRefs: []
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

type hand = {
  read: boolean
  cards: Card["code"][]
  hit?: boolean
}
declare interface UIElementIterator <Q> {
  name: string
  value: Q
  cost?: number
}

declare interface Card {
  code: string
  name: string
  assets?: {
    gameAbsolutePath: string,
    fullAbsolutePath: string
}[]
  region: string
  cost: number
  keywords: KEYWORD[]
  type?: "Spell" | "Unit"
  supertype?: "Champion"
  count?: number
}

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
  interface props <Z> {
    onSelectedChange(Z): void
    options: UIElementIterator<Z>[]
    name: string
    defaultStr?: string
    defaultNumber?: number
    disabled?: boolean
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


