import React, { useState, useCallback } from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { Dropdown } from "../../utils/Dropdown"
import { add, CONDITIONS, ACTIONS } from "./mulliganSlice"
import {RadioChoices} from "../../utils/RadioChoices"
import { deckFilter } from "../../utils/deckFilter"

type BuilderProps = {
  selectedCard: Card
  goDormant: Function
}

export const MulliganQueryBuilder = ({
  selectedCard,
  goDormant,
}: BuilderProps) => {
  const deck = useSelector((state) => state.deck.cards)
  const dispatch = useDispatch()
  const [action, setAction] = useState<mulliganAction | null>("KEEP")
  const [condition, setCondition] = useState<mulliganCondition | null>("ALWAYS")
  const [referenceCard, setReferenceCard] = useState<Card["code"] | null>(null)

  // prettier-ignore
  const conditionCallback = useCallback((condition) => setCondition(condition), [])
  const actionCallback = useCallback((action) => setAction(action), [])
  const deckCallback = useCallback((card) => setReferenceCard(card), [])

  const handleSubmit = () => {
    dispatch(add({mulliganAction: action, condition, reference: referenceCard, referent: selectedCard.code }))
    goDormant()
  }

  if (!deck || !selectedCard) return null

  let deckOptions = deckFilter(deck)

  return (
    <div>
      <br />
      <RadioChoices
        options={ACTIONS}
        name={"actions"}
        onSelectedChange={actionCallback}
      />
      <RadioChoices
        options={CONDITIONS}
        name={"conditions"}
        onSelectedChange={conditionCallback}
      />
      {condition === "ALWAYS" ? null : (
        <Dropdown
          options={deckOptions}
          name={"deck"}
          onSelectedChange={deckCallback}
        />
      )}
      <button onClick={handleSubmit}>Submit mulligan rule</button>
    </div>
  )
}
