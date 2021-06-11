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
  const [currentValue, setCurrentValue] = useState(0)
  const handleChange = (event) => {
    let newValue = Number(event.target.value)
    if (newValue > max) {
      onSelectedChange(max)
      setCurrentValue(max)
    } else if (min > newValue) {
      onSelectedChange(min)
      setCurrentValue(min)
    } else {
      setCurrentValue(newValue)
      onSelectedChange(newValue)
    }
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
