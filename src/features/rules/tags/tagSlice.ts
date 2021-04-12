import { createSlice } from "@reduxjs/toolkit"

interface tagInitialState {
  counters: {
    [id: number]: { //should match Counter["id"]
      tag: Tag,
      hits: Hand[][]
    }
  }
}

const initialState: tagInitialState = {
  counters: {
  }
}


export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    add: (state, action) => {
      return state
    },
  },
})

export const { add } = tagSlice.actions

export default tagSlice.reducer
