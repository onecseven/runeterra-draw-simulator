import React from "react"
import { CounterList } from "../rules/tags/tag displays/CounterList"
import {NumberSimInput} from "../simulation/NumberSimInput"

export const CalculateTab = () => {
  return (
  <div>
    <NumberSimInput />
    <CounterList/>
  </div>
  )
}