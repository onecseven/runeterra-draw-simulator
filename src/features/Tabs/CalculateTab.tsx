import React from "react"
import {
  useAppSelector as useSelector,
} from "../../store/hooks"
import { CounterList } from "../rules/tags/tag displays/CounterList"
import {NumberSimInput} from "../simulation/NumberSimInput"

export const CalculateTab = () => {
  const counters = useSelector(state => state.data.tags.counters)
  if (Object.entries(counters).length === 0) return (<p>You must register a counter before running any simulations.</p>)
  
  return (
  <div>
    <h3>Choose how many hands you want to calculate</h3>
    <NumberSimInput />
    <CounterList/>
  </div>
  )
}