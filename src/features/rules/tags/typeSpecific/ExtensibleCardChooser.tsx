import React from "react"
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from "../../../../store/hooks"
import { setTagReferents } from "../../../../store/uiSlice"
import { deckFilter } from "../../../utils/deckFilter"
import { doTimes } from "../../../utils/generic/doTimes"
import { StyledDropdown } from "../../../utils/generic/UI/StyledDropdown/StyledDropdown"
export const ExtensibleCardChooser = () => {
  const amountOfReferents = useSelector(
    (state) => state.ui.tagQueryBuilder.amountOfReferents
  )
  const dispatch = useDispatch()
  const deck = useSelector((state) => state.data.deck.cards)
  let deckOptions = deckFilter(deck)
  const handleChange = (code, index) => {
    dispatch(setTagReferents({code, index}))
  }
  let elements = []
  doTimes(() => {
    let id = elements.length
    elements.push((
      <div className={`extensible${id+1}`}>
        <StyledDropdown
          options={deckOptions}
          name={`referents`}
          onSelectedChange={(code) => handleChange(code, id)}
          defaultStr="Choose a card"
        />
      </div>)
    )
  }, amountOfReferents)
  return (
    <>
    <h3 className={`extensible0 ${amountOfReferents === 0 ? "disabled-tqb" : "" }`}>Select the cards you want to keep track of:</h3>
    {...elements}
    </>
    )
}
