import React from "react"
import { TURNS } from "../../../../store/constants"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../../../store/hooks"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"

export const TurnDrodpown = ({ onSelectedChange }) => {
  return (
    <div className="turn border-orange" style={{margin:"5px"}}>
    <p>What should be the cutoff turn for this counter?</p>
      <StyledDropdown
        options={TURNS}
        name={"turns"}
        onSelectedChange={onSelectedChange}
      />
    </div>
  )
}

