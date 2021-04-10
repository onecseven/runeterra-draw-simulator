import React from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import {ruleTranslator} from "./mulliganSlice"



export const MulliganList = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const queries = useSelector((state) => state.mulligan.queries)
  const deck = useSelector((state) => state.deck.cards)

  if (Array.length == 0 || !selectedCard) return null
  let {code} = selectedCard
  let ruleElements = queries.filter(({referent}) => referent === code)
  .map(rule => {
    return (<li>{ruleTranslator(rule.referent, rule.onHit.action, rule.onHit.condition, rule.onHit.referenceCard, deck)}</li>)
  })

  return (<ul>
    {...ruleElements}
  </ul>)
}
