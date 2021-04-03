import React, { useState } from "react"
import {useSelector} from "react-redux"
import { selectCard } from "../card/cardSlice"
import { MulliganConditionDropdown } from "./MulliganConditionDropdown"

/*
declare interface MulliganQuery {
  card: [number]
  priority: number
  onHit: {
    action: KEEP THROW
    Condition = "ALWAYS" | "PRESENCE" | "ABSENCE"
    referenceCards: number[]
  }
}
*/

export const MulliganQueryBuilder = () => {
  const selectedCardCode = useSelector((state) => state.card.selectedCard)
  const deck = useSelector(state => state.deck.cards)
  const [action, setAction] = useState(null)
  const [condition, setCondition] = useState(null)

  if (!selectedCardCode || !deck) return null
  let noRepeatDeck = [...new Set(deck)] //_.unique
  let card = noRepeatDeck.find(({code}) => code === selectedCardCode)
  console.log(action)
  return (
    <div className="rules">
      Selected card: {card.name}
      <MulliganConditionDropdown onSelectedChange={setCondition} />
    </div>
  )
}
