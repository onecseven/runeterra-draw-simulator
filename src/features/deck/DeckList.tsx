import React from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { Card } from "../card/Card"
import Collapsable from "../utils/generic/UI/Collapsable"
import {formatDeck} from "../utils/formatDeck"


export const DeckList = () => {
  const deck = useSelector((state) => state.data.deck.cards)
  if (!deck.length) return null
  let formattedDeck = formatDeck(deck)
  return (
     <div className={"deckbox"}>
      {formattedDeck.map((card) => {
        return (
            <Card card={card} />
        )
      })}
      </div>
  )
}
