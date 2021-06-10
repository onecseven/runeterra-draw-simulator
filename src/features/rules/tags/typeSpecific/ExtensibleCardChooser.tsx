import React from 'react'
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../../../store/hooks"
import { deckFilter } from "../../../utils/deckFilter"
import { ExtensibleDropdown } from '../../../utils/generic/UI/ExtensibleDropdown'


export const ExtensibleCardChooser = ({onSelectedChange}) => {
  const deck = useSelector((state) => state.data.deck.cards)
  let deckOptions = deckFilter(deck)

  return (
        <ExtensibleDropdown
        options={deckOptions}
        name={"referents"}
        onSelectedChange={onSelectedChange}
        defaultNumber={5}
      />
  )
}
