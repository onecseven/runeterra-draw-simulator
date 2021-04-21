import React, { useState } from "react"
import { Dropdown } from "./Dropdown"


export const ExtensibleDropdown = ({
  options,
  name,
  onSelectedChange,
}: Dropdown.props) => {
  let [firstOption, secondOption] = options
  const [allDrops, setDrops] = useState([firstOption.value, secondOption.value])

  const callBackSetter = (id: number, edit: string) => {
    let newState = allDrops.slice().map((value, i) => (i === id ? edit : value))
    setDrops(newState)
    onSelectedChange(allDrops)
  }
  
  const memoizedCallback = (id: number) => (edit: string) => callBackSetter(id, edit)

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
