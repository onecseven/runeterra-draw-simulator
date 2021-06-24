export const KEYWORDS: KEYWORD[] = [
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
  "Vulnerable",
  "Focus",
  "Landmark",
  "SpellShield",
  "Fury",
  "Augment",
]

export const TAG_TYPES: UIElementIterator<TagType>[] = [
  { name: "Sequence", value: "SEQUENCE" },
  { name: "Group", value: "WITH" },
  { name: "Exclusive", value: "WITHOUT" },
  { name: "Keyword", value: "KEYWORD" },
  { name: "Any", value: "ANY" }, 
]

export const TURNS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
  (v, i) => {
    return { value: v, name: v.toString() }
  }
)

export const CONDITIONS: UIElementIterator<mulliganCondition>[] = [
  { value: "ALWAYS", name: "Always" },
  { value: "PRESENCE", name: "In the presence of another card" },
  { value: "ABSENCE", name: "In the absence of another card" },
]

export const ACTIONS: UIElementIterator<mulliganAction>[] = [
  { value: "KEEP_ALL", name: "Keep all copies that show up" },
  { value: "KEEP_ONE", name: "Keep only one copy" },
  { value: "KEEP_TWO", name: "Keep two copies but throw the third" },
  { value: "THROW", name: "Throw" },
]