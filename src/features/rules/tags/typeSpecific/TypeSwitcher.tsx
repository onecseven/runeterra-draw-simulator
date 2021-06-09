import React from "react"
import { GroupTagCreator } from "./GroupTagCreator"
import { KeywordTagCreator } from "./KeywordTagCreator"
import { ExtensibleCardChooser } from "./ExtensibleCardChooser"

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
  
  if (tag === "GROUP") {
    return (null)
  } else if (tag === "KEYWORD") {
    return <KeywordTagCreator onSelectedChange={groupNameCallback} referentsCallback={referentsCallback} />
  } else {
    return (
      <ExtensibleCardChooser onSelectedChange={referentsCallback}/>
    )
  }
}
