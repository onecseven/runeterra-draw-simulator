import React from "react"
import {formatDeck} from "../../../utils/formatDeck"
import { Card } from "../../../card/Card"
import Collapsable from "../../../utils/generic/UI/Collapsable"
import { useAppSelector as useSelector } from "../../../../store/hooks"
import { useReset } from "../../../utils/generic/useReset"


export const tagLabel = (tag: Tag): string => {
  let {type, turn, groupName} = tag
  switch (type) {
    case "WITH": {
      return `Every hand that draws the following cards by turn ${turn} (in any order)`
    }
    case "WITHOUT": {
      return `Every hand that draws some, but not all of the following cards, by ${turn}. (excluding hands where none are drawn) `
    }
    case "SEQUENCE": {
      return `Every hand that draws the following cards together by turn ${turn}, in the following order.`
    }
    case "KEYWORD": {
      return `Every hand that contain any cards which have the keyword "${groupName}" by turn ${turn}`
    }
    case "ANY": {
      return `Hands that contain any of the following cards by turn ${turn}`
    }
  }
}


export const Tag = ({ tag, title = null}: { tag: Tag, title?: string}) => {
  const deck = useSelector((state) => formatDeck(state.data.deck.cards))
  const [key, reset] = useReset()  
  let { referents, turn, type } = tag

  title = title ? title : tagLabel(tag)

  let cards = referents
    .map((cardCode) => {
      return deck.find(card => cardCode === card.code)
    })

  let collapsable = (title) => (
    <ul >
      <Collapsable name={title} openedByDefault={false} className={"link"}>
        {cards.map((card, index) => {
          return <li key={`${key}+${index}`} title={card.code} style={{"textIndent": "10%"}}>{}○ {card.name} x{card.count}</li> 
        })} 
      </Collapsable>
    </ul>
  )
  return collapsable(tagLabel(tag))
}

