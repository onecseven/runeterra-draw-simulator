import React from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { Card } from "../card/Card"
import Collapsable from "../utils/Collapsable"
import {formatDeck} from "../utils/formatDeck"


export const DeckList = () => {
  const deck = useSelector((state) => state.deck.cards)
  if (!deck.length) return null
  let formattedDeck = formatDeck(deck)
  return (
    <Collapsable name={"Deck"} openedByDefault={false} className="  " >
     <>
      {formattedDeck.map((card) => {
        return (
            <Card card={card} />
        )
      })}
      </>
    </Collapsable>
  )
}
