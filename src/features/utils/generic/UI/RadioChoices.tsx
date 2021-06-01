import React, { useState } from "react"
import { isValueInArray } from "../isValueInArray"

export type RadioChoicesProps<Z> = {
  onSelectedChange(Z): void
  options: UIElementIterator<Z>[]
  name: string
}

export type Constraint = {
  length: number
}

type labelMakerProps<Z> = {
  name: string
  value: Z
  handleChange(event: { target: HTMLInputElement }): void
  localValue: Z
}

const labelMaker = <Q extends Constraint>({
  name,
  value,
  handleChange,
  localValue,
}: labelMakerProps<Q>) => {
  let key = Math.random() + "LABEL"
  return (
    <>
      <input
        type="radio"
        onChange={handleChange}
        checked={localValue === value}
        name={name}
        value={value as any}
      />
      <p>{name}</p>
    </>
  )
}

export const RadioChoices = <A extends Constraint>({
  onSelectedChange,
  options,
  name,
}: RadioChoicesProps<A>) => {
  const [localValue, setlocalValue] = useState<A>(options[0].value)
  const handleChange = (event: { target: HTMLInputElement }) => {
    let { value } = event.target
    if (
      isValueInArray(
        options.map(({ value }) => value),
        value
      )
    ) {
      setlocalValue(value)
      onSelectedChange(value)
    }
  }
  return (
    <div className={name}>
      {options.map(({ name, value }) =>
        labelMaker({ name, value, handleChange, localValue })
      )}
    </div>
  )
}
