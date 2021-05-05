import React from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import Collapsable from "../../utils/Collapsable"
import { ruleTranslator } from "./ruleTranslator"



export const MulliganList = () => {
  const queries = useSelector((state) => state.data.mulliganQueries)
  const deck = useSelector((state) => state.data.deck.cards)

  if (queries.length == 0) return null
  let ruleElements = queries.map(rule => {
    return (<li>{ruleTranslator(rule.referent, rule.onHit.action, rule.onHit.condition, rule.onHit.referenceCard, deck)}</li>)
  })

  return (<ul>
    <Collapsable name={"Mulligan Rules"} className="" openedByDefault={true}>
    {...ruleElements}
    </Collapsable>
  </ul>)
}
