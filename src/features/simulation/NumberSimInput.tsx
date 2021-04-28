import React, { useState } from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { useAppSelector as useSelector } from "../../store/hooks"
import {run} from "./simulationSlice"

export const NumberSimInput = () => {
  const dispatch = useDispatch()
  const deck = useSelector((state) => state.deck.cards)
  const mulliganQueries = useSelector((state) => state.mulligan.queries)
  const tags = useSelector((state) => state.tags.counters)

  const [numberOfSims, setnumberOfSims] = useState(0)
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    dispatch(run({numberOfSimulations: numberOfSims, deck, mulliganQueries, tags}))
  }

  return (
    <div className="deck-input">
      <form onSubmit={handleSubmit}>
        <input 
        type="number"
        value={numberOfSims}
        onChange={(e) => setnumberOfSims(Number(e.target.value))}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}