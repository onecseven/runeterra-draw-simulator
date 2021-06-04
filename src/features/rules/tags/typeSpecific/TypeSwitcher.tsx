import React from "react"
import { useAppSelector as useSelector } from "../../../../store/hooks"
import { deckFilter } from "../../../utils/deckFilter"
import { GroupTagCreator } from "./GroupTagCreator"
import { ExtensibleDropdown } from "../../../utils/generic/UI/ExtensibleDropdown"
import { KeywordTagCreator } from "./KeywordTagCreator"

export const TypeSwitcher = ({
  referentsCallback,
  groupNameCallback,
  tag,
  deck
}: {
  referentsCallback: Dropdown.props<Card["code"]>["onSelectedChange"]
  groupNameCallback: Dropdown.props<Card["code"]>["onSelectedChange"]
  tag: TagType
  deck: Card[]
}) => {
  let deckOptions = deckFilter(deck)
  deckOptions.unshift({ value: "", name: "Choose a card." })
  
  if (tag === "GROUP") {
    return (
      <GroupTagCreator
        onGroupChange={groupNameCallback}
        onCardChange={referentsCallback}
        options={deckOptions}
      />
    )
  } else if (tag === "KEYWORD") {
    return <KeywordTagCreator onSelectedChange={groupNameCallback} referentsCallback={referentsCallback} />
  } else {
    return (
      <ExtensibleDropdown
        options={deckOptions}
        name={"referents"}
        onSelectedChange={referentsCallback}
        defaultNumber={2}
      />
    )
  }
}
