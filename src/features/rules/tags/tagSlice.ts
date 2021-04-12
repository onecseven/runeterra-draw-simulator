import { createSlice } from "@reduxjs/toolkit"
import { strict } from "node:assert"

interface tagInitialState {
  counters: {
    [id: number]: {
      //should match Counter["id"]
      tag: Tag
      hits: Hand[][]
    }
  }
}

export const TAG_TYPES: UIElementIterator[] = [
  { name: "Sequence", value: "SEQUENCE" },
  { name: "Link", value: "WITH" },
  { name: "Exclusive", value: "WITHOUT" },
  { name: "Keyword", value: "KEYWORD" },
  { name: "Custom Grouping", value: "GROUP" },
]
export const TIMING: UIElementIterator[] = [{name: "Strict", value: "EXACT"}, {name: "Relative", value:"RELATIVE"}]

const initialState: tagInitialState = {
  counters: {},
}

const getNextId = (state: tagInitialState["counters"]): number => {
  return Object.keys(state).length
}

const tagCreator = (tag: Tag): Tag => {
  return { type: tag.type, turn: tag.turn, referents: tag.referents, ...tag }
}

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    add: (state, action) => {
      let tag = tagCreator(action.payload)
      let id = getNextId(state.counters)
      state.counters[id] = {
        tag,
        hits: [],
      }
      return state
    },
  },
})

export const { add } = tagSlice.actions

export default tagSlice.reducer
