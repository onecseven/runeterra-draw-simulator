import React, { useState } from "react"
import "./RegulatedInput.scss"

interface RegulatedInputProps {
  max: number
  min: number
  onSelectedChange: (number) => void
  name: string
  defaultNum?: number
}

export const RegulatedInput = ({
  max,
  min,
  onSelectedChange,
  name,
  defaultNum = null,
}: RegulatedInputProps) => {
  const [currentValue, setCurrentValue] = useState(
    defaultNum ? defaultNum : min
  )
  const handleChange = (event) => {
    let newValue = Number(event.target.value)
    if (newValue > max) {
      setCurrentValue(max)
    } else if (min > newValue) {
      setCurrentValue(min)
    } else {
      setCurrentValue(newValue)
    }
    onSelectedChange(currentValue)
  }
  return (
    <input
      type="number"
      className={name}
      value={currentValue}
      onChange={handleChange}
    ></input>
  )
}
