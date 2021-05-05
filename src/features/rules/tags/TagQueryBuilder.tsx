import React from "react"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { Dropdown } from "../../utils/Dropdown"
import { useStateCallback } from "../../utils/useStateCallback"
import { addTag } from "../../../store/dataSlice"
import { TAG_TYPES, TURNS} from "../../../store/constants"
import { TypeSwitcher } from "./typeSpecific/TypeSwitcher"
import { isTagType } from "../../utils/typeGuards"

type BuilderProps = {
  goDormant: Function
}

let TagTypes = TAG_TYPES.map(({ value }) => {
  if (isTagType(value)) {
    return value
  }
})

export const TagQueryBuilder = ({ goDormant }: BuilderProps) => {
  const dispatch = useDispatch()
  const [type, setType] = useStateCallback<TagType>(TagTypes[0])
  const [turn, setTurn] = useStateCallback<UIElementIterator["value"]>(
    TURNS.map(({ value }) => value)[0]
  )
  const [referents, setReferents] = useStateCallback<Card["code"][] | null>(
    null
  )
  const [groupName, setGroupName] = useStateCallback<Card["code"][] | null>(
    null
  )


  const handleSubmit = () => {
    dispatch(addTag({ type, referents, turn, groupName}))
    goDormant()
  }

  return (
    <div>
      <Dropdown options={TAG_TYPES} name={"types"} onSelectedChange={setType} />
      <Dropdown options={TURNS} name={"turns"} onSelectedChange={setTurn} />
      <TypeSwitcher
        referentsCallback={setReferents}
        groupNameCallback={setGroupName}
        tag={type}
      />
      <button onClick={handleSubmit}>Submit mulligan rule</button>
    </div>
  )
}
