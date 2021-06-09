import React from "react"
import { TAG_TYPES } from "../../../../store/constants"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../../../store/hooks"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"

export const TagTypeDropdown = ({ setType }) => {
  return (
    <div className="tag">
    <p>How should the counter work?</p>
      <StyledDropdown
        options={TAG_TYPES}
        name={"types"}
        onSelectedChange={setType}
      />
    </div>
  )
}
