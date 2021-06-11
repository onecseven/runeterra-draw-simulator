import React from "react"
import { TAG_TYPES } from "../../../../store/constants"
import {
  useAppDispatch as useDispatch,
} from "../../../../store/hooks"
import { setTagType } from "../../../../store/uiSlice"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"

export const TagTypeDropdown = () => {
  const dispatch = useDispatch()
  const handleChange = (tag) => {
     dispatch(setTagType(tag)) 
  }
 
  return (
    <div className="tag">
    <p>How should the counter work?</p>
      <StyledDropdown
        options={TAG_TYPES}
        name={"types"}
        onSelectedChange={handleChange}
        defaultStr={"Choose"}
      />
    </div>
  )
}
