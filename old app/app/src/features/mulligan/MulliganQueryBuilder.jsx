import React, { useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { Dropdown } from "../utils/Dropdown"

const CONDITIONS = [
  { value: "ALWAYS", name: "Always" },
  { value: "PRESENCE", name: "In the presence of another card" },
  { value: "ABSENCE", name: "In the absence of another card" },
]

const ACTIONS = [
  { value: "KEEP", name: "Keep" },
  { value: "THROW", name: "Thro" },
]

export const MulliganQueryBuilder = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const deck = useSelector((state) => state.deck.cards) || null

  const [action, setAction] = useState(null)
  const [condition, setCondition] = useState("ALWAYS")
  const [referenceCard, setReferenceCard] = useState(null)

  const conditionCallback = useCallback((condition) => setCondition(condition),[])
  const actionCallback = useCallback((action) => setAction(action), [])
  const deckCallback = useCallback((card) =>  setReferenceCard(card), [])

  if (!selectedCard || !deck) return null

  const deckOptions = [...new Set(deck)].map(({ name, code }) => {
    return { name: name, value: code }
  }) //_.uniqs the deck, and formats it in the way the dropdown expects

  return (
    <div className="rules">
      <h1>Selected card: {selectedCard.name}</h1>
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
    </div>
  )
}
