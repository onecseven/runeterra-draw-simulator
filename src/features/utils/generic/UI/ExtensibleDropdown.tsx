import React, { useState, useCallback} from "react"
import { StyledDropdown } from "./StyledDropdown/StyledDropdown"
import "./button.scss"
import { start } from "node:repl"

export const ExtensibleDropdown = <Q extends string>({
  options,
  name,
  onSelectedChange,
  defaultNumber=2
}: Dropdown.props<Q>) => {
  const [allDrops, setDrops] = useState(options.slice(0, defaultNumber).map(({value}) => value))
  
  const callBackSetter =  useCallback(
    (id: number, edit: Q) => {
      let newState: Q[] = allDrops.slice().map((value, i) => (i === id ? edit : value))
      setDrops(newState)
      onSelectedChange(newState)
    },
    [allDrops],
  )
  
  const memoizedCallback = (id: number) => (edit: Q) => callBackSetter(id, edit)



  return (
    <>
      {allDrops.map((v, id) => {
        let innerCb = memoizedCallback(id)
        return (
        <StyledDropdown options={options} name={`${name} extensible${id}`} onSelectedChange={innerCb} />
          )
      })}
    </>
  )
}
