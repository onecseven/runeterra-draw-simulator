import { createSlice } from "@reduxjs/toolkit"
import { isKeyword } from "../../utils/typeGuards"

export interface tagInitialState {
  counters: {
    [id: number]: {
      //should match Counter["id"]
      tag: Tag
      hits: Card["code"][][]
    }
  }
}

const initialState: tagInitialState = {
  counters: {},
}

export const tagValidator = (
  { type, turn, referents = null, groupName = null }: Tag,
  deck: Card[]
): Tag => {
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
      if (isKeyword(groupName)) {
        return { type, turn, groupName, referents }
      }

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
      let tag = tagValidator(action.payload, [])
      if (tag) {
        let id = Object.keys(state.counters).length + 1
        state.counters[id] = {
          tag,
          hits: [],
        }
        return state
      }
    },
  },
})

export const { add } = tagSlice.actions

export default tagSlice.reducer
