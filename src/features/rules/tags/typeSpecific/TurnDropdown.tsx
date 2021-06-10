import React, { useState } from "react"
import { TURNS } from "../../../../store/constants"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../../../store/hooks"
import { RegulatedInput } from "../../../utils/generic/UI/RegulatedInput"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"

export const TurnDrodpown = ({ onSelectedChange }) => {
  return (
    <div className="turn" >
    <p>What is the cutoff turn for this counter?</p>
    <RegulatedInput 
    name="turn-picker"
    max={15}
    min={1}
    onSelectedChange={onSelectedChange}
    />
    </div>
  )
}

