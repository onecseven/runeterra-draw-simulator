import React, { useState } from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { runMulligan } from "../../store/dataSlice"

export const NumberSimInput = () => {
  const dispatch = useDispatch()

  const [numberOfSims, setnumberOfSims] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(runMulligan({ numberOfSimulations: numberOfSims }))
  }

  return (
    <div className="deck-input">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={numberOfSims}
          onChange={(e) => setnumberOfSims(Number(e.target.value))}
        ></input>
        <button type="submit">Mulligan</button>
      </form>
    </div>
  )
}
