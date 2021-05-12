import React from "react"
import { useAppSelector as useSelector } from "../../../store/hooks"
import Collapsable from "../../utils/generic/UI/Collapsable"
import { ruleTranslator } from "../../utils/ruleTranslator"
import { useAppDispatch as useDispatch } from "../../../store/hooks"
import { removeMulligan } from "../../../store/dataSlice"

export const MulliganList = () => {
  const queries = useSelector((state) => state.data.mulliganQueries)
  const deck = useSelector((state) => state.data.deck.cards)
  const dispatch = useDispatch()

  const handleRemove = (event) => {
    event.preventDefault()
    dispatch(removeMulligan({index: event.target.value}))
  }

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
          <button onClick={handleRemove} value={index}>
            X
          </button>
        </li>
      </>
    )
  })

  return (
    <ul>
      <Collapsable name={"Mulligan Rules"} className="" openedByDefault={true}>
        {...ruleElements}
      </Collapsable>
    </ul>
  )
}
