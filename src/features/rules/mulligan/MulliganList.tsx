import React from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import Collapsable from "../../utils/generic/UI/Collapsable"
import { ruleTranslator } from "../../utils/ruleTranslator"
import { RemoveButton } from "../../utils/RemoveButton"

export const MulliganList = () => {
  const queries = useSelector((state) => state.data.mulliganQueries)
  const deck = useSelector((state) => state.data.deck.cards)

  if (queries.length == 0) return null
  let ruleElements = queries.map((rule, index) => {
    return (
      <>
        <li>
          {ruleTranslator(
            rule.referent,
            rule.onHit.action,
            rule.onHit.condition,
            rule.onHit.referenceCard,
            deck
          )}
          <RemoveButton type="MULLIGAN" index={index}/>
        </li>
      </>
    )
  })

  return (
    <ul>
      <>
        {...ruleElements}
      </>
    </ul>
  )
}
