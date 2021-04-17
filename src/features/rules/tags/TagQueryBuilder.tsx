import React from "react"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { Dropdown } from "../../utils/Dropdown"
import { useStateCallback } from "../../utils/useStateCallback"
import { TAG_TYPES, add, TURNS } from "./tagSlice"
import { TypeSwitcher } from "./typeSpecific/TypeSwitcher"
import { isTagType } from "../../utils/typeGuards"

type BuilderProps = {
  selectedCard: Card
  goDormant: Function
}

let TagTypes = TAG_TYPES.map(({ value }) => {
  if (isTagType(value)) {
    return value
  }
})

export const TagQueryBuilder = ({ selectedCard, goDormant }: BuilderProps) => {
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

  if (!selectedCard) return null

  const handleSubmit = () => {
    dispatch(add({ type, referents, turn, groupName}))
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
