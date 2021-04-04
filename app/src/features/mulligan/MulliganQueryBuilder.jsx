import React, { useState, useCallback } from "react"
import {useSelector} from "react-redux"
import { Dropdown } from "../utils/Dropdown"

/*
declare interface MulliganQuery {
  card: [number]
  priority: number
  onHit: {
    action: KEEP THROW
    Condition = "ALWAYS" | "PRESENCE" | "ABSENCE"
    referenceCards: number[]
  }
}
*/

//  let [1,2,2] = [...new Set(deck)] = [1,2] //_.unique

const CONDITIONS = [{value:"ALWAYS", name:"Always"},{value:"PRESENCE", name:"In the presence of another card"},{value:"ABSENCE", name:"In the absence of another card"}]
const ACTIONS = [{value:"KEEP"}]
export const MulliganQueryBuilder = () => {
  const selectedCard = useSelector((state) => state.card.selectedCard)
  const [action, setAction] = useState(null)
  const [condition, setCondition] = useState(null)
  const conditionCallback = useCallback(
    (condition) => setCondition(condition),
    []
    )
  if (!selectedCard) return null

  return (
    <div className="rules">
      <h1>Selected card: {selectedCard.name}</h1>
      <br/>
      <Dropdown options={CONDITIONS} name={"conditions"} onSelectedChange={conditionCallback}/>
      <Dropdown options={CONDITIONS} name={"conditions"} onSelectedChange={conditionCallback}/>
      {/* <MulliganConditionDropdown onSelectedChange={conditionCallback} /> */}
    </div>
  )
}
