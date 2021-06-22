import React from "react"
import {formatDeck} from "../../../utils/formatDeck"
import { Card } from "../../../card/Card"
import Collapsable from "../../../utils/generic/UI/Collapsable"
import { useAppSelector as useSelector } from "../../../../store/hooks"


export const tagLabel = (tag: Tag): string => {
  let {type, turn, groupName} = tag
  switch (type) {
    case "WITH": {
      return `Every hand that draws the following cards by turn ${turn} (in any order)`
    }
    case "WITHOUT": {
      return `Every hand that does not draw the following cards together by turn ${turn}. `
    }
    case "SEQUENCE": {
      return `Every hand that draws the following cards together by turn ${turn}, in the following order.`
    }
    case "KEYWORD": {
      return `Every hand that contain any cards which have the keyword "${groupName}" by turn ${turn}`
    }
    case "GROUP": {
      return `Hands that contain all cards in group "${groupName}" by turn ${turn}`
    }
  }
}


export const Tag = ({ tag, title = null}: { tag: Tag, title?: string}) => {
  const deck = useSelector((state) => formatDeck(state.data.deck.cards))
  let { referents, turn, type } = tag

  title = title ? title : tagLabel(tag)

  let cards = referents
    .map((cardCode) => {
      return deck.find(card => cardCode === card.code)
    })

  let collapsable = (title) => (
    <ul >
      <Collapsable name={title} openedByDefault={false} className={"link"}>
        {cards.map((card) => {
          return <li title={card.code} style={{"textIndent": "10%"}}>{}○ {card.name} x{card.count}</li> 
        })} 
      </Collapsable>
    </ul>
  )
  return collapsable(tagLabel(tag))
}

