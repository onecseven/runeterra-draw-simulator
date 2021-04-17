import { createSlice } from "@reduxjs/toolkit"
import { isKeyword } from "../../utils/typeGuards"

interface tagInitialState {
  counters: {
    [id: number]: {
      //should match Counter["id"]
      tag: Tag
      hits: Hand[][]
    }
  }
}

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

const initialState: tagInitialState = {
  counters: {},
}

const getNextId = (state: tagInitialState["counters"]): number => {
  return Object.keys(state).length
}

const tagCreator = (tag: Tag): Tag => {
  return { type: tag.type, turn: tag.turn, referents: tag.referents, ...tag }
}

const tagValidator = ({
  type,
  turn,
  reference,
  referents = null,
  groupName = null,
}: {
  type: TagType
  turn: number
  reference: Card
  referents: Card[]
  groupName: string
}): Tag => {
  switch (type) {
    case "WITH": {
      if (referents) return { type, turn, referents }
      break
    }
    case "SEQUENCE": {
      if (referents) return { type, turn, referents }
      break
    }
    case "WITHOUT": {
      if (referents) return { type, turn, referents }
      break
    }
    case "KEYWORD": {
      if (isKeyword(groupName))
        return { type, turn, groupName, referents }
      break
    }
    case "GROUP": {
      return { type, turn, groupName, referents }
    }
  }
}

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    add: (state, action) => {
      const { type }: { type: TagType } = action.payload
      console.log(`
      tag: ${action}
      why is this not working?
      `)
      let tag = tagValidator(action.payload)
    },
  },
})

/*
      let tag = tagCreator(action.payload)
      let id = getNextId(state.counters)
      state.counters[id] = {
        tag,
        hits: [],
      }
      return state
*/

export const { add } = tagSlice.actions

export default tagSlice.reducer
