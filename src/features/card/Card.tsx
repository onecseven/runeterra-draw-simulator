import React from "react"

type CardProps = {
  card: Card
}

export const  Card = ({card}: CardProps) => {
  if (!card) return null
  
return (<div className={"cardContainer"} >
  <img className={"card"} src={card.assets[0].gameAbsolutePath} alt={card.name}/>
  <span>x[{card.count}]</span> 
</div>)
}