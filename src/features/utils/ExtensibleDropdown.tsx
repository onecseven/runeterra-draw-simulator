import React, { useState } from "react"
import { connect } from "react-redux"
import { doTimes } from "./doTimes"
import { Dropdown } from "./Dropdown"

const Button = (clickHandler) => <button onClick={clickHandler}> + </button>

//how the fuck are we going to handle the multiple state cause by this?

export const ExtensibleDropdown = ({
  options,
  name,
  onSelectedChange,
}: Dropdown.props) => {
  const [dropNumber, setDropNumber] = useState(1)
  const increase = () => setDropNumber(dropNumber + 1)
  const decrease = () => setDropNumber(dropNumber - 1)
  const proppedDropdown = () => (
    <>
      <Dropdown
        options={options}
        name={name}
        onSelectedChange={onSelectedChange}
      />
      <Button clickHandler={decrease} />
    </>
  )

  return (
    <>
      {
        <Dropdown
          options={options}
          name={name}
          onSelectedChange={onSelectedChange}
        />
      }
      <Button increase={increase} />
      {doTimes(proppedDropdown, dropNumber)}
    </>
  )
}
