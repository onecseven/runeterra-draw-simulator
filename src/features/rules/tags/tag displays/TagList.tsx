import React from "react"
import { useAppSelector as useSelector } from "../../../../store/hooks"


export const TagList = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const queries = useSelector((state) => state.tags.counters)
  console.log(JSON.stringify(queries))

  if (Array.length == 0 || !selectedCard) return null
  // let {code} = selectedCard
  // // let ruleElements = queries.filter(({referent}) => referent === code)
  // .map(rule => {
  //   // return (<li>{ruleTranslator(rule.referent, rule.onHit.action, rule.onHit.condition, rule.onHit.referenceCard, deck)}</li>)
  // })

  return (<ul>
    {/* {...ruleElements} */}
  </ul>)
}
