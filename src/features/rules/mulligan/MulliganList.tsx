import React from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import Collapsable from "../../utils/Collapsable"
import {ruleTranslator} from "./mulliganSlice"



export const MulliganList = () => {
  const queries = useSelector((state) => state.mulligan.queries)
  const deck = useSelector((state) => state.deck.cards)

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
