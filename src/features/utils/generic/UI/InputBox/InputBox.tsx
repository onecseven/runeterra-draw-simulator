import React, {useState} from "react"
import "./InputBox.scss"
/** only accepts positive integers */
export const NumberInput = ({
  onChange,
  value
}: {onChange: (value: number | string) => void, value: number}) => {
  const handleChange = (event) => {
    onChange(Number(event.target.value.replace((/\D+/g),'')))
  }
  return ( 
    <input type="tel" className="input" value={value}  onChange={handleChange} 
    />
  )
}

export const TextInput = ({
  onChange,
  placeholder = "",
  value
}: {onChange: (value: string) => void, placeholder?: string, value: string}) => {
  return (<input className="input" value={value} placeholder={placeholder} onChange={event => onChange(event.target.value)}/> )
}

type InputBoxProps<Q = string|number> = {
  onSubmit: (Q) => void
  placeholder?: string
  type: "text" | "number"
  buttonText?: string
  className: string
}

export const InputBox = ({onSubmit, placeholder, type, buttonText="Submit", className}: InputBoxProps) => {
  let initialState = type === "text" ? "" : type === "number" ? 0 : null 
  const [value, setValue] = useState(initialState)
  
  const handleSubmit = (event) =>{
    event.preventDefault()
    onSubmit(value)
  }
  
  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        {type === "number" ? (<NumberInput onChange={(newVal) => setValue(newVal)} value={value as number} />) : (<TextInput onChange={(newVal) => setValue(newVal)} value={value as string} placeholder={placeholder} />)}
        <button className="button_slide" type="submit">{buttonText}</button>
      </form>
    </div>
  )
}
