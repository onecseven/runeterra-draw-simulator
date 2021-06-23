import React from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { Card } from "../card/Card"
import {formatDeck} from "../utils/formatDeck"


export const DeckList = () => {
  const deck = useSelector((state) => state.data.deck.cards)
  if (!deck.length) return null
  let formattedDeck = formatDeck(deck)
  return (
     <div className={"deckbox"}>
      {formattedDeck.map((card, index) => {
        return (
            <Card key={`decklist${index}`} card={card} />
        )
      })}
      </div>
  )
}
