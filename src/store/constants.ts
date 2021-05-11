export const KEYWORDS = [
  "Burst",
  "Quick Attack",
  "Fast",
  "Lifesteal",
  "Elusive",
  "Imbue",
  "Ephemeral",
  "Slow",
  "Skill",
  "Challenger",
  "Overwhelm",
  "Regeneration",
  "Can't Block",
  "Last Breath",
  "Fearsome",
  "Barrier",
  "Fleeting",
  "Tough",
  "Double Attack",
  "Trap",
  "Attune",
  "Deep",
  "Immobile",
  "Scout",
  "Missing Translation",
  "Vulnerable",
  "Focus",
  "Landmark",
  "SpellShield",
  "Fury",
  "Augment",
]

export const TAG_TYPES: UIElementIterator[] = [
  { name: "Sequence", value: "SEQUENCE" },
  { name: "Link", value: "WITH" },
  { name: "Exclusive", value: "WITHOUT" },
  { name: "Keyword", value: "KEYWORD" },
  { name: "Custom Grouping", value: "GROUP" },
]
export const TIMING: UIElementIterator[] = [
  { name: "Strict", value: "EXACT" },
  { name: "Relative", value: "RELATIVE" },
]

export const TURNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
  (v, i) => {
    return { value: v, name: v.toString() }
  }
)

export const CONDITIONS: UIElementIterator[] = [
  { value: "ALWAYS", name: "Always" },
  { value: "PRESENCE", name: "In the presence of another card" },
  { value: "ABSENCE", name: "In the absence of another card" },
]

export const ACTIONS: UIElementIterator[] = [
  { value: "KEEP", name: "Keep" },
  { value: "THROW", name: "Throw" },
]