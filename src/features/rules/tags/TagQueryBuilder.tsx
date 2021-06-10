import React from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../../store/hooks"
import { useStateCallback } from "../../utils/generic/useStateCallback"
import { addTag } from "../../../store/dataSlice"
import { TAG_TYPES, TURNS } from "../../../store/constants"
import { TypeSwitcher } from "./typeSpecific/TypeSwitcher"
import { NoDeck } from "../../NoDeck"
import { useReset } from "../../utils/generic/useReset"
import { TagTypeDropdown } from "./typeSpecific/TagTypeDropdown"
import { TurnDrodpown } from "./typeSpecific/TurnDropdown"
import "./tagQueryBuilder.scss"
import { CardAmountPicker } from "./typeSpecific/CardAmountPicker"

let TagTypes = TAG_TYPES.map(({ value }) => {
  
  return value
})

export const TagQueryBuilder = () => {
  const dispatch = useDispatch()
  const [type, setType] = useStateCallback<TagType>(TagTypes[0])
  const [turn, setTurn] = useStateCallback<number>(
    TURNS.map(({ value }) => value)[0]
  )
  const [referents, setReferents] =
    useStateCallback<Card["code"][] | null>(null)
  const [groupName, setGroupName] = useStateCallback<string | null>(null)
  const deck = useSelector((state) => state.data.deck.cards)
  const [formKey, refresh] = useReset()

  if (deck.length == 0) return <NoDeck />

  const handleSubmit = () => {
    dispatch(addTag({ type, referents, turn, groupName }))
    refresh()
  }

  return (
    <form key={formKey} onSubmit={handleSubmit} className="squared">
      <div className="tagContainer top">
        <TagTypeDropdown setType={setType} />
        <CardAmountPicker/>
        <TurnDrodpown onSelectedChange={setTurn} />
      </div>
      <div className="bot extensible">

      <TypeSwitcher
        referentsCallback={setReferents}
        groupNameCallback={setGroupName}
        tag={type}
        deck={deck}
        />
        </div>
      <button className="submit button_slide" type="submit">
        Submit mulligan rule
      </button>
    </form>
  )
}
