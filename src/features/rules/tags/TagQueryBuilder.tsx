import React from "react"
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../../store/hooks"
import { Dropdown } from "../../utils/generic/UI/Dropdown"
import { useStateCallback } from "../../utils/generic/useStateCallback"
import { addTag } from "../../../store/dataSlice"
import { TAG_TYPES, TURNS} from "../../../store/constants"
import { TypeSwitcher } from "./typeSpecific/TypeSwitcher"
import { isTagType } from "../../utils/typeGuards"
import { NoDeck } from "../../NoDeck"
import { useReset } from "../../utils/generic/useReset"

let TagTypes = TAG_TYPES.map(({ value }) => {
  if (isTagType(value)) {
    return value
  }
})

export const TagQueryBuilder = () => {
  const dispatch = useDispatch()
  const [type, setType] = useStateCallback<TagType>(TagTypes[0])
  const [turn, setTurn] = useStateCallback<number>(
    TURNS.map(({ value }) => value)[0]
  )
  const [referents, setReferents] = useStateCallback<Card["code"][] | null>(
    null
  )
  const [groupName, setGroupName] = useStateCallback<string | null>(
    null
  )
  const deck = useSelector((state) => state.data.deck.cards)
  const [formKey, refresh] = useReset() 

  if (deck.length == 0) return (<NoDeck/>)

  const handleSubmit = () => {
    dispatch(addTag({ type, referents, turn, groupName}))
    refresh()
  }

  return (
    <form key={formKey} onSubmit={handleSubmit}>
      <Dropdown options={TAG_TYPES} name={"types"} onSelectedChange={setType} />
      <Dropdown options={TURNS} name={"turns"} onSelectedChange={setTurn} />
      <TypeSwitcher
        referentsCallback={setReferents}
        groupNameCallback={setGroupName}
        tag={type}
        deck={deck}
      />
      <button type="submit" >Submit mulligan rule</button>
    </form>
  )
}
