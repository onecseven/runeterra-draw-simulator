import { useState, useCallback } from "react"


export const useReset = (): [number, () => void] => {
  const [state, setState] = useState(Math.random())
  const refresh = useCallback(
    () => {
      setState(Math.random())
    },
    [],
  )
  return [state, refresh]
}
