import React, { useState } from "react"

export const Dropdown = <Z extends string>({
  onSelectedChange,
  options,
  name
}: Dropdown.props<Z>) => {
  const [localAction, setlocalAction] = useState(options[0].value)
  const handleChange = (e) => {
    let condition = e.target.value
    setlocalAction(condition)
    onSelectedChange(condition)
  }
  return (
    <select name={name} value={localAction} onChange={handleChange}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        )
      })}
    </select>
  )
}
