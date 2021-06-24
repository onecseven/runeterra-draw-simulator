import React from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../store/hooks"
import { addTag } from "../../store/dataSlice"
import { TypeSwitcher } from "../rules/tags/typeSpecific/TypeSwitcher"
import { NoDeck } from "../NoDeck"
import { useReset } from "../utils/generic/useReset"
import { TagTypeDropdown } from "../rules/tags/typeSpecific/TagTypeDropdown"
import { TurnDrodpown } from "../rules/tags/typeSpecific/TurnDropdown"
import "./tagQueryBuilder.scss"
import { CardAmountPicker } from "../rules/tags/typeSpecific/CardAmountPicker"
import { NotificationFeedback } from "../rules/NotificationFeedback"
import { isKeyword } from "../utils/typeGuards"

let rollUp = (tagQuery) => {
  let referents = []
  for (let index in tagQuery.referents) {
    if (isKeyword(index)) continue
    let current = tagQuery.referents[index]
    if (current) referents.push(current)
  }
  return referents
}

export const TagQueryBuilder = () => {
  const dispatch = useDispatch()
  const deck = useSelector((state) => state.data.deck.cards)
  const tagQuery = useSelector((state) => state.ui.tagQuery)
  const [formKey, refresh] = useReset()

  if (deck.length == 0) return <NoDeck />

  const handleSubmit = () => {
    let { type, turn, groupName} = tagQuery
    let referents = rollUp(tagQuery)
    dispatch(addTag({ type, referents, turn, groupName}))
    refresh()
  }

  return (
    <form key={formKey} onSubmit={handleSubmit} className="squared">
      <div className="tagContainer top">
        <TagTypeDropdown />
        <CardAmountPicker />
        <TurnDrodpown />
      </div>
      <div className="bot extensible">
        <TypeSwitcher />
      </div>
      <button className="submit button_slide" type="submit">
        Submit counter
      </button>
      <div className="submit2">
        <NotificationFeedback source="Counter" />
      </div>
    </form>
  )
}
