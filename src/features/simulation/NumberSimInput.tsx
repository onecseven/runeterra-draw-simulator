import React, { useState } from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { runMulligan } from "../../store/dataSlice"
import { InputBox } from "../utils/generic/UI/InputBox/InputBox"

export const NumberSimInput = () => {
  const dispatch = useDispatch()

  const handleSubmit = (numberOfSimulations) => {
    event.preventDefault()
    dispatch(runMulligan({ numberOfSimulations }))
  }

  return (
    <InputBox
      onSubmit={handleSubmit}
      type="number"
      placeholder="Amount of hands to calculate"
      buttonText="Calculate"
      className="deck-input"
    />
  )
}
