import React from "react"
import { useAppSelector as useSelector } from "../../store/hooks"
import { Card } from "../card/Card"

export const DeckList = () => {
  const deck = useSelector(state => state.deck.cards)
  if (!deck) return null
  return (<ol>
    {deck.map(card => {
      return (<li><Card card={card}/></li>)
    })}
  </ol>)
}
