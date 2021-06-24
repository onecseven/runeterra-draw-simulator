import React, { useState, useCallback } from "react"
import { StyledDropdown } from "./StyledDropdown/StyledDropdown"
import "./button.scss"

export const ExtensibleDropdown = <Q extends string>({
  options,
  name,
  onSelectedChange,
  defaultNumber
}: Dropdown.props<Q>) => {
  const [allDrops, setDrops] = useState(
    options.slice(0, defaultNumber).map(({ value }) => value)
  )

  const callBackSetter = useCallback(
    (id: number, edit: Q) => {
      let newState: Q[] = allDrops
        .slice()
        .map((value, i) => (i === id ? edit : value))
      setDrops(newState)
      onSelectedChange(newState)
    },
    [allDrops]
  )

  const memoizedCallback = (id: number) => (edit: Q) => callBackSetter(id, edit)

  return (
    <>
      {allDrops.map((v, id) => {
        let innerCb = memoizedCallback(id)
        return (
          <div className={`extensible${id}`}>
            <StyledDropdown
              options={options}
              name={`${name}`}
              onSelectedChange={innerCb}
            />
          </div>
        )
      })}
    </>
  )
}
