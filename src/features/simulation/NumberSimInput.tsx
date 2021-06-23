import React, { useState } from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../store/hooks"
import { runMulligan, tagInitialState } from "../../store/dataSlice"
import { InputBox } from "../utils/generic/UI/InputBox/InputBox"
import { setSpinnerOn } from "../../store/uiSlice"
import { countTags } from "../utils/simulateCounter"

export const NumberSimInput = () => {
  const dispatch = useDispatch()
  const hands = useSelector((state) => state.data.simulations.hands)
  const tag = useSelector((state) => state.data.tags.counters[0].tag)

  const handleSubmit = (numberOfSimulations) => {
    event.preventDefault()
    dispatch(setSpinnerOn())
    if (numberOfSimulations > 100000) numberOfSimulations = 100000
    dispatch(runMulligan({ numberOfSimulations }))
  }

  const letsgo = () => {
    console.log("READY SET GO")
    let x = countTags({ hands, tag })
    console.log(x)
  }

  return (
    <>
      <InputBox
        onSubmit={handleSubmit}
        type="number"
        placeholder="Amount of hands to calculate"
        buttonText="Calculate"
        className="deck-input normalpointer"
      />
      {hands.length > 0 ? (
        <button onClick={letsgo}>FOR REAL NOW</button>
      ) : (
        <div />
      )}
    </>
  )
}
