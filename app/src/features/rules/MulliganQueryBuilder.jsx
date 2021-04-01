import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCard } from "../card/cardSlice"

/*
declare interface MulliganQuery {
  card: [number]
  priority: number
  onHit: {
    action: KEEP THROW
    Condition = "ALWAYS" | "ONLY" | "UNLESS"
    Predicate = "PRESENCE" | "ABSENCE"
    referenceCards: number[]
  }
}
*/

export const MulliganQueryBuilder = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const deck = useSelector(state => state.deck.cards)
  if (!selectedCard || !deck) return null
  let noRepeatDeck = [...new Set(deck)] //_.unique
  let card = noRepeatDeck.find(({code}) => code === selectedCard)
  return (
    <div className="rules">
      Placeholder. Selected card: {card.name}
      I'm thinking of having options, like buttons that stay pressed to mark whhich one you pressed
      [KEEP] [THROWN]
    </div>
  )
}
