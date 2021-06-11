import React from "react"
import {
useAppDispatch as useDispatch,
useAppSelector as useSelector,
} from "../../../../store/hooks"
import { setAmountTagReferents } from "../../../../store/uiSlice"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"
import { TURNS } from "../../../../store/constants"

export const CardAmountPicker = () => {
  const dispatch = useDispatch()
  const tag = useSelector(state => state.ui.tagQuery.type)
  const handleChange = (num) => {
    dispatch(setAmountTagReferents(num))
  }
  return (
    <div className="cardAmount">
      <p>How many cards should we keep track of?</p>
      <StyledDropdown
        name="cardAmountInput"
        onSelectedChange={handleChange}
        options={TURNS.slice(0,5)}
        defaultStr={"0"}
        disabled={tag === "KEYWORD"}
      />
    </div>
  )
}
