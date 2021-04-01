import React from "react"
import {useDispatch} from "react-redux"
import {selectCard} from "./cardSlice"

export const  Card = ({card}) => {
  const dispatch = useDispatch()
  console.log(card)
  const handleSelect = () => {
    dispatch(selectCard(card.code))
  }
return (<div onClick={handleSelect}>
  <p>{card.name}</p>
</div>)
}