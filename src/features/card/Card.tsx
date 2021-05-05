import React from "react"
import { useAppDispatch as useDispatch, useAppSelector } from "../../store/hooks"
import { useAppSelector as useSelector } from "../../store/hooks"
import {clearSelection, selectCard} from "./cardSlice"

type CardProps = {
  card: Card
}

//TODO fix selector

export const  Card = ({card}: CardProps) => {
  const dispatch = useDispatch()
  const selectedCard = useSelector(state => state.card.selectedCard)
  if (!card) return null
  const isSelected = (selectedCard && selectedCard.code == card.code)
  const handleSelect = () => {
    if (isSelected) {
      dispatch(clearSelection({payload: card.code}))
    } else {
      dispatch(selectCard(card))
    }
  }

return (<div onClick={handleSelect} >
  <span className={isSelected ? "selected" : null}>({card.cost}) {card.name} [{card.count}]</span> 
</div>)
}