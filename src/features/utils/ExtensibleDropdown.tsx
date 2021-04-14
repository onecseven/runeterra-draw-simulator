import React, { useState, useCallback } from "react"
import { connect } from "react-redux"
import { doTimes } from "./doTimes"
import { Dropdown } from "./Dropdown"

//how the fuck are we going to handle the multiple state cause by this?

const Button = (clickHandler) => <button onClick={clickHandler}> + </button>

export const ExtensibleDropdown = ({
  options,
  name,
  onSelectedChange,
}: Dropdown.props) => {
  const [allDrops, setDrops] = useState([""])

  const callBackSetter = (id: number, edit: string) => {
    let newState = allDrops.slice().map((value, i) => (i === id ? edit : value))
    setDrops(newState)
    console.log(
      `id: ${id}, number: ${edit}, state: ${allDrops}, newState:${newState}`
    )
    onSelectedChange(allDrops)
  }
  
  const memoizedCallback = (id: number) => (edit: string) => callBackSetter(id, edit)

  const increase = () => {
    let newState = allDrops.slice()
    newState.push("")
    setDrops(newState)
  }

  return (
    <>
      {allDrops.slice().map((v, id) => {
        let innerCb = memoizedCallback(id)
        return <Dropdown options={options} name={name} onSelectedChange={innerCb} />
      })}
      <button onClick={increase}>x</button>
    </>
  )
}
