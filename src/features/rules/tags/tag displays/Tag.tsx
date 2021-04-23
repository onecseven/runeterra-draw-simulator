import React from "react"
import { CardLookup } from "../../../utils/CardLookup"
import { Card } from "../../../card/Card"
import Collapsable from "../../../utils/Collapsable"
//{"1":{"tag":{"type":"WITH","turn":1,"referents":["01SI015","01SI044"]},"hits":[]}}

export const Tag = ({ tag }: { tag: Tag }) => {
  let { referents, turn, type } = tag
  let cards = referents
    .map((card) => CardLookup(card))
    .map((card) => {
      card.count = 1
      return card
    })
  let collapsable = (title) => (
    <>
      <p>{title}</p>
      <Collapsable name={"Cards"} openedByDefault={false} className={"link"}>
        {cards.map((card) => {
          return <Card card={card} />
        })}
      </Collapsable>
    </>
  )
  switch (type) {
    case "WITH": {
      return collapsable(
        `Every hand that draws the following cards by turn ${turn} (in any order)`
      )
    }
    case "WITHOUT": {
      return collapsable(
        `Every hand that does not draw the following cards together by turn ${turn}. `
      )
    }
    case "SEQUENCE": {
      return collapsable(
        `Every hand that draws the following cards together by turn ${turn}, in the following order.`
      )
    }
    case "KEYWORD": {
      return collapsable(
          `Every hand that contain any cards that have the keyword: ${tag.groupName}`
      )
    }
    case "GROUP": {
      return collapsable(
        `Hands that contain all cards in group "${tag.groupName}"`
      )
    }
  }
}
