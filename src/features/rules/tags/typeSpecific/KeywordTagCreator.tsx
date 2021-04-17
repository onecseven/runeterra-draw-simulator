import React from 'react'
import { Dropdown } from '../../../utils/Dropdown'
import { KEYWORDS } from "../tagSlice"

let optionKeywords = KEYWORDS.map(keyword => {
  return {
    value: keyword,
    name: keyword
  }
})

export const KeywordTagCreator = ({
  onSelectedChange
}: {onSelectedChange: Dropdown.props["onSelectedChange"]}) => {
  return (
    <Dropdown
    onSelectedChange={onSelectedChange}  
    options={optionKeywords}
    name={"keywords"}
    />
  )
}