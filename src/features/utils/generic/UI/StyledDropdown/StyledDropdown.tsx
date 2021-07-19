import React, { useState } from "react"
import { useReset } from "../../useReset"
import "./dropdown.scss"

/*
Adapted from: https://codepen.io/wallaceerick/pen/ctsCz
*/

export const StyledDropdown = <Z extends string | number>({
  options,
  name,
  onSelectedChange,
  defaultStr,
  disabled=false
}: Dropdown.props<Z>) => {
  const [active, setActive] = useState(false)
  const [selection, setSelection] = useState<string | number>(defaultStr ? defaultStr : options[0].name)
  const toggleActive = () => setActive(!active)
  const handleSelect = (value, name) => {
    setSelection(name)
    toggleActive()
    onSelectedChange(value)
  }

  return (
    <div className="select">
      <div
        className={`select-styled ${active ? "active" : ""} ${name} ${disabled ? "disabled" : ""}`}
        onClick={disabled ? null : toggleActive}
      >
        {selection}
      </div>
      <ul
        className={`select-options ${name}`}
        style={{ display: active ? "block" : "none" }}
      >
        {options.map(({ value, name }, index) => {
          if (name === selection) return
          return (
            <li key={`${Math.random()}+${index}`} onClick={() => handleSelect(value, name)} value={value}>
              {name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
