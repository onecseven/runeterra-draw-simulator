import React from "react"
import { useAppDispatch as useDispatch } from "../../store/hooks"
import {selectCard} from "./cardSlice"

export const  Card = ({card}) => {
  const dispatch = useDispatch()
  if (!card) return null
  const handleSelect = () => {
    dispatch(selectCard(card))
  }
return (<div onClick={handleSelect}>
  <p>{card.name}</p>
</div>)
}