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

const initialState: tagInitialState = {
  counters: {},
}

const getNextId = (state: tagInitialState["counters"]): number => {
  return Object.keys(state).length
}

const tagValidator = ({
  type,
  turn,
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
      let tag = tagValidator(action.payload)
      if (tag) {
        let id = getNextId(state)
        state.counters[id] = {
          tag,
          hits: []
        }
      return state
      }
    },
  },
})

export const { add } = tagSlice.actions

export default tagSlice.reducer
