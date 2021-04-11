import React, { useState } from "react"

export type RadioChoicesProps = {
  onSelectedChange(string): void
  options: {
    name: string
    value: string
  }[]
  name: string
}

type labelMakerProps = {
  name: string
  value: string
  handleChange(event: { target: HTMLInputElement }): void
  localValue: string
}

const labelMaker = ({
  name,
  value,
  handleChange,
  localValue,
}: labelMakerProps) => {
  return (
    <label>
      <input
        type="radio"
        className="nes-radio"
        onChange={handleChange}
        checked={localValue === value}
        name={name}
        value={value}
      />
      <span>{name}</span>
    </label>
  )
}

export const RadioChoices = ({
  onSelectedChange,
  options,
  name,
}: RadioChoicesProps) => {
  const [localValue, setlocalValue] = useState(options[0].value)
  const handleChange = (event: { target: HTMLInputElement }) => {
    setlocalValue(event.target.value)
    onSelectedChange(event.target.value)
  }
  return (
    <div className={name}>
      {options.map(({ name, value }) =>
        labelMaker({ name, value, handleChange, localValue })
      )}
    </div>
  )
}
