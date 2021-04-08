import React from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { Card } from "../card/Card"
import {formatDeck} from "../utils/formatDeck"


export const DeckList = () => {
  const deck = useSelector((state) => state.deck.cards)
  if (!deck) return null
  let formattedDeck = formatDeck(deck)
  return (
    <div>
      {formattedDeck.map((card) => {
        return (
            <Card card={card} />
        )
      })}
    </div>
  )
}
