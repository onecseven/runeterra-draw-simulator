import React from "react"
import { KEYWORDS } from "../../../../store/constants"
import { useAppSelector as useSelector } from "../../../../store/hooks"
import { formatDeck } from "../../../utils/formatDeck"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"

let optionKeywords: UIElementIterator<KEYWORD>[] = KEYWORDS.map((keyword) => {
  return {
    value: keyword,
    name: keyword,
  }
})

optionKeywords.unshift({value: null, name: "Choose a keyword"})

export const KeywordTagCreator = ({
  onSelectedChange,
  referentsCallback,
}: {
  onSelectedChange: Dropdown.props<KEYWORD>["onSelectedChange"]
  referentsCallback: Dropdown.props<KEYWORD>["onSelectedChange"]
}) => {
  const deck = useSelector((state) => state.data.deck.cards)
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
  const handleChange = (value: string) => {
    let referents = findCards(value)
    referentsCallback(referents)
    onSelectedChange(value)
  }
  return (
    <StyledDropdown
      onSelectedChange={handleChange}
      options={optionKeywords}
      name={"keywords"}
    />
  )
}
