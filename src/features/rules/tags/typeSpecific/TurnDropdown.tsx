import React, { useState } from "react"
import { TURNS } from "../../../../store/constants"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../../../store/hooks"
import { setTagTurns } from "../../../../store/uiSlice"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"

export const TurnDrodpown = () => {
  const dispatch = useDispatch()
  const handleChange = (turns) => {
    dispatch(setTagTurns(turns))
  }
  return (
    <div className="turn">
      <p>What is the cutoff turn for this counter?</p>
      <StyledDropdown
        name="turn-picker"
        onSelectedChange={handleChange}
        options={TURNS.slice(0, 15)}
        defaultStr="0"
      />
    </div>
  )
}
