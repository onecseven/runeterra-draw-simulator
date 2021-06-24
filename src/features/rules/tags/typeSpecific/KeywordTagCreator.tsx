import React from "react"
import { KEYWORDS } from "../../../../store/constants"
import {
useAppDispatch as useDispatch,
useAppSelector as useSelector,
} from "../../../../store/hooks"
import { setTagReferents } from "../../../../store/uiSlice"
import { formatDeck } from "../../../utils/formatDeck"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"

let optionKeywords: UIElementIterator<KEYWORD>[] = KEYWORDS.map((keyword) => {
  return {
    value: keyword,
    name: keyword,
  }
})

export const KeywordTagCreator = ({
}: {
}) => {
  const deck = useSelector((state) => state.data.deck.cards)
  const dispatch = useDispatch()
  const findCards = (userKeyword) => {
    return formatDeck(deck)
      .filter((card) => {
        for (let keyword of card.keywords) {
          if (keyword === userKeyword) {
            return true
          }
        }
      })
      .map(({ code }) => code)
  }

  const handleChange = (value: KEYWORD) => {
    let referents = findCards(value)
    dispatch(
      setTagReferents({
        code: referents,
        index: value
      })
    )
  }
  
  return (
    <StyledDropdown
      onSelectedChange={handleChange}
      options={optionKeywords}
      name={"keywords"}
      defaultStr="Choose a keyword."
    />
  )
}
