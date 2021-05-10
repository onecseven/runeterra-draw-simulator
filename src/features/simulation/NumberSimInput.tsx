import React, { useState } from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { useAppSelector as useSelector } from "../../store/hooks"

import {runMulligan, runTags} from "../../store/dataSlice"

export const NumberSimInput = () => {
  const dispatch = useDispatch()
  const hands = useSelector(state => state.data.simulations.hands)

  const [numberOfSims, setnumberOfSims] = useState(0)

  const handleSubmit = (event) =>{
    event.preventDefault()
    dispatch(runMulligan({numberOfSimulations: numberOfSims}))
  }
  
  const handleCounter = (event) => {
    event.preventDefault()
    dispatch(runTags(null))
  }
  
  const counterButton = (<button onClick={handleCounter}>Counter</button>)


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
      {hands.length ? counterButton : null}
    </div>
  )
}