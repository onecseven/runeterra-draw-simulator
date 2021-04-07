import React, {useState} from "react"

export const Dropdown = ({ onSelectedChange, options, name}) => {
  const [localAction, setlocalAction] = useState("")
  const handleChange = (e) => {
    let condition = e.target.value
    setlocalAction(condition)
    onSelectedChange(condition)
  }
  return (
    <select name={name} value={localAction} onChange={handleChange}>
      {options.map(option => <option value={option.value}>{option.name}</option>)}
    </select>
  )
}
