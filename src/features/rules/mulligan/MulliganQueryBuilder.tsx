import React, { useState } from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { Dropdown } from "../../utils/generic/UI/Dropdown"
import { useReset } from "../../utils/generic/useReset"
import { deckFilter } from "../../utils/deckFilter"
import { setMulliganReference, setMulliganReferent } from "../../../store/uiSlice"
import {addMulligan} from "../../../store/dataSlice"
import { MulliganActionRadio } from "./mulliganQueryComponents/MulliganActionRadio"
import { MulliganConditionRadio } from "./mulliganQueryComponents/MulliganConditionRadio"
import {NoDeck} from "./../../NoDeck"

export const MulliganQueryBuilder = () => {
  const deck = useSelector((state) => state.data.deck.cards)
  const query = useSelector((state) => state.ui.mulliganQuery)
  const [formKey, refresh] = useReset() 
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addMulligan(query))
    refresh()
  }

  if (deck.length == 0) return (<NoDeck/>)

  let deckOptions = deckFilter(deck)
  deckOptions.unshift({ value: "", name: "Choose a card." })
  return (
    <form onSubmit={handleSubmit} key={formKey}>
      <br />
      <p>Pick a card to add a mulligan rule:</p>
      <Dropdown
        options={deckOptions}
        name={"reference"}
        onSelectedChange={(cardCode) => dispatch(setMulliganReferent(cardCode))}
      />
      <MulliganActionRadio/>
      <MulliganConditionRadio/>
      {query.onHit.condition === "ALWAYS" ? null : (
        <div>
        <p>Which card?</p>
        <Dropdown
          options={deckOptions}
          name={"deck"}
          onSelectedChange={(cardCode) => dispatch(setMulliganReference(cardCode))}
        />
        </div>
      )}
      <button className={'button_slide'} style={{marginTop: "20px"}} type="submit">Submit mulligan rule</button>
    </form>
  )
}
