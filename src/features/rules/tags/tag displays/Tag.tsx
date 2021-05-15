import React from "react"
import { CardLookup } from "../../../utils/CardLookup"
import { Card } from "../../../card/Card"
import Collapsable from "../../../utils/generic/UI/Collapsable"

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
      return `Every hand that contain any cards that have the keyword: ${groupName}`
    }
    case "GROUP": {
      return `Hands that contain all cards in group "${groupName}"`
    }
  }
}


export const Tag = ({ tag, title = null}: { tag: Tag, title?: string}) => {
  let { referents, turn, type } = tag
  title = title ? title : tagLabel(tag)
  let cards = referents
    .map((card) => CardLookup(card))
    .map((card) => {
      card.count = 1
      return card
    })

  let collapsable = (title) => (
    <>
      <Collapsable name={title} openedByDefault={false} className={"link"}>
        {cards.map((card) => {
          return <Card card={card} />
        })} 
      </Collapsable>
    </>
  )
  return collapsable(tagLabel(tag))
}

