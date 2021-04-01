import React from "react"
import { useSelector } from "react-redux"

export const DeckList = () => {
  const deck = useSelector(state => state.deck.cards)
  if (!deck) return null
  return (<ol>
    {deck.map(card => {
      return (<li>{card.name}</li>)
    })}
  </ol>)
}
