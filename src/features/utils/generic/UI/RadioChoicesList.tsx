import React, { useState } from "react"


export type RadioChoicesListProps = {
  onSelectedChange(string): void
  options: UIElementIterator[]
  name: string
}



export const RadioChoicesList = ({
  onSelectedChange,
  options,
  name,
}: RadioChoicesListProps) => {
  const [localValue, setlocalValue] = useState(options[0].value)
  const handleChange = (event: { target: HTMLInputElement }) => {
    setlocalValue(event.target.value)
    onSelectedChange(event.target.value)
  }
  return (
    <div className={name}>
      {options}
    </div>
  )
}
