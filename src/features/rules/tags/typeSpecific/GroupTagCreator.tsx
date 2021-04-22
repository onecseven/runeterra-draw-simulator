import React, { useState } from "react"
import { ExtensibleDropdown } from "../../../utils/ExtensibleDropdown"

export const GroupTagCreator = ({
  onGroupChange,
  onCardChange,
  options,
}: {
  onGroupChange: Dropdown.props["onSelectedChange"]
  onCardChange: Dropdown.props["onSelectedChange"]
  options: Dropdown.props["options"]
}) => {
  const [label, setLabel] = useState("")

  const handleChange = (event) => {
    let value = event.target.value
    setLabel(value)
    onGroupChange(value)
  }

  return (
    <>
      <input type="text" value={label} onChange={handleChange}></input>
      <ExtensibleDropdown
        options={options}
        name={"group"}
        onSelectedChange={onCardChange}
      />
    </>
  )
}
