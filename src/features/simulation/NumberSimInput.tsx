import React, { useState } from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { runMulligan } from "../../store/dataSlice"
import { InputBox } from "../utils/generic/UI/InputBox/InputBox"
import { setSpinnerOn } from "../../store/uiSlice"


export const NumberSimInput = () => {
  const dispatch = useDispatch()

  const handleSubmit = (numberOfSimulations) => {
    event.preventDefault()
    dispatch(setSpinnerOn())
    if (numberOfSimulations > 1000000) numberOfSimulations = 1000000
    setTimeout(() => dispatch(runMulligan({ numberOfSimulations })), 1)   //
  }

  return (
    <InputBox
      onSubmit={handleSubmit}
      type="number"
      placeholder="Amount of hands to calculate"
      buttonText="Calculate"
      className="deck-input normalpointer"
    />
  )
}
