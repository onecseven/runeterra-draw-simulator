import React, { useState, useCallback } from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import { Dropdown } from "../utils/Dropdown"
import { add, CONDITIONS, ACTIONS } from "./mulliganSlice"

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
  const [action, setAction] = useState<mulliganAction | null>(null)
  const [condition, setCondition] = useState<mulliganCondition | null>("ALWAYS")
  const [referenceCard, setReferenceCard] = useState<Card["code"] | null>(null)

  // prettier-ignore
  const conditionCallback = useCallback((condition) => setCondition(condition), [])
  const actionCallback = useCallback((action) => setAction(action), [])
  const deckCallback = useCallback((card) => setReferenceCard(card), [])

  const handleSubmit = () => {
    dispatch(add({ action, condition, referenceCard, Card: selectedCard.code }))
    goDormant()
  }

  if (!deck || !selectedCard) return null

  const deckOptions = [...new Set(deck)].map(({ name, code }) => {
    return { name: name, value: code }
  }) //_.uniqs the deck, and formats it in the way the dropdown expects

  return (
    <div>
      <br />
      <Dropdown
        options={ACTIONS}
        name={"actions"}
        onSelectedChange={actionCallback}
      />
      <Dropdown
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
