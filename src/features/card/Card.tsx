import React from "react"
import { useAppDispatch as useDispatch, useAppSelector } from "../../store/hooks"
import { useAppSelector as useSelector } from "../../store/hooks"
import {selectCard} from "./cardSlice"

type CardProps = {
  card: formattedCard
}


export const  Card = ({card}: CardProps) => {
  const dispatch = useDispatch()
  const selectedCard = useSelector(state => state.card.selectedCard)
  if (!card) return null
  const handleSelect = () => {
    dispatch(selectCard(card))
  }
  const isSelected = (selectedCard && selectedCard.code == card.code)

return (<div onClick={handleSelect} >
  <span className={isSelected ? "selected" : null}>({card.cost}) {card.name} [{card.count}]</span> 
</div>)
}