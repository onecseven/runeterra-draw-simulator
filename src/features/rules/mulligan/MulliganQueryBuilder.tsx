import React from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { Dropdown } from "../../utils/generic/UI/Dropdown"
import { deckFilter } from "../../utils/deckFilter"
import { setMulliganReference, setMulliganReferent } from "../../../store/uiSlice"
import {addMulligan} from "../../../store/dataSlice"
import { MulliganActionRadio } from "./mulliganQueryComponents/MulliganActionRadio"
import { MulliganConditionRadio } from "./mulliganQueryComponents/MulliganConditionRadio"

type BuilderProps = {
  goDormant: Function
}

export const MulliganQueryBuilder = ({ goDormant }: BuilderProps) => {
  const deck = useSelector((state) => state.data.deck.cards)
  const query = useSelector((state) => state.ui.mulliganQuery)
  const dispatch = useDispatch()
  
  // prettier-ignore
  const handleSubmit = () => {
    dispatch(addMulligan(query))
    goDormant()
  }

  if (deck.length == 0) return null

  let deckOptions = deckFilter(deck)
  deckOptions.unshift({ value: "", name: "Choose a card." })
  return (
    <div>
      <br />
      <Dropdown
        options={deckOptions}
        name={"reference"}
        onSelectedChange={(cardCode) => dispatch(setMulliganReferent(cardCode))}
      />
      <MulliganActionRadio/>
      <MulliganConditionRadio/>
      {query.onHit.condition === "ALWAYS" ? null : (
        <Dropdown
          options={deckOptions}
          name={"deck"}
          onSelectedChange={(cardCode) => dispatch(setMulliganReference(cardCode))}
        />
      )}
      <button onClick={handleSubmit}>Submit mulligan rule</button>
    </div>
  )
}
