import React from "react"
import { useAppSelector as useSelector } from "../../../../store/hooks"
import {Tag} from "./Tag"

export const CounterList = () => {
  const counters = useSelector((state) => state.data.tags.counters)
  const hands = useSelector((state) => state.data.simulations.hands.length)

  if (Object.keys(counters).length == 0 || hands < 1) return null
  let counterElements = []
  for (let key in counters) {
    let counter = counters[key]
    counterElements.push(counter)
  }

  return (<ul>
    {...counterElements.map((counter) => {
      return (
        <li >
          <>
          <Tag tag={counter.tag}/>
          <p> 🔶 Hit Percentage: {((counter.hits / hands) * 100).toFixed(2)}% ({counter.hits} out of {hands})</p>
          </> 
        </li>
      )
    })}
  </ul>)
}
