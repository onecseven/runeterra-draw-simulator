import React from "react"
import { Dropdown } from "../../../utils/generic/UI/Dropdown"
import { KEYWORDS } from "../../../../store/constants"
import { useAppSelector as useSelector } from "../../../../store/hooks"
import { formatDeck } from "../../../utils/formatDeck"

let optionKeywords = KEYWORDS.map((keyword) => {
  return {
    value: keyword,
    name: keyword,
  }
})

optionKeywords.unshift({value: "", name: "Choose a keyword"})

export const KeywordTagCreator = ({
  onSelectedChange,
  referentsCallback,
}: {
  onSelectedChange: Dropdown.props["onSelectedChange"]
  referentsCallback: Dropdown.props["onSelectedChange"]
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
    <Dropdown
      onSelectedChange={handleChange}
      options={optionKeywords}
      name={"keywords"}
    />
  )
}
