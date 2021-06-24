import React, { useState } from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { useReset } from "../utils/generic/useReset"
import { deckFilter } from "../utils/deckFilter"
import {
  setMulliganReference,
  setMulliganReferent,
  clearUI,
} from "../../store/uiSlice"
import { addMulligan } from "../../store/dataSlice"
import { MulliganActionRadio } from "../rules/mulligan/mulliganQueryComponents/MulliganActionRadio"
import { MulliganConditionRadio } from "../rules/mulligan/mulliganQueryComponents/MulliganConditionRadio"
import { NoDeck } from "../NoDeck"
import { StyledDropdown } from "../utils/generic/UI/StyledDropdown/StyledDropdown"
import { NotificationFeedback } from "../rules/NotificationFeedback"

const ALL = {name: "All", value: "ALL"}


export const MulliganQueryBuilder = () => {
  const deck = useSelector((state) => state.data.deck.cards)
  const query = useSelector((state) => state.ui.mulliganQuery)
  const dispatch = useDispatch()
  const [formKey, reset] = useReset()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addMulligan(query))
    reset()
  }
  /*
  Add an ALL option to deckFilter
  */

  if (deck.length == 0) return <NoDeck />
  let deckOptions = deckFilter(deck)
  let deckOptionsWithAll = [ALL].concat(deckOptions.slice())
  let secondDeckDropdownVisibility =
    query.onHit.condition === "ALWAYS" || query.referent === null

  return (
    <form
      onSubmit={handleSubmit}
      className="mulliganQueryBuilder"
      key={formKey}
    >
      <p>Pick a card:</p>
      <StyledDropdown
        options={deckOptionsWithAll}
        name={"reference"}
        onSelectedChange={(cardCode) => dispatch(setMulliganReferent(cardCode))}
        defaultStr="Choose a card"
      />
      <MulliganActionRadio />
      <MulliganConditionRadio />
      <div className={secondDeckDropdownVisibility ? "hidden" : "mulliganQueryBuilder"}>
        <p>Which card?</p>
        <StyledDropdown
          options={deckOptions.filter((card) => card.value !== query.referent)}
          name={"reference"}
          onSelectedChange={(cardCode) =>
            dispatch(setMulliganReference(cardCode))
          }
          defaultStr="Pick another one"
        />
      </div>
      <div>
        <button
          className={"button_slide"}
          style={{ marginTop: "20px" }}
          type="submit"
        >
          Add mulligan rule
        </button>
        <div style={{"display": "inline-block"}}>
          <NotificationFeedback source={"Mulligan"} />
        </div>
      </div>
    </form>
  )
}
