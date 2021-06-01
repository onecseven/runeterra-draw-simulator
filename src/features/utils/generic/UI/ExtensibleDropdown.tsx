import React, { useState } from "react"
import { Dropdown } from "./Dropdown"


export const ExtensibleDropdown = <Q extends string>({
  options,
  name,
  onSelectedChange,
}: Dropdown.props<Q>) => {
  let [firstOption, secondOption] = options
  const [allDrops, setDrops] = useState([firstOption.value, secondOption.value])

  const callBackSetter = (id: number, edit: Q) => {
    let newState: Q[] = allDrops.slice().map((value, i) => (i === id ? edit : value))
    setDrops(newState)
    onSelectedChange(newState)
  }
  
  const memoizedCallback = (id: number) => (edit: Q) => callBackSetter(id, edit)

  const increase = () => {
    let newState = allDrops.slice()
    newState.push(firstOption.value)
    setDrops(newState)
  }
  
  let decrease = (id: number) => {
    let newState = allDrops.slice()
    newState.splice(id, 1)
    setDrops(newState)
  }

  return (
    <>
      {allDrops.map((v, id) => {
        let innerCb = memoizedCallback(id)
        return (
        <>
        <Dropdown options={options} name={name} onSelectedChange={innerCb} />
        <button onClick={() => decrease(id)}>-</button>
        </>
          )
      })}
      <br/>
      <button onClick={increase}>x</button>
    </>
  )
}
