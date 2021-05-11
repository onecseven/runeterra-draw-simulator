import { useState, useCallback } from "react"


export const useStateCallback = <T,>(initialState: T): [T, (arg: T) => void] => {
  const [state, setState] = useState(initialState)
  const stateCallback = useCallback(
    (state: T) => {
      setState(state)
    },
    [],
  )
  return [state, stateCallback]
}
