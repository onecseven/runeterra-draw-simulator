import React from "react"

type CardProps = {
  card: Card
}


export const  Card = ({card}: CardProps) => {
  if (!card) return null

return (<div >
  <span>({card.cost}) {card.name} [{card.count}]</span> 
</div>)
}